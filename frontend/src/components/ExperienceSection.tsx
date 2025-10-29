import { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import familyPhoto from '../assets/Family_Experience_Photo.jpg';

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
        <section id="experience" className="min-h-[calc(100vh-6rem)] flex flex-col md:px-20 lg:px-32">
            {/* Title */}
            <div className="text-center mb-12">
                <MainTitle
                    titleText='Experience'
                    className='titleStyle mt-12'
                />
            </div>

            {/* Content: Image left, Text right */}
            <div className="gap-8 flex flex-col md:flex-row justify-center items-center flex-1 mb-14">
                {/* Image */}
                <EditableImage
                    src={experienceImage}
                    alt="Experience Image"
                    wrapperClassName="w-full md:w-1/2 flex justify-center h-auto md:h-full pt-10 pb-10 pl-10 pr-0"
                    imageClassName="w-full h-full object-cover rounded-[75px]"
                    isAuthenticated={isAuthenticated}
                    inputIdString="experienceImageUpload"
                    onChangeFunction={HandleExperienceImageChange}
                />

                {/* Text */}
                <div className="w-full flex flex-col justify-center h-full sm:mt-10 2xl:w-1/2">
                    <MainTitle 
                        titleText='Profile Summary'
                        className='subHeadingStyle text-center mb-5'
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
                            className="bg-brandRed text-white text-lg py-2 px-3 rounded-lg shadow-md hover:bg-red-700 transition border border-black"
                        >
                            Explore more
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
