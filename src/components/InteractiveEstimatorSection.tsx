"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calculator, MessageSquare, CheckCircle2 } from "lucide-react";

export default function InteractiveEstimatorSection() {
  const [spaceType, setSpaceType] = useState<string>("Kitchen");
  const [areaSqFt, setAreaSqFt] = useState<number>(350);
  const [thickness, setThickness] = useState<string>("19mm");
  const [coreGrade, setCoreGrade] = useState<string>("IS:710 Marine Calibrated");
  const [finishPreference, setFinishPreference] = useState<string>("Natural Architectural Veneer");

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const resultCardRef = useRef<HTMLDivElement>(null);

  const handleFormPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const card = formRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateX: -normY * 4,
      rotateY: normX * 4,
      transformPerspective: 1200,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleFormPointerLeave = () => {
    if (formRef.current) {
      gsap.to(formRef.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    }
  };

  const handleResultPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const card = resultCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateX: -normY * 5,
      rotateY: normX * 5,
      transformPerspective: 1200,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleResultPointerLeave = () => {
    if (resultCardRef.current) {
      gsap.to(resultCardRef.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Ambient lighting glow parallax
      const glow = sectionRef.current?.querySelector(".estimator-glow");
      if (glow) {
        gsap.fromTo(
          glow,
          { y: -40, scale: 0.92 },
          {
            y: 40,
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      }

      // 2. Header scrub
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 25 },
          {
            y: -25,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      }

      // 3. Counter-parallax scroll wave on Desktop
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop && formRef.current && resultCardRef.current) {
        gsap.fromTo(
          formRef.current,
          { y: 12 },
          {
            y: -12,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          }
        );

        gsap.fromTo(
          resultCardRef.current,
          { y: -16 },
          {
            y: 16,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Standard sheet size 8x4 = 32 sq ft. With 10% cutting wastage factor:
  const wastageFactor = 1.1;
  const sheetsNeeded = Math.ceil((areaSqFt / 32) * wastageFactor);

  const getRecommendation = () => {
    if (spaceType === "Kitchen") {
      return {
        core: "IS:710 Marine Calibrated Plywood",
        note: "Crucial for withstanding sink moisture, steam, and humidity without delaminating.",
      };
    } else if (spaceType === "Commercial Office") {
      return {
        core: "IS:5509 Fire Retardant & Heavy Duty BWP",
        note: "Meets commercial fire safety standards with high screw holding capacity.",
      };
    } else if (spaceType === "Wardrobes & Beds") {
      return {
        core: "Calibrated 100% Hardwood BWR / E0 Emission Core",
        note: "Zero warping for tall shutters up to 9ft with zero formaldehyde off-gassing.",
      };
    }
    return {
      core: "Calibrated Dual-Face BWR Plywood",
      note: "Perfect planar balance with zero undulation for seamless veneer pressing.",
    };
  };

  const recommendation = getRecommendation();

  const handleWhatsAppQuote = () => {
    const message = encodeURIComponent(
      `Hello Ply Dot Com, I calculated my requirement using the website estimator:\n\n` +
      `• Space: ${spaceType}\n` +
      `• Estimated Area: ${areaSqFt} Sq.Ft\n` +
      `• Estimated Sheets (8x4): ~${sheetsNeeded} sheets\n` +
      `• Preferred Thickness: ${thickness}\n` +
      `• Recommended Core: ${coreGrade}\n` +
      `• Surface Finish: ${finishPreference}\n\n` +
      `Please share availability, wholesale pricing, and showroom viewing schedule in Sus, Pune.`
    );
    window.open(`https://wa.me/9108087962121?text=${message}`, "_blank");
  };

  return (
    <section id="calculator" ref={sectionRef} className="relative py-24 sm:py-32 bg-transparent overflow-hidden border-t border-slate-200/60 dark:border-white/5">
      {/* Ambient background glow */}
      <div className="estimator-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#02475E]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 will-change-transform">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold text-slate-900 dark:text-white tracking-[-0.03em] mb-4 leading-[1.08]">
            Sheet & Core <span className="heading-accent font-extrabold">Estimator</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-white/70 font-light leading-relaxed">
            Configure your project dimensions and requirements in seconds. Get an instant sheet count, grade recommendation, and prefilled direct WhatsApp quote.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Modern Dark Form Card */}
          <div
            ref={formRef}
            onPointerMove={handleFormPointerMove}
            onPointerLeave={handleFormPointerLeave}
            className="lg:col-span-7 morden-card-dark rounded-3xl p-6 sm:p-10 shadow-2xl will-change-transform border border-black/10 dark:border-white/10"
          >
            {/* Step 1: Space Type */}
            <div className="mb-8">
              <label className="text-xs font-sans uppercase tracking-wider text-[#02475E] dark:text-[#5BB1CD] font-bold block mb-3">
                1. Select Project Type / Space
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {["Home Interior", "Kitchen", "Wardrobes & Beds", "Furniture", "Commercial Office", "Wall Paneling"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSpaceType(type)}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-medium text-center transition-all ${
                      spaceType === type
                        ? "bg-slate-900 text-white dark:bg-white dark:text-[#121212] font-bold shadow-md scale-[1.02]"
                        : "bg-black/[0.04] dark:bg-white/[0.05] border border-black/5 dark:border-white/5 text-slate-700 dark:text-white/70 hover:bg-black/[0.08] dark:hover:bg-white/10"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Area Slider */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-sans uppercase tracking-wider text-[#02475E] dark:text-[#5BB1CD] font-bold">
                  2. Approximate Surface Area
                </label>
                <span className="text-sm font-sans font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10 px-3.5 py-1 rounded-full border border-slate-200 dark:border-white/15">
                  {areaSqFt} Sq. Ft
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="3000"
                step="50"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#F1A80A]"
              />
              <div className="flex justify-between text-[10px] font-sans text-slate-500 dark:text-white/40 mt-2">
                <span>50 Sq.Ft (Feature Accent)</span>
                <span>1,500 Sq.Ft (3BHK Flat)</span>
                <span>3,000 Sq.Ft (Villa/Office)</span>
              </div>
            </div>

            {/* Step 3: Thickness & Core */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="text-xs font-sans uppercase tracking-wider text-[#02475E] dark:text-[#5BB1CD] font-bold block mb-3">
                  3. Board Thickness
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["6mm", "9mm", "12mm", "16mm", "19mm", "25mm"].map((thk) => (
                    <button
                      key={thk}
                      type="button"
                      onClick={() => setThickness(thk)}
                      className={`py-2 rounded-xl text-xs font-sans transition-all ${
                        thickness === thk
                          ? "bg-slate-900 text-white dark:bg-white dark:text-[#121212] font-bold shadow-md"
                          : "bg-black/[0.04] dark:bg-white/[0.05] border border-black/5 dark:border-white/5 text-slate-700 dark:text-white/70 hover:bg-black/[0.08] dark:hover:bg-white/10"
                      }`}
                    >
                      {thk}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-sans uppercase tracking-wider text-[#02475E] dark:text-[#5BB1CD] font-bold block mb-3">
                  4. Core Calibration Grade
                </label>
                <select
                  value={coreGrade}
                  onChange={(e) => setCoreGrade(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-2xl bg-white dark:bg-black/60 border border-slate-200 dark:border-white/15 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-white"
                >
                  <option value="IS:710 Marine Calibrated">IS:710 Marine Calibrated (100% Waterproof)</option>
                  <option value="BWR Calibrated Hardwood">BWR Calibrated Hardwood (Boiling Water Resistant)</option>
                  <option value="Commercial MR Calibrated">Commercial MR Calibrated (Interior Grade)</option>
                  <option value="Russian E0 Birch Plywood">Russian E0 Birch Plywood (Zero Emission)</option>
                </select>
              </div>
            </div>

            {/* Step 4: Finish Preference */}
            <div>
              <label className="text-xs font-sans uppercase tracking-wider text-[#02475E] dark:text-[#5BB1CD] font-bold block mb-3">
                5. Surface Finish Pairings
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  "Natural Architectural Veneer",
                  "1mm High-Gloss Acrylic",
                  "Textured Matte Laminate",
                  "Raw Calibrated Core (Unfinished)",
                ].map((fin) => (
                  <button
                    key={fin}
                    type="button"
                    onClick={() => setFinishPreference(fin)}
                    className={`py-2 px-3 rounded-xl text-xs text-left transition-all ${
                      finishPreference === fin
                        ? "bg-slate-900 text-white dark:bg-white dark:text-[#121212] font-medium shadow-md"
                        : "bg-black/[0.04] dark:bg-white/[0.05] border border-black/5 dark:border-white/5 text-slate-700 dark:text-white/70 hover:bg-black/[0.08] dark:hover:bg-white/10"
                    }`}
                  >
                    ✓ {fin}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Modern Pristine White Contrast Card (Inspired by Reference Image Bottom Right Cards) */}
          <div
            ref={resultCardRef}
            onPointerMove={handleResultPointerMove}
            onPointerLeave={handleResultPointerLeave}
            className="lg:col-span-5 morden-card-white p-6 sm:p-10 shadow-2xl sticky top-28 will-change-transform"
          >
            <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-6">
              <span className="text-xs font-sans uppercase tracking-widest font-bold text-[#121212]">
                Calculation Blueprint
              </span>
              <span className="morden-badge-peach">
                + 10% Wastage Included
              </span>
            </div>

            {/* Estimated Sheets Big Stat */}
            <div className="text-center py-6 px-4 rounded-2xl bg-black/[0.04] border border-black/5 mb-6">
              <span className="text-xs font-sans text-stone-600 uppercase tracking-widest block mb-1">
                Estimated Standard Sheets (8ft × 4ft)
              </span>
              <div className="font-sans font-black text-5xl sm:text-6xl text-[#121212] tracking-tight">
                ~{sheetsNeeded} <span className="text-2xl font-light text-stone-500">Sheets</span>
              </div>
              <span className="text-[11px] font-sans text-[#02475E] font-semibold mt-2 block">
                Total Covered Area: {sheetsNeeded * 32} Sq.Ft Gross
              </span>
            </div>

            {/* Specs Summary List */}
            <div className="flex flex-col gap-2.5 text-xs mb-6">
              <div className="flex items-center justify-between py-1.5 border-b border-black/5">
                <span className="text-stone-600 font-sans">Selected Space:</span>
                <span className="font-bold text-[#121212]">{spaceType}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-black/5">
                <span className="text-stone-600 font-sans">Board Thickness:</span>
                <span className="font-bold text-[#9E6400]">{thickness}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-black/5">
                <span className="text-stone-600 font-sans">Core Standard:</span>
                <span className="font-bold text-[#02475E] truncate max-w-[180px]">{coreGrade}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-black/5">
                <span className="text-stone-600 font-sans">Surface Finish:</span>
                <span className="font-bold text-[#121212] truncate max-w-[180px]">{finishPreference}</span>
              </div>
            </div>

            {/* Recommendation Box */}
            <div className="p-4 rounded-2xl bg-[#02475E]/10 border border-[#02475E]/20 mb-6">
              <div className="flex items-center gap-1.5 text-xs font-sans font-bold text-[#02475E] mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Expert Recommendation:</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-light">
                {recommendation.note}
              </p>
            </div>

            {/* WhatsApp Quote Trigger */}
            <button
              onClick={handleWhatsAppQuote}
              className="w-full py-4 rounded-full bg-[#121212] hover:bg-[#02475E] text-white text-center text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all"
            >
              <MessageSquare className="w-4 h-4 text-[#F1A80A]" />
              <span>Get WhatsApp Quote for This Spec</span>
            </button>

            <span className="text-[10px] text-center text-stone-500 block mt-3">
              Directly connects to Ply Dot Com Showroom Sus, Pune
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
