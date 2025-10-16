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
import { defaultExperienceText } from '../lang/en/EnglishText';

// Import Utils
import { HandleGetSectionData } from '../utils/HandleGetSectionData';
import { HandleImageChangeFactory } from '../utils/HandleImageChangeFactory';
import { HandleSaveSectionData } from '../utils/HandleSaveSectionData';

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
                setExperienceText(data.text);
                setExperienceImage(data.image);
            }
        };
        fetchSectionData();
    }, []);

    const HandleExperienceImageChange = HandleImageChangeFactory(setSelectedFile, setExperienceImage);

    const HandleResumeRedirect = () => {
        navigate("/resume")
    }

    return (
        <section id="experience" className="min-h-screen bg-gray-100 text-gray-800 flex flex-col py-12 px-6 md:px-20 lg:px-32">
            {/* Title */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-red-600 mt-12">
                    Experience
                </h2>
                <div className="w-48 h-[2px] bg-black mt-3 mx-auto" />
            </div>

            {/* Content: Image left, Text right */}
            <div className="flex flex-col md:flex-row items-center justify-center flex-1 gap-12">
                {/* Image */}
                <EditableImage
                    src={experienceImage}
                    alt='Experience Image'
                    wrapperClassName='w-full md:w-1/2 flex justify-center'
                    imageClassName='w-full max-w-[500px] h-[500px] object-cover rounded-3xl shadow-lg'
                    isAuthenticated={isAuthenticated}
                    inputIdString='experienceImageUpload'
                    onChangeFunction={HandleExperienceImageChange}
                />

                {/* Text */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <h3 className="text-2xl font-light text-red-600 mb-6 text-center">
                        Profile Summary
                    </h3>
                    <EditableText
                        isAuthenticated={isAuthenticated}
                        setText={setExperienceText}
                        text={experienceText}
                    />

                    {/* Save button shows only if authenticated */}
                    {isAuthenticated && (
                        <SaveEditsButton 
                            onClickFunction={
                                () => {
                                    HandleSaveSectionData({sectionName, text: experienceText, image: selectedFile ?? experienceImage})
                                }
                            }
                        />
                    )}

                    {/* Button Redirects to the ResumePage*/}
                    <div className="mt-8 flex justify-center">
                        <button onClick={HandleResumeRedirect} className="bg-red-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-red-700 transition">
                            Explore more
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
