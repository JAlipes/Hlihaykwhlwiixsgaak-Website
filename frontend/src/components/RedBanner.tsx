import { FaFeather } from "react-icons/fa6";

// Import types
import type { RedBannerProps } from "../../../shared-types/ComponentPropTypes";

// Import feather
import featherLogo from '../assets/Cleaned_Feather_Logo_BG_Free.png'

export default function RedBanner({ rightContent, leftContent, layout = "default" }: RedBannerProps) {
	return (
		<div
			className={`relative w-screen h-16 md:h-24 bg-brandRed flex items-center justify-center py-4 sm:py-6 md:py-8 overflow-x-hidden overflow-y-hidden ${layout === "footer" ? "flex-col sm:flex-row" : ""
				}`}
		>
			{leftContent && <div className="absolute left-4 flex items-center">{leftContent}</div>}

			{/* Center content */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
                <img
                    src={featherLogo}
                    alt="Feather logo"
                    className="sm:h-6 md:h-8 lg:h-16 h-auto object-contain"
                />
                <p className="text-white whitespace-nowrap text-center 2xl:text-3xl titleFont">
                    Hli Haykwhl Ẃii <u className="decoration-2">X</u>sgaak Consulting
                </p>
            </div>


			{/* Right content */}
			{rightContent && layout === "footer" && (
				<>
					{/* Desktop: right side */}
					<div className="hidden sm:flex absolute right-4 items-center h-full text-black text-sm md:text-base">
						{rightContent}
					</div>
					{/* Mobile: below center text */}
					<div className="flex sm:hidden mt-4 text-black text-xs sm:text-sm md:text-base">
						{rightContent}
					</div>
				</>
			)}

			{/* Default (navbar) behavior: right side only */}
			{rightContent && layout === "default" && (
				<>
					{/* Desktop: right side */}
					<div className="hidden sm:flex absolute right-4 items-center h-full text-black text-sm md:text-base">
						{rightContent}
					</div>

					{/* Mobile: visible in default (navbar) */}
					<div className="flex sm:hidden absolute right-4 items-center text-black text-sm md:text-base">
						{rightContent}
					</div>
				</>
			)}

		</div>

	);
}
