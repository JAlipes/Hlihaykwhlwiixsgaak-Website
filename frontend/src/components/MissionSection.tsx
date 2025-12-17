import { useState, useContext, useEffect, useRef } from 'react';
import {motion, useInView} from 'framer-motion';
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
    // Animation Trigger
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" }); // trigger slightly

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
            className="sectionWrapper"
            ref={sectionRef}
        >
            {/* Left Image Hidden during md and mobile designs*/}
            <motion.div 
                className="hidden lg:block imgSection relative"
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
            >   
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
            </motion.div>

            {/* Right Text */}
            <motion.div 
                className="textSection flex items-center justify-center p-8 md:p-16"
                initial={{ opacity: 0}}
                animate={isInView ? { opacity: 1} : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="text-center max-w-3xl">
                    <motion.div>
                        <MainTitle
                            titleText='Our Mission'
                        />
                    </motion.div>


                    <motion.div 
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.2, delay: 0.5 }}
                    >
                        <EditableText
                            isAuthenticated={isAuthenticated}
                            setText={setMissionText}
                            text={missionTextString}
                        />
                    </motion.div>
                </div>
            </motion.div>
        </section>

    );
}
