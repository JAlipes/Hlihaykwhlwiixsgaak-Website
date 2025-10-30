import { LuYoutube } from 'react-icons/lu'

// Import Assets
import groupImage from '../assets/BCFS_Keynote_Group.jpg'
import YWCA from "../assets/YWCA Workshop.jpg"
import workshopImage from '../assets/Fora_Workshop_Screenshot_June13_2025 PM.png';
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
                <p className="bodyStyle mt-10">
                    Reconciliation isn’t a Destination—it's a Journey. Who’s in your canoe? Are you paddling together? 
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
            <div className="flex justify-center px-6">
                <a
                    href="https://www.youtube.com/@melaniejmark"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        group
                        w-full max-w-md
                        border-4 border-brandRed
                        rounded-xl
                        py-10 px-2
                        text-center
                        bg-black
                        flex flex-col items-center justify-center
                        transition-all duration-300
                        hover:bg-white hover:text-brandRed
                    "
                >
                    <h3 className="text-lg titleFont md:text-3xl mb-6 text-white group-hover:text-brandRed transition-colors duration-300">
                        Check out Melanie's <br /> previous speeches
                    </h3>

                    <div
                        className="
                            flex items-center justify-center gap-3
                            border-4 border-black
                            font-semibold text-lg
                            rounded-full
                            px-6 py-2
                            bg-transparent
                            transition-all duration-300
                            group-hover:border-brandRed
                        "
                    >
                        <LuYoutube
                            className="w-6 h-6 text-[#C32148] group-hover:text-brandRed transition-colors duration-300"
                        />
                        <span className="text-white group-hover:text-brandRed transition-colors duration-300 bodyStyle">
                            melaniejmark
                        </span>
                    </div>
                </a>
            </div>

        </section>
    );
}
