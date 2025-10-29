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
                        lg:flex-row"
        >
            
            {/* Left Text */}
            <div className="flex-1 flex items-center justify-center p-8 md:flex-[1.3] titleFont">
                <div className="text-center w-full">
                    <h2 className="titleStyle text-black">Welcome to</h2>   

                    {/* Currently Differing colours for each style */}
                    <h1 className="m-4 leading-relaxed text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 
                                md:text-purple-900 lg:text-blue-900 xl:text-blue-500 2xl:text-green-900"
                    >
                        Hli Haykwhl Ẃii <u className='underline-offset-[3px] decoration-2'>X</u>sgaak<br />
                        <span className="inline-flex items-center gap-2">
                            Consulting
                            <button
                            onClick={HandlePlayAudio}
                            className="text-sm inline-flex items-center justify-center w-6 h-6 bg-black rounded-lg hover:bg-gray-300 cursor-pointer align-middle"
                            aria-label="Play pronunciation"
                            >
                            <LuVolume2 color="#E63551" />
                            </button>
                        </span>
                    </h1>

                    <p className="bodyStyle">
                        Let’s paddle together toward a future of
                        <br/>   
                        reconciliation and shared success.
                        <br /> 
                        <br />
                    </p>
                    <div className='bodyStyle'>
                        We acknowledge with gratitude that we live and work on the traditional, ancestral, 
                        and unceded territories of the xʷməθkʷəy̓əm (Musqueam), Skwxwú7mesh (Squamish), 
                        and Səl̓ílwətaʔ/Selilwitulh (Tsleil-Waututh) Nations.
                    </div>
                </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 relative flex items-center justify-center pl-2">
                <EditableImage
                    src={landingImage}
                    alt="Landing Image"
                    wrapperClassName="w-full h-full"
                    imageClassName="w-full h-full object-cover rounded-tl-3xl rounded-bl-3xl "
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