import { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import familyPhoto from '../assets/Family_Experience_Photo_Edited.jpg';

// Import components
import EditableText from './EditableText';
import EditableImage from './EditableImage';
import SaveEditsButton from './SaveEditsButton';

// Import Contexts
import { AuthContext } from '../contexts/AuthContext';

// Import Texts
import { defaultExperienceText } from '../lang/en/englishText';

// Import Utils
import { HandleGetSectionData } from '../utils/HandleGetSectionData';
import { HandleImageChangeFactory } from '../utils/HandleImageChangeFactory';
import { HandleSaveSectionData } from '../utils/HandleSaveSectionData';
import MainTitle from './MainTitle';

export default function ExperienceSection() {
    const sectionName: string = `experience`;
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const [experienceText, setExperienceText] = useState<string>(defaultExperienceText);
    const [experienceImage, setExperienceImage] = useState<string>(familyPhoto);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchSectionData = async () => {
            const data = await HandleGetSectionData(sectionName);
            if (data) {
                setExperienceText(data.text ?? experienceText);
                setExperienceImage(data.image ?? experienceImage);
            }
        };
        fetchSectionData();
    }, []);

    const HandleExperienceImageChange = HandleImageChangeFactory(setSelectedFile, setExperienceImage);

    const HandleResumeRedirect = () => {
        navigate("/resume")
    }

    return (
        <section id="experience" className="relative sectionHeight flex flex-col xl:p-10">
            {/* Title */}
            <div className="text-center">
                <MainTitle
                    titleText='Experience'
                />
            </div>

            {/* Content: Image left, Text right */}
            <div className="relative w-full gap-8 flex flex-col lg:flex-row justify-center items-center flex-1">
                {/* Image */}
                <div className="lg:flex-[1.3] h-full">
                    <EditableImage
                        src={experienceImage}
                        alt="Experience Image"
                        wrapperClassName="w-full justify-center h-auto"
                        imageClassName="w-full h-full object-cover rounded-3xl"
                        isAuthenticated={isAuthenticated}
                        inputIdString="experienceImageUpload"
                        onChangeFunction={HandleExperienceImageChange}
                    />
                </div>

                {/* Text */}
                <div className="lg:flex-[1.7] flex-col justify-center h-full text-center">
                    <MainTitle 
                        titleText='Profile Summary'
                        underline={false}
                        className='subHeadingStyle text-center xl:mb-2 2xl:mb-5'
                    />
                    <EditableText
                        isAuthenticated={isAuthenticated}
                        setText={setExperienceText}
                        text={experienceText}
                    />

                    {isAuthenticated && (
                        <div className="mt-4 flex justify-center">
                            <SaveEditsButton
                                onClickFunction={() => {
                                    HandleSaveSectionData({
                                        sectionName,
                                        text: experienceText,
                                        image: selectedFile ?? experienceImage,
                                    });
                                }}
                            />
                        </div>
                    )}

                    <div className="flex justify-center mt-4">
                        <button
                            onClick={HandleResumeRedirect}
                            className="transition bg-black text-white py-2 px-3 rounded-lg shadow-md hover:bg-white hover:text-brandRed border border-brandRed bodyStyle"
                        >
                            Read more
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
