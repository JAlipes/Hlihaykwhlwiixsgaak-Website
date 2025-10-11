import { GetEnvVarOrFail } from './GetEnvVarOrFail';
import type { TurnstileVerifyResult } from '../types/nodemailer';

/**
 * VerifyTurnstileToken
 * Calls Cloudflare's siteverify to validate a token.
 */
export async function VerifyTurnstileToken(token: string, remoteip?: string): Promise<TurnstileVerifyResult> {
    const secret = GetEnvVarOrFail('TURNSTILE_SECRET');
    const body = new URLSearchParams();
    body.append('secret', secret);
    body.append('response', token);
    if (remoteip) body.append('remoteip', remoteip);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
    });

    if (!res.ok) return { success: false, 'error-codes': ['bad-response'] };
    const data = (await res.json()) as TurnstileVerifyResult;
    return data;
}
