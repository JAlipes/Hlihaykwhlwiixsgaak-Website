import { useContext, useState, useEffect } from 'react'

// Import Components
import EditableText from './EditableText'
import SaveEditsButton from './SaveEditsButton'

// Import Contexts
import { AuthContext } from '../contexts/AuthContext'

// Import Utils
import { HandleGetSectionData } from '../utils/HandleGetSectionData'
import { HandleSaveSectionData } from '../utils/HandleSaveSectionData'

interface ResumeSectionProps{
    defaultSectionText: string
    sectionName: string
    sectionId: string
}

export default function ResumeSection({defaultSectionText, sectionName, sectionId} : ResumeSectionProps){
    const { isAuthenticated } = useContext(AuthContext);

    const [sectionText, setSectionText] = useState<string>(defaultSectionText);

    useEffect(() => {
        const fetchSectionData = async () => {
            const data = await HandleGetSectionData(sectionName);
            if (data) {
                setSectionText(data.text ?? sectionText);
            }
        };
        fetchSectionData();
    }, []);

    return(
        <section id={sectionId} className=''>
            {/* Single editable contentEditable div */}
            <EditableText
                isAuthenticated={isAuthenticated}
                setText={setSectionText}
                text={sectionText}
            />

            {/* Save button shows only if authenticated */}
            {isAuthenticated && (
                <SaveEditsButton 
                    onClickFunction={
                        () => {
                            HandleSaveSectionData({sectionName, text: sectionText, image: ""})
                        }
                    }
                />
            )}

        </section>
    )
}