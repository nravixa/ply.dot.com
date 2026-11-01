"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass, Layers, GitCompare, CheckCircle2, MessageSquare } from "lucide-react";

import Image from "next/image";

const STEPS = [
  {
    num: "01",
    title: "Understand the Requirement",
    short: "Requirement Analysis",
    image: "/images/minimalist_living_lounge.jpg",
    icon: Compass,
    description:
      "Start with where and how the timber will be used. Every space has distinct demands—from high-moisture kitchen under-sinks to load-bearing ceiling structures.",
    highlight: "Zero Compromise on Functional Environment",
  },
  {
    num: "02",
    title: "Choose the Right Core",
    short: "Core & Grade Selection",
    image: "/images/architectural_flitch_macro.jpg",
    icon: Layers,
    description:
      "Explore suitable plywood options curated for your intended application. We balance boiling water resistance (IS:710), dual-side calibration (±0.1mm), and surface grain.",
    highlight: "IS:710 Marine Calibrated & E0 Formaldehyde Core",
  },
  {
    num: "03",
    title: "Compare Available Options",
    short: "Side-by-Side Verification",
    image: "/images/showroom_samples.jpg",
    icon: GitCompare,
    description:
      "Discuss material properties, core density, and natural timber flitch matches directly with our specialists. Touch real grain samples under showroom daylight.",
    highlight: "Hands-on Specimen Inspection in Sus Showroom",
  },
  {
    num: "04",
    title: "Make an Informed Decision",
    short: "Confidence & Warranty",
    image: "/images/modern_cantilever_house.jpg",
    icon: CheckCircle2,
    description:
      "Get the exact technical specifications, batch calibration certificates, and manufacturer warranty you need to build with complete architectural confidence.",
    highlight: "Official Lifetime Guarantee Support",
  },
];

export default function MaterialJourneySection() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const calloutRef = useRef<HTMLDivElement>(null);

  const handleStepPointerMove = (e: React.PointerEvent<HTMLDivElement>, idx: number) => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const card = stepsRef.current[idx];
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
  };

  const handleStepPointerLeave = (idx: number) => {
    const card = stepsRef.current[idx];
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
      const glow = containerRef.current?.querySelector(".journey-glow");
      if (glow) {
        gsap.fromTo(
          glow,
          { y: -45, scale: 0.92 },
          {
            y: 45,
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
      const stepOffsets = isDesktop ? [-14, 14, -14, 14] : [0, 0, 0, 0];

      stepsRef.current.forEach((step, idx) => {
        if (!step) return;

        if (isDesktop) {
          const offset = stepOffsets[idx % stepOffsets.length];
          gsap.fromTo(
            step,
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

        const innerImg = step.querySelector(".journey-inner-img");
        if (innerImg) {
          gsap.fromTo(
            innerImg,
            { yPercent: -14, scale: 1.06 },
            {
              yPercent: 14,
              scale: 1.0,
              ease: "none",
              scrollTrigger: {
                trigger: step,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          );
        }
      });

      // 4. WhatsApp callout card scrub
      if (calloutRef.current) {
        gsap.fromTo(
          calloutRef.current,
          { y: 30, scale: 0.98 },
          {
            y: -15,
            scale: 1.01,
            ease: "none",
            scrollTrigger: {
              trigger: calloutRef.current,
              start: "top 95%",
              end: "bottom 55%",
              scrub: 0.6,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative py-24 sm:py-32 bg-transparent overflow-hidden border-t border-slate-200/60 dark:border-white/5"
    >
      {/* Background Petrol Glow */}
      <div className="journey-glow absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#02475E]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-14 sm:mb-16 will-change-transform">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold text-slate-900 dark:text-white tracking-[-0.03em] leading-[1.08]">
            Why <span className="heading-accent font-extrabold">Ply Dot Com</span>
          </h2>
        </div>

        {/* 4 Modern Step Cards with Inset Architectural Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                ref={(el) => { stepsRef.current[idx] = el; }}
                onPointerMove={(e) => handleStepPointerMove(e, idx)}
                onPointerLeave={() => handleStepPointerLeave(idx)}
                className="morden-card-dark rounded-[28px] p-5 sm:p-6 flex flex-col justify-between shadow-2xl group transition-all duration-300 bg-[#151a1c]/90 will-change-transform"
              >
                <div>
                  {/* Step Image Window (ERA Residence Masked Curtain) */}
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5 border border-white/10 bg-black/60">
                    <div className="journey-inner-img absolute inset-0 h-[135%] -top-[17.5%] w-full will-change-transform">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out filter brightness-95"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Step Peach Badge in top-right */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="morden-badge-peach">
                        Step {step.num}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 text-[10px] font-sans text-[#5BB1CD] uppercase tracking-wider flex items-center gap-1.5">
                      <Icon className="w-3 h-3 text-[#F1A80A]" />
                      <span>{step.short}</span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-sans font-bold text-white mb-2.5 group-hover:text-[#F1A80A] transition-colors leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-white/70 font-light leading-relaxed mb-5">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-white/10">
                  <span className="text-[10px] font-sans text-[#5BB1CD] block">
                    ✓ {step.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Callout Pill */}
        <div
          ref={calloutRef}
          onPointerMove={(e) => {
            if (typeof window === "undefined" || window.innerWidth < 768) return;
            const card = calloutRef.current;
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
          }}
          onPointerLeave={() => {
            if (calloutRef.current) {
              gsap.to(calloutRef.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
            }
          }}
          className="mt-16 morden-card-dark rounded-3xl p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-slate-100 via-white to-slate-100 dark:from-[#02475E]/40 dark:via-[#151a1c] dark:to-[#02475E]/30 will-change-transform shadow-2xl border border-black/10 dark:border-white/10"
        >
          <div>
            <span className="text-xs font-sans uppercase tracking-widest text-[#02475E] dark:text-[#5BB1CD] font-bold block mb-1">
              NOT SURE WHAT YOU NEED?
            </span>
            <h3 className="text-xl sm:text-2xl font-sans font-bold text-slate-900 dark:text-white">
              Discuss Your Material Blueprint with Experts
            </h3>
          </div>

          <a
            href="https://wa.me/9108087962121?text=Hello%20Ply%20Dot%20Com%2C%20I%20would%20like%20guidance%20on%20choosing%20the%20right%20plywood%20for%20my%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-slate-900 text-white hover:bg-[#F1A80A] hover:text-[#121212] dark:bg-white dark:text-[#121212] dark:hover:bg-[#F1A80A] text-xs uppercase font-bold tracking-wider inline-flex items-center justify-center gap-2 shadow-2xl flex-shrink-0 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>TALK TO US ON WHATSAPP</span>
          </a>
        </div>
      </div>
    </section>
  );
}
