import { useState, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Import Components
import LogoutButton from "./LogoutButton";

// Import Contexts
import { AuthContext } from "../contexts/AuthContext";
import RedBanner from "./RedBanner";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isAuthenticated } = useContext(AuthContext);

    const sectionList = [
        { name: "Home", id: "home" },
        { name: "Mission", id: "mission" },
        { name: "About", id: "about" },
        { name: "Services", id: "services" },
        { name: "Testimonials", id: "testimonials" },
        { name: "Rising Tides", id: "canoe" },
        { name: "Experience", id: "experience" },
        { name: "Contact Us", id: "contact" },
    ]

    const HandleScroll = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const navbarHeight = 96; // 👈 e.g. your navbar height in px (24 * 4 = 96px for h-24)
            const yOffset = -navbarHeight;

            const y = el.getBoundingClientRect().top + window.scrollY + yOffset;

            window.scrollTo({ top: y, behavior: "smooth" });
            setMenuOpen(false);
        }
    };

    return (
        <nav className="fixed w-screen z-50">
            <RedBanner
                layout="default"
                rightContent={
                    <MenuToggle isOpen={menuOpen} toggle={() => setMenuOpen(!menuOpen)} />
                }
            />

            {/* Dropdown Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0 }}
                        transition={{
                            duration: 0.35,
                            ease: [0.25, 0.8, 0.25, 1],
                        }}
                        className="absolute top-full left-0 w-full bg-white text-black flex flex-col items-center py-4 space-y-2 shadow-lg origin-top overflow-hidden z-40 border-t-2 border-brandRed"
                    >
                        {sectionList.map((item, index) => (
                            <motion.button
                                key={item.id}
                                onClick={() => HandleScroll(item.id)}
                                className="hover:text-brandRed transition-colors text-lg"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.05 * index, // staggered fade-in
                                    duration: 0.25,
                                }}
                            >
                                {item.name}
                            </motion.button>
                        ))}

                        {isAuthenticated && (
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
            className="relative w-5 md:w-20 md:h-8 flex flex-col justify-center items-center group focus:outline-none"
        >
            {/* Top bar */}
            <motion.span
                className="absolute h-[1px] md:h-[3px] w-1 md:w-6 bg-black rounded-full"
                animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            {/* Middle bar */}
            <motion.span
                className="absolute h-[1px] md:h-[3px] w-1 md:w-6 bg-black rounded-full"
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
            />
            {/* Bottom bar */}
            <motion.span
                className="absolute h-[1px] md:h-[3px] w-1 md:w-6 bg-black rounded-full"
                animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            />
        </button>
    );
}
