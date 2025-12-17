import { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, useInView } from 'framer-motion';


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
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" }); // trigger slightly

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
        <section id="experience" className="relative sectionHeight flex flex-col items-center justify-center lg:p-6 2xl:p-12" ref={sectionRef}>
            {/* Title */}
            <div className="text-center mt-5">
                <MainTitle
                    titleText='Experience'
                />
            </div>

            {/* Content: Image left, Text right */}
            <div className="relative w-full h-full lg:gap-8 flex flex-col lg:flex-row justify-center items-center">
                {/* Image */}
                <motion.div className="imgSection relative"
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
                >
                    <EditableImage
                        src={experienceImage}
                        alt="Experience Image"
                        wrapperClassName="w-full justify-center h-full p-6 lg:p-0"
                        imageClassName="w-full h-full object-cover rounded-3xl"
                        isAuthenticated={isAuthenticated}
                        inputIdString="experienceImageUpload"
                        onChangeFunction={HandleExperienceImageChange}
                    />

                    {isAuthenticated && (
                        <div className="mt-4 absolute bottom-4 right-4 z-10 flex justify-center">
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
                </motion.div>

                {/* Text */}
                <motion.div className="textSection flex-col justify-center h-full w-full text-center p-5 lg:p-0"
                    initial={{ opacity: 0}}
                    animate={isInView ? { opacity: 1} : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    
                    <motion.div>
                        <MainTitle 
                            titleText='Profile Summary'
                            underline={false}
                            className='subHeadingStyle text-center lg:mb-2 2xl:mb-5'
                        />
                    </motion.div>


                    <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.2, delay: 0.5 }}
                    >
                        <EditableText
                            isAuthenticated={isAuthenticated}
                            setText={setExperienceText}
                            text={experienceText}
                        />
                    </motion.div>


                    <div className="flex justify-center mt-4">
                        <button
                            onClick={HandleResumeRedirect}
                            className="btnRounding"
                        >
                            Read more
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
