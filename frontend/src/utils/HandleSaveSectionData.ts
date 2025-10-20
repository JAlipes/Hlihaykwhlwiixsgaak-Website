// Import Utils
import { GetEnvVarOrFail } from './GetEnvVarOrFail';
import { HandleGetSectionData } from './HandleGetSectionData';

// Import Types
import type { SectionDataType } from '../../../shared-types/SectionTypes';

// SectionFormType adapts the shared SectionDataType for saving purposes.
// For basic sections we allow image to be a File or an existing URL string.
interface SectionFormType extends Omit<SectionDataType, 'image'> {
    image: string | File;
}

export const HandleSaveSectionData = async (sectionData: SectionFormType): Promise<undefined | void> => {
    try {
        // Basic section branch (Mission, Landing, Services, etc)
        const formData = new FormData();
        formData.append('sectionName', sectionData.sectionName);
        formData.append('text', sectionData.text ?? "");

        // If a new file provided, append File; else keep existing URL as string
        if (sectionData.image instanceof File) {
            formData.append('image', sectionData.image);
        } else {
            formData.append('image', sectionData.image);
        }

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
    } catch (err) {
        console.error(`Error saving section data`, err)
    }

    return undefined;
};