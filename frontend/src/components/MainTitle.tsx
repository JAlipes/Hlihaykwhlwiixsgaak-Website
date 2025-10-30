interface MainTitleProp {
    titleText: React.ReactNode // strings and jsx formatting
    underline?: boolean;
    className?: string;
}

export default function MainTitle({titleText, underline = true, className = ""}: MainTitleProp) {
    const appliedClassName = className || "titleStyle mb-5";

    return (
        <div>
            <h2
                className={`relative inline-block ${appliedClassName} ${underline
                        ? "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-black"
                        : ""
                    }`}
            >
                {titleText}
            </h2>
        </div>
    );
}
