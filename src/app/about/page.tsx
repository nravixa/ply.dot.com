"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowLeft, Award, Layers, Trees } from "lucide-react";

export default function AboutPage() {
  const handleCardPointerMove = (
    e: React.PointerEvent<HTMLDivElement>,
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
      scale: 1.015,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 1200,
    });
  };

  const handleCardPointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#121212] pt-32 pb-24 text-slate-900 dark:text-[#F5EBE1] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#02475E] dark:text-[#5BB1CD] hover:text-[#F1A80A] transition-colors mb-8 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </Link>

        {/* Hero Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl sm:text-6xl font-sans font-bold text-slate-900 dark:text-white tracking-[-0.03em] mb-6">
            THE CRAFT BEHIND <br />
            <span className="heading-accent font-extrabold">PLY DOT COM</span>.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-[#F5EBE1]/80 font-light leading-relaxed">
            Founded with a singular commitment: eliminating guesswork from plywood and architectural timber selection. For over 15 years, our Sus, Pune showroom has served as a benchmark for interior contractors, visionary architects, and discerning homeowners.
          </p>
        </div>

        {/* Photo Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-center">
          <div
            onPointerMove={(e) => handleCardPointerMove(e, 2.5)}
            onPointerLeave={handleCardPointerLeave}
            className="lg:col-span-7 relative aspect-[16/10] rounded-3xl overflow-hidden border border-[#F5EBE1]/15 shadow-2xl will-change-transform"
          >
            <Image
              src="/images/showroom_samples.jpg"
              alt="Architect examining flitches at Ply Dot Com"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 text-xs font-sans text-[#F5EBE1] flex items-center justify-between">
              <span>Full flitch examination under natural daylight</span>
              <span className="text-[#F1A80A]">Sus Showroom</span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div
              onPointerMove={(e) => handleCardPointerMove(e, 3.5)}
              onPointerLeave={handleCardPointerLeave}
              className="glass-panel p-6 rounded-2xl border border-[#F5EBE1]/10 bg-[#151a1c] will-change-transform hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2 text-[#F1A80A]">
                <Layers className="w-5 h-5" />
                <h3 className="font-serif font-bold text-lg text-[#F5EBE1]">Zero-Undulation Calibration</h3>
              </div>
              <p className="text-xs text-[#F5EBE1]/70 leading-relaxed font-light">
                Our calibrated cores pass through 4-head heavy sanding machines to guarantee uniform ±0.1mm planar tolerance. When pressing delicate bookmatched veneers, there is zero telegraphing or wave distortion.
              </p>
            </div>

            <div
              onPointerMove={(e) => handleCardPointerMove(e, 3.5)}
              onPointerLeave={handleCardPointerLeave}
              className="glass-panel p-6 rounded-2xl border border-[#F5EBE1]/10 bg-[#151a1c] will-change-transform hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2 text-[#5BB1CD]">
                <Trees className="w-5 h-5" />
                <h3 className="font-serif font-bold text-lg text-[#F5EBE1]">Sustainable Timber Flitches</h3>
              </div>
              <p className="text-xs text-[#F5EBE1]/70 leading-relaxed font-light">
                Every exotic burl, Scandinavian ash, and golden teak flitch is sourced from certified managed plantations with legal chain-of-custody documentation and E0 formaldehyde emission standards.
              </p>
            </div>

            <div
              onPointerMove={(e) => handleCardPointerMove(e, 3.5)}
              onPointerLeave={handleCardPointerLeave}
              className="glass-panel p-6 rounded-2xl border border-[#F5EBE1]/10 bg-[#151a1c] will-change-transform hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2 text-[#F1A80A]">
                <Award className="w-5 h-5" />
                <h3 className="font-serif font-bold text-lg text-[#F5EBE1]">Authorized Wholesale Distribution</h3>
              </div>
              <p className="text-xs text-[#F5EBE1]/70 leading-relaxed font-light">
                Direct stockists for CenturyPly, Greenply, Archidply, Royale Touché, and Merino. Authentic warranty certificates issued directly with every order.
              </p>
            </div>
          </div>
        </div>

        {/* Showroom Visit CTA */}
        <div
          onPointerMove={(e) => handleCardPointerMove(e, 2)}
          onPointerLeave={handleCardPointerLeave}
          className="glass-panel rounded-3xl p-8 sm:p-12 border border-[#F1A80A]/20 bg-gradient-to-r from-[#02475E]/40 via-[#151a1c] to-[#02475E]/30 flex flex-col md:flex-row items-center justify-between gap-6 will-change-transform"
        >
          <div>
            <span className="text-xs font-sans uppercase tracking-widest text-[#5BB1CD] block mb-2">
              SUS, PASHAN ROAD, PUNE
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#F5EBE1] font-bold">
              Experience the Material Library in Person
            </h2>
          </div>
          <Link
            href="/#showroom"
            className="px-8 py-3.5 rounded-full gold-badge text-xs uppercase font-bold tracking-wider text-[#121212] whitespace-nowrap shadow-xl"
          >
            Showroom Directions
          </Link>
        </div>
      </div>
    </div>
  );
}
