"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, ArrowUpRight, Phone, MessageSquare, MapPin } from "lucide-react";
import BrandLogo from "./BrandLogo";

// Live Working Plywood Atelier & Veneer Calibration Interactive Canvas
function LiveWoodStudioCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1200);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 700);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Glowing warm timber sawdust motes drifting across the atelier light beams
    const particleCount = 42;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.45 + 0.15),
      speedX: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.25,
      color: Math.random() > 0.35 ? "#F1A80A" : "#FDE68A",
    }));

    // Live optical laser calibration beam gliding down the flitch stacks
    let scanLineY = 0;
    const scanSpeed = 0.75;

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const render = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Draw drifting amber timber motes
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += Math.sin(Date.now() * 0.002) * 0.006;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.12, Math.min(0.75, p.alpha));
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      // 2. Draw live optical laser calibration beam (scanning timber thickness)
      scanLineY = (scanLineY + scanSpeed) % (height * 0.65);
      const beamY = height * 0.12 + scanLineY;

      const laserGrad = ctx.createLinearGradient(0, beamY, width, beamY);
      laserGrad.addColorStop(0, "rgba(91, 177, 205, 0)");
      laserGrad.addColorStop(0.15, "rgba(91, 177, 205, 0.35)");
      laserGrad.addColorStop(0.5, "rgba(241, 168, 10, 0.85)");
      laserGrad.addColorStop(0.85, "rgba(91, 177, 205, 0.35)");
      laserGrad.addColorStop(1, "rgba(91, 177, 205, 0)");

      ctx.beginPath();
      ctx.moveTo(0, beamY);
      ctx.lineTo(width, beamY);
      ctx.strokeStyle = laserGrad;
      ctx.lineWidth = 1.4;
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#F1A80A";
      ctx.globalAlpha = 0.65;
      ctx.stroke();

      // Reset context
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const footerCardRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Subtle elevation scrub of Hero Footer Card
      if (footerCardRef.current) {
        gsap.fromTo(
          footerCardRef.current,
          { y: 22 },
          {
            y: -12,
            ease: "none",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.6,
            },
          }
        );
      }

      // 2. Inner atelier window image curtain parallax
      if (bgImageRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      }

      // 3. Deep depth monumental watermark parallax
      if (watermarkRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { y: 26 },
          {
            y: -18,
            ease: "none",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  // 3D Pointer Tilt Handler for the Hero Footer Card
  const handleFooterCardMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;
    gsap.to(el, {
      rotateX: -normY * 1.8,
      rotateY: normX * 1.8,
      duration: 0.45,
      ease: "power2.out",
      transformPerspective: 1600,
    });
  };

  const handleFooterCardLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "power3.out",
    });
  };

  const scrollToTop = () => {
    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (target: number, opts: { duration: number }) => void };
      }
    ).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer ref={footerRef} className="relative bg-transparent text-slate-700 dark:text-white overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* The Hero Footer Card (Exact match to reference image architectural layout) */}
        <div
          ref={footerCardRef}
          onPointerMove={handleFooterCardMove}
          onPointerLeave={handleFooterCardLeave}
          className="relative rounded-[32px] sm:rounded-[44px] overflow-hidden border border-slate-300/40 dark:border-white/15 bg-[#0b0e11] text-white shadow-[0_30px_100px_rgba(0,0,0,0.85)] p-6 sm:p-10 lg:p-14 will-change-transform"
        >
          {/* 1. Cinematic Background Image: Modern Architectural Plywood Atelier at Twilight with Curtain Parallax */}
          <div ref={bgImageRef} className="absolute inset-[-10%] w-[120%] h-[120%] z-0 overflow-hidden will-change-transform pointer-events-none">
            <Image
              src="/images/footer_ply_studio.jpg"
              alt="Ply Dot Com Architectural Woodworking Atelier at Twilight"
              fill
              sizes="100vw"
              className="object-cover object-center filter brightness-[0.72] contrast-[1.05]"
            />
            {/* Ambient Vignette Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e11] via-[#0b0e11]/60 to-[#0b0e11]/70 pointer-events-none" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#0b0e11]/40 to-[#0b0e11]/90 pointer-events-none" />
          </div>

          {/* 2. Live Working Ply Company Interactive Animation Layer */}
          <LiveWoodStudioCanvas />

          {/* 3. Top Row: Monogram & Bold Architectural Slogan (Matching Reference WORK FAST. LIVE SLOW.) */}
          <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-10 sm:pb-14 border-b border-white/15">
            {/* Top-Left: Minimal Architectural Monogram Logo */}
            <Link href="/" className="inline-block select-none group">
              <BrandLogo size="md" shape="circle" theme="dark" />
            </Link>

            {/* Top-Right: Slogan (Matching Reference WORK FAST. LIVE SLOW.) */}
            <div>
              <span className="text-xs sm:text-sm lg:text-base font-sans font-black tracking-[0.16em] uppercase text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                CRAFT DEEP. <span className="heading-accent font-black">BUILD TO ENDURE.</span>
              </span>
            </div>
          </div>

          {/* 4. Middle 3-Column Editorial Grid (Exact Reference Columns: MENU, SOCIALS, RESOURCES) */}
          <div className="relative z-20 pt-10 sm:pt-14 pb-8 sm:pb-12 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            {/* Column 1: MENU */}
            <div className="md:col-span-4">
              <span className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-white block mb-5 pb-2 border-b border-white/10">
                MENU
              </span>
              <ul className="flex flex-col gap-3 text-sm text-white/80 font-normal">
                <li>
                  <Link href="/#home" className="hover:text-[#F1A80A] transition-colors inline-block">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#specimens" className="hover:text-[#F1A80A] transition-colors inline-block">
                    Architectural Specimens
                  </Link>
                </li>
                <li>
                  <Link href="/#spaces" className="hover:text-[#F1A80A] transition-colors inline-block">
                    Spaces & Applications
                  </Link>
                </li>
                <li>
                  <Link href="/#palette-bar" className="hover:text-[#F1A80A] transition-colors inline-block">
                    Tonal Harmony Swatches
                  </Link>
                </li>
                <li>
                  <Link href="/#calculator" className="hover:text-[#F1A80A] transition-colors inline-block">
                    Sheet & Core Estimator
                  </Link>
                </li>
                <li>
                  <Link href="/#showroom" className="hover:text-[#F1A80A] transition-colors inline-block">
                    Sus Showroom & Bays
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: SOCIALS & DESK */}
            <div className="md:col-span-4">
              <span className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-white block mb-5 pb-2 border-b border-white/10">
                CONNECT
              </span>
              <div className="flex flex-col gap-3 text-sm text-white/80 font-normal">
                <a
                  href="https://wa.me/9108087962121"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F1A80A] transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#5BB1CD]" />
                  <span>WhatsApp Concierge</span>
                </a>
                <a
                  href="https://www.instagram.com/plydotcomindia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F1A80A] transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-3.5 h-3.5 text-[#5BB1CD]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span>Instagram (@plydotcomindia)</span>
                </a>
                <a
                  href="tel:08087962121"
                  className="hover:text-[#F1A80A] transition-colors flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#5BB1CD]" />
                  <span>Desk: +91 080 8796 2121</span>
                </a>
                <a
                  href="tel:8805621111"
                  className="hover:text-[#F1A80A] transition-colors flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#5BB1CD]" />
                  <span>Direct: +91 88056 21111</span>
                </a>
                <a
                  href="https://maps.google.com/maps?daddr=Sr%20No%2048%2C%2011%2F2%2C%20Sus%20-%20Pashan%20Rd%2C%20Tapkir%20Vasti%2C%20Sus%2C%20Pune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F1A80A] transition-colors flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#5BB1CD]" />
                  <span>Showroom: Sus - Pashan Rd, Pune</span>
                </a>
              </div>
            </div>

            {/* Column 3: RESOURCES & Send Message Button (Matching reference button) */}
            <div className="md:col-span-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-white block mb-5 pb-2 border-b border-white/10">
                  RESOURCES
                </span>
                <ul className="flex flex-col gap-2.5 text-sm text-white/80 font-normal mb-6">
                  <li>
                    <Link href="/catalogue" className="hover:text-[#F1A80A] transition-colors inline-block">
                      Natural Veneer Specimen Catalog
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-[#F1A80A] transition-colors inline-block">
                      About Ply Dot Com & Sourcing
                    </Link>
                  </li>
                  <li>
                    <span className="text-white/60 text-xs font-sans">
                      Dual-Side Calibrated IS:710 & IS:303
                    </span>
                  </li>
                  <li>
                    <span className="text-white/60 text-xs font-sans">
                      Authorized Wholesale Partner Network
                    </span>
                  </li>
                </ul>
              </div>

              {/* Pill Button: Send a message (Exact match to reference image button) */}
              <div className="pt-2">
                <a
                  href="https://wa.me/9108087962121?text=Hello%20Ply%20Dot%20Com%2C%20I%20would%20like%20to%20send%20an%20enquiry%20regarding%20architectural%20plywood%20and%20veneers."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between gap-3 px-6 py-3 rounded-full border border-white/30 hover:border-white bg-white/10 hover:bg-white text-white hover:text-black transition-all text-xs font-sans uppercase tracking-widest font-semibold shadow-xl group backdrop-blur-md"
                >
                  <span>Send a message</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* 5. Monumental Brand Watermark (Exact match to SUKOYA in reference image) with Deep Spatial Parallax */}
          <div ref={watermarkRef} className="relative z-10 w-full overflow-hidden select-none pointer-events-none -mb-3 sm:-mb-6 pt-6 will-change-transform">
            <div className="w-full text-center">
              <span className="font-sans font-black text-[13.5vw] sm:text-[15.5vw] lg:text-[16.5vw] tracking-[-0.04em] leading-[0.72] block uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-white/30 to-white/[0.03] drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                PLY DOT COM
              </span>
            </div>
          </div>
        </div>

        {/* 6. Sub-Footer Bar (Copyright, Back to Top, Legal & NRAXIXA signature) */}
        <div className="pt-8 px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-sans text-slate-600 dark:text-white/50">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            <span className="text-slate-800 dark:text-white/80 font-semibold">© {new Date().getFullYear()} Ply Dot Com</span>
            <span className="text-slate-400 dark:text-white/30">•</span>
            <span className="text-[#02475E] dark:text-[#5BB1CD] uppercase tracking-wider font-bold">The Material of Spaces</span>
            <span className="hidden sm:inline text-slate-400 dark:text-white/30">•</span>
            <span className="hidden sm:inline text-slate-600 dark:text-white/60 font-medium">Sus, Pune</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={scrollToTop}
              className="text-slate-600 hover:text-slate-900 dark:text-white/60 dark:hover:text-[#F1A80A] transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>


            {/* NRAXIXA signature mark */}
            <a
              href="https://nravixa.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 hover:bg-slate-900 text-slate-700 hover:text-white border border-slate-900/10 dark:bg-white/[0.06] dark:hover:bg-white dark:text-white dark:hover:text-[#121212] dark:border-white/15 transition-all duration-300 shadow-sm"
              title="Architectural Digital Experience by NRAXIXA"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F1A80A] group-hover:bg-[#F1A80A] dark:group-hover:bg-[#121212] transition-colors" />
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold">NRAXIXA</span>
              <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-white dark:text-white/60 dark:group-hover:text-[#121212] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
