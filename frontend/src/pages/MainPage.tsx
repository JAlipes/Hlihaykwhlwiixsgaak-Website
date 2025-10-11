import { useContext } from 'react';

// Import Component Sections
import LandingSection from '../components/LandingSection';
import TestTailwind from '../components/TestTailwind';
import LogoutButton from '../components/LogoutButton';
import AboutMelanieMark from "../components/AboutMelanieMark";
import MissionSection from "../components/MissionSection";
import Divider from "../components/Divider";
import Services from "../components/ServicesSection";
import CanoeSection from '../components/CanoeSection';
import ExperienceSection from '../components/ExperienceSection';

import ContactForm from '../components/ContactForm';
        
// Import Contexts
import { AuthContext } from '../contexts/AuthContext';

export default function MainPage() {
    const { isAuthenticated } = useContext(AuthContext)
    
    return ( 
        <main className="flex flex-col">
            {isAuthenticated && <LogoutButton/>} {/* Temporary */}
            <LandingSection />
            <Divider />
            <MissionSection />
            <Divider />
            <AboutMelanieMark />
            <Divider />
            <Services />
            <Divider />
            
            <CanoeSection />
            <ExperienceSection />


            <ContactForm />
        </main>
    );
}