export async function HandleGetTestimonials() {
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    const res = await fetch(`${base}/api/testimonials`, {
        credentials: 'include',
    });
    if (!res.ok) {
        console.error('[Testimonials] fetch failed', res.status);
        return null;
    }
    return res.json();
}
