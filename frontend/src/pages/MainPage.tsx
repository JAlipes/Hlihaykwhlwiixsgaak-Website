import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
// Import Component Sections
import LandingSection from '../components/LandingSection';
import AboutMelanieMark from "../components/AboutMelanieMark";
import MissionSection from "../components/MissionSection";
import Divider from "../components/Divider";
import Services from "../components/ServicesSection";
import CanoeSection from '../components/CanoeSection';
import ExperienceSection from '../components/ExperienceSection';

import ContactForm from '../components/ContactForm';

export default function MainPage() {    
    const location = useLocation();

    useEffect(() => {
        // Check if navigation came with a scroll target (like 'experience')
        if (location.state?.scrollTo) {
            const el = document.getElementById(location.state.scrollTo);
            if (el) {
                // Wait a short delay to ensure layout is rendered before scrolling
                setTimeout(() => {
                    el.scrollIntoView({ behavior: "smooth" });
                }, 300);
            }
        }
    }, [location.state]);


    return (
        <>
            <LandingSection/>
            <Divider />
            
            <MissionSection />
            <Divider />
            
            <AboutMelanieMark />
            <Divider />
            
            <Services />
            <Divider />
            
            <CanoeSection />
            <ExperienceSection />

            <Divider/>
            <ContactForm />
        </>
    );
}