import { GetEnvVarOrFail } from './GetEnvVarOrFail';

export async function HandleGetTestimonials() {
    const base = GetEnvVarOrFail('VITE_BACKEND_URL');
    const res = await fetch(`${base}/api/testimonials`, {
        credentials: 'include',
    });
    if (!res.ok) {
        console.error('[Testimonials] fetch failed', res.status);
        return null;
    }
    return res.json();
}
