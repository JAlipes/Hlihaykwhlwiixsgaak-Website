import { useState, useContext, useEffect } from 'react';

// Import Assets
import feather from '../assets/red-feather.png';

// Import Contexts
import { AuthContext } from '../contexts/AuthContext';

// Import Utils
import { HandleSaveSectionData } from '../utils/HandleSaveSectionData';
import { HandleGetSectionData } from '../utils/HandleGetSectionData';
import { HandleImageChangeFactory } from '../utils/HandleImageChangeFactory';

// Import Components
import EditableImage  from '../components/EditableImage';

export default function MissionSection() {
    const sectionName: string = `mission`;
    const { isAuthenticated } = useContext(AuthContext);

    const [missionText, setMissionText] = useState<string>(
        'Hli Haykwhl Ẃii Xsgaak Consulting is an Indigenous owned and matriarch-led corporation dedicated to advancing the 94 Calls to Action of the Truth and Reconciliation Commission. Our mission is to guide, empower, and inspire people and organizations to be allies and agents for change while making transformational community impact.\n\nLed by Melanie Mark, a dynamic changemaker with over 30 years of experience across nonprofit, public service, and private sectors. Known for her relentless advocacy and ability to turn complex ideas into actionable results, Melanie is a trusted ally who prioritizes rights, relationships, and results.'
    );
    const [missionImage, setMissionImage] = useState<string>(feather);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchSectionData = async () => {
            const data = await HandleGetSectionData(sectionName);
            if (data) {
                setMissionText(data.text);
                setMissionImage(data.image);
            }
        };
        fetchSectionData();
    }, []);


    // Handle image selection //testing
    const handleMissionImageChange = HandleImageChangeFactory(setSelectedFile, setMissionImage);

    return (
        <section className='bg-white text-gray-800 py-16 px-6 md:px-20 lg:px-32'>
            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
                {/* Image (left) */}
                <EditableImage 
                    src={missionImage}
                    alt='Our Mission Image'
                    wrapperClassName='flex flex-col items-center md:items-start'
                    imageClassName='w-full max-w-[500px] rounded-lg shadow-lg object-cover cursor-pointer'
                    isAuthenticated={isAuthenticated}
                    inputIdString='missionImageUpload'
                    onChangeFunction={handleMissionImageChange}
                />

                {/* Text (right) */}
                <div>
                    <h2 className='text-3xl md:text-4xl font-bold text-red-600 text-center'>
                        Our Mission
                    </h2>
                    <div className='w-64 h-[2px] bg-black mt-3 mb-8 mx-auto' />

                    {/* Single editable contentEditable div */}
                    <div
                        contentEditable={isAuthenticated}
                        suppressContentEditableWarning={true}
                        onBlur={(e) =>
                            setMissionText((e.target as HTMLDivElement).innerText)
                        }
                        className={`w-full mb-4 p-2 text-lg rounded whitespace-pre-wrap ${!isAuthenticated ? 'cursor-auto' : 'bg-white'}`
                        }
                    >
                        {missionText}
                    </div>

                    {/* Save button shows only if authenticated */}
                    {isAuthenticated && (
                        <button
                            onClick={() => {
                                HandleSaveSectionData({sectionName, text: missionText, image: selectedFile ?? missionImage});
                            }}
                            
                            className='bg-red-600 text-white px-4 py-2 rounded'
                        >
                            Save
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
