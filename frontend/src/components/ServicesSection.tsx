import { LuYoutube } from 'react-icons/lu'

// Import Assets
import groupImage from '../assets/BCFS_Keynote_Group.jpg'
import YWCA from "../assets/YWCA Workshop.jpg"
import workshopImage from '../assets/serviceWorkshopImageCropped.png';
import publicSpeakingImage from '../assets/WORTH_Keynote_2025_Summit.jpg';

// Import Components
import ServiceImageLeftSection from "./ServiceImageLeftSection";
import ServiceImageRightSection from "./ServiceImageRightSection";

// Import Text
import { serviceAdvisoryText, servicePublicSpeakText, serviceWorkshopText } from '../lang/en/englishText';

export default function ServicesSection() {
    return (
        <section className="relative w-full bg-gradient-to-b from-white to-gray-50 pb-16">
            {/* Header */}
            <div className="relative">
                <img
                    src={groupImage}
                    alt="Group of people together"
                    className="min-h-screen w-full h-auto rounded-b-[100px] shadow-2xl shadow-black/50"
                />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-8 py-4 rounded-full shadow-lg w-[90%] max-w-4xl border border-gray-200">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-[#C32148] tracking-wide">
                        Let’s Navigate Your Journey Together
                    </h2>
                </div>
            </div>

            {/* Intro */}
            <div className="max-w-5xl mx-auto mt-20 text-center px-6">
                <h2 className="text-3xl md:text-4xl font-semibold text-brandRed mb-6">
                    Hli Haykwhl Ẃii Xsgaak Services
                </h2>
                <p className="text-lg md:text-2xl text-gray-700 leading-relaxed">
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
                <div className="w-full max-w-3xl border-4 border-[#C32148] rounded-3xl py-10 px-6 text-center bg-white shadow-lg">
                    <h3 className="text-lg md:text-3xl mb-6">
                        Watch Melanie Mark’s previous speeches on YouTube
                    </h3>

                    <button
                        className="
                            flex items-center justify-center gap-3 
                            mx-auto 
                            border-4 border-[#C32148] 
                            text-[#C32148]
                            font-semibold text-lg
                            rounded-full 
                            px-8 py-3 
                            hover:bg-[#C32148]/10 
                            transition-all duration-300
                        "
                        onClick={() => window.open('https://www.youtube.com/@melaniejmark', '_blank')}
                    >
                        Click Here
                        <LuYoutube className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
}
