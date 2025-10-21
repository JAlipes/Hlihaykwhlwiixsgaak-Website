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
        { name: "Rising Tides", id: "canoe"},
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
                    <FaBars
                    className="text-black cursor-pointer pr-2 sm:text-lg md:text-2xl lg:text-3xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                    />
                }
            />

            {/* Dropdown Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 w-full bg-white text-black flex flex-col items-center py-4 space-y-2 shadow-lg"
                    >
                        {sectionList.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => HandleScroll(item.id)}
                                className="hover:text-brandRed transition-colors text-lg"
                            >
                                {item.name}
                            </button>
                        ))}

                        {/* Secret Logout */}
                        {isAuthenticated && (
                            <div className="mt-4">
                                <LogoutButton />
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
