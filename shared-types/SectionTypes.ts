export interface SlideType {
  image: string;
  title: string;
  text: string;
  author: string;
  org: string;
}

export interface SectionDataType {
  sectionName: string;
  text?: string;
  image?: string;
  slides?: SlideType[]; // Only used for ReconciliationSection
}