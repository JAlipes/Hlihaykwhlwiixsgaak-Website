import featherLogo from "../assets/red-feather.png"; // temp
import canoeImage from "../assets/Cedar Hat red Canoe Journey 2024.jpg";

export default function CanoeSection() {
    return (
        <section className="bg-red-600 text-white w-full h-screen flex">
            {/* Left (w-3/5) */}
            <div className="w-3/5 flex flex-col justify-center px-12 py-8">
                {/* Feather Logo */}
                <img
                    src={featherLogo}
                    alt="Feather Logo"
                    className="w-24 h-auto mb-8"
                />

                {/* Text */}
                <h2 className="text-5xl font-light leading-snug">A RISING TIDE</h2>

                {/* <h2 className="text-5xl font-extrabold leading-snug">LIFTS ALL CANOES</h2> */}
                <h2 className="text-5xl leading-snug">
                    <span className="font-extrabold">LIFTS ALL </span>
                    <span className="font-light">CANOES</span>
                </h2>

                <h2 className="text-5xl font-extrabold leading-snug">PADDLE TOGETHER</h2>
                <p className="mt-2 text-4xl">- HLI HAYKWHL WII XSGAAK</p>
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
