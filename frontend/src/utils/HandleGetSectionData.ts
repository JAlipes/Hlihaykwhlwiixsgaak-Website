// Import Utils
import type { SectionDataType } from "../../../shared-types/SectionTypes";
import { GetEnvVarOrFail } from "./GetEnvVarOrFail";

export const HandleGetSectionData = async (sectionName : string): Promise<SectionDataType | null> => {
    try {
        const res = await fetch(`${GetEnvVarOrFail('VITE_BACKEND_URL')}/api/section/get?sectionName=${sectionName}`, {
            method: 'GET',
            credentials: 'include'
        })

        if (res.ok) {
            const data : SectionDataType = await res.json();
            console.log('Succesfully retrieved section data');
            return data;
        } else {
            const error = await res.json();
            console.error('Failed to get section data', error.message);
        }

    } catch (err) {
        console.error('Error Getting Section Data', err);
    }

    return null;
} 
