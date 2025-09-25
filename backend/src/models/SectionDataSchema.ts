import { Schema, Document, model } from 'mongoose';

// Import Types
import type { SectionDataType } from '../../../shared-types/SectionTypes'

interface SectionDocument extends SectionDataType, Document {}

const sectionDataSchema = new Schema<SectionDocument>({
    sectionName : {type : String, required: true},
    text: {type: String, required: true},
    image: { type: String, required: true}
})

export const SectionModel = model<SectionDocument>('SectionData', sectionDataSchema);