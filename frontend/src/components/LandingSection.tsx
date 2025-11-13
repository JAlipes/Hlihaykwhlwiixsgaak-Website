import { useState, useContext, useEffect } from 'react';
import { LuVolume2 } from 'react-icons/lu';
import { motion } from 'framer-motion';

// Import Assets
import aboutHeader from '../assets/Melanie_KingCharlesAward2024_Edited.jpg';
import audio from '../assets/audio/Website_Audio.mp4'

// Import Contexts
import { AuthContext } from '../contexts/AuthContext';

// Import Utils
import { HandleGetSectionData } from '../utils/HandleGetSectionData';
import { HandleImageChangeFactory } from '../utils/HandleImageChangeFactory';
import { HandleSaveSectionData } from '../utils/HandleSaveSectionData';

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

    const audioUrl = audio;

    const HandlePlayAudio = () => {
    const audioElement = new Audio(audioUrl);
    audioElement.play()
        .then(() => {
        console.log('Audio played successfully');
        })
        .catch((error) => {
        console.error('Error playing audio:', error);
        });
    };

    return (
        <section
            id="home"
            className="sectionWrapper mt-20 lg:mt-24"
        >
            {/* Left Text */}
            <motion.div
                className="textSection flex flex-col justify-center titleFont px-6 sm:px-10 2xl:pt-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <h2 className="titleStyle text-black">Welcome to</h2>

                <h1
                    className="leading-strict text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl
                 text-purple-900 md:text-purple-900 lg:text-blue-900 xl:text-blue-500 2xl:text-brandRed"
                >
                    Hli Haykwhl Ẃii <u className="underline-offset-[3px] decoration-2">X</u>sgaak
                    <br />
                    <span className="inline-flex items-center gap-2 mt-2 hover:bg-white">
                        Consulting
                        <button
                            onClick={HandlePlayAudio}
                            className="inline-flex items-center justify-center w-6 h-6 2xl:w-10 2xl:h-10 bg-black rounded-lg hover:bg-gray-300 transition-colors"
                            aria-label="Play pronunciation"
                        >
                            <LuVolume2 color="#E63551" className="w-4 h-4 2xl:w-6 2xl:h-6 " />
                        </button>
                    </span>
                </h1>

                <p className="bodyStyle mt-4">
                    Let’s Paddle Together towards a future of reconciliation and transformative change.
                </p>

                <div className="bodyStyle mt-2">
                    We acknowledge with gratitude that we live and work on the traditional, ancestral,
                    and unceded territories of the xʷməθkʷəy̓əm (Musqueam), Skwxwú7mesh (Squamish),
                    and Səl̓ílwətaʔ/Selilwitulh (Tsleil-Waututh) Nations.
                </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
                className="imgSection relative w-full pl-5 mt-6 lg:mt-0"
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <EditableImage
                    src={landingImage}
                    alt="Landing Image"
                    wrapperClassName="w-full h-full"
                    imageClassName="w-full h-full object-cover rounded-tl-3xl rounded-bl-3xl shadow-[rgba(0,0,0,0.3)_-10px_0px_10px_0px]"
                    isAuthenticated={isAuthenticated}
                    inputIdString="landingImageUpload"
                    onChangeFunction={HandleLandingImageChange}
                />

                {/* Save button overlay (for image) */}
                {isAuthenticated && (
                    <div className="absolute bottom-4 right-4">
                        <SaveEditsButton
                        onClickFunction={() => {
                            HandleSaveSectionData({
                                sectionName,
                                text: "", // no text in this section — only image
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