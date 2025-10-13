export async function HandleSaveTestimonials(payload: { testimonials: Array<{ image: string; title: string; text: string; order?: number }> }) {
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    const res = await fetch(`${base}/api/testimonials/save-all`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to save testimonials');
    return res.json();
}
