import React, { useEffect, useRef, useState } from "react";
import { GetEnvVarOrFail } from "../utils/GetEnvVarOrFail";

// Import Assets
import feather from '../assets/red-feather.png';

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
          try { w.turnstile.reset(captchaWidgetIdRef.current); } catch {}
        }
      }
    } catch (err: any) {
      setError(err.message || 'Unexpected error');
      setStatus('error');
    }
  };

  return (
    <section className="bg-white min-h-screen md:h-screen w-full">
      <div className="flex flex-col md:flex-row h-screen w-full">
        {/* Left: Form */}
        <div className="w-full md:w-3/5 h-full flex items-center justify-center px-6 md:px-12"> {/* Changed to md:w-3/5 from 1/2 */}
          <div className="w-full max-w-md text-center">
            <h2 className="text-5xl font-light text-red-600 mb-1">LET’S TALK</h2> {/* Increased to 5xl for more emphasis */}
            <div className='w-32 h-[2px] bg-black mt-3 mb-8 mx-auto' />
            <p className="text-gray-700 mb-8 text-lg">
              Contact <br />
              <span>Hli Haykwhl Ẃii Xsgaak Consulting</span>
            </p>

            <form onSubmit={handleSubmit} className="w-full space-y-4 text-left">
              {/* Full Name */}
              <div>
                {/* <label htmlFor="fullName" className="block mb-1 text-sm font-medium text-gray-700">Full Name*</label> */}
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  required
                  placeholder="Full Name *"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-red-500"
                  onChange={handleChange}
                  value={formData.fullName}
                />
              </div>

              {/* Company */}
              <div>
                {/* <label htmlFor="company" className="block mb-1 text-sm font-medium text-gray-700">Company</label> */}
                <input
                  id="company"
                  type="text"
                  name="company"
                  placeholder="Company"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-red-500"
                  onChange={handleChange}
                  value={formData.company}
                />
              </div>

              {/* Email */}
              <div>
                {/* <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email*</label> */}
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="Email *"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-red-500"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>

              {/* Phone */}
              <div>
                {/* <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700">Phone</label> */}
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-red-500"
                  onChange={handleChange}
                  value={formData.phone}
                />
              </div>

              {/* Request Type */}
              <div>
                {/* <label htmlFor="requestType" className="block mb-1 text-sm font-medium text-gray-700">Request Type*</label> */}
                <select
                  id="requestType"
                  name="requestType"
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-red-500"
                  onChange={handleChange}
                  value={formData.requestType}
                >
                  <option value="" disabled>Request type *</option>
                  <option value="consulting">Consulting</option>
                  <option value="speaking">Speaking Engagement</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Additional details */}
              <div>
                {/* <label htmlFor="message" className="block mb-1 text-sm font-medium text-gray-700">Additional details*</label> */}
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Additional details, i.e. timeframe for request, and allocated budget *"
                  rows={4}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-red-500"
                  onChange={handleChange}
                  value={formData.message}
                />
              </div>

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
                className="bg-red-500 text-white  px-10 py-4 rounded hover:bg-red-600 transition block mx-auto text-2xl disabled:opacity-60"
              >
                {status === 'loading' ? 'Sending…' : 'Let’s Talk'}
              </button>
            </form>
          </div>
        </div>

        {/* Right: Decorative image area (full-height, flush right/top/bottom) */}
        <div
          className="hidden md:block w-full md:w-2/5 h-full bg-cover bg-right bg-no-repeat scale-x-[-1]" 
          style={{ backgroundImage: `url(${feather})` }}
        /> {/** Changed to md:w-2/5 from 1/2 for better balance */}
      </div>
    </section>
  );
}
