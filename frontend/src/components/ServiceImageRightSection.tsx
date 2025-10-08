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

interface ServiceImageRightSectionProps {
  sectionName: string;
  defaultTitle: string; // static title
  defaultContent: string; // HTML editable (list of items)
  defaultImage: string;
}

export default function ServiceImageRightSection({ sectionName, defaultTitle, defaultContent, defaultImage}: ServiceImageRightSectionProps) {
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
    <section className="max-w-5xl mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 md:px-10 min-h-[45vh]">
      {/* Text (Left side) */}
      <div>
        <h3 className="text-3xl font-semibold text-[#8B0000] mb-4">{defaultTitle}</h3>

        <EditableText
          isAuthenticated={isAuthenticated}
          text={sectionContent}
          setText={setSectionContent}
        />

        {isAuthenticated && (
          <div className="mt-4">
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

      {/* Image (Right side) */}
      <EditableImage
        src={sectionImage}
        alt={`${sectionName} Image`}
        wrapperClassName="flex justify-center md:justify-end"
        imageClassName="w-full max-w-[400px] rounded-xl shadow-xl object-cover cursor-pointer"
        isAuthenticated={isAuthenticated}
        inputIdString={`${sectionName}-image`}
        onChangeFunction={handleImageChange}
      />
    </section>
  );
}
