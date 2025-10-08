// Import Utils
import { GetEnvVarOrFail } from './GetEnvVarOrFail';
import { HandleGetSectionData } from './HandleGetSectionData';

// Import Types
import type { SectionDataType } from '../../../shared-types/SectionTypes';

// SectionFormType adapts the shared SectionDataType for saving purposes.
// For basic sections we allow image to be a File or existing URL.
// For slides we supply slideImageFiles[] where each index aligns with slides[]; only defined File entries are uploaded.
interface SectionFormType extends Omit<SectionDataType, 'image'> {
    image: string | File;
    slideImageFiles?: (File | null | undefined)[];
}

export const HandleSaveSectionData = async (sectionData: SectionFormType): Promise<undefined | void> => {
    try {
        if (sectionData.slides) {
            // Slides branch: send slides JSON + any changed images in one multipart request
            const formData = new FormData();
            formData.append('sectionName', sectionData.sectionName);
            // Slides serialized (unchanged slide images retain their existing URL strings)
            formData.append('slides', JSON.stringify(sectionData.slides));

            if (sectionData.slideImageFiles) {
                sectionData.slideImageFiles.forEach((file, idx) => {
                    // Only append indices where user selected a new file
                    if (file instanceof File) formData.append('slideImages', file, `slide-${idx}.jpg`);
                });
            }

            const res = await fetch(`${GetEnvVarOrFail('VITE_BACKEND_URL')}/api/section/save-slides`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (res.ok) {
                console.log('Successfully saved slides');
                HandleGetSectionData(sectionData.sectionName);
            } else {
                let errorMsg = 'Unknown error';
                try { errorMsg = (await res.json()).message; } catch {}
                console.error('Failed to save slides', errorMsg);
            }
        } else {
            // Basic section branch (Mission, Landing, etc)
            const formData = new FormData();
            formData.append('sectionName', sectionData.sectionName);
            formData.append('text', sectionData.text ?? "");

            // If a new file replace; else keep existing URL
            if (sectionData.image instanceof File) formData.append('image', sectionData.image); else formData.append('image', sectionData.image);

            const res: Response = await fetch(`${GetEnvVarOrFail('VITE_BACKEND_URL')}/api/section/save`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (res.ok) {
                console.log('Successfully saved section data');
                HandleGetSectionData(sectionData.sectionName);
            } else {
                const error = await res.json();
                console.error('Failed to save section data', error.message)
            }
        }
    } catch (err) {
        console.error(`Error saving section data`, err)
    }

    return undefined;
};