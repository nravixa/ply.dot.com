"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, MessageSquare, ArrowUpRight } from "lucide-react";
import { ARCHITECTURAL_SPECIMENS, Specimen } from "@/data/specimens";

export default function SpecimenShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pillarsRef = useRef<HTMLDivElement>(null);

  // Controlled 3D pointer parallax on Desktop
  const handleCardPointerMove = (e: React.PointerEvent<HTMLDivElement>, idx: number) => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const card = cardRefs.current[idx];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const normX = px - 0.5;
    const normY = py - 0.5;

    gsap.to(card, {
      rotateX: -normY * 7,
      rotateY: normX * 7,
      transformPerspective: 1200,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });

    const pill = card.querySelector(".specimen-pill");
    if (pill) {
      gsap.to(pill, {
        x: normX * 10,
        y: normY * 8,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleCardPointerLeave = (idx: number) => {
    const card = cardRefs.current[idx];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });

    const pill = card.querySelector(".specimen-pill");
    if (pill) {
      gsap.to(pill, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Ambient lighting orbs parallax
      const glows = sectionRef.current?.querySelectorAll(".specimen-glow");
      glows?.forEach((glow, i) => {
        gsap.fromTo(
          glow,
          { y: i === 0 ? -40 : 40, scale: 0.92 },
          {
            y: i === 0 ? 40 : -40,
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
      });

      // 2. Header smooth parallax scrub
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 35 },
          {
            y: -35,
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

      // 3. Staggered card scroll elevation wave & inner image curtain parallax
      const isDesktop = window.innerWidth >= 768;
      const scrollOffsets = isDesktop ? [-16, 16, -16, 16] : [0, 0, 0, 0];

      cardRefs.current.forEach((card, idx) => {
        if (!card) return;

        if (isDesktop) {
          const offset = scrollOffsets[idx % scrollOffsets.length];
          gsap.fromTo(
            card,
            { y: -offset },
            {
              y: offset,
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

        const innerImg = card.querySelector(".specimen-inner-img");
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

      // 4. Bottom 4 Architectural Pillars staggered scroll parallax
      if (pillarsRef.current?.children) {
        const pillarOffsets = isDesktop ? [-10, 8, -8, 10] : [0, 0, 0, 0];
        Array.from(pillarsRef.current.children).forEach((pillar, i) => {
          gsap.fromTo(
            pillar,
            { y: -pillarOffsets[i % pillarOffsets.length] + 15, opacity: 0.85 },
            {
              y: pillarOffsets[i % pillarOffsets.length],
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: pillarsRef.current,
                start: "top bottom+=100",
                end: "bottom 80%",
                scrub: 0.6,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openInspection = (specimen: Specimen) => {
    window.dispatchEvent(
      new CustomEvent("open-specimen-modal", { detail: specimen })
    );
  };

  return (
    <section
      id="specimens"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-transparent overflow-hidden border-t border-slate-200/60 dark:border-white/5"
    >
      {/* Background ambient lighting */}
      <div className="specimen-glow absolute top-1/4 left-0 w-96 h-96 bg-[#02475E]/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="specimen-glow absolute bottom-1/4 right-0 w-96 h-96 bg-[#F1A80A]/12 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-14 sm:mb-16 will-change-transform">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold text-slate-900 dark:text-white tracking-[-0.03em] leading-[1.08]">
            Architectural <span className="heading-accent font-extrabold">Specimens</span>
          </h2>
        </div>

        {/* 4 Cards Grid with Staggered Parallax Scrub & 3D Interactive Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-16 sm:mb-20">
          {ARCHITECTURAL_SPECIMENS.map((specimen, idx) => (
            <div
              key={specimen.id}
              ref={(el) => { cardRefs.current[idx] = el; }}
              onPointerMove={(e) => handleCardPointerMove(e, idx)}
              onPointerLeave={() => handleCardPointerLeave(idx)}
              className="group morden-card-dark rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-black/10 dark:border-white/10 hover:border-black/25 dark:hover:border-white/30 transition-all duration-300 will-change-transform shadow-2xl"
            >
              <div>
                {/* Header Tag and Category */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-sans tracking-widest uppercase text-[#F1A80A] font-semibold">
                    {specimen.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-sans tracking-wider bg-slate-100 dark:bg-white/[0.08] border border-slate-200 dark:border-white/15 text-slate-700 dark:text-white/90">
                    {specimen.tag}
                  </span>
                </div>

                {/* Specimen Image Container (ERA Residence Style Masked Window Curtain) */}
                <div
                  onClick={() => openInspection(specimen)}
                  className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 cursor-pointer group/img border border-white/10 shadow-lg bg-black/80"
                >
                  <div className="specimen-inner-img absolute inset-0 h-[135%] -top-[17.5%] w-full will-change-transform">
                    <Image
                      src={specimen.image}
                      alt={specimen.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover/img:scale-108 transition-transform duration-700 ease-out filter brightness-95"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-75 group-hover/img:opacity-50 transition-opacity pointer-events-none" />

                  {/* Floating Action Pill */}
                  <div className="specimen-pill absolute bottom-4 left-4 right-4 flex items-center justify-between will-change-transform z-10">
                    <span className="text-xs font-sans text-white bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#F1A80A]" />
                      <span>Inspect Grain Details</span>
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white text-[#121212] flex items-center justify-center shadow-lg group-hover/img:scale-110 group-hover/img:bg-[#F1A80A] transition-all">
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#F1A80A] transition-colors tracking-tight">
                  {specimen.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-white/70 leading-relaxed font-light mb-6">
                  {specimen.description}
                </p>

                {/* Quick Specs Matrix */}
                <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-slate-100/90 dark:bg-black/40 border border-slate-200/80 dark:border-white/5 text-xs">
                  <div>
                    <span className="text-[10px] font-sans uppercase tracking-wider text-[#02475E] dark:text-[#5BB1CD] font-bold block mb-0.5">
                      Flitch Cut
                    </span>
                    <span className="text-xs font-semibold text-slate-900 dark:text-white truncate block">
                      {specimen.flitchCut}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-sans uppercase tracking-wider text-[#02475E] dark:text-[#5BB1CD] font-bold block mb-0.5">
                      Sheet Format
                    </span>
                    <span className="text-xs font-semibold text-slate-900 dark:text-white truncate block">
                      {specimen.sheetFormat.split("(")[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                <button
                  onClick={() => openInspection(specimen)}
                  className="flex-1 py-3 px-4 rounded-full bg-slate-900 text-white hover:bg-[#F1A80A] hover:text-slate-950 dark:bg-white dark:text-[#121212] dark:hover:bg-[#F1A80A] text-center text-xs uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Specimen</span>
                </button>

                <a
                  href={`https://wa.me/9108087962121?text=${encodeURIComponent(
                    `Hello Ply Dot Com, I would like to request samples and pricing for ${specimen.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 border border-black/10 dark:border-white/15 text-xs font-semibold text-slate-800 dark:text-white hover:text-[#F1A80A] dark:hover:text-[#F1A80A] flex items-center gap-1.5 transition-all"
                  title="WhatsApp Sample Request"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#02475E] dark:text-[#5BB1CD]" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Bottom Architectural Pillars in Modern Pill Containers */}
        <div ref={pillarsRef} className="mt-12 pt-10 border-t border-slate-200 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-5 rounded-3xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-sm">
            <span className="text-xs font-sans uppercase tracking-widest text-[#F1A80A] font-bold block mb-1">
              Authentic Timber
            </span>
            <span className="text-xs text-slate-600 dark:text-white/70 font-normal">
              Natural flitches from sustainable global sources
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-sm">
            <span className="text-xs font-sans uppercase tracking-widest text-[#02475E] dark:text-[#5BB1CD] font-bold block mb-1">
              Calibrated Bonding
            </span>
            <span className="text-xs text-slate-600 dark:text-white/70 font-normal">
              Zero undulation on BWR & Marine calibrated cores
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-sm">
            <span className="text-xs font-sans uppercase tracking-widest text-slate-900 dark:text-white font-bold block mb-1">
              Precision Slicing
            </span>
            <span className="text-xs text-slate-600 dark:text-white/70 font-normal">
              Seamless flitch matching & continuous grain flow
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-sm">
            <span className="text-xs font-sans uppercase tracking-widest text-[#F1A80A] font-bold block mb-1">
              Bespoke Finishes
            </span>
            <span className="text-xs text-slate-600 dark:text-white/70 font-normal">
              Compatible with PU, matte, oil & wax treatments
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
