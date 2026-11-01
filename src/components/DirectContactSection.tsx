"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageSquare, Phone, Send, CheckCircle2, ArrowUpRight } from "lucide-react";

export default function DirectContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    projectType: "Home Interior",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Ambient glow scroll parallax
      gsap.fromTo(
        ".contact-glow",
        { y: -45 },
        {
          y: 45,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );

      // 2. Desktop counter-parallax scrub
      if (typeof window !== "undefined" && window.innerWidth >= 1024) {
        if (leftColRef.current) {
          gsap.fromTo(
            leftColRef.current,
            { y: 14 },
            {
              y: -14,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.7,
              },
            }
          );
        }

        if (rightColRef.current) {
          gsap.fromTo(
            rightColRef.current,
            { y: -14 },
            {
              y: 14,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.7,
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D Pointer Tilt Handlers
  const handleCardPointerMove = (
    e: React.PointerEvent<HTMLDivElement | HTMLAnchorElement>,
    maxRotate = 3.5
  ) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;
    gsap.to(el, {
      rotateX: -normY * maxRotate,
      rotateY: normX * maxRotate,
      scale: 1.012,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 1200,
    });
  };

  const handleCardPointerLeave = (
    e: React.PointerEvent<HTMLDivElement | HTMLAnchorElement>
  ) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError("Please provide your Name and Contact Number.");
      return;
    }
    setError(null);
    setSubmitted(true);

    const waText = encodeURIComponent(
      `Hello Ply Dot Com,\n\nI would like to submit an enquiry:\n` +
      `• Name: ${formData.name}\n` +
      `• Phone: ${formData.phone}\n` +
      `• Requirement: ${formData.projectType}\n` +
      (formData.message ? `• Note: ${formData.message}\n\n` : `\n`) +
      `Please contact me with wholesale rates and showroom viewing details in Sus, Pune.`
    );

    setTimeout(() => {
      window.open(`https://wa.me/9108087962121?text=${waText}`, "_blank");
    }, 400);
  };

  return (
    <section
      id="quote"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-transparent overflow-hidden border-t border-white/5"
    >
      {/* Background radial gradient with scroll parallax */}
      <div className="contact-glow absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#02475E]/20 rounded-full blur-[140px] pointer-events-none will-change-transform" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col justify-between will-change-transform">
            <div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold text-slate-900 dark:text-white tracking-[-0.03em] leading-[1.18] sm:leading-[1.14] mb-5">
                Let&apos;s Find The <br />
                <span className="heading-accent font-extrabold pb-1.5">
                  Right Timber
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-white/70 font-light leading-relaxed mb-8">
                Tell us a bit about your requirement. We provide direct wholesale pricing, technical calibration reports, and showroom guidance in Sus, Pune.
              </p>

              {/* Direct Touchpoints in Modern Glass Cards with 3D Parallax Tilt */}
              <div className="flex flex-col gap-3.5 border-t border-slate-200 dark:border-white/10 pt-6 mb-8">
                <span className="text-xs font-sans tracking-widest uppercase text-[#02475E] dark:text-[#5BB1CD] font-bold">
                  Direct Contact Channels
                </span>

                <a
                  href="https://wa.me/9108087962121?text=Hello%20Ply%20Dot%20Com%2C%20I%20have%20an%20urgent%20plywood%20requirement."
                  target="_blank"
                  rel="noopener noreferrer"
                  onPointerMove={(e) => handleCardPointerMove(e, 4)}
                  onPointerLeave={handleCardPointerLeave}
                  className="morden-card-dark p-4 rounded-2xl flex items-center justify-between hover:border-white/30 transition-colors group will-change-transform cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-200/80 dark:bg-white/10 text-slate-800 dark:text-white flex items-center justify-center group-hover:text-[#F1A80A] transition-colors">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">WhatsApp Concierge</span>
                      <span className="text-[11px] font-sans text-[#02475E] dark:text-[#5BB1CD] font-medium">+91 080 8796 2121</span>
                    </div>
                  </div>
                  <span className="text-xs font-sans text-slate-600 dark:text-white/80 group-hover:text-[#F1A80A] transition-colors font-medium">
                    Chat →
                  </span>
                </a>

                <a
                  href="tel:08087962121"
                  onPointerMove={(e) => handleCardPointerMove(e, 4)}
                  onPointerLeave={handleCardPointerLeave}
                  className="morden-card-dark p-4 rounded-2xl flex items-center justify-between hover:border-white/30 transition-colors group will-change-transform cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-200/80 dark:bg-white/10 text-slate-800 dark:text-white flex items-center justify-center group-hover:text-[#F1A80A] transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">Showroom Desk</span>
                      <span className="text-[11px] font-sans text-[#02475E] dark:text-[#5BB1CD] font-medium">+91 080 8796 2121</span>
                    </div>
                  </div>
                  <span className="text-xs font-sans text-slate-600 dark:text-white/80 group-hover:text-[#F1A80A] transition-colors font-medium">
                    Call →
                  </span>
                </a>
              </div>
            </div>

            <div
              onPointerMove={(e) => handleCardPointerMove(e, 3)}
              onPointerLeave={handleCardPointerLeave}
              className="p-4 rounded-2xl bg-white/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-white/70 font-sans shadow-sm flex items-center gap-2 will-change-transform"
            >
              <span className="text-[#F1A80A] font-bold text-sm">★</span>
              <span>
                <strong className="text-slate-900 dark:text-white font-semibold">Authorised</strong> CenturyPly, Greenply, Archidply &amp; Royale Touché Partner
              </span>
            </div>
          </div>

          {/* Right Column: Modern Form Card with 3D Parallax Tilt */}
          <div
            ref={rightColRef}
            onPointerMove={(e) => handleCardPointerMove(e, 2.5)}
            onPointerLeave={handleCardPointerLeave}
            className="lg:col-span-7 morden-card-dark rounded-3xl p-6 sm:p-10 shadow-2xl bg-[#151a1c]/90 will-change-transform hover:border-white/30 transition-colors"
          >
            <div className="mb-6 pb-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <h3 className="font-sans text-xl sm:text-2xl text-slate-900 dark:text-white font-bold tracking-tight">
                Project Enquiry
              </h3>
              <span className="text-[10px] font-sans text-[#02475E] dark:text-[#5BB1CD] bg-slate-100 dark:bg-white/[0.06] px-2.5 py-1 rounded-full border border-slate-200 dark:border-white/10 font-semibold">
                Direct WhatsApp Opening
              </span>
            </div>

            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#F1A80A] mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-sans font-bold text-slate-900 dark:text-white mb-2">
                  Enquiry Prepared
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-white/70 max-w-sm mb-6">
                  Your specifications have been compiled. WhatsApp is opening now with your detailed project enquiry.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-[#121212] text-xs font-sans font-bold hover:bg-[#F1A80A] hover:text-[#121212] transition-colors"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                {error && (
                  <div className="p-3 rounded-2xl bg-red-500/20 border border-red-500/40 text-xs text-red-600 dark:text-red-200">
                    {error}
                  </div>
                )}

                <div>
                  <label className="text-xs font-sans uppercase tracking-wider text-[#02475E] dark:text-[#5BB1CD] font-bold block mb-2">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ar. Rajesh Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-sans uppercase tracking-wider text-[#02475E] dark:text-[#5BB1CD] font-bold block mb-2">
                    PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-sans uppercase tracking-wider text-[#02475E] dark:text-[#5BB1CD] font-bold block mb-2">
                    REQUIREMENT / PROJECT TYPE *
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="Home Interior">Home Interior (Living / Bedroom)</option>
                    <option value="Kitchen & Damp Zones">Kitchen & Damp Zones (IS:710 Marine)</option>
                    <option value="Handcrafted Furniture">Handcrafted Furniture & Credenzas</option>
                    <option value="Commercial & Office Space">Commercial Space & Office Reception</option>
                    <option value="Natural Veneer Architectural Flitches">Natural Veneer Flitches & Inlays</option>
                    <option value="Wholesale Bulk Plywood Supply">Wholesale Bulk Contractor Supply</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-sans uppercase tracking-wider text-[#02475E] dark:text-[#5BB1CD] font-bold block mb-2">
                    ADDITIONAL MESSAGE (OPTIONAL)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Mention estimated sheet quantities, thickness requirements (16mm, 19mm), or preferred veneer finishes..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-slate-900 text-white hover:bg-[#F1A80A] hover:text-[#121212] dark:bg-white dark:text-[#121212] dark:hover:bg-[#F1A80A] text-center text-xs sm:text-sm uppercase font-bold tracking-wider flex items-center justify-center gap-2 shadow-2xl transition-all active:scale-98 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>SEND ENQUIRY VIA WHATSAPP</span>
                  </button>
                  <span className="text-[10px] text-center text-slate-500 dark:text-white/40 block mt-2.5">
                    Your enquiry will open directly in WhatsApp. Instant direct response.
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
