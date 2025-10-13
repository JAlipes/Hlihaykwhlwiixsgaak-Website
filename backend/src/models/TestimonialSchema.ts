import { Schema, model, Document } from 'mongoose';

export interface Testimonial extends Document {
	image: string;
	title: string; // optional display title or headline
	text: string;  // rich text (Quill HTML or Delta serialized as string)
	order?: number; // optional ordering for carousel
	createdAt: Date;
	updatedAt: Date;
}

const TestimonialSchema = new Schema<Testimonial>({
	image: { type: String, default: '' },
	title: { type: String, default: 'Testimonial' },
	text: { type: String, required: true },
	order: { type: Number, default: 0 },
}, { timestamps: true });

export const TestimonialModel = model<Testimonial>('Testimonial', TestimonialSchema);
