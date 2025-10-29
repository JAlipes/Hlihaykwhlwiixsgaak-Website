import { LuYoutube } from 'react-icons/lu'

// Import Assets
import groupImage from '../assets/BCFS_Keynote_Group.jpg'
import YWCA from "../assets/YWCA Workshop.jpg"
import workshopImage from '../assets/serviceWorkshopImageCropped.png';
import publicSpeakingImage from '../assets/WORTH_Keynote_2025_Summit.jpg';

// Import Components
import ServiceImageLeftSection from "./ServiceImageLeftSection";
import ServiceImageRightSection from "./ServiceImageRightSection";
import MainTitle from './MainTitle';

// Import Text
import { serviceAdvisoryText, servicePublicSpeakText, serviceWorkshopText } from '../lang/en/englishText';

export default function ServicesSection() {
    return (
        <section id="services" className="relative w-full pb-16">
            {/* Header */}
            <div className="relative h-screen pb-4">
                <img
                    src={groupImage}
                    alt="Group of people together"
                    className="w-full h-screen object-cover rounded-b-[100px] shadow-2xl shadow-black/50"
                />
                <div className="flex justify-center absolute top-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px- py-4 rounded-full shadow-lg w-[90%] max-w-4xl border border-gray-200">
                    <MainTitle
                        titleText='Let’s Navigate Your Journey Together'
                        underline={false}
                        className='titleStyle'
                    />
                </div>
            </div>

            {/* Intro */}
            <div className="max-w-5xl mx-auto mt-20 text-center px-6">
                <MainTitle
                    titleText={
                        <>
                        Hli Haykwhl Ẃii <u className='underline-offset-[3px] decoration-2'>X</u>sgaak Services
                        </>
                    }
                />
                <p className="bodyStyle">
                    Reconciliation isn’t a Destination–it's a Journey. Who’s in your canoe? Are you paddling together?
                    What are the conditions? What direction do you want to go? Let me know how I can be a part of your journey.
                </p>
            </div>

            {/* Editable Service Sections */}
            <ServiceImageLeftSection
                sectionName="servicesAdvisory"
                defaultTitle="Advisory & Public Relations"
                defaultImage={YWCA}
                defaultContent={serviceAdvisoryText}
            />

            <ServiceImageRightSection
                sectionName="servicesWorkshop"
                defaultTitle="Workshops and Training"
                defaultImage={workshopImage}
                defaultContent={serviceWorkshopText}
            />

            <ServiceImageLeftSection
                sectionName="servicesPublicSpeaking"
                defaultTitle="Public Speaking"
                defaultImage={publicSpeakingImage}
                defaultContent={servicePublicSpeakText}
            />

            {/* Added Embeded Video Section */}
            {/* Embedded Video CTA */}
            <div className="flex justify-center mt-20 px-6">
                <div className="w-full max-w-md border-4 border-brandRed rounded-xl py-10 px-2 text-center bg-black">
                    <h3 className="text-lg md:text-3xl mb-6 text-white">
                        Check out Melanie's <br/> previous speeches
                    </h3>

                    <button
                        className="
                            flex items-center justify-center gap-3 
                            mx-auto 
                            border-4 border-black
                            text-[#C32148]
                            font-semibold text-lg
                            rounded-full 
                            hover:bg-[#C32148]/10 
                            transition-all duration-300
                        "
                        onClick={() => window.open('https://www.youtube.com/@melaniejmark', '_blank')}
                    >
                        <LuYoutube className="w-6 h-6" /> <span className='text-white'>melaniejmark</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
