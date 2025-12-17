import { useState, useEffect, useContext, useRef } from "react";
import { motion, useInView } from "framer-motion";

// Contexts & Utils
import { AuthContext } from "../contexts/AuthContext";
import { HandleSaveSectionData } from "../utils/HandleSaveSectionData";
import { HandleGetSectionData } from "../utils/HandleGetSectionData";
import { HandleImageChangeFactory } from "../utils/HandleImageChangeFactory";

// Components
import EditableImage from "../components/EditableImage";
import EditableText from "../components/EditableText";
import SaveEditsButton from "./SaveEditsButton";

// Import Types
import type { MiniServiceSectionProps } from '../../../shared-types/ComponentPropTypes'
import MainTitle from "./MainTitle";

export default function  ServiceImageRightSection({ sectionName, defaultTitle, defaultContent, defaultImage }: MiniServiceSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" }); // trigger slightly

    const { isAuthenticated } = useContext(AuthContext);

    const [sectionContent, setSectionContent] = useState(defaultContent);
    const [sectionImage, setSectionImage] = useState(defaultImage);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchSectionData = async () => {
            const data = await HandleGetSectionData(sectionName);
            if (data) {
                setSectionContent(data.text ?? defaultContent);
                setSectionImage(data.image ?? defaultImage);
            }
        };
        fetchSectionData();
    }, [sectionName]);

    const handleImageChange = HandleImageChangeFactory(setSelectedFile, setSectionImage);

    return (
        <section className="w-full lg:py-10 xl:py-16 flex bg-white" ref={sectionRef}>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-6 px-4 sm:px-8 lg:px-12 xl:px-20">
                {/* Text (Left Side) */}
                <motion.div 
                    className="order-2 md:order-1 text-gray-800 flex flex-col justify-center"
                    initial={{ opacity: 0}}
                    animate={isInView ? { opacity: 1} : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.div>
                        <MainTitle
                            titleText={defaultTitle}
                            underline={false}
                            className={'subHeadingStyle'}
                        />                    
                    </motion.div>

                    <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.2, delay: 0.5 }}
                    >
                        <EditableText
                            isAuthenticated={isAuthenticated}
                            text={sectionContent}
                            setText={setSectionContent}
                        />
                    </motion.div>

                    {isAuthenticated && (
                        <div className="mt-6">
                            <SaveEditsButton
                                onClickFunction={() =>
                                    HandleSaveSectionData({
                                        sectionName,
                                        text: sectionContent,
                                        image: selectedFile ?? sectionImage,
                                    })
                                }
                            />
                        </div>
                    )}
                </motion.div>

                {/* Image (Right Side) */}
                <motion.div 
                    className="order-1 md:order-2 flex justify-center md:justify-end"
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
                >
                    <EditableImage
                        src={sectionImage}
                        alt={`${sectionName} Image`}
                        wrapperClassName="flex justify-end"
                        imageClassName="w-full h-auto rounded-3xl shadow-2xl object-cover cursor-pointer"
                        isAuthenticated={isAuthenticated}
                        inputIdString={`${sectionName}ImageUpload`}
                        onChangeFunction={handleImageChange}
                    />
                </motion.div>
            </div>
        </section>
    );
}
