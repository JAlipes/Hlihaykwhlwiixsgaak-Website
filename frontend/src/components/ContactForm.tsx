import React, { useEffect, useRef, useState } from "react";
import { GetEnvVarOrFail } from "../utils/GetEnvVarOrFail";

// Import Assets
import feather from '../assets/Feather2025-Photoroom.png';

// Import Components
import MainTitle from "./MainTitle";
import InputField from "./form/InputField";
import SelectField from "./form/SelectField";
import TextAreaField from "./form/TextAreaField";

export default function ContactForm() {
    const USE_CAPTCHA = false; // Toggle captcha on/off
    // Captcha
    const [captchaToken, setCaptchaToken] = useState<string>("");
    const [captchaSolved, setCaptchaSolved] = useState<boolean>(false);
    const [enableCaptcha, setEnableCaptcha] = useState<boolean>(false); // lazy-load gate
    const captchaContainerRef = useRef<HTMLDivElement | null>(null);
    const captchaWidgetIdRef = useRef<any>(null);
    const turnstileSiteKey = GetEnvVarOrFail('VITE_TURNSTILE_SITE_KEY');

    const [formData, setFormData] = useState({
        fullName: "",
        company: "",
        email: "",
        phone: "",
        requestType: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (USE_CAPTCHA && !enableCaptcha) setEnableCaptcha(true); // enable captcha after first interaction
    };

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [error, setError] = useState('');

    // Load and render Turnstile captcha (lazy by enableCaptcha)
    useEffect(() => {
        if (!USE_CAPTCHA || !enableCaptcha) return;
        const w = window as any;

        function renderWidget() {
            if (!captchaContainerRef.current || !w.turnstile) return;
            // Clear any previous render
            captchaContainerRef.current.innerHTML = '';
            captchaWidgetIdRef.current = w.turnstile.render(captchaContainerRef.current, {
                sitekey: turnstileSiteKey,
                callback: (token: string) => {
                    setCaptchaToken(token);
                    setCaptchaSolved(true);
                },
                'expired-callback': () => {
                    setCaptchaToken("");
                    setCaptchaSolved(false);
                },
                'error-callback': () => {
                    setCaptchaToken("");
                    setCaptchaSolved(false);
                    setError('Captcha error. Please try again.');
                },
            });
        }

        if (w.turnstile) {
            renderWidget();
            return;
        }

        const scriptId = 'cf-turnstile-script';
        if (!document.getElementById(scriptId)) {
            const s = document.createElement('script');
            s.id = scriptId;
            s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad';
            s.async = true;
            s.defer = true;
            (window as any).onTurnstileLoad = () => renderWidget();
            document.body.appendChild(s);
        } else {
            // If script already present but turnstile not ready yet, set a short poll
            const t = setInterval(() => {
                if ((window as any).turnstile) {
                    clearInterval(t);
                    renderWidget();
                }
            }, 200);
            return () => clearInterval(t);
        }
    }, [turnstileSiteKey, enableCaptcha]);

    // Also enable captcha when its container scrolls into view
    useEffect(() => {
        if (!USE_CAPTCHA || enableCaptcha) return;
        const el = captchaContainerRef.current;
        if (!el || typeof IntersectionObserver === 'undefined') return;
        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio > 0) {
                    setEnableCaptcha(true);
                    obs.disconnect();
                }
            });
        }, { threshold: 0.1 });
        obs.observe(el);
        return () => obs.disconnect();
    }, [enableCaptcha]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setError('');

        try {
            if (USE_CAPTCHA && !captchaToken) {
                throw new Error('Please complete the captcha.');
            }
            const res = await fetch(`${GetEnvVarOrFail('VITE_BACKEND_URL')}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(USE_CAPTCHA ? { ...formData, captchaToken } : formData),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || 'Failed to send message');
            }

            setStatus('success');
            setFormData({ fullName: '', company: '', email: '', phone: '', requestType: '', message: '' });
            if (USE_CAPTCHA) {
                setCaptchaToken("");
                setCaptchaSolved(false);
                // Reset captcha widget
                const w = window as any;
                if (w.turnstile && captchaWidgetIdRef.current) {
                    try { w.turnstile.reset(captchaWidgetIdRef.current); } catch { }
                }
            }
        } catch (err: any) {
            setError(err.message || 'Unexpected error');
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="sectionWrapper !min-h-0 !max-h-none">
                {/* Left: Form */}
                <div className="textSection flex items-center justify-center px-8 lg:px-10 2xl:px-16 py-10 lg:py-16">
                    <div className="w-full max-w-lg text-center">
                        <div className="mb-4 lg:mb-6">
                            <MainTitle
                                titleText={<>
                                    Contact Hli Haykwhl Ẃii <u className='decoration-2 underline-offset-4'>X</u>sgaak Consulting
                                </>}
                            />
                        </div>
                        <div className='mb-4 lg:mb-6'>
                            <p className='bodyStyle'>Reach out to Hli Haykwhl Ẃii <u className="decoration-1">X</u>sgaak Consulting to start our shared journey toward reconciliation and transformative change.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="w-full space-y-3 lg:space-y-4 text-left">
                            {/* Full Name */}
                            <InputField
                                id="fullName"
                                name="fullName"
                                type="text"
                                required
                                placeholder="Full Name *"
                                onChange={handleChange}
                                value={formData.fullName}
                            />

                            {/* Company */}
                            <InputField
                                id="company"
                                name="company"
                                type="text"
                                placeholder="Company"
                                onChange={handleChange}
                                value={formData.company}
                            />

                            {/* Email */}
                            <InputField
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="Email *"
                                onChange={handleChange}
                                value={formData.email}
                            />

                            {/* Phone */}
                            <InputField
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="Phone"
                                onChange={handleChange}
                                value={formData.phone}
                            />

                            {/* Request Type */}
                            <SelectField
                                id="requestType"
                                name="requestType"
                                required
                                onChange={handleChange}
                                value={formData.requestType}
                                options={[
                                    { value: '', label: 'Request type *', disabled: true },
                                    { value: 'consulting', label: 'Consulting' },
                                    { value: 'speaking', label: 'Speaking Engagement' },
                                    { value: 'collaboration', label: 'Collaboration' },
                                    { value: 'other', label: 'Other' },
                                ]}
                            />

                            {/* Additional details */}
                            <TextAreaField
                                id="message"
                                name="message"
                                required
                                placeholder="Additional details, i.e. timeframe for request, and allocated budget *"
                                rows={4}
                                onChange={handleChange}
                                value={formData.message}
                            />

                            {/* Status Feedback */}
                            {status === 'success' && (
                                <p className="text-green-600 text-sm text-center">Message sent! We’ll be in touch shortly.</p>
                            )}
                            {status === 'error' && (
                                <p className="text-red-600 text-sm text-center">Error: {error}</p>
                            )}

                            {/* Captcha (disabled unless USE_CAPTCHA = true) */}
                            {USE_CAPTCHA && (
                                <div className="pt-2">
                                    <div ref={captchaContainerRef} />
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'loading' || (USE_CAPTCHA && !captchaSolved)}
                                className="btnRounding block mx-auto disabled:opacity-60"
                            >
                                {status === 'loading' ? 'Sending...' : "Let's Talk"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right: Decorative image */}
                <div className="imgSection hidden md:block">
                    <div className="w-full h-full p-6 lg:p-0">
                        <div 
                            className="w-full h-full bg-cover bg-right bg-no-repeat scale-x-[-1] rounded-3xl lg:rounded-tr-none lg:rounded-br-none lg:rounded-tl-3xl lg:rounded-bl-3xl lg:shadow-[rgba(0,0,0,0.3)_-10px_0px_10px_0px]"
                            style={{ backgroundImage: `url(${feather})` }}
                        />
                    </div>
                </div>
        </section>
    );
}
