import { GetEnvVarOrFail } from './GetEnvVarOrFail';

export async function HandleSaveTestimonials(payload: { testimonials: Array<{ image: string; text: string; order?: number }> }) {
    const base = GetEnvVarOrFail('VITE_BACKEND_URL');
    const res = await fetch(`${base}/api/testimonials/save-all`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to save testimonials');
    return res.json();
}
