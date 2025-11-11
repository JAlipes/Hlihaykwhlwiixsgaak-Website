import {useState, useContext, useEffect} from 'react'

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
        >
            {/* Left (text) */}
            <div className="md:w-3/5 w-full flex flex-col justify-center px-6 md:px-12 py-8 titleFont">
                {/* Feather Logo */}
                <img
                    src={featherLogo}
                    alt="Feather Logo"
                    className="xl:w-24 2xl:w-32 h-auto "
                />

                {/* Text */}
                <h2 className="risingTideLargeText font-light">A RISING TIDE</h2>

                <h2 className="risingTideLargeText">
                    <span className="font-extrabold">LIFTS ALL </span>
                    <span className="font-light">CANOES</span>
                </h2>

                <h2 className="risingTideLargeText font-extrabold">PADDLE TOGETHER</h2>
                <p className="risingTideSmallText mt-4">- HLI HAYKWHL WII <u className='decoration-2'>X</u>SGAAK</p>
            </div>

            {/* Right (image) */}
            <div className="md:w-2/5 w-full flex items-center justify-center pl-5">
                <EditableImage
                    src={canoeImage}
                    alt="canoe Image"
                    wrapperClassName="w-full h-full"
                    imageClassName="w-full h-full object-cover rounded-tl-3xl rounded-bl-3xl shadow-[rgba(0,0,0,0.3)_-10px_0px_10px_0px]"
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
            </div>
        </section>
    );
}
