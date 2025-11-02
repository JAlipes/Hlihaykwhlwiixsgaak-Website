import { useState, useContext, useEffect } from 'react';

// Import Assets
import feather from '../assets/Feather2025-Photoroom.png';

// Import Contexts
import { AuthContext } from '../contexts/AuthContext';

// Import Utils
import { HandleSaveSectionData } from '../utils/HandleSaveSectionData';
import { HandleGetSectionData } from '../utils/HandleGetSectionData';
import { HandleImageChangeFactory } from '../utils/HandleImageChangeFactory';

// Import Components
import EditableImage from '../components/EditableImage';
import SaveEditsButton from './SaveEditsButton';
import EditableText from './EditableText';
import MainTitle from './MainTitle';

// Import Text
import { missionText } from '../lang/en/englishText';

export default function MissionSection() {
    const sectionName: string = `mission`;
    const { isAuthenticated } = useContext(AuthContext);

    const [missionTextString, setMissionText] = useState<string>(missionText);
    const [missionImage, setMissionImage] = useState<string>(feather);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchSectionData = async () => {
            const data = await HandleGetSectionData(sectionName);
            if (data) {
                setMissionText(data.text ?? missionText); // fallback value if text is undefined
                setMissionImage(data.image ?? missionImage); // fallback value if image is undefined
            }
        };
        fetchSectionData();
    }, []);


    // Handle image selection //testing
    const handleMissionImageChange = HandleImageChangeFactory(setSelectedFile, setMissionImage);

    return (
        <section
            id="mission"
            className="relative min-h-[calc(100vh-6rem)] w-full flex flex-col md:flex-row bg-white text-gray-800"
        >
            {/* Left Image Hidden during md and mobile designs*/}
            <div className="hidden lg:block flex-1 md:flex-[1.3] relative flex items-center justify-center">
                <EditableImage
                    src={missionImage}
                    alt="Our Mission Image"
                    wrapperClassName="w-full h-full"
                    imageClassName="w-full h-full object-cover rounded-tr-3xl rounded-br-3xl"
                    isAuthenticated={isAuthenticated}
                    inputIdString="missionImageUpload"
                    onChangeFunction={handleMissionImageChange}
                />

                {/* Save button overlay (for image) */}
                {isAuthenticated && (
                    <div className="absolute bottom-4 left-4">
                        <SaveEditsButton
                            onClickFunction={() => {
                                HandleSaveSectionData({
                                    sectionName,
                                    text: missionTextString,
                                    image: selectedFile ?? missionImage,
                                });
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Right Text */}
            <div className="flex-1 md:flex-[1.7] flex items-center justify-center p-8 md:p-16">
                <div className="text-center max-w-3xl">
                    <MainTitle
                        titleText='Our Mission'
                    />

                    <EditableText
                        isAuthenticated={isAuthenticated}
                        setText={setMissionText}
                        text={missionTextString}
                    />
                </div>
            </div>
        </section>

    );
}
