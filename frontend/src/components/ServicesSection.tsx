import groupImage from '../assets/BCFS_Keynote_Group.jpg';

export default function ServicesSection() {
    return (
        <section className="relative w-full">
            {/* Background Image */}
            <img
                src={groupImage}
                alt="Group of people together"
                className="w-full h-auto mb-20 rounded-b-[100px] shadow-2xl shadow-black/50"
            />

            {/* Text Banner */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-6 py-4 rounded-full shadow-md w-[90%] max-w-5xl">
                <h2 className="text-red-500 text-5xl font-semibold text-center">
                    Let’s Navigate Your Journey Together
                </h2>
            </div>

        </section>
    );
}
