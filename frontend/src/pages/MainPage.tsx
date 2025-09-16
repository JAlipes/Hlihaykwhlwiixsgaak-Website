// Import Component Sections
import AboutMelanieMark from "../components/AboutMelanieMark";
import MissionSection from "../components/MissionSection";
import TestTailwind from "../components/TestTailwind";
import Divider from "../components/Divider";

export default function MainPage() {
    return (
        <main className="flex flex-col">
            <TestTailwind />

            <Divider />

            <MissionSection />

            <Divider />
            
            <AboutMelanieMark />
        </main>
    );
}