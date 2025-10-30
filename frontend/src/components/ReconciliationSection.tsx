import { useState, useEffect, useContext } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";
import { HandleGetTestimonials } from "../utils/HandleGetTestimonials.ts";
import { HandleSaveTestimonials } from "../utils/HandleSaveTestimonials.ts";
import EditableImage from "../components/EditableImage";
import EditableText from "../components/EditableText";
import SaveEditsButton from "./SaveEditsButton";
import type { TestimonialType } from "../../../shared-types/SectionTypes";
import { UploadTestimonialImage } from "../utils/UploadTestimonialImage.ts";
import { DeleteTestimonial } from "../utils/DeleteTestimonial.ts";
import { ResizeImageFile } from "../utils/ResizeImage.ts";
import { DEFAULT_TESTIMONIALS } from "../utils/DefaultTestimonials";
import MainTitle from "./MainTitle.tsx";

export default function ReconciliationSection() {
    const { isAuthenticated } = useContext(AuthContext);

    const [slides, setSlides] = useState<TestimonialType[]>([]);
    const [current, setCurrent] = useState(0);
    // Track per-slide image files; only defined entries will be uploaded on Save
    const [slideImageFiles, setSlideImageFiles] = useState<(File | null)[]>([]);
    // Draft skeleton slide (only used when authenticated)
    const [draftSlide, setDraftSlide] = useState<TestimonialType>({ image: "", text: "" });
    const [draftFile, setDraftFile] = useState<File | null>(null);
    // Lightweight toast feedback
    const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
    const showToast = (msg: string, type: 'success' | 'error') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 2000);
    };

    // Load slides from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await HandleGetTestimonials();
                const list = (data && Array.isArray(data.testimonials) && data.testimonials.length > 0)
                    ? data.testimonials
                    : DEFAULT_TESTIMONIALS;
                setSlides(list);
                setSlideImageFiles(new Array(list.length).fill(null));
            } catch {
                // On error, fall back to defaults
                setSlides(DEFAULT_TESTIMONIALS);
                setSlideImageFiles(new Array(DEFAULT_TESTIMONIALS.length).fill(null));
            }
        };
        fetchData();
    }, []);

    // Keep current index in bounds when slides change (esp. after delete)
    useEffect(() => {
        // When authed, valid indices are 0..slides.length (last is skeleton)
        // When not authed, valid indices are 0..slides.length-1
        const maxIndex = isAuthenticated ? Math.max(0, slides.length) : Math.max(0, slides.length - 1);
        if (current > maxIndex) {
            setCurrent(maxIndex);
        }
        if (current < 0) setCurrent(0);
    }, [slides.length, isAuthenticated]);

    // Total slides includes an extra "Add New" card at the end when authenticated
    const totalSlides = isAuthenticated ? slides.length + 1 : slides.length; // include skeleton when authed
    const isSkeleton = isAuthenticated && current === slides.length; // last index is skeleton

    // Update a field in the current slide
    const updateSlide = (field: keyof TestimonialType, value: string) => {
        if (isSkeleton) {
            setDraftSlide((prev) => ({ ...prev, [field]: value } as TestimonialType));
            return;
        }
        setSlides((prev) => {
            const updated = [...prev];
            (updated[current] as any)[field] = value;
            return updated;
        });
    };

    // Update image in the current slide
    const updateImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        // Try to resize/compress to stay under 10MB (Cloudinary free limit)
    const processed = await ResizeImageFile(file, { maxWidth: 1920, maxHeight: 1920, quality: 0.8 });
        const url = URL.createObjectURL(processed);
        if (isSkeleton) {
            setDraftSlide((prev) => ({ ...prev, image: url }));
            setDraftFile(processed);
        } else {
            updateSlide("image", url);
            setSlideImageFiles((prev) => {
                const copy = [...prev];
                copy[current] = processed;
                return copy;
            });
        }
    };

    // Delete the current slide
    const deleteSlide = async () => {
        if (isSkeleton) return; // can't delete the skeleton
        // compute next index based on current position before updating state
        const nextLength = slides.length - 1;
        const nextIndex = Math.max(0, Math.min(current, nextLength - 1));
        const currentSlide: any = slides[current];
        const id = currentSlide?._id as string | undefined;
        try {
            if (id) {
                await DeleteTestimonial(id);
            }
            const newSlides = slides.filter((_, idx) => idx !== current);
            setSlides(newSlides);
            setSlideImageFiles((prev) => prev.filter((_, idx) => idx !== current));
            // If no real slides remain and user is authed, jump to skeleton index
            if (isAuthenticated && newSlides.length === 0) {
                setCurrent(0); // skeleton is at index 0 when no real slides
            } else {
                setCurrent(nextIndex);
            }
            showToast('Deleted testimonial', 'success');
        } catch (err: any) {
            console.error('[Testimonials] delete failed', err);
            showToast(err?.message || 'Failed to delete testimonial', 'error');
        }
    };

    // Save slides to backend
    const [isSaving, setIsSaving] = useState(false);
    const saveSlides = async () => {
        try {
            setIsSaving(true);
            // toast feedback handles success state
            // Upload any selected files and replace the corresponding image URLs
            const updated = [...slides];
            for (let i = 0; i < updated.length; i++) {
                const file = slideImageFiles[i];
                if (file instanceof File) {
                    const { url } = await UploadTestimonialImage(file);
                    updated[i] = { ...updated[i], image: url };
                }
            }
            // If draft has any content, append it (upload its image if present)
            const quillPlain = draftSlide.text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
            const hasDraft = !!(quillPlain || draftSlide.image);
            if (hasDraft) {
                let draftImageUrl = draftSlide.image;
                if (draftFile instanceof File) {
                    const { url } = await UploadTestimonialImage(draftFile);
                    draftImageUrl = url;
                }
                updated.push({ image: draftImageUrl, text: draftSlide.text || '' });
            }
            const result = await HandleSaveTestimonials({ testimonials: updated.map((s, i) => ({ ...s, order: i })) });
            const saved = (result && result.testimonials) ? result.testimonials : updated;
            // Clear file selections and reset draft after successful save
            setSlideImageFiles(new Array(saved.length).fill(null));
            setSlides(saved);
            if (hasDraft) {
                setDraftSlide({ image: '', text: '' });
                setDraftFile(null);
                // After creating a new slide from draft, jump to it
                setCurrent(saved.length - 1);
            }
            showToast('Saved testimonials', 'success');
        } catch (err) {
            console.error('[Testimonials] save failed', err);
            showToast('Failed to save testimonials', 'error');
        } finally {
            setIsSaving(false);
        }
    };
    // If not authenticated and no slides, show nothing (preserve original behavior)
    if (!slides.length && !isAuthenticated) return null;
    if (totalSlides === 0) return null;

    return (
        <section id="testimonials" className="relative bg-brandRed text-white w-screen min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center px-6 md:px-20 lg:px-32 text-center">
            {/* Show different content based on whether it's the add slide or a real slide */}
            {/* Single rendering path: real slide or skeleton draft */}
            <div className="mb-10 md:mb-14">
                <MainTitle
                    titleText={
                        <>
                            <p className="text-white">
                                    Reconciliation in Action
                            </p>
                        </>
                    }
                    underlineColor="white"
                />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-7xl">
                {(isSkeleton ? draftSlide.image : slides[current]?.image) ? (
                    <EditableImage
                        src={isSkeleton ? (draftSlide.image) : (slides[current]?.image as string)}
                        alt={"Testimonial image"}
                        wrapperClassName="flex-shrink-0"
                        imageClassName="rounded-3xl shadow-xl w-auto h-[32rem] object-cover mx-auto cursor-pointer"
                        isAuthenticated={isAuthenticated}
                        inputIdString={`reconciliation-image-${current}`}
                        onChangeFunction={updateImage}
                    />
                ) : (
                    <div
                        className="flex-shrink-0 w-auto h-[32rem] flex items-center justify-center bg-white/20 rounded-3xl border-4 border-dashed border-white/50 cursor-pointer px-10"
                        onClick={() => {
                            if (isAuthenticated) {
                                document.getElementById(`reconciliation-placeholder-input-${current}`)?.click();
                            }
                        }}
                    >
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
                                onChange={updateImage}
                            />
                        )}
                    </div>
                )}
                <div className="flex flex-col justify-center text-left max-w-lg">
                    <EditableText
                        key={`text-${isSkeleton ? 'draft' : current}`}
                        isAuthenticated={isAuthenticated}
                        setText={(val) => updateSlide("text", val)}
                        text={isSkeleton ? (draftSlide.text ?? "") : (slides[current]?.text ?? "")}
                        placeholder="Write the testimonial..."
                    />
                </div>
            </div>
            {/* Navigation Arrows - show only if there are multiple slides (including add card) */}
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
            {isAuthenticated && !isSkeleton && (
                <div className="flex gap-4 mt-6">
                    <button
                        onClick={deleteSlide}
                        className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded flex items-center gap-2 transition-colors"
                        disabled={isSkeleton}
                    >
                        <Trash size={16} /> Delete Slide
                    </button>
                    <SaveEditsButton
                        onClickFunction={saveSlides}
                        color="dark-red"
                        isLoading={isSaving}
                        label="Save"
                    />
                </div>
            )}
            {isAuthenticated && isSkeleton && (
                <div className="flex gap-4 mt-6">
                    <SaveEditsButton
                        onClickFunction={saveSlides}
                        color="dark-red"
                        isLoading={isSaving}
                        label="Save New Slide"
                    />
                </div>
            )}

            {/* Slide indicator dots */}
            {totalSlides > 1 && (
                <div className="flex gap-2 mt-4">
                    {Array.from({ length: totalSlides }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`w-3 h-3 rounded-full transition-colors ${current === idx ? "bg-white" : "bg-white/40 hover:bg-white/60"
                                }`}
                        />
                    ))}
                </div>
            )}
            {/* Toast feedback */}
            {toast && (
                <div
                    className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded shadow-lg text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
                        }`}
                >
                    {toast.msg}
                </div>
            )}
        </section>
    );
}

