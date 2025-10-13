export interface TestimonialType {
    image: string;
    title: string;
    text: string; // Quill content (HTML or Delta serialized)
    order?: number;
}

export interface SectionDataType {
    sectionName: string;
    text?: string;
    image?: string;
}