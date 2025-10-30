import { motion } from "framer-motion";

interface MainTitleProp {
    titleText: React.ReactNode;
    underline?: boolean;
    className?: string;
}

export default function MainTitle({ titleText, underline = true, className = "" }: MainTitleProp) {
    const appliedClassName = className || "titleStyle mb-5";

    return (
        <div className="inline-block relative">
            <h2 className={`relative inline-block ${appliedClassName}`}>
                {titleText}
                {underline && (
                    <motion.span
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.5 }} // triggers when 50% of the element is visible
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute left-0 bottom-0 w-full h-[2px] bg-black origin-left"
                    />
                )}
            </h2>
        </div>
    );
}
