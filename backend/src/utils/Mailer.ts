import nodemailer from 'nodemailer';
import { GetEnvVarOrFail } from './GetEnvVarOrFail';

// Create a single reusable transporter (connection pool enabled)
const transporter = nodemailer.createTransport({
  host: GetEnvVarOrFail('SMTP_HOST'),
  port: Number(GetEnvVarOrFail('SMTP_PORT')),
  secure: Number(GetEnvVarOrFail('SMTP_PORT')) === 465,
  auth: {
    user: GetEnvVarOrFail('SMTP_USER'),
    pass: GetEnvVarOrFail('SMTP_PASS'),
  },
  pool: true,
});

/** Options for sending a simple email. */
export interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
  cc?: string | string[];
}

/**
 * SendEmail
 * Sends an email using the shared transporter.
 * From header is chosen from CONTACT_FROM -> SMTP_FROM -> SMTP_USER.
 */
export async function SendEmail(opts: EmailOptions) {
  const from = process.env.CONTACT_FROM || process.env.SMTP_FROM || GetEnvVarOrFail('SMTP_USER');
  await transporter.sendMail({
    from,
    to: opts.to,
    cc: opts.cc,
    replyTo: opts.replyTo,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  });

  console.log(`✉️  Mail sent to ${ opts.to } (check inbox)`);
}

/**
 * GenerateEmailTemplate
 * Minimal HTML wrapper for consistent email formatting.
 */
export function GenerateEmailTemplate(title: string, bodyLines: string[]): string {
  const escape = (s: string) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  const body = bodyLines
    .map(line => (line === '' ? '<div style="height:12px"></div>' : `<p style="margin:8px 0">${escape(line)}</p>`))
    .join('\n');

  return `
  <div style="font-family: Arial, sans-serif; line-height: 1.5; max-width:640px; margin:0 auto;">
    <h2 style="border-bottom:1px solid #e5e7eb; padding-bottom:8px;">${escape(title)}</h2>
    ${body}
    <div style="margin-top:24px; font-size:12px; color:#6b7280;">This email was sent from the website contact form.</div>
  </div>`;
}
