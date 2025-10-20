import { GetEnvVarOrFail } from './GetEnvVarOrFail';

export async function DeleteTestimonial(id: string) {
    const base = GetEnvVarOrFail('VITE_BACKEND_URL');
    const res = await fetch(`${base}/api/testimonials/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    if (!res.ok) {
        try {
            const data = await res.json();
            throw new Error(data?.message || 'Delete failed');
        } catch {
            throw new Error('Delete failed');
        }
    }
    return res.json();
}
