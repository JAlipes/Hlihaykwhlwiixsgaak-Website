import { Request, Response } from 'express';
import { SendEmail, GenerateEmailTemplate } from '../utils/Mailer';
import { GetEnvVarOrFail } from '../utils/GetEnvVarOrFail';
import { VerifyTurnstileToken } from '../utils/VerifyTurnstile';

// Basic validation helper
const isNonEmptyString = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0;

/**
 * SubmitContact
 * POST /api/contact — validates payload, (optionally) verifies captcha, and emails the details.
 */
export async function SubmitContact(req: Request, res: Response) {
	try {
		const { fullName, company, email, phone, requestType, message, captchaToken } = req.body ?? {};
		const requireCaptcha = GetEnvVarOrFail('CONTACT_REQUIRE_CAPTCHA').toLowerCase() === 'true';

		// Required fields check
		if (!isNonEmptyString(fullName) || !isNonEmptyString(email) || !isNonEmptyString(requestType) || !isNonEmptyString(message)) {
			return res.status(400).json({ message: 'Missing required fields: fullName, email, requestType, and message are required.' });
		}

		// Optional: very light email guard (not exhaustive)
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return res.status(400).json({ message: 'Please provide a valid email address.' });
		}

		// Captcha verification (Cloudflare Turnstile) — optional via CONTACT_REQUIRE_CAPTCHA
		if (requireCaptcha) {
			if (!isNonEmptyString(captchaToken)) {
				return res.status(400).json({ message: 'Captcha verification failed. Please try again.' });
			}
			const captcha = await VerifyTurnstileToken(captchaToken, req.ip);
			if (!captcha.success) {
				return res.status(400).json({ message: 'Captcha verification failed.' });
			}
		}

		// Internal email content for the business
		const businessInbox = GetEnvVarOrFail('CONTACT_TO');
		const subject = `New Contact Request: ${requestType} — ${fullName}`;
		const bodyLines = [
			`Full Name: ${fullName}`,
			`Company: ${company || ''}`,
			`Email: ${email}`,
			`Phone: ${phone || ''}`,
			`Request Type: ${requestType}`,
			'',
			'Message:',
			message,
			'',
			`(Reply to this email will go to ${email})`,
		];

		const html = GenerateEmailTemplate(`New Contact Request - ${requestType}`, bodyLines);

		// Simple confirmation email content for the user
		const confirmationSubject = 'We received your message';
		const confirmationLines = [
			`Hi ${fullName},`,
			'Thanks for reaching out. We received your message and someone will contact you shortly.',
			'',
			'For your records:',
			`Request Type: ${requestType}`,
			'Message:',
			message,
		];
		const confirmationHtml = GenerateEmailTemplate('We received your message', confirmationLines);

		// Original internal email (team replies to submitter)
		await SendEmail({
			to: businessInbox,
			subject,
			text: bodyLines.join('\n'),
			html,
			replyTo: email,
		});

		// User confirmation email (user replies to business)
		await SendEmail({
			to: email,
			subject: confirmationSubject,
			text: confirmationLines.join('\n'),
			html: confirmationHtml,
			replyTo: businessInbox,
		});

		console.log('[Contact] Submission received', {
			fullName,
			company: company ?? '',
			email,
			phone: phone ?? '',
			requestType,
			message: message?.slice(0, 500), // avoid huge logs
		});

		return res.status(202).json({ message: 'Contact request sent. Thank you!' });
	} catch (err) {
		console.error('[Contact] Error handling submission', err);
		return res.status(500).json({ message: 'Failed to submit contact request.' });
	}
}
