import { motion } from "framer-motion";

interface MainTitleProp {
    titleText: React.ReactNode;
    underline?: boolean;
    className?: string;
    underlineColor?: string; // new prop
}

export default function MainTitle({ titleText, underline = true, className = "", underlineColor = "black" }: MainTitleProp) {
    const appliedClassName = className || "titleStyle mb-5 pb-4";

    return (
        <div className="inline-block relative">
            <h2 className={`relative inline-block ${appliedClassName}`}>
                {titleText}
                {underline && (
                    <motion.span
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ backgroundColor: underlineColor }} // dynamically set color
                        className="absolute left-0 bottom-0 w-full h-[1px] md:h-[2px] origin-left"
                    />
                )}
            </h2>
        </div>
    );
}
