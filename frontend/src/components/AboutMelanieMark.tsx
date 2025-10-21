import { useState, useContext, useEffect } from 'react';

// Import Assets
import headshot from '../assets/MJM_FINAL_HEADSHOT_2024_BLUE_WHITE.jpg';

// Import Context
import { AuthContext } from '../contexts/AuthContext';

// Import Utils
import { HandleSaveSectionData } from '../utils/HandleSaveSectionData';
import { HandleGetSectionData } from '../utils/HandleGetSectionData';
import { HandleImageChangeFactory } from '../utils/HandleImageChangeFactory';

// Import Components
import EditableImage from './EditableImage';
import EditableText from './EditableText';
import SaveEditsButton from './SaveEditsButton';

// Import text
import { aboutText } from '../lang/en/englishText';

export default function AboutMelanieMark() {
    const sectionName: string = `about`;
    const { isAuthenticated } = useContext(AuthContext);

    const [aboutTextString, setAboutText] = useState<string>(aboutText);
    const [aboutImage, setAboutImage] = useState<string>(headshot);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchSectionData = async () => {
            const data = await HandleGetSectionData(sectionName);
            if (data) {
                setAboutText(data.text ?? aboutTextString);
                setAboutImage(data.image ?? aboutImage);
            }
        };
        fetchSectionData();
    }, []);

    const handleAboutImageChange = HandleImageChangeFactory(setSelectedFile, setAboutImage);


    return (
        <section
            id="about"
            className="relative min-h-[calc(100vh-6rem)] w-full flex flex-col md:flex-row bg-white text-gray-800 overflow-hidden"
        >
            {/* Left Text */}
            <div className="flex-1 md:flex-[1.7] flex items-center justify-center p-8 md:p-16">
                <div className="text-center max-w-2xl">
                    <h2 className="text-3xl md:text-4xl text-brandRed">
                        About Melanie Mark
                    </h2>
                    <div className="w-64 h-[2px] bg-black mt-3 mb-8 mx-auto" />
                    <EditableText
                        isAuthenticated={isAuthenticated}
                        setText={setAboutText}
                        text={aboutTextString}
                    />
                </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 md:flex-[1.3] relative">
                {/* Absolutely fill the right side */}
                <div className="absolute inset-0">
                    <EditableImage
                        src={aboutImage}
                        alt="Melanie Mark standing with Canadian and Indigenous flags"
                        wrapperClassName="w-full h-full"
                        imageClassName="w-full h-full object-cover rounded-tl-3xl rounded-bl-3xl"
                        isAuthenticated={isAuthenticated}
                        inputIdString="aboutImageUpload"
                        onChangeFunction={handleAboutImageChange}
                    />
                </div>

                {/* Save button overlay */}
                {isAuthenticated && (
                    <div className="absolute bottom-4 right-4 z-10">
                        <SaveEditsButton
                            onClickFunction={() => {
                                HandleSaveSectionData({
                                    sectionName,
                                    text: aboutText,
                                    image: selectedFile ?? aboutImage,
                                });
                            }}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
