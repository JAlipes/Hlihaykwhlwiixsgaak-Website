import { useState, useContext, useEffect } from 'react';

// Import Assets
import aboutHeader from '../assets/MJM_FINAL_HEADSHOT_2024_BLUE_WHITE.jpg'

// Import Contexts
import { AuthContext } from '../contexts/AuthContext';

// Import Utils
import { HandleSaveSectionData } from '../utils/HandleSaveSectionData';
import { HandleGetSectionData } from '../utils/HandleGetSectionData';
import { HandleImageChangeFactory } from '../utils/HandleImageChangeFactory';

// Import Components
import EditableImage from './EditableImage';
import SaveEditsButton from './SaveEditsButton';

export default function LandingSection(){
    const sectionName: string = 'landing';
    const { isAuthenticated } = useContext(AuthContext);

    const [landingImage, setLandingImage] = useState<string>(aboutHeader);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchSectionData = async () => {
            const data = await HandleGetSectionData(sectionName);
            if (data) {
                setLandingImage(data.image);
            }
        };
        fetchSectionData();
    }, []);

    const handleLandingImageChange = HandleImageChangeFactory(setSelectedFile, setLandingImage);

    return(
        <section className="h-auto md:h-screen w-full bg-white flex flex-col md:flex-row">
            {/* Left Text */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center md:text-center max-w-lg">
                    <h2 className="text-xl md:text-4xl font-thin mb-4">Welcome To</h2>
                    <h1 className="text-brandRed text-3xl md:text-5xl font-thin mb-4">
                        Hli Haykwhl Ẃii X̲sgaak <br />
                        Consulting
                    </h1>
                    <br />
                    <p className="text-base md:text-lg">
                        Let’s paddle together toward a future of <br /> reconciliation and shared success.
                    </p>
                </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 relative flex items-center justify-center">
                <EditableImage
                src={landingImage}
                alt="Landing Image"
                wrapperClassName="w-full h-full"
                imageClassName="w-full h-full object-cover rounded-tl-3xl rounded-bl-3xl"
                isAuthenticated={isAuthenticated}
                inputIdString="landingImageUpload"
                onChangeFunction={handleLandingImageChange}
                />

                {/* Save button (overlay on image, shows only if authenticated) */}
                {isAuthenticated && (
                <div className="absolute bottom-4 right-4">
                    <SaveEditsButton
                    onClickFunction={() => {
                        HandleSaveSectionData({
                        sectionName,
                        text: "",
                        image: selectedFile ?? landingImage,
                        });
                    }}
                    />
                </div>
                )}
            </div>
        </section>
    ); 
}