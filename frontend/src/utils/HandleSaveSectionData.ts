// Import Utils
import { GetEnvVarOrFail } from './GetEnvVarOrFail';
import { HandleGetSectionData } from './HandleGetSectionData';

// Import Types
import type { SectionDataType } from '../../../shared-types/SectionTypes';


export const HandleSaveSectionData = async (sectionName : string, text: string, image: string) => {
    try {
        const body: SectionDataType = {sectionName, text, image};

        const res = await fetch(`${GetEnvVarOrFail('VITE_BACKEND_URL')}/api/section/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            credentials: 'include'
        });
        
        if (res.ok) {
            console.log('Successfully saved section data');
            HandleGetSectionData(sectionName);
        } else {
            const error = await res.json();
            console.error('Failed to save section data', error.message)
        }

    } catch (err) {
        console.error(`Error saving section data`, err)
    }

    return undefined;
};