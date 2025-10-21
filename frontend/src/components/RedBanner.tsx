import { FaFeather } from "react-icons/fa6";

// Import Types
import type { RedBannerProps } from "../../../shared-types/ComponentPropTypes";

export default function RedBanner({ rightContent, leftContent }: RedBannerProps) {
    return (
        <div className="relative w-full bg-brandRed flex items-center justify-center py-4 sm:py-6 md:py-8">
            {leftContent && <div className="absolute left-4 flex items-center">{leftContent}</div>}

            {/* Center content */}
            <div className="flex items-center justify-center gap-2">
                <FaFeather className="sm:text-lg md:text-2xl lg:text-3xl" />

                <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-white whitespace-nowrap text-center">
                    Hli Haykwhl Ẃii X̲sgaak Consulting
                </p>

                <div className="flex sm:hidden items-center ml-2">{rightContent}</div>
            </div>

            <div className="hidden sm:flex absolute right-4 items-center h-full">
                {rightContent}
            </div>
        </div>
    );
}
