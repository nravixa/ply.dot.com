"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, MessageSquare } from "lucide-react";

interface SwatchItem {
  name: string;
  code: string;
  image: string;
  subtitle: string;
  description: string;
  application: string;
  pct: string;
  specimenType: string;
}

const SWATCHES: SwatchItem[] = [
  {
    name: "Botanic Opulence",
    code: "#02475E",
    image: "/images/swatch_botanic_opulence.jpg",
    subtitle: "Midnight Figured Sycamore",
    description:
      "Deep midnight petrol inspired by nocturnal forest canopies, setting an imposing architectural anchor.",
    application: "Executive Boardrooms & Acoustic Paneling",
    pct: "92% Depth",
    specimenType: "Quarter-Cut Dyed Ripple Flitch",
  },
  {
    name: "Olive Mist",
    code: "#5BB1CD",
    image: "/images/swatch_olive_mist.jpg",
    subtitle: "Coastal Mineral Bleached Ash",
    description:
      "Mineral coastal cyan with gentle desaturated coolness, harmonizing natural daylight and glass surfaces.",
    application: "Minimalist Kitchen Cabinetry & Bathroom Vanities",
    pct: "88% Light",
    specimenType: "Linear Scandinavian Ash Veneer",
  },
  {
    name: "Silken Ivory",
    code: "#F5EBE1",
    image: "/images/swatch_silken_ivory.jpg",
    subtitle: "Blonde Curly Curly Maple",
    description:
      "Luminous organic cream texture reminiscent of raw silk, bleached lime plaster, and Nordic oak.",
    application: "Living Room Millwork & Gallery Wall Slats",
    pct: "95% Purity",
    specimenType: "Undulating Bird's-Eye Sycamore",
  },
  {
    name: "Rustic Cedar",
    code: "#8A4A28",
    image: "/images/swatch_rustic_cedar.jpg",
    subtitle: "Smoked Burma Teak & Red Cedar",
    description:
      "Heirloom timber tone with natural tannins, radiating visceral warmth, organic grain knots, and solidity.",
    application: "Bespoke Dining Tables & Entrance Portals",
    pct: "90% Warmth",
    specimenType: "Live-Edge Aged Heartwood Flitch",
  },
  {
    name: "Dawn Brilliance",
    code: "#F1A80A",
    image: "/images/swatch_dawn_brilliance.jpg",
    subtitle: "Bookmatched Golden Vavona Burl",
    description:
      "Radiant golden-amber highlight that sparkles with holographic 3D depth under ambient lighting.",
    application: "Statement Feature Walls & Luxury Ceiling Cores",
    pct: "99% Luster",
    specimenType: "4-Way Bookmatched Burl Clusters",
  },
];

