import { useState, useContext, useEffect } from 'react';
import { LuVolume2 } from 'react-icons/lu';
import { motion } from 'framer-motion';

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

export default function LandingSection() {
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

    return (
        <section
            id='home'
            className="@container relative min-h-[calc(100vh-6rem)] w-full bg-white flex flex-col lg:flex-row"
        >
            {/* Left Text */}
            <motion.div
                className="flex-1 flex items-center justify-center p-8 md:flex-[1.3] titleFont"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <div className="text-center w-full">
                    <h2 className="titleStyle text-black">Welcome to</h2>

                    <h1 className="m-4 leading-relaxed text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 
                            md:text-purple-900 lg:text-blue-900 xl:text-blue-500 2xl:text-brandRed"
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
                        Let’s Paddle Together towards a future of
                        <br />
                        reconciliation and transformative change.
                        <br />
                        <br />
                    </p>
                    <div className='bodyStyle'>
                        We acknowledge with gratitude that we live and work on the traditional, ancestral,
                        and unceded territories of the xʷməθkʷəy̓əm &#40;Musqueam&#41;, Skwxwú7mesh &#40;Squamish&#41;,
                        and Səl̓ílwətaʔ/Selilwitulh &#40;Tsleil-Waututh&#41; Nations.
                    </div>
                </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
                className="flex-1 relative flex items-center justify-center pl-2"
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <EditableImage
                    src={landingImage}
                    alt="Landing Image"
                    wrapperClassName="w-full min-h-screen"
                    imageClassName="w-full h-full object-cover min-h-screen rounded-tl-3xl rounded-bl-3xl shadow-[rgba(0,0,0,0.3)_-10px_0px_10px_0px]"
                    isAuthenticated={isAuthenticated}
                    inputIdString="landingImageUpload"
                    onChangeFunction={HandleLandingImageChange}
                />

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
            </motion.div>
        </section>

    );
}