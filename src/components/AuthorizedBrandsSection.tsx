"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Star } from "lucide-react";
import { AUTHORIZED_BRANDS } from "@/data/specimens";

const TESTIMONIALS = [
  {
    quote:
      "For our high-end residential penthouses in Baner and Koregaon Park, Ply Dot Com is our only trusted source for zero-undulation calibrated plywood and bookmatched burl veneers.",
    author: "Ar. Rajeshwari Kulkarni",
    role: "Principal Architect, Studio Vistara",
    project: "Sky Villa Penthouse, Pune",
  },
  {
    quote:
      "Their IS:710 Marine Calibrated cores eliminated kitchen shutter warping completely. The team's deep knowledge of core density and adhesives saves us weeks on site.",
    author: "Sameer Deshmukh",
    role: "Interior Contractor & Millwork Specialist",
    project: "24 Luxury Residences, Sus",
  },
  {
    quote:
      "Having 8ft × 4ft full flitches displayed under natural showroom lighting in Sus makes client presentations seamless. Transparent pricing and immediate wholesale stock.",
    author: "Neha Singhania",
    role: "Lead Interior Designer, Design Grid",
    project: "Corporate HQ, Hinjewadi",
  },
];

export default function AuthorizedBrandsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const brandRowRef = useRef<HTMLDivElement>(null);
  const testimonialRowRef = useRef<HTMLDivElement>(null);
  const brandCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const testimonialCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Ambient glow scroll parallax
      gsap.fromTo(
        ".brand-glow",
        { y: -40 },
        {
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );

      // 2. Header smooth parallax scrub
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

      // 3. Staggered brand cards scroll elevation wave (desktop)
      if (typeof window !== "undefined" && window.innerWidth >= 768) {
        const brandOffsets = [-10, 8, -12, 10, -8];
        brandCardsRef.current.forEach((card, idx) => {
          if (!card) return;
          const offset = brandOffsets[idx % brandOffsets.length];
          gsap.fromTo(
            card,
            { y: -offset },
            {
              y: offset,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom+=100",
                end: "bottom top",
                scrub: 0.7,
              },
            }
          );
        });

        // 4. Staggered testimonial cards scroll elevation wave
        const testimonialOffsets = [-14, 12, -14];
        testimonialCardsRef.current.forEach((card, idx) => {
          if (!card) return;
          const offset = testimonialOffsets[idx % testimonialOffsets.length];
          gsap.fromTo(
            card,
            { y: -offset },
            {
              y: offset,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom+=80",
                end: "bottom top",
                scrub: 0.7,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D Pointer Tilt Handlers for Brand Cards
  const handleBrandPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;
    gsap.to(el, {
      rotateX: -normY * 4.5,
      rotateY: normX * 4.5,
      scale: 1.025,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleBrandPointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  // 3D Pointer Tilt Handlers for Testimonial Cards
  const handleTestimonialPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;
    gsap.to(el, {
      rotateX: -normY * 4,
      rotateY: normX * 4,
      scale: 1.015,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 1200,
    });
  };

  const handleTestimonialPointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 bg-transparent overflow-hidden border-t border-white/5">
      {/* Background glow with scroll parallax */}
      <div className="brand-glow absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#02475E]/15 rounded-full blur-[140px] pointer-events-none will-change-transform" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 will-change-transform">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold text-white tracking-[-0.03em] mb-4 leading-[1.08]">
            Authorized <span className="heading-accent font-extrabold">Brand Network</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
            Authorized wholesale distributor of India&apos;s most rigorously tested and environmentally certified plywood and luxury surface manufacturers.
          </p>
        </div>

        {/* Brands Minimalist Grid with 3D Parallax Tilt */}
        <div ref={brandRowRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-20">
          {AUTHORIZED_BRANDS.map((brand, idx) => (
            <div
              key={brand.name}
              ref={(el) => {
                brandCardsRef.current[idx] = el;
              }}
              onPointerMove={handleBrandPointerMove}
              onPointerLeave={handleBrandPointerLeave}
              className="morden-card-dark rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-lg group hover:border-white/30 transition-colors will-change-transform cursor-pointer"
            >
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#5BB1CD] mb-1.5">
                {brand.tier}
              </span>
              <h3 className="font-sans font-extrabold text-base sm:text-lg text-white group-hover:text-[#F1A80A] transition-colors tracking-tight mb-0.5">
                {brand.name}
              </h3>
              <span className="text-[10px] text-white/60 font-sans">
                {brand.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Architect Reviews Grid with 3D Parallax Tilt */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <h3 className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight">
              Architectural <span className="heading-accent font-extrabold">Testimonials</span>
            </h3>
            <div className="flex items-center gap-1 text-[#F1A80A]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
          </div>

          <div ref={testimonialRowRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  testimonialCardsRef.current[idx] = el;
                }}
                onPointerMove={handleTestimonialPointerMove}
                onPointerLeave={handleTestimonialPointerLeave}
                className="morden-card-dark rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl group hover:border-white/30 transition-colors bg-[#151a1c]/90 will-change-transform"
              >
                <div className="mb-6">
                  <span className="text-3xl font-serif text-[#F1A80A]/60 block leading-none mb-2 font-black">
                    “
                  </span>
                  <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed italic">
                    {t.quote}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="font-sans font-bold text-sm text-white">
                    {t.author}
                  </h4>
                  <span className="text-[11px] font-sans text-[#5BB1CD] block">
                    {t.role}
                  </span>
                  <span className="text-[10px] font-sans text-white/50 block mt-0.5">
                    Project: {t.project}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
