import { FaXTwitter, FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa6';

// Import Components
import RedBanner from "./RedBanner";


const socialLinks = [
    { icon: <FaFacebook />, url: "https://www.facebook.com/MelanieJMark", label: "MelanieJMark" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/melanie-mark", label: "Melanie Mark" },
    { icon: <FaInstagram />, url: "https://www.instagram.com/melaniejmark", label: "melaniejmark" },
    { icon: <FaYoutube />, url: "https://www.youtube.com/@melaniejmark", label: "melaniejmark" },
    { icon: <FaXTwitter />, url: "https://www.x.com/melaniejmark", label: "melaniejmark" },
];

export default function Footer() {
    return (
        <>
            <footer className="bg-black text-white px-6 py-16">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="mb-4 md:text-md 2xl:text-3xl titleFont">Follow me for updates and insights</p>
                    <SocialMediaLinks />
                </div>
            </footer>
            <div className="h-auto">
                <RedBanner
                    layout='footer'
                    rightContent={
                        <p className="text-white text-xs sm:text-sm md:text-base md:pt-10 lg:pt-10">
                            Copyright © 2025
                        </p>
                    }
                />
            </div>
        </>
    );
}

// Mapped Social Media link
function SocialMediaLinks() {
    return (
        <div className="flex justify-center gap-6 mt-2">
            {socialLinks.map((link, index) => (
                <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#C32148] hover:text-white transition-colors duration-300"
                    aria-label={link.label}
                >
                    <span className="w-4 h-4 lg:w-8 lg:h-8 flex items-center justify-center text-3xl">
                        {link.icon}
                    </span>
                    <span className="hidden md:inline text-white text-xl bodyFont;">{link.label}</span>
                </a>
            ))}
        </div>
    );
}