export default function LumiereSwatchBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSwatch = SWATCHES[activeIndex];
  const containerRef = useRef<HTMLElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardGridRef = useRef<HTMLDivElement>(null);
  const swatchRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const focusCardRef = useRef<HTMLDivElement>(null);

  // Controlled 3D pointer parallax & dynamic specular highlight (Desktop Only)
  const handleCardPointerMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>, idx: number) => {
      if (typeof window === "undefined" || window.innerWidth < 768) return;
      const card = swatchRefs.current[idx];
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const normX = px - 0.5; // -0.5 to 0.5
      const normY = py - 0.5; // -0.5 to 0.5

      // Safe, restrained 3D tilt angles (never clips or collides)
      const tiltX = -normY * 11;
      const tiltY = normX * 11;

      // 1. Smooth 3D card tilt
      gsap.to(card, {
        rotateX: tiltX,
        rotateY: tiltY,
        transformPerspective: 1000,
        scale: activeIndex === idx ? 1.04 : 1.02,
        duration: 0.32,
        ease: "power2.out",
        overwrite: "auto",
      });

      // 2. Parallax inner image in reverse direction for deep vitrine illusion
      const innerImg = card.querySelector(".swatch-inner-img");
      if (innerImg) {
        gsap.to(innerImg, {
          x: -normX * 16,
          y: -normY * 16,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // 3. Floating foreground layer badges & labels
      const badge = card.querySelector(".swatch-badge");
      if (badge) {
        gsap.to(badge, {
          x: normX * 8,
          y: normY * 6,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      const label = card.querySelector(".swatch-label");
      if (label) {
        gsap.to(label, {
          x: normX * 7,
          y: normY * 5,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // 4. Moving dynamic specular lighting sheen (simulates showroom spotlight reflection)
      const sheen = card.querySelector(".swatch-sheen") as HTMLElement | null;
      if (sheen) {
        gsap.to(sheen, {
          opacity: 1,
          duration: 0.2,
          overwrite: "auto",
        });
        sheen.style.background = `radial-gradient(circle 180px at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.22), transparent 70%)`;
      }
    },
    [activeIndex]
  );

  const handleCardPointerLeave = useCallback(
    (idx: number) => {
      const card = swatchRefs.current[idx];
      if (!card) return;

      // Gracefully ease back to resting orientation without any jarring snap
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: activeIndex === idx ? 1.03 : 1.0,
        duration: 0.55,
        ease: "power2.out",
        overwrite: "auto",
      });

      const innerImg = card.querySelector(".swatch-inner-img");
      if (innerImg) {
        gsap.to(innerImg, {
          x: 0,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      const badge = card.querySelector(".swatch-badge");
      if (badge) {
        gsap.to(badge, {
          x: 0,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      const label = card.querySelector(".swatch-label");
      if (label) {
        gsap.to(label, {
          x: 0,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      const sheen = card.querySelector(".swatch-sheen");
      if (sheen) {
        gsap.to(sheen, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    },
    [activeIndex]
  );

  // Subtle pointer parallax for the bottom Focus Specimen Card
  const handleFocusCardPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const card = focusCardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const normX = px - 0.5;
    const normY = py - 0.5;

    gsap.to(card, {
      rotateX: -normY * 5,
      rotateY: normX * 5,
      transformPerspective: 1200,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });

    const thumb = card.querySelector(".focus-thumb");
    if (thumb) {
      gsap.to(thumb, {
        x: normX * 10,
        y: normY * 10,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }, []);

  const handleFocusCardPointerLeave = useCallback(() => {
    const card = focusCardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });

    const thumb = card.querySelector(".focus-thumb");
    if (thumb) {
      gsap.to(thumb, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Ambient lighting orb smooth parallax
      if (ambientGlowRef.current && containerRef.current) {
        gsap.fromTo(
          ambientGlowRef.current,
          { y: -35, scale: 0.92 },
          {
            y: 35,
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
      }

      // 2. Section Header floating scrub
      if (headerRef.current && containerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 18 },
          {
            y: -18,
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

      // 3. Coordinated Card Scroll Parallax (Gentle vertical wave that preserves grid alignment & never clips)
      const isDesktop = window.innerWidth >= 640;
      const scrollOffsets = isDesktop ? [-10, 8, -12, 10, -8] : [0, 0, 0, 0, 0];

      swatchRefs.current.forEach((el, idx) => {
        if (!el) return;

        // Subtle vertical card elevation wave
        if (isDesktop) {
          const offset = scrollOffsets[idx % scrollOffsets.length];
          gsap.fromTo(
            el,
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

        // Inner Image Curtain Parallax (Masked window with safe vertical buffer)
        const innerImg = el.querySelector(".swatch-inner-img");
        if (innerImg) {
          gsap.fromTo(
            innerImg,
            { yPercent: -12, scale: 1.06 },
            {
              yPercent: 12,
              scale: 1.0,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          );
        }
      });

      // 4. Focus Card subtle scroll elevation
      if (focusCardRef.current && containerRef.current) {
        gsap.fromTo(
          focusCardRef.current,
          { y: 14 },
          {
            y: -14,
            ease: "none",
            scrollTrigger: {
              trigger: focusCardRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="palette-bar"
      ref={containerRef}
      className="relative py-20 sm:py-28 bg-transparent overflow-hidden border-t border-black/5 dark:border-white/5"
    >
      {/* Background ambient lighting dynamically tinted by active color */}
      <div
        ref={ambientGlowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] opacity-20 blur-[150px] pointer-events-none transition-colors duration-700 rounded-full will-change-transform"
        style={{ backgroundColor: activeSwatch.code }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="mb-10 sm:mb-14 will-change-transform"
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold text-slate-900 dark:text-white tracking-[-0.03em] leading-[1.08]">
            Curated Tonal <span className="heading-accent font-extrabold">Harmony</span>
          </h2>
        </div>

        {/* 5 Column Modern Redesigned Swatches with Multi-Plane Parallax */}
        <div
          ref={cardGridRef}
          className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 sm:gap-5 mb-10 perspective-[1200px]"
        >
          {SWATCHES.map((swatch, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div key={swatch.name} className="relative will-change-transform">
                <button
                  ref={(el) => {
                    swatchRefs.current[idx] = el;
                  }}
                  onClick={() => setActiveIndex(idx)}
                  onPointerMove={(e) => handleCardPointerMove(e, idx)}
                  onPointerLeave={() => handleCardPointerLeave(idx)}
                  className={`group relative w-full flex flex-col text-left rounded-3xl overflow-hidden border focus:outline-none cursor-pointer transition-colors transition-shadow duration-300 will-change-transform ${
                    isActive
                      ? "z-20 bg-white dark:bg-[#121619]"
                      : "border-black/10 dark:border-white/10 hover:border-black/25 dark:hover:border-white/25 bg-white/90 dark:bg-[#0e1113]/90"
                  }`}
                  style={{
                    borderColor: isActive ? swatch.code : undefined,
                    boxShadow: isActive
                      ? `0 0 35px ${swatch.code}55, 0 16px 36px rgba(0,0,0,0.3)`
                      : undefined,
                    transformStyle: "preserve-3d",
                  }}
                  aria-label={`Select ${swatch.name} architectural colorway`}
                >
                  {/* Full-bleed HDR Specimen Masked Window */}
                  <div className="relative w-full aspect-[3/4.6] sm:aspect-[3/4.8] overflow-hidden bg-black/90">
                    {/* Curtain Parallax Inner Image (Generous 40% vertical buffer prevents edge revealing) */}
                    <div className="swatch-inner-img absolute inset-x-0 h-[140%] -top-[20%] w-full will-change-transform pointer-events-none">
                      <Image
                        src={swatch.image}
                        alt={swatch.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 20vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.95] group-hover:brightness-105"
                      />
                    </div>

                    {/* Interactive Specular Sheen (Glazes smoothly with cursor) */}
                    <div className="swatch-sheen absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-300 z-10" />

                    {/* Subtle Top Vignette */}
                    <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

                    {/* Floating Active Indicator or Percentage Pill */}
                    <div className="swatch-badge absolute top-3 right-3 z-20 will-change-transform pointer-events-none">
                      {isActive ? (
                        <span
                          className="px-2.5 py-1 rounded-full text-[9px] font-sans tracking-wider font-bold flex items-center gap-1.5 shadow-xl backdrop-blur-md border border-white/30 text-white"
                          style={{ backgroundColor: `${swatch.code}dd` }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          ACTIVE
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-sans bg-black/65 backdrop-blur-md text-white/80 border border-white/15 group-hover:text-white transition-colors">
                          {swatch.pct}
                        </span>
                      )}
                    </div>

                    {/* Floating Bottom Gradient Overlay & Typographic Block */}
                    <div className="swatch-label absolute inset-x-0 bottom-0 pt-16 pb-3.5 px-3.5 bg-gradient-to-t from-[#121619] via-[#121619]/90 to-transparent flex flex-col justify-end pointer-events-none z-20 will-change-transform">
                      {/* Chromatic Color Pill */}
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)] border border-white/40 flex-shrink-0"
                          style={{ backgroundColor: swatch.code }}
                        />
                        <span
                          className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-bold"
                          style={{
                            color: swatch.code === "#F5EBE1" ? "#FFFFFF" : swatch.code,
                          }}
                        >
                          {swatch.code}
                        </span>
                      </div>

                      {/* Swatch Name */}
                      <h3 className="text-xs sm:text-[13.5px] font-sans font-bold !text-white tracking-tight leading-snug group-hover:!text-[#F1A80A] transition-colors truncate">
                        {swatch.name}
                      </h3>

                      {/* Subtitle Species */}
                      <p className="text-[10px] font-sans !text-white/75 font-light truncate mt-0.5">
                        {swatch.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Tonal Indicator Line */}
                  <div
                    className="w-full h-1 transition-all duration-300"
                    style={{
                      backgroundColor: swatch.code,
                      opacity: isActive ? 1 : 0.45,
                    }}
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* Active Focus Specimen Card with Integrated 3D Parallax Sheen */}
        <div
          ref={focusCardRef}
          onPointerMove={handleFocusCardPointerMove}
          onPointerLeave={handleFocusCardPointerLeave}
          className="morden-card-dark rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 will-change-transform border border-black/10 dark:border-white/15 bg-white/95 dark:bg-[#121619]/95 shadow-xl relative overflow-hidden transition-shadow duration-300 hover:shadow-2xl"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Subtle colored ambient corner glow */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-25 pointer-events-none transition-colors duration-500"
            style={{ backgroundColor: activeSwatch.code }}
          />

          {/* Left: Specimen Preview Tile & Information */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-5 relative z-10">
            {/* HDR Thumbnail Frame with Parallax Floating */}
            <div
              className="focus-thumb relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 shadow-2xl transition-transform duration-300"
              style={{ borderColor: activeSwatch.code }}
            >
              <Image
                src={activeSwatch.image}
                alt={activeSwatch.name}
                fill
                sizes="80px"
                className="object-cover"
              />
              <div
                className="absolute bottom-0 inset-x-0 h-1.5"
                style={{ backgroundColor: activeSwatch.code }}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: activeSwatch.code }}
                />
                <span className="text-xs font-sans tracking-widest uppercase font-semibold text-slate-700 dark:text-white/80">
                  {activeSwatch.code}
                </span>
                <span className="text-slate-400 dark:text-white/30">•</span>
                <span className="text-xs font-sans text-[#02475E] dark:text-[#5BB1CD] uppercase font-bold">
                  {activeSwatch.pct}
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-sans font-bold text-slate-900 dark:text-white tracking-tight">
                {activeSwatch.name}
              </h4>
              <span className="text-xs font-sans text-[#F1A80A] block mt-0.5">
                {activeSwatch.specimenType}
              </span>
            </div>
          </div>

          {/* Center: Material Guidance & Applications */}
          <div className="flex-1 max-w-xl relative z-10">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-white/80 leading-relaxed font-light mb-3">
              {activeSwatch.description}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/[0.06] border border-black/10 dark:border-white/10 text-[11px] font-sans text-[#02475E] dark:text-[#5BB1CD]">
              <span className="text-slate-500 dark:text-white/50">Ideal Application:</span>
              <span className="text-slate-900 dark:text-white font-medium">
                {activeSwatch.application}
              </span>
            </div>
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full sm:w-auto lg:w-48 relative z-10 flex-shrink-0">
            <a
              href={`https://wa.me/9108087962121?text=${encodeURIComponent(
                `Hello Ply Dot Com, I would like to request samples and showroom viewing for the "${activeSwatch.name}" (${activeSwatch.code} - ${activeSwatch.subtitle}).`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-5 py-3 rounded-full bg-slate-900 text-white hover:bg-[#F1A80A] hover:text-slate-950 dark:bg-white dark:text-[#121212] dark:hover:bg-[#F1A80A] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02]"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Enquire Swatch</span>
            </a>
            <a
              href="/#specimens"
              className="w-full px-5 py-2.5 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/[0.08] dark:hover:bg-white/15 text-slate-800 dark:text-white text-xs font-sans uppercase tracking-wider text-center border border-black/10 dark:border-white/15 transition-all flex items-center justify-center gap-1.5"
            >
              <span>All Specimens</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
