// Import Component Sections
import AboutMelanieMark from "../components/AboutMelanieMark";
import MissionSection from "../components/MissionSection";
import TestTailwind from "../components/TestTailwind";

export default function MainPage() {
    return (
        <main className="flex flex-col">
            <TestTailwind />

            <div className="h-4 bg-red-600 w-full" /> {/* divider bar */}
            <MissionSection />
            <div className="h-4 bg-red-600 w-full" /> {/* divider bar */}
            <AboutMelanieMark />
        </main>
    );
}