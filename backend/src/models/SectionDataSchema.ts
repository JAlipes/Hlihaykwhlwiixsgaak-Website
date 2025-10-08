import { Schema, Document, model } from 'mongoose';

// Import Types
import type { SectionDataType } from '../../../shared-types/SectionTypes'

interface SectionDocument extends SectionDataType, Document {}

// A section can be either:
// 1. Basic: text + image
// 2. Slides: array of testimonial slides (when slides[] is non-empty)
// We keep text/image optional to allow switching modes without a second collection.
const sectionDataSchema = new Schema<SectionDocument>({
    sectionName : {type : String, required: true, unique: true},
    text: {type: String},          // used only for basic sections
    image: {type: String},         // used only for basic sections
    slides: [{                     // when present acts as testimonial carousel
        image: String,
        title: String,
        text: String,
        author: String,
        org: String,
    }]
});

export const SectionModel = model<SectionDocument>('SectionData', sectionDataSchema);