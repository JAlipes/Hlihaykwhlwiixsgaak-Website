import { FaFeather } from "react-icons/fa6";
import type { RedBannerProps } from "../../../shared-types/ComponentPropTypes";

export default function RedBanner({ rightContent, leftContent, layout = "default" }: RedBannerProps) {
    return (
<div
  className={`relative w-screen bg-brandRed flex items-center justify-center py-4 sm:py-6 md:py-8 overflow-x-hidden ${
    layout === "footer" ? "flex-col sm:flex-row" : ""
  }`}
>
  {leftContent && <div className="absolute left-4 flex items-center">{leftContent}</div>}

  {/* Center content */}
  <div className="flex items-center justify-center gap-2 flex-wrap">
    <FaFeather className="sm:text-lg md:text-2xl lg:text-3xl" />
    <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-white whitespace-nowrap text-center">
      Hli Haykwhl Ẃii X̲sgaak Consulting
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
