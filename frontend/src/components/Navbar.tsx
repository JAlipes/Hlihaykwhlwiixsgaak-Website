import { FaBars } from 'react-icons/fa6'

// Import Components
import RedBanner from "./RedBanner";

export default function Navbar(){

    return(
        <nav className='w-full h-auto fixed z-50'>
            {/* Redbanner */}
            <RedBanner 
                rightContent=
                {
                    <FaBars 
                        className="text-black cursor-pointer sm:text-lg md:text-2xl lg:text-3xl mr-4" 
                    />
                }/>
            {/* Contains the hamburger menu symbol that displays over the RedBanner for the drop down navbar */}
        </nav>
    );
}