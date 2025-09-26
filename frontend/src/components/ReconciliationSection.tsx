import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import temp from '../assets/BCFS_Keynote_Group.jpg';
import temp2 from '../assets/MJM_FINAL_HEADSHOT_2024_BLUE_WHITE.jpg';

const slides = [
    {
        image: temp,
        title: 'Reconciliation in Action',
        text: `"Melanie, your keynote address was incredible. Your passion, warmth, and energy captivated our delegates. It was an honor to have you speak at our convention and your words will continue to inspire us."`,
        author: 'Chris Westenskow, President',
        org: 'CMAW Canada Convention',
    },
    {
        image: temp2,
        title: 'Building Strong Communities',
        text: `"Working with Melanie has been a transformative experience. Her leadership and advocacy bring people together in meaningful ways."`,
        author: 'Jane Doe, Director',
        org: 'Community Impact Org',
    },
];

export default function ReconciliationSection() {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section className="relative bg-red-600 text-white w-screen h-screen flex flex-col items-center justify-center px-6 md:px-20 lg:px-32 text-center">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold mb-10">
                {slides[current].title}
            </h2>

            {/* Image + Text side by side */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl">
                {/* Image */}
                <div className="flex-shrink-0">
                    <img
                        src={slides[current].image}
                        alt={slides[current].title}
                        className="rounded-3xl shadow-xl w-auto h-[32rem] object-cover mx-auto"
                    />
                </div>

                {/* Text */}
                <div className="flex flex-col justify-center text-left md:text-left max-w-lg">
                    <p className="italic text-lg mb-4">{slides[current].text}</p>
                    <p className="font-semibold">{slides[current].author}</p>
                    <p className="text-sm opacity-80">{slides[current].org}</p>
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full"
            >
                <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full"
            >
                <ChevronRight className="w-6 h-6 text-white" />
            </button>
        </section>
    );
}
