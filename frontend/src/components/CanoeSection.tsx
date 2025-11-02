import featherLogo from "../assets/Cleaned_Feather_Logo_BG_Free.png"; // temp
import canoeImage from "../assets/Cedar Hat red Canoe Journey 2024.jpg";


export default function CanoeSection() {
    return (
        <section
            id="canoe"
            className="bg-brandRed text-white w-full min-h-[calc(100vh-6rem)] flex flex-col md:flex-row"
        >
            {/* Left (text) */}
            <div className="md:w-3/5 w-full flex flex-col justify-center px-6 md:px-12 py-8 titleFont">
                {/* Feather Logo */}
                <img
                    src={featherLogo}
                    alt="Feather Logo"
                    className="w-32 h-auto mb-8"
                />

                {/* Text */}
                <h2 className="text-5xl md:text-[96px] font-light leading-tight">A RISING TIDE</h2>

                <h2 className="text-5xl md:text-[96px] leading-tight">
                    <span className="font-extrabold">LIFTS ALL </span>
                    <span className="font-light">CANOES</span>
                </h2>

                <h2 className="text-5xl md:text-[96px] font-extrabold leading-tight">PADDLE TOGETHER</h2>
                <p className="mt-4 text-3xl md:text-[64px]">- HLI HAYKWHL WII <u className='decoration-2'>X</u>SGAAK</p>
            </div>

            {/* Right (image) */}
            <div className="md:w-2/5 w-full flex items-center justify-center pl-5">
                <img
                    src={canoeImage}
                    alt="Canoe"
                    className="w-full h-auto max-h-[calc(100vh-6rem)] object-cover rounded-tl-3xl rounded-bl-3xl"
                />
            </div>
        </section>
    );
}
