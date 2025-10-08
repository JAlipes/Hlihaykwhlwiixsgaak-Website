// import { useState } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// import temp from '../assets/BCFS_Keynote_Group.jpg';
// import temp2 from '../assets/MJM_FINAL_HEADSHOT_2024_BLUE_WHITE.jpg';

// const slides = [
//     {
//         image: temp,
//         title: 'Reconciliation in Action',
//         text: `"Melanie, your keynote address was incredible. Your passion, warmth, and energy captivated our delegates. It was an honor to have you speak at our convention and your words will continue to inspire us."`,
//         author: 'Chris Westenskow, President',
//         org: 'CMAW Canada Convention',
//     },
//     {
//         image: temp2,
//         title: 'Building Strong Communities',
//         text: `"Working with Melanie has been a transformative experience. Her leadership and advocacy bring people together in meaningful ways."`,
//         author: 'Jane Doe, Director',
//         org: 'Community Impact Org',
//     },
// ];

// export default function ReconciliationSection() {
//     const [current, setCurrent] = useState(0);

//     const nextSlide = () => {
//         setCurrent((prev) => (prev + 1) % slides.length);
//     };

//     const prevSlide = () => {
//         setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
//     };

//     return (
//         <section className="relative bg-red-600 text-white w-screen h-screen flex flex-col items-center justify-center px-6 md:px-20 lg:px-32 text-center">
//             {/* Title */}
//             <h2 className="text-3xl md:text-4xl font-bold mb-10">
//                 {slides[current].title}
//             </h2>

//             {/* Image + Text side by side */}
//             <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl">
//                 {/* Image */}
//                 <div className="flex-shrink-0">
//                     <img
//                         src={slides[current].image}
//                         alt={slides[current].title}
//                         className="rounded-3xl shadow-xl w-auto h-[32rem] object-cover mx-auto"
//                     />
//                 </div>

//                 {/* Text */}
//                 <div className="flex flex-col justify-center text-left md:text-left max-w-lg">
//                     <p className="italic text-lg mb-4">{slides[current].text}</p>
//                     <p className="font-semibold">{slides[current].author}</p>
//                     <p className="text-sm opacity-80">{slides[current].org}</p>
//                 </div>
//             </div>

//             {/* Navigation Arrows */}
//             <button
//                 onClick={prevSlide}
//                 className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full"
//             >
//                 <ChevronLeft className="w-6 h-6 text-white" />
//             </button>
//             <button
//                 onClick={nextSlide}
//                 className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full"
//             >
//                 <ChevronRight className="w-6 h-6 text-white" />
//             </button>
//         </section>
//     );
// }


import { useState, useEffect, useContext } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";
import { HandleSaveSectionData } from "../utils/HandleSaveSectionData";
import { HandleGetSectionData } from "../utils/HandleGetSectionData";
import EditableImage from "../components/EditableImage";
import EditableText from "../components/EditableText";
import SaveEditsButton from "./SaveEditsButton";
import type { SlideType } from "../../../shared-types/SectionTypes";

