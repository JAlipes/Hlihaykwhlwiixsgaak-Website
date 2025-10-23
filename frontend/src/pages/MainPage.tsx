// Import Component Sections
import LandingSection from '../components/LandingSection';
import AboutMelanieMark from "../components/AboutMelanieMark";
import MissionSection from "../components/MissionSection";
import Divider from "../components/Divider";
import Services from "../components/ServicesSection";
import CanoeSection from '../components/CanoeSection';
import ExperienceSection from '../components/ExperienceSection';

import ReconciliationSection from "../components/ReconciliationSection";
import ContactForm from '../components/ContactForm';

export default function MainPage() {    
    return (
        <>
            <Divider/>

            <LandingSection/>
            <Divider />
            
            <MissionSection />
            <Divider/>

            <AboutMelanieMark />
            <Divider />
            
            <Services />
            
            <ReconciliationSection />
            <Divider/>
            
            <ExperienceSection />
            <Divider/>
            
            <CanoeSection />
            <Divider/>

            <ContactForm />
        </>
    );
}