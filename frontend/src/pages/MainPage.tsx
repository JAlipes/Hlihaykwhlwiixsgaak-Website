// Import Component Sections
import Navbar from '../components/Navbar';
import LandingSection from '../components/LandingSection';
import AboutMelanieMark from "../components/AboutMelanieMark";
import MissionSection from "../components/MissionSection";
import Divider from "../components/Divider";
import Services from "../components/ServicesSection";
import ReconciliationSection from "../components/ReconciliationSection";
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

export default function MainPage() {    
    return (
        <main className="flex flex-col">
            {/* Navbar */}
            <Navbar/>

            <LandingSection/>
            <Divider />
            
            <MissionSection />
            <Divider />
            
            <AboutMelanieMark />
            <Divider />
            
            <Services />
            {/* <Divider /> */}
            <ReconciliationSection />

            <ContactForm />

            <Footer/>
        </main>
    );
}