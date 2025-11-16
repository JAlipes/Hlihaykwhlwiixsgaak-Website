import { useState, useEffect, useContext } from "react";

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

export default function ServiceImageLeftSection({ sectionName, defaultTitle, defaultContent, defaultImage,}: MiniServiceSectionProps) {
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
        <section className="w-full py-14 xl:py-16 bg-white">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-6 px-4 sm:px-8 lg:px-12 xl:px-20">
                    
                    {/* Image */}
                    <div className="flex justify-end">
                        <EditableImage
                            src={sectionImage}
                            alt={`${sectionName} Image`}
                            wrapperClassName="flex justify-end"
                            imageClassName="w-full h-auto rounded-3xl shadow-2xl object-cover cursor-pointer"
                            isAuthenticated={isAuthenticated}
                            inputIdString={`${sectionName}-image`}
                            onChangeFunction={handleImageChange}
                        />
                    </div>

                    {/* Text */}
                    <div className="text-gray-800 flex flex-col justify-center" id='ServiceImageLeft'>
                        <MainTitle
                            titleText={defaultTitle}
                            underline={false}
                            className={'subHeadingStyle'}
                        />

                        <EditableText
                            isAuthenticated={isAuthenticated}
                            text={sectionContent}
                            setText={setSectionContent}
                        />

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
                    </div>
            </div>
        </section>
    );

}
