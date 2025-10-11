import { FaFeather } from "react-icons/fa6";

// Import Types
import type { RedBannerProps } from "../../../shared-types/ComponentPropTypes";

export default function RedBanner({ rightContent, leftContent }: RedBannerProps) {
    return (
        <div className="relative w-full bg-brandRed flex items-center justify-center py-4 sm:py-6 md:py-8">
            {/* Left content */}
            {leftContent && <div className="absolute left-4 flex items-center">{leftContent}</div>}

            {/* Center content */}
            <div className="flex items-center justify-center gap-2">
                {/* Icon scales up on larger screens */}
                <FaFeather className="sm:text-lg md:text-2xl lg:text-3xl" />

                {/* Text: smallest on mobile, then larger on sm/md/lg */}
                <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-white whitespace-nowrap text-center">
                    Hli Haykwhl Ẃii X̲sgaak Consulting
                </p>

                {/* On mobile show the rightContent next to title; on larger screens it moves to the far right */}
                <div className="flex sm:hidden items-center ml-2">{rightContent}</div>
            </div>

            {/* Desktop: show right content at the far right */}
            <div className="hidden sm:flex absolute right-4 items-center h-full">
                {rightContent}
            </div>
        </div>
    );
}
