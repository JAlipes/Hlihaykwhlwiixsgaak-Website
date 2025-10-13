export async function UploadTestimonialImage(file: File) {
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    const form = new FormData();
    form.append('image', file);
    const res = await fetch(`${base}/api/testimonials/upload-image`, {
        method: 'POST',
        credentials: 'include',
        body: form,
    });
    if (!res.ok) throw new Error('Failed to upload testimonial image');
    return res.json() as Promise<{ url: string }>;
}
