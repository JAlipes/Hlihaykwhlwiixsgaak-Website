import featherLogo from "../assets/Melanie_Feather_Logo_W_removebg_free.png"; // temp
import canoeImage from "../assets/Cedar Hat red Canoe Journey 2024.jpg";


export default function CanoeSection() {
    return (
        <section id='canoe' className="bg-brandRed text-white w-full h-screen flex">
            {/* Left (w-3/5) */}
            <div className="w-3/5 flex flex-col justify-center px-12 py-8">
                {/* Feather Logo */}
                <img
                    src={featherLogo}
                    alt="Feather Logo"
                    className="w-32 h-auto mb-8"
                />

                {/* Text */}
                <h2 className="text-[96px] font-light leading-tight">A RISING TIDE</h2>

                <h2 className="text-[96px] leading-tight">
                    <span className="font-extrabold">LIFTS ALL </span>
                    <span className="font-light">CANOES</span>
                </h2>

                <h2 className="text-[96px] font-extrabold leading-tight">PADDLE TOGETHER</h2>
                <p className="mt-4 text-[64px]">- HLI HAYKWHL WII XSGAAK</p>
            </div>

            {/* Right (w-2/5) */}
            <div className="w-2/5 h-full">
                <img
                    src={canoeImage}
                    alt="Canoe"
                    className="w-full h-full object-cover"
                />
            </div>
        </section>
    );
}
