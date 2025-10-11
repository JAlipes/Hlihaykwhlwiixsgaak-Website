/**
 * Shared types for Mailer and related verification utilities.
 * Keeping them together simplifies imports and adheres to separation of concerns.
 */

export interface EmailOptions {
	to: string | string[];
	subject: string;
	text?: string;
	html?: string;
	replyTo?: string;
	cc?: string | string[];
}

export interface TurnstileVerifyResult {
	success: boolean;
	'error-codes'?: string[];
}

