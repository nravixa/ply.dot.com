"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, MessageSquare, Phone, MapPin } from "lucide-react";

// Natural timber atelier dust motes floating in warm sunlight beams
function LiveTimberStudioCanvas() {
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

    // Warm golden timber sawdust motes drifting through bright daylight
    const isMobile = width < 768;
    const particleCount = isMobile ? 20 : 40;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * (isMobile ? 1.4 : 2.0) + 0.5,
      speedY: -(Math.random() * 0.3 + 0.1),
      speedX: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.4 + 0.2,
      color: Math.random() > 0.4 ? "#F1A80A" : "#FDE68A",
    }));

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const render = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Draw drifting sawdust motes in daylight
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += Math.sin(Date.now() * 0.002) * 0.004;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(0.6, p.alpha));
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

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

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(bgImageRef.current, {
        scale: 1.12,
        opacity: 0.7,
        duration: 1.8,
      }).from(
        contentRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 1.2,
        },
        "-=1.2"
      );

      // 2. Interactive Pointer Move 3D Parallax on Desktop
      const handlePointerMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;

        // Background gentle pan in reverse
        if (bgImageRef.current) {
          gsap.to(bgImageRef.current, {
            x: relX * -24,
            y: relY * -18,
            duration: 1.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        }

        // Foreground content subtle perspective float
        if (contentRef.current) {
          gsap.to(contentRef.current, {
            x: relX * 16,
            y: relY * 12,
            duration: 1.2,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      const container = containerRef.current;
      if (container && window.innerWidth >= 1024) {
        container.addEventListener("mousemove", handlePointerMove);
      }

      // 3. Multi-layer Scroll Parallax via ScrollTrigger
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // Background image moves down smoothly at majestic parallax ratio
      if (bgImageRef.current) {
        scrollTl.to(
          bgImageRef.current,
          {
            yPercent: 22,
            scale: 1.06,
            ease: "none",
          },
          0
        );
      }

      // Foreground content floats upward and softens gently
      if (contentRef.current) {
        scrollTl.to(
          contentRef.current,
          {
            yPercent: -28,
            opacity: 0.15,
            ease: "none",
          },
          0
        );
      }

      return () => {
        if (container) {
          container.removeEventListener("mousemove", handlePointerMove);
        }
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-[100svh] w-full bg-[#0b0e11] text-white overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-12 px-5 sm:px-10 lg:px-16"
    >
      {/* 1. Bright Sun-Drenched Architectural Atelier Background Image (Extended Height for Parallax Buffer) */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 z-0 w-full h-[135%] -top-[17.5%] pointer-events-none will-change-transform"
      >
        <Image
          src="/images/hero_bright_timber.jpg"
          alt="Bright sunlit luxury architectural woodworking atelier and blonde timber flitches"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.88] contrast-[1.03]"
        />

        {/* Soft, Non-Irritating Photographic Vignette Scrim (Ensures Crisp Readability without Blinding or Darkening) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e11] via-black/20 to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/45 pointer-events-none" />
      </div>

      {/* 2. Natural Ambient Dust Particles Canvas */}
      <LiveTimberStudioCanvas />

      {/* 3. Far Right Vertical Social Dock */}
      <div className="hidden lg:flex flex-col items-center gap-4 absolute right-6 top-1/2 -translate-y-1/2 z-20">
        <a
          href="https://wa.me/9108087962121?text=Hello%20Ply%20Dot%20Com%2C%20I%20would%20like%20to%20consult%20about%20materials."
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-black/40 hover:bg-white text-white hover:text-[#121212] border border-white/20 flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-md"
          title="WhatsApp Concierge"
          aria-label="WhatsApp Concierge"
        >
          <MessageSquare className="w-4 h-4" />
        </a>

        <a
          href="https://www.instagram.com/plydotcomindia/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-black/40 hover:bg-white text-white hover:text-[#121212] border border-white/20 flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-md"
          title="Instagram @plydotcomindia"
          aria-label="Instagram"
        >
          <svg
            className="w-4 h-4"
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
        </a>

        <a
          href="tel:08087962121"
          className="w-10 h-10 rounded-full bg-black/40 hover:bg-white text-white hover:text-[#121212] border border-white/20 flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-md"
          title="Call Showroom Desk"
          aria-label="Call Showroom Desk"
        >
          <Phone className="w-4 h-4" />
        </a>

        <a
          href="https://maps.google.com/maps?daddr=Sr%20No%2048%2C%2011%2F2%2C%20Sus%20-%20Pashan%20Rd%2C%20Tapkir%20Vasti%2C%20Sus%2C%20Pune"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-black/40 hover:bg-white text-white hover:text-[#121212] border border-white/20 flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-md"
          title="Sus Showroom Directions"
          aria-label="Showroom Directions"
        >
          <MapPin className="w-4 h-4" />
        </a>
      </div>

      {/* 4. Foreground Content Layer with Parallax Depth */}
      <div
        ref={contentRef}
        className="relative z-20 max-w-7xl mx-auto w-full my-auto py-8 sm:py-14 flex flex-col items-start select-none will-change-transform"
      >
        <h1 className="font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.25rem] tracking-[-0.04em] text-white uppercase leading-[0.91] drop-shadow-[0_4px_35px_rgba(0,0,0,0.9)]">
          PLYWOOD & <br />
          <span>VENEERS</span>
        </h1>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-3.5 pt-6 sm:pt-8">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-[#121212] font-sans text-xs font-bold uppercase tracking-wider shadow-xl hover:bg-[#F1A80A] hover:scale-105 active:scale-95 transition-all"
          >
            <span>Explore 50+ Flitches</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/#calculator"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/25 text-white font-sans text-xs font-semibold uppercase tracking-wider backdrop-blur-md active:scale-95 transition-all shadow-md"
          >
            <span>Sheet Estimator</span>
          </Link>

          <a
            href="https://wa.me/9108087962121?text=Hello%20Ply%20Dot%20Com%2C%20I%20would%20like%20to%20consult%20about%20materials."
            target="_blank"
            rel="noopener noreferrer"
            className="lg:hidden inline-flex items-center gap-2 px-4 py-3.5 rounded-full bg-black/40 border border-white/20 text-[#5BB1CD] font-sans text-xs backdrop-blur-md"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
