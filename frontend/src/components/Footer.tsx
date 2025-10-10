import { LuFacebook, LuLinkedin, LuInstagram, LuYoutube, LuX } from "react-icons/lu";


const socialLinks = [
  { icon: <LuFacebook />, url: "https://www.facebook.com/MelanieJMark", label: "MelanieJMark" },
  { icon: <LuLinkedin />, url: "https://www.linkedin.com/in/melanie-mark", label: "Melanie Mark" },
  { icon: <LuInstagram />, url: "https://www.instagram.com/melaniejmark", label: "melaniejmark" },
  { icon: <LuYoutube />, url: "https://www.youtube.com/@melaniejmark", label: "melaniejmark" },
  { icon: <LuX />, url: "https://www.x.com/melaniejmark", label: "melaniejmark" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <p className="mb-4 text-3xl md:text-md">Follow me for updates and insights</p>
        <SocialMediaLinks />
      </div>
    </footer>
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
          {link.icon}
          <span className="hidden md:inline text-white text-xl">{link.label}</span>
        </a>
      ))}
    </div>
  );
}
