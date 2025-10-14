import { Request, Response } from 'express';
import { TestimonialModel } from '../models/TestimonialSchema';
import { UploadToCloudinary } from '../utils/UploadToCloudinary';

export async function GetTestimonials(_req: Request, res: Response) {
    try {
        const items = await TestimonialModel.find().sort({ order: 1, createdAt: 1 }).lean();
        return res.json({ testimonials: items });
    } catch (err) {
        console.error('[Testimonials] Get error', err);
        return res.status(500).json({ message: 'Failed to fetch testimonials' });
    }
}

export async function SaveTestimonials(req: Request, res: Response) {
    try {
        const { testimonials } = req.body as { testimonials: Array<{ image?: string; text: string; order?: number }> };
        if (!Array.isArray(testimonials)) {
            return res.status(400).json({ message: 'Invalid payload: testimonials must be an array' });
        }

        // Replace-all strategy: clear then insert in provided order
        await TestimonialModel.deleteMany({});
        const docs = await TestimonialModel.insertMany(testimonials.map((t, idx) => ({
            image: t.image ?? '',
            text: t.text,
            order: typeof t.order === 'number' ? t.order : idx,
        })));

        // Refetch sorted with _id to ensure client receives canonical docs
        const saved = await TestimonialModel.find().sort({ order: 1, createdAt: 1 }).lean();
        return res.status(200).json({ testimonials: saved });
    } catch (err) {
        console.error('[Testimonials] Save error', err);
        return res.status(500).json({ message: 'Failed to save testimonials' });
    }
}

export async function UploadTestimonialImage(req: Request, res: Response) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }
        const uniqueName = `testimonial-${Date.now()}`;
        const url = await UploadToCloudinary(req.file, uniqueName);
        return res.status(200).json({ url });
    } catch (err) {
        console.error('[Testimonials] Upload image error', err);
        return res.status(500).json({ message: 'Failed to upload image' });
    }
}

export async function DeleteTestimonial(req: Request, res: Response) {
    try {
        const { id } = req.params as { id: string };
        if (!id) return res.status(400).json({ message: 'Missing testimonial id' });

        const deleted = await TestimonialModel.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: 'Testimonial not found' });

        return res.status(200).json({ message: 'Deleted testimonial' });
    } catch (err) {
        console.error('[Testimonials] Delete error', err);
        return res.status(500).json({ message: 'Failed to delete testimonial' });
    }
}
