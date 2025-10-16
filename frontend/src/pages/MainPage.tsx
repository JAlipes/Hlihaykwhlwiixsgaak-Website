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