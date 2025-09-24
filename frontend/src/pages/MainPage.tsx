// Import Component Sections
import TestTailwind from '../components/TestTailwind';
import LogoutButton from '../components/LogoutButton';
import AboutMelanieMark from "../components/AboutMelanieMark";
import MissionSection from "../components/MissionSection";
import Divider from "../components/Divider";
import Services from "../components/ServicesSection";

//Import Hooks
import { UseAuth } from '../hooks/UseAuth';
        
export default function MainPage() {
    const { isAuthenticated } = UseAuth();
    
    return (
        <main className="flex flex-col">
            {isAuthenticated && <LogoutButton/>} {/* Temporary */}
            <TestTailwind />
            <Divider />
            <MissionSection />
            <Divider />
            <AboutMelanieMark />
            <Divider />
            <Services />
            <Divider />
        </main>
    );
}