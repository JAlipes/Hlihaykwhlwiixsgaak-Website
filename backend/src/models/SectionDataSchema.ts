import { Schema, Document, model } from 'mongoose';

// Import Types
import type { SectionDataType } from '../../../shared-types/SectionTypes'

interface SectionDocument extends SectionDataType, Document {}

// A section stores basic content: text + image.
// Testimonials/slides have been moved to their own collection.
const sectionDataSchema = new Schema<SectionDocument>({
    sectionName : {type : String, required: true, unique: true},
    text: {type: String},          // used only for basic sections
    image: {type: String}         // used only for basic sections
});

export const SectionModel = model<SectionDocument>('SectionData', sectionDataSchema);