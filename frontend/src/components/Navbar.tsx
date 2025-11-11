import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

import LogoutButton from "./LogoutButton";
import { AuthContext } from "../contexts/AuthContext";
import RedBanner from "./RedBanner";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isAuthenticated } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    // --- Normal homepage navigation sections ---
    const sectionList = [
        { name: "Home", id: "home" },
        { name: "Mission", id: "mission" },
        { name: "About", id: "about" },
        { name: "Services", id: "services" },
        { name: "Testimonials", id: "testimonials" },
        { name: "Experience", id: "experience" },
        { name: "Rising Tides", id: "canoe" },
        { name: "Contact Us", id: "contact" },
    ];

    // --- Resume page options (example) ---
    const resumeList = [
        { name: "Profile", id: "profile" },
        { name: "Executive Experience", id: "executiveExperience" },
        { name: "Community Involvement", id: "communityInvolvement" },
        { name: "Professional Development", id: "professionalDevelopment" },
        { name: "Education", id: "postSecondaryCredentials" },
        { name: "Additional Info", id: "additionalInformation" },
        { name: "Back to Site", action: () => {
            navigate("/"); 
            setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 0);} },
    ];

    // Detect which list to use based on current URL
    const isResumePage = location.pathname.includes("resume");
    const currentMenu = isResumePage ? resumeList : sectionList;

    // --- Scroll or Navigate handler ---
    const HandleClick = (item: any) => {
        if (item.action) {
            // Example: "Back to Site" button
            item.action();
            setMenuOpen(false);
            return;
        }

        const el = document.getElementById(item.id);
        if (!el) return;

        const navbarHeight = 96; // same offset as main page
        const yOffset = -navbarHeight;
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset;

        // Always smooth scroll — just consistent behavior
        window.scrollTo({ top: y, behavior: "smooth" });

        setMenuOpen(false);
    };



    return (
        <nav className="fixed w-screen z-50">
            <RedBanner
                layout="default"
                rightContent={<MenuToggle isOpen={menuOpen} toggle={() => setMenuOpen(!menuOpen)} />}
            />

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
                        className="absolute top-full left-0 w-full bg-white text-black flex flex-col items-center py-4 space-y-2 shadow-lg origin-top overflow-hidden z-40 border-t-2 border-brandRed"
                    >
                        {currentMenu.map((item, index) => (
                            <motion.button
                                key={item.name}
                                onClick={() => HandleClick(item)}
                                className="hover:text-brandRed transition-colors text-lg"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.05 * index,
                                    duration: 0.25,
                                }}
                            >
                                {item.name}
                            </motion.button>
                        ))}

                        {isAuthenticated && !isResumePage && (
                            <motion.div
                                className="mt-4"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 * sectionList.length }}
                            >
                                <LogoutButton />
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

function MenuToggle({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
    return (
        <button
            onClick={toggle}
            aria-label="Toggle menu"
            className="relative h-5 w-7 md:w-20 md:h-8 flex flex-col justify-center items-center focus:outline-none"
        >
            <motion.span
                className="menuBar"
                animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <motion.span
                className="menuBar"
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
            />
            <motion.span
                className="menuBar"
                animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            />
        </button>
    );
}
