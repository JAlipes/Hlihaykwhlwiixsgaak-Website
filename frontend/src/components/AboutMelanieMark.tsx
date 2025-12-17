import { useState, useContext, useEffect, useRef } from 'react';
import { motion, useInView } from "framer-motion";

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
import MainTitle from './MainTitle';

export default function AboutMelanieMark() {
    // Animation Referance
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" }); // trigger slightly

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
            className="sectionWrapper overflow-hidden"
            ref={sectionRef}
        >

                {/* Left Text */}
                <motion.div
                    className="textSection flex items-center justify-center px-8 lg:px-10 2xl:px-16"
                    initial={{ opacity: 0}}
                    animate={isInView ? { opacity: 1} : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="text-center max-w-4xl pt-5 md:pt-0">
                        <motion.div>
                            <MainTitle titleText="About Melanie Mark" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.2, delay: 0.5 }}
                        >
                            <EditableText
                                isAuthenticated={isAuthenticated}
                                setText={setAboutText}
                                text={aboutTextString}
                            />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    className="imgSection"
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
                >
                    <EditableImage
                        src={aboutImage}
                        alt="Melanie Mark standing with Canadian and Indigenous flags"
                        wrapperClassName="w-full h-full p-6 lg:p-0"
                        imageClassName="w-full h-full object-cover rounded-3xl lg:rounded-tr-none lg:rounded-br-none lg:rounded-tl-3xl lg:rounded-bl-3xl lg:shadow-[rgba(0,0,0,0.3)_-10px_0px_10px_0px]"
                        isAuthenticated={isAuthenticated}
                        inputIdString="aboutImageUpload"
                        onChangeFunction={handleAboutImageChange}
                    />

                    {isAuthenticated && (
                        <motion.div
                            className="absolute bottom-4 right-4 z-10"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            <SaveEditsButton
                                onClickFunction={() => {
                                    HandleSaveSectionData({
                                        sectionName,
                                        text: aboutText,
                                        image: selectedFile ?? aboutImage,
                                    });
                                }}
                            />
                        </motion.div>
                    )}
                </motion.div>
        </section>
    );
}
