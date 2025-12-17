import {useState, useContext, useEffect, useRef } from 'react'
import { motion, useInView } from "framer-motion";

// Import Comopnents
import EditableImage from "./EditableImage";
import SaveEditsButton from './SaveEditsButton';

// Import Utils
import { HandleGetSectionData } from '../utils/HandleGetSectionData';
import { HandleImageChangeFactory } from '../utils/HandleImageChangeFactory'
import { HandleSaveSectionData } from '../utils/HandleSaveSectionData';

// Import Context
import { AuthContext } from '../contexts/AuthContext';

// Import Assets
import featherLogo from "../assets/Cleaned_Feather_Logo_BG_Free.png"; // temp
import canoeImageString from "../assets/Cedar Hat red Canoe Journey 2024.jpg";


export default function CanoeSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" }); // trigger slightly

    const sectionName: string = 'canoe';
    const { isAuthenticated } = useContext(AuthContext);

    const [canoeImage, setCanoeImage] = useState<string>(canoeImageString);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchSectionData = async () => {
            const data = await HandleGetSectionData(sectionName);
            if (data) {
                setCanoeImage(data.image ?? canoeImage);
            }
        };
        fetchSectionData();
    }, []);

    const HandleCanoeImageChange = HandleImageChangeFactory(setSelectedFile, setCanoeImage);


    return (
        <section
            id="canoe"
            className="bg-brandRed text-white sectionWrapper"
            ref={sectionRef}
        >
            {/* Left (text) */}
            <motion.div className="textSection w-full flex flex-col justify-center px-6 md:px-12 py-8 titleFont"
                initial={{ opacity: 0}}
                animate={isInView ? { opacity: 1} : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Feather Logo */}
                <img
                    src={featherLogo}
                    alt="Feather Logo"
                    className="w-16 lg:w-20 xl:w-24 2xl:w-32 h-auto"
                />

                {/* Text */}
                <h2 className="risingTideLargeText font-light">A RISING TIDE</h2>

                <h2 className="risingTideLargeText">
                    <span className="font-extrabold">LIFTS ALL </span>
                    <span className="font-light">CANOES</span>
                </h2>

                <h2 className="risingTideLargeText font-extrabold">PADDLE TOGETHER</h2>
                <p className="risingTideSmallText mt-4">- HLI HAYKWHL WII <u className='decoration-2'>X</u>SGAAK</p>
            </motion.div>

            {/* Right (image) */}
            <motion.div className="imgSection w-full flex items-center justify-center lg:pl-5"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
            >
                <EditableImage
                    src={canoeImage}
                    alt="canoe Image"
                    wrapperClassName="w-full h-full p-5 lg:p-0"
                    imageClassName="ww-full h-full object-cover rounded-3xl lg:rounded-tr-none lg:rounded-br-none lg:rounded-tl-3xl lg:rounded-bl-3xl lg:shadow-[rgba(0,0,0,0.3)_-10px_0px_10px_0px]"
                    isAuthenticated={isAuthenticated}
                    inputIdString="canoeImageUpload"
                    onChangeFunction={HandleCanoeImageChange}
                />

                {/* Save button overlay (for image) */}
                {isAuthenticated && (
                    <div className="absolute bottom-4 right-4">
                        <SaveEditsButton
                        onClickFunction={() => {
                            HandleSaveSectionData({
                                sectionName,
                                text: "", // no text in this section — only image
                                image: selectedFile ?? canoeImage,
                            });
                        }}
                        />
                    </div>
                )}
            </motion.div>
        </section>
    );
}
