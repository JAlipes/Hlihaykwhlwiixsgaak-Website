import { useState, useContext, useEffect } from 'react';
import { LuVolume2 } from 'react-icons/lu';

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

    const HandleLandingImageChange = HandleImageChangeFactory(setSelectedFile, setLandingImage);

    const audioUrl = '';
    const HandlePlayAudio = () => {
        console.log('Audio played');
    };

    return(
        <section id='home' className="h-auto md:h-screen w-full bg-white flex flex-col md:flex-row">
            {/* Left Text */}

            <div className="flex-1 md:flex-[1.3] flex items-center justify-center p-8">
                <div className="text-center md:text-center w-full max-w-2xl">
                    <h2 className="text-xl md:text-4xl font-thin mb-4">Welcome To</h2>

                    <h1 className="text-brandRed text-3xl md:text-6xl font-thin mb-4 leading-tight">
                        Hli Haykwhl Ẃii X̲sgaak <br />
                        <span className="inline-flex items-center gap-2">
                            Consulting
                            <button
                            onClick={HandlePlayAudio}
                            className="inline-flex items-center justify-center w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer align-middle"
                            aria-label="Play pronunciation"
                            >
                            <LuVolume2 size={24} color="#374151" />
                            </button>
                        </span>
                    </h1>

                    <p className="text-base md:text-xl leading-relaxed mt-6">
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
                    onChangeFunction={HandleLandingImageChange}
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