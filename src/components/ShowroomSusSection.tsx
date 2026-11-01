"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Clock, Navigation, Calendar } from "lucide-react";

export default function ShowroomSusSection() {
  const [activeTab, setActiveTab] = useState<"map" | "interior">("map");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const handleCardPointerMove = (e: React.PointerEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement | null>) => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const card = ref.current;
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

  const handleCardPointerLeave = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Ambient Teal Aurora parallax
      const glow = sectionRef.current?.querySelector(".showroom-glow");
      if (glow) {
        gsap.fromTo(
          glow,
          { y: -45, scale: 0.92 },
          {
            y: 45,
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

      // 2. Header smooth parallax scrub
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 30 },
          {
            y: -30,
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

      // 3. Columns counter-parallax scrub on Desktop
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop && leftColRef.current && rightColRef.current) {
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

      // 4. ERA Residence Signature Inner Image Curtain Parallax (Masked Window)
      if (leftColRef.current) {
        const innerImg = leftColRef.current.querySelector(".showroom-inner-img");
        if (innerImg) {
          gsap.fromTo(
            innerImg,
            { yPercent: -14, scale: 1.06 },
            {
              yPercent: 14,
              scale: 1.0,
              ease: "none",
              scrollTrigger: {
                trigger: leftColRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="showroom"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-transparent overflow-hidden border-t border-slate-200/60 dark:border-white/5"
    >
      {/* Background Teal Aurora */}
      <div className="showroom-glow absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#02475E]/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-14 sm:mb-16 will-change-transform">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold text-slate-900 dark:text-white tracking-[-0.03em] leading-[1.08]">
            See It <span className="heading-accent font-extrabold">In Person</span>
          </h2>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Map & Interior View */}
          <div
            ref={leftColRef}
            onPointerMove={(e) => handleCardPointerMove(e, leftColRef)}
            onPointerLeave={() => handleCardPointerLeave(leftColRef)}
            className="lg:col-span-7 flex flex-col justify-between morden-card-dark rounded-3xl p-4 sm:p-6 shadow-2xl bg-[#151a1c]/90 will-change-transform"
          >
            {/* Tab Toggle */}
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("map")}
                  className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all ${
                    activeTab === "map"
                      ? "bg-slate-900 text-white dark:bg-white dark:text-[#121212] font-bold shadow-md"
                      : "bg-slate-100 text-slate-700 hover:text-slate-950 dark:bg-white/[0.06] dark:text-white/70 dark:hover:text-white"
                  }`}
                >
                  Interactive GPS Map
                </button>
                <button
                  onClick={() => setActiveTab("interior")}
                  className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all ${
                    activeTab === "interior"
                      ? "bg-slate-900 text-white dark:bg-white dark:text-[#121212] font-bold shadow-md"
                      : "bg-slate-100 text-slate-700 hover:text-slate-950 dark:bg-white/[0.06] dark:text-white/70 dark:hover:text-white"
                  }`}
                >
                  Showroom Bays
                </button>
              </div>

              <span className="text-[11px] font-sans text-[#02475E] dark:text-[#5BB1CD] font-medium hidden sm:inline">
                Sus - Pashan Rd, Pune
              </span>
            </div>

            {/* Media Display */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-black">
              {activeTab === "map" ? (
                <iframe
                  title="Ply Dot Com Sus Pune Showroom Location Map"
                  src="https://maps.google.com/maps?q=Sr%20No%2048%2C%2011%2F2%2C%20Sus%20-%20Pashan%20Rd%2C%20near%20Shell%20Petrol%20Pump%2C%20Tapkir%20Vasti%2C%20Sus%2C%20Pune%2C%20Maharashtra%20411021&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter grayscale-[0.2] contrast-[1.1]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="relative w-full h-full overflow-hidden">
                  <div className="showroom-inner-img absolute inset-0 h-[135%] -top-[17.5%] w-full will-change-transform">
                    <Image
                      src="/images/showroom_interior.jpg"
                      alt="Ply Dot Com Showroom Bays Sus Pune"
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-xs font-sans text-white flex items-center justify-between z-10">
                    <span>Full-Scale 8ft × 4ft Natural Veneer Specimen Bays</span>
                    <span className="text-[#F1A80A]">Sus Showroom</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 mt-2 border-t border-slate-200 dark:border-white/10">
              <a
                href="https://maps.google.com/maps?daddr=Sr%20No%2048%2C%2011%2F2%2C%20Sus%20-%20Pashan%20Rd%2C%20near%20Shell%20Petrol%20Pump%2C%20Tapkir%20Vasti%2C%20Sus%2C%20Pune%2C%20Maharashtra%20411021"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-slate-900 text-white hover:bg-[#F1A80A] hover:text-[#121212] dark:bg-white dark:text-[#121212] dark:hover:bg-[#F1A80A] text-xs uppercase font-bold tracking-wider inline-flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get GPS Directions (Google Maps)</span>
              </a>

              <span className="text-xs font-sans text-slate-500 dark:text-white/50">
                Near Shell Petrol Pump, Sus
              </span>
            </div>
          </div>

          {/* Right Column: Address, Hours, Consultation Form */}
          <div
            ref={rightColRef}
            className="lg:col-span-5 flex flex-col justify-between morden-card-dark rounded-3xl p-6 sm:p-8 shadow-2xl bg-[#151a1c]/90 will-change-transform"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                Material Inspection Center
              </h3>

              {/* Address Card */}
              <div className="p-4 rounded-2xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 mb-4 flex items-start gap-3 shadow-sm">
                <MapPin className="w-5 h-5 text-[#D97706] dark:text-[#F1A80A] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-sans uppercase tracking-wider text-[#02475E] dark:text-[#5BB1CD] font-bold block mb-1">
                    Showroom Address
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-white/90 leading-relaxed font-normal">
                    Sr No 48, 11/2, Sus - Pashan Rd, near Shell Petrol Pump, Tapkir Vasti, Sus, Pune, Maharashtra 411021
                  </p>
                </div>
              </div>

              {/* Hours Card */}
              <div className="p-4 rounded-2xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 mb-4 flex items-start gap-3 shadow-sm">
                <Clock className="w-5 h-5 text-[#02475E] dark:text-[#5BB1CD] flex-shrink-0 mt-0.5" />
                <div className="w-full text-xs">
                  <span className="font-sans uppercase tracking-wider text-[#02475E] dark:text-[#5BB1CD] font-bold block mb-1">
                    Operating Hours
                  </span>
                  <div className="flex justify-between py-1 border-b border-slate-200/80 dark:border-white/5 text-slate-800 dark:text-white/90 font-medium">
                    <span>Monday – Saturday:</span>
                    <span className="font-sans text-[#D97706] dark:text-[#F1A80A] font-bold">9:30 AM – 8:00 PM</span>
                  </div>
                  <div className="flex justify-between pt-1 text-slate-800 dark:text-white/90 font-medium">
                    <span>Sunday:</span>
                    <span className="font-sans text-[#02475E] dark:text-[#5BB1CD] font-bold">10:00 AM – 5:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Direct Lines */}
              <div className="p-4 rounded-2xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 mb-6 flex items-start gap-3 shadow-sm">
                <Phone className="w-5 h-5 text-[#D97706] dark:text-[#F1A80A] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-sans uppercase tracking-wider text-[#02475E] dark:text-[#5BB1CD] font-bold block mb-1">
                    Direct Showroom Inquiries
                  </span>
                  <div className="flex flex-wrap gap-3 text-xs sm:text-sm font-sans text-slate-800 dark:text-white/90 font-semibold">
                    <a href="tel:08087962121" className="hover:text-[#D97706] dark:hover:text-[#F1A80A] transition-colors">
                      +91 080 8796 2121
                    </a>
                    <span className="text-slate-400 dark:text-white/40">/</span>
                    <a href="tel:8805621111" className="hover:text-[#D97706] dark:hover:text-[#F1A80A] transition-colors">
                      +91 88056 21111
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Visit WhatsApp */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10">
              <a
                href="https://wa.me/9108087962121?text=Hello%20Ply%20Dot%20Com%2C%20I%20would%20like%20to%20schedule%20a%20private%20showroom%20visit%20in%20Sus%2C%20Pune."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-slate-900 text-white hover:bg-[#F1A80A] hover:text-[#121212] dark:bg-white dark:text-[#121212] dark:hover:bg-[#F1A80A] text-center text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Private Showroom Visit</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
