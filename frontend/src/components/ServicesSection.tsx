import { useRef } from 'react';
import { LuYoutube } from 'react-icons/lu';
import { HiQuestionMarkCircle } from "react-icons/hi";
import { motion, useInView } from 'framer-motion';

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
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" }); // trigger slightly

    return (
        <section id="services" className="relative w-full pb-16">
            {/* Header */}
            <motion.div 
                ref={ sectionRef } 
                className="relative lg:h-screen pb-4"
                initial={{ opacity: 0, y: -60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
            >
                <img
                    src={groupImage}
                    alt="Group of people together"
                    className="w-full min-h-[50vh] lg:h-screen object-cover rounded-bl-3xl rounded-br-3xl shadow-2xl shadow-black/50"
                />

                <div className="absolute bottom-6 right-6 z-10 group">
                    <button
                        aria-label="Image Source Information"
                        className="w-10 h-10 flex items-center justify-center bg-black backdrop-blur-sm rounded-full 
                                transition-colors duration-200 
                                hover:bg-white border border-brandRed 
                                "
                    >
                        <HiQuestionMarkCircle
                            className="w-4 h-4 lg:w-8 lg:h-8 text-[#C32148] group-hover:text-brandRed transition-colors duration-300"
                        />
                    </button>

                    <div className="absolute bottom-full right-0 mb-2 w-max max-w-xs p-2 text-sm text-white bg-black/80 rounded-md shadow-xl 
                                    opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100">
                        BC Federation of Students’ 39th Annual Skills Development Symposium.
                        <div className="absolute bottom-[-6px] right-3 w-0 h-0 border-t-[6px] border-l-[6px] border-r-[6px] border-t-black/80 border-l-transparent border-r-transparent"></div>
                    </div>
                </div>

                <div className="flex justify-center text-center absolute top-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md p-2 md:p-4 rounded-full shadow-lg w-[70%] lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl  border border-gray-200">
                    <MainTitle
                        titleText='Let’s Navigate Your Journey Together'
                        underline={false}
                        className='titleStyle'
                    />
                </div>
            </motion.div>

            {/* Intro */}
            <div className="max-w-5xl mx-auto mt-10 lg:mt-20 text-center px-6">
                <MainTitle
                    titleText={
                        <>
                            Hli Haykwhl Ẃii <u className='underline-offset-[3px] decoration-2'>X</u>sgaak Services
                        </>
                    }
                />
                <p className="bodyStyle lg:mt-10">
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
            <div className="flex justify-center">
                <a
                    href="https://www.youtube.com/@melaniejmark"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        group
                        w-full max-w-56 lg:max-w-64 xl:max-w-80 2xl:max-w-sm
                        border-4 border-brandRed
                        rounded-3xl
                        py-4 lg:py-4 xl:py-6 2xl:py-8
                        text-center
                        bg-black
                        flex flex-col items-center justify-center
                        transition-all duration-300
                        hover:bg-white hover:text-brandRed
                    "
                >
                    <h3 className="navTitleStyle mb-2 xl:mb-6 text-white group-hover:text-brandRed transition-colors duration-300">
                        Check out Melanie's <br /> previous speeches
                    </h3>

                    {/* Melanie youtube logo section */}
                    <div
                        className="
                            flex items-center justify-center gap-3
                            border-2 lg:border-4 border-black
                            font-semibold text-lg
                            rounded-3xl
                            p-2
                            bg-transparent
                            transition-all duration-300
                            group-hover:border-brandRed
                        "
                    >
                        <LuYoutube
                            className="w-4 h-4 lg:w-8 lg:h-8 text-[#C32148] group-hover:text-brandRed transition-colors duration-300"
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
