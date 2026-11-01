"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, ArrowUpRight } from "lucide-react";
import { SPACE_CATEGORIES } from "@/data/specimens";

export default function SpacesBentoSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bentoRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleBentoPointerMove = (e: React.PointerEvent<HTMLDivElement>, idx: number) => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const card = bentoRefs.current[idx];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const normX = px - 0.5;
    const normY = py - 0.5;

    gsap.to(card, {
      rotateX: -normY * 6,
      rotateY: normX * 6,
      transformPerspective: 1200,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleBentoPointerLeave = (idx: number) => {
    const card = bentoRefs.current[idx];
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Ambient lighting glow parallax
      const glows = containerRef.current?.querySelectorAll(".bento-glow");
      glows?.forEach((glow, i) => {
        gsap.fromTo(
          glow,
          { y: i === 0 ? -45 : 45, scale: 0.92 },
          {
            y: i === 0 ? 45 : -45,
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      });

      // 2. Header smooth parallax scrub
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 30 },
          {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      }

      // 3. Staggered card scroll elevation wave & inner image curtain parallax
      const isDesktop = window.innerWidth >= 768;
      const bentoOffsets = isDesktop ? [-14, 14, -12, 12, -10] : [0, 0, 0, 0, 0];

      bentoRefs.current.forEach((card, idx) => {
        if (!card) return;

        if (isDesktop) {
          const offset = bentoOffsets[idx % bentoOffsets.length];
          gsap.fromTo(
            card,
            { y: -offset },
            {
              y: offset,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.7,
              },
            }
          );
        }

        const innerImg = card.querySelector(".bento-inner-img");
        if (innerImg) {
          gsap.fromTo(
            innerImg,
            { yPercent: -14, scale: 1.06 },
            {
              yPercent: 14,
              scale: 1.0,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="spaces"
      ref={containerRef}
      className="relative py-24 sm:py-32 bg-transparent overflow-hidden border-t border-slate-200/60 dark:border-white/5"
    >
      {/* Background ambient glow */}
      <div className="bento-glow absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#02475E]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="bento-glow absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#5BB1CD]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-10 sm:mb-12 will-change-transform">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold text-slate-900 dark:text-white tracking-[-0.03em] leading-[1.08]">
            Curated for <span className="heading-accent font-extrabold">Every Space</span>
          </h2>
        </div>

        {/* Minimalist Modern Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-10 sm:mb-12">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === "all"
                ? "bg-slate-900 text-white dark:bg-white dark:text-[#121212] shadow-md font-bold"
                : "bg-slate-100/90 hover:bg-slate-200 text-slate-700 hover:text-slate-950 border border-slate-200/80 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] dark:text-white/70 dark:hover:text-white dark:border-white/10"
            }`}
          >
            All Spaces
          </button>
          {SPACE_CATEGORIES.map((space) => (
            <button
              key={space.id}
              onClick={() => setActiveCategory(space.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === space.id
                  ? "bg-slate-900 text-white dark:bg-white dark:text-[#121212] shadow-md font-bold"
                  : "bg-slate-100/90 hover:bg-slate-200 text-slate-700 hover:text-slate-950 border border-slate-200/80 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] dark:text-white/70 dark:hover:text-white dark:border-white/10"
              }`}
            >
              {space.title}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Card 1: Home Interiors (Wide Feature Bento) */}
          <div
            ref={(el) => { bentoRefs.current[0] = el; }}
            onPointerMove={(e) => handleBentoPointerMove(e, 0)}
            onPointerLeave={() => handleBentoPointerLeave(0)}
            className="lg:col-span-7 morden-card-dark rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl group bg-[#151a1c]/90 will-change-transform"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-sans tracking-wider bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white border border-slate-200 dark:border-white/15">
                  {SPACE_CATEGORIES[0].tag}
                </span>
                <span className="text-xs font-sans text-[#F1A80A] font-bold">Spec 01</span>
              </div>

              <div className="relative w-full aspect-video sm:aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-white/10 bg-black/60">
                <div className="bento-inner-img absolute inset-0 h-[135%] -top-[17.5%] w-full will-change-transform">
                  <Image
                    src="/images/luxury_interior_warm.jpg"
                    alt={SPACE_CATEGORIES[0].title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Floating Video Tour Pill */}
                <button
                  onClick={() => setActiveVideoModal("Home Interiors Showcase")}
                  className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-medium text-white hover:text-[#F1A80A] transition-all z-10"
                >
                  <div className="w-5 h-5 rounded-full bg-white text-[#121212] flex items-center justify-center">
                    <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                  </div>
                  <span>Interior Material Film</span>
                </button>
              </div>

              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#F1A80A] transition-colors tracking-tight">
                {SPACE_CATEGORIES[0].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-white/70 font-light leading-relaxed mb-6">
                {SPACE_CATEGORIES[0].description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {SPACE_CATEGORIES[0].specs.map((spec) => (
                  <span
                    key={spec}
                    className="px-3 py-1 rounded-full text-xs font-sans bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-[#02475E] dark:text-[#5BB1CD] font-medium"
                  >
                    ✓ {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
              <span className="text-xs text-slate-500 dark:text-white/50 font-sans">Bespoke Residences & Penthouses</span>
              <a
                href="#quote"
                className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white hover:text-[#F1A80A] transition-colors"
              >
                <span>Enquire Now</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Kitchens & Damp Zones */}
          <div
            ref={(el) => { bentoRefs.current[1] = el; }}
            onPointerMove={(e) => handleBentoPointerMove(e, 1)}
            onPointerLeave={() => handleBentoPointerLeave(1)}
            className="lg:col-span-5 morden-card-dark rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl group bg-[#151a1c]/90 will-change-transform"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-sans tracking-wider bg-slate-100 dark:bg-white/10 text-[#02475E] dark:text-[#5BB1CD] border border-slate-200 dark:border-white/15">
                  {SPACE_CATEGORIES[1].tag}
                </span>
                <span className="text-xs font-sans text-[#5BB1CD] font-bold">Spec 02</span>
              </div>

              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-white/10 bg-black/60">
                <div className="bento-inner-img absolute inset-0 h-[135%] -top-[17.5%] w-full will-change-transform">
                  <Image
                    src="/images/space_kitchens.jpg"
                    alt={SPACE_CATEGORIES[1].title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-sans text-[#F1A80A] border border-white/15 z-10">
                  IS:710 Marine Calibrated Core
                </div>
              </div>

              <h3 className="text-2xl font-sans font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#02475E] dark:group-hover:text-[#5BB1CD] transition-colors tracking-tight">
                {SPACE_CATEGORIES[1].title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-white/70 font-light leading-relaxed mb-4">
                {SPACE_CATEGORIES[1].description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
              <span className="text-xs font-sans text-[#02475E] dark:text-[#5BB1CD] font-semibold">72-Hr Boiling Water Shield</span>
              <a
                href="#quote"
                className="text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white hover:text-[#F1A80A] transition-colors flex items-center gap-1"
              >
                <span>Enquire</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 3: Handcrafted Furniture */}
          <div
            ref={(el) => { bentoRefs.current[2] = el; }}
            onPointerMove={(e) => handleBentoPointerMove(e, 2)}
            onPointerLeave={() => handleBentoPointerLeave(2)}
            className="lg:col-span-5 morden-card-dark rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl group bg-[#151a1c]/90 will-change-transform"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-sans tracking-wider bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white border border-slate-200 dark:border-white/15">
                  {SPACE_CATEGORIES[2].tag}
                </span>
                <span className="text-xs font-sans text-[#F1A80A] font-bold">Spec 03</span>
              </div>

              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-white/10 bg-black/60">
                <div className="bento-inner-img absolute inset-0 h-[135%] -top-[17.5%] w-full will-change-transform">
                  <Image
                    src="/images/space_furniture.jpg"
                    alt={SPACE_CATEGORIES[2].title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-sans text-[#5BB1CD] border border-white/15 z-10">
                  Zero Undulation Substrate
                </div>
              </div>

              <h3 className="text-2xl font-sans font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#F1A80A] transition-colors tracking-tight">
                {SPACE_CATEGORIES[2].title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-white/70 font-light leading-relaxed mb-4">
                {SPACE_CATEGORIES[2].description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
              <span className="text-xs font-sans text-slate-500 dark:text-white/60">Curved Tables & Consoles</span>
              <a
                href="#quote"
                className="text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white hover:text-[#F1A80A] transition-colors flex items-center gap-1"
              >
                <span>Enquire</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 4: Commercial Spaces (Wide Bento) */}
          <div
            ref={(el) => { bentoRefs.current[3] = el; }}
            onPointerMove={(e) => handleBentoPointerMove(e, 3)}
            onPointerLeave={() => handleBentoPointerLeave(3)}
            className="lg:col-span-7 morden-card-dark rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl group bg-[#151a1c]/90 will-change-transform"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-sans tracking-wider bg-slate-100 dark:bg-white/10 text-[#02475E] dark:text-[#5BB1CD] border border-slate-200 dark:border-white/15">
                  {SPACE_CATEGORIES[3].tag}
                </span>
                <span className="text-xs font-sans text-[#5BB1CD] font-bold">Spec 04</span>
              </div>

              <div className="relative w-full aspect-video sm:aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-white/10 bg-black/60">
                <div className="bento-inner-img absolute inset-0 h-[135%] -top-[17.5%] w-full will-change-transform">
                  <Image
                    src="/images/minimalist_concrete_wood.jpg"
                    alt={SPACE_CATEGORIES[3].title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-xs font-sans text-[#F1A80A] border border-white/15 z-10">
                  Fire Retardant IS:5509 & High Traffic Spec
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#02475E] dark:group-hover:text-[#5BB1CD] transition-colors tracking-tight">
                {SPACE_CATEGORIES[3].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-white/70 font-light leading-relaxed mb-6">
                {SPACE_CATEGORIES[3].description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {SPACE_CATEGORIES[3].specs.map((spec) => (
                  <span
                    key={spec}
                    className="px-3 py-1 rounded-full text-xs font-sans bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-[#02475E] dark:text-[#5BB1CD] font-medium"
                  >
                    ✓ {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
              <span className="text-xs text-slate-500 dark:text-white/50 font-sans">Corporate Suites & Five-Star Hospitality</span>
              <a
                href="#quote"
                className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white hover:text-[#F1A80A] transition-colors"
              >
                <span>Enquire Now</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Video Demonstration Modal Preview */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-fadeIn">
          <div className="relative w-full max-w-3xl morden-card-dark p-6 sm:p-8 rounded-3xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <Play className="w-4 h-4 text-[#F1A80A] fill-current" />
                <h4 className="font-sans text-lg text-white font-semibold">{activeVideoModal}</h4>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="text-xs font-sans text-white/60 hover:text-white"
              >
                [CLOSE ✕]
              </button>
            </div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black flex items-center justify-center">
              <Image
                src="/images/modern_villa_water.jpg"
                alt="Video showcase preview"
                fill
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-cover opacity-60"
              />
              <div className="relative z-10 flex flex-col items-center gap-3 text-center p-6">
                <div className="w-16 h-16 rounded-full bg-white text-[#121212] flex items-center justify-center shadow-2xl animate-pulse">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
                <p className="text-sm font-medium text-white max-w-sm">
                  Visit Ply Dot Com Showroom in Sus, Pune to touch, inspect, and experience full-scale architectural flitch installations.
                </p>
                <a
                  href="#showroom"
                  onClick={() => setActiveVideoModal(null)}
                  className="px-6 py-2.5 rounded-full bg-white text-[#121212] text-xs uppercase font-bold tracking-wider hover:bg-[#F1A80A] transition-all"
                >
                  Visit Sus Showroom
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