export default function ReconciliationSection() {
  const sectionName = "reconciliation";
  const { isAuthenticated } = useContext(AuthContext);

  const [slides, setSlides] = useState<SlideType[]>([]);
  const [current, setCurrent] = useState(0);
  // Parallel array tracking which slide images were replaced (File objects)
  const [slideImageFiles, setSlideImageFiles] = useState<(File | null)[]>([]);

  // Load slides from backend
  useEffect(() => {
    const fetchData = async () => {
      const data = await HandleGetSectionData(sectionName);
      if (data && data.slides) {
        setSlides(data.slides);
        setSlideImageFiles(new Array(data.slides.length).fill(null));
      }
    };
    fetchData();
  }, []);

  // Create the total slides array (real slides + add slide card if authenticated)
  const totalSlides = isAuthenticated ? slides.length + 1 : slides.length;
  const isAddSlide = current === slides.length; // If current is at the end, it's the add slide

  // Update a field in the current slide
  const updateSlide = (field: keyof SlideType, value: string) => {
    if (isAddSlide) return; // Don't update if we're on the add slide
    setSlides((prev) => {
      const updated = [...prev];
      updated[current][field] = value;
      return updated;
    });
  };

  // Update image in the current slide
  const updateImage = (img: string) => updateSlide("image", img);

  // Add a new slide
  const addSlide = () => {
    const newSlide = { image: "", title: "New Testimonial", text: "", author: "", org: "" };
    setSlides((prev) => [...prev, newSlide]);
    setSlideImageFiles((prev) => [...prev, null]);
    setCurrent(slides.length); // Move to the new slide (before the add card)
  };

  // Delete the current slide
  const deleteSlide = () => {
    if (isAddSlide || slides.length <= 1) return; // Can't delete add slide or last real slide
    setSlides((prev) => prev.filter((_, idx) => idx !== current));
    setSlideImageFiles((prev) => prev.filter((_, idx) => idx !== current));
    setCurrent((prev) => Math.max(0, Math.min(prev, slides.length - 2)));
  };

  // Save slides to backend
  const saveSlides = () => {
    HandleSaveSectionData({ sectionName, slides, image: "", slideImageFiles });
  };

  // If not authenticated and no slides, show nothing
  if (!slides.length && !isAuthenticated) return null;

  // If no total slides (shouldn't happen with auth, but safety check)
  if (totalSlides === 0) return null;

  return (
    <section className="relative bg-red-600 text-white w-screen h-screen flex flex-col items-center justify-center px-6 md:px-20 lg:px-32 text-center">
      {/* Show different content based on whether it's the add slide or a real slide */}
      {isAddSlide ? (
        // Add New Slide Card
        <>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Add New Testimonial</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl">
            <div className="flex-shrink-0 w-auto h-[32rem] flex items-center justify-center bg-white/20 rounded-3xl border-4 border-dashed border-white/50">
              <Plus size={80} className="text-white/70" />
            </div>
            <div className="flex flex-col justify-center text-center max-w-lg">
              <p className="text-xl mb-6">Click the button below to add a new testimonial slide.</p>
              <button
                onClick={addSlide}
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg flex items-center gap-3 mx-auto text-lg font-semibold transition-colors"
              >
                <Plus size={24} /> Add New Slide
              </button>
            </div>
          </div>
        </>
      ) : (
        // Regular Slide Content
        <>
          <EditableText
            isAuthenticated={isAuthenticated}
            setText={(val) => updateSlide("title", val)}
            text={slides[current]?.title ?? ""}
          />
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl">
            {slides[current]?.image ? (
              <EditableImage
                src={slides[current]?.image}
                alt={slides[current]?.title ?? ""}
                wrapperClassName="flex-shrink-0"
                imageClassName="rounded-3xl shadow-xl w-auto h-[32rem] object-cover mx-auto cursor-pointer"
                isAuthenticated={isAuthenticated}
                inputIdString={`reconciliation-image-${current}`}
                onChangeFunction={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const objectUrl = URL.createObjectURL(file);
                  updateImage(objectUrl);
                  setSlideImageFiles((prev) => {
                    const copy = [...prev];
                    copy[current] = file;
                    return copy;
                  });
                }}
              />
            ) : (
              <div className="flex-shrink-0 w-auto h-[32rem] flex items-center justify-center bg-white/20 rounded-3xl border-4 border-dashed border-white/50 cursor-pointer px-10"
                   onClick={() => {
                     if (isAuthenticated) {
                       document.getElementById(`reconciliation-placeholder-input-${current}`)?.click();
                     }
                   }}>
                <div className="flex flex-col items-center gap-4 text-white/70">
                  <Plus size={64} />
                  <span className="font-semibold tracking-wide">Add Image</span>
                </div>
                {isAuthenticated && (
                  <input
                    id={`reconciliation-placeholder-input-${current}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const objectUrl = URL.createObjectURL(file);
                      updateImage(objectUrl);
                      setSlideImageFiles((prev) => {
                        const copy = [...prev];
                        copy[current] = file;
                        return copy;
                      });
                    }}
                  />
                )}
              </div>
            )}
            <div className="flex flex-col justify-center text-left max-w-lg"> {/* Editable BG is white, so text is currently invis */}
              <EditableText
                isAuthenticated={isAuthenticated}
                setText={(val) => updateSlide("text", val)}
                text={slides[current]?.text ?? ""}
              />
              <EditableText
                isAuthenticated={isAuthenticated}
                setText={(val) => updateSlide("author", val)}
                text={slides[current]?.author ?? ""}
              />
              <EditableText
                isAuthenticated={isAuthenticated}
                setText={(val) => updateSlide("org", val)}
                text={slides[current]?.org ?? ""}
              />
            </div>
          </div>
        </>
      )}

      {/* Navigation Arrows - show only if there are multiple slides */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides)}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % totalSlides)}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Controls if logged in and on a real slide */}
      {isAuthenticated && !isAddSlide && (
        <div className="flex gap-4 mt-6">
          <button
            onClick={deleteSlide}
            className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded flex items-center gap-2 transition-colors"
            disabled={slides.length <= 1}
          >
            <Trash size={16} /> Delete Slide
          </button>
          <SaveEditsButton onClickFunction={saveSlides} />
        </div>
      )}

      {/* Slide indicator dots */}
      {totalSlides > 1 && (
        <div className="flex gap-2 mt-4">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full transition-colors ${
                current === idx ? "bg-white" : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
