import { useState, useContext, useEffect } from 'react';
import { LuVolume2 } from 'react-icons/lu';

// Import Assets
import aboutHeader from '../assets/Copy_of_Melanie_KingCharlesAward2024.jpg';

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
                setLandingImage(data.image ?? landingImage);
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
        <section 
            id='home' 
            className="@container relative min-h-[calc(100vh-6rem)] w-full bg-white flex flex-col
                        md:flex-row"
        >
            
            {/* Left Text */}
            <div className="flex-1 flex items-center justify-center p-8 md:flex-[1.3]">
                <div className="text-center w-full">
                    <h2 className="text-2xl mb-4 font-thin md:text-5xl">Welcome to</h2>

                    <h1 className="text-brandRed text-3xl font-thin mb-4 leading-tight md:text-6xl md:text-purple-900 lg:text-blue-900 xl:text-blue-500 2xl:text-green-900">
                        Hli Haykwhl Ẃii X̲sgaak <br />
                        <span className="inline-flex items-center gap-2">
                            Consulting
                            <button
                            onClick={HandlePlayAudio}
                            className="text-sm inline-flex items-center justify-center w-6 h-6 bg-black rounded-lg hover:bg-gray-300 cursor-pointer align-middle"
                            aria-label="Play pronunciation"
                            >
                            <LuVolume2 color="#FFFFFF" />
                            </button>
                        </span>
                    </h1>

                    <p className="text-base md:text-xl leading-relaxed">
                        Let’s paddle together toward a future of
                        <br/>
                        reconciliation and shared success.
                        <br />
                        Land Acknowledgement
                    </p>
                </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 relative flex items-center justify-center pl-2 border border-black">
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