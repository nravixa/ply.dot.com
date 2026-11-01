"use client";

import React from "react";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  shape?: "squircle" | "circle";
  className?: string;
  theme?: "auto" | "dark" | "light";
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function BrandLogo({
  size = "sm",
  shape = "squircle",
  className = "",
  theme = "auto",
  onClick,
}: BrandLogoProps) {
  // Dimension mapping
  const badgeSizeClasses = {
    sm: "w-9 h-9 sm:w-10 sm:h-10",
    md: "w-11 h-11 sm:w-12 sm:h-12",
    lg: "w-13 h-13 sm:w-14 sm:h-14",
  }[size];

  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-2xl";
  const innerShapeClass = shape === "circle" ? "rounded-full" : "rounded-[14px]";

  const titleSizeClasses = {
    sm: "text-[14px] sm:text-[15.5px]",
    md: "text-[17px] sm:text-[19px]",
    lg: "text-[22px] sm:text-[26px]",
  }[size];

  const dotWordClasses = {
    sm: "text-[13px] sm:text-[14.5px]",
    md: "text-[16px] sm:text-[18px]",
    lg: "text-[20px] sm:text-[24px]",
  }[size];

  const badgeBg =
    theme === "dark"
      ? "bg-gradient-to-br from-white/[0.14] via-[#02475E]/30 to-[#121619]/90 border-white/20 text-white"
      : theme === "light"
      ? "bg-gradient-to-br from-slate-100 via-white to-slate-200 border-black/10 text-slate-900"
      : "bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-white/[0.14] dark:via-[#02475E]/30 dark:to-[#121619]/90 border-black/10 dark:border-white/20 text-slate-900 dark:text-white";

  const concentricBorder =
    theme === "dark"
      ? "border-white/10"
      : theme === "light"
      ? "border-black/5"
      : "border-black/5 dark:border-white/10";

  const textClass =
    theme === "dark"
      ? "text-white"
      : theme === "light"
      ? "text-slate-900"
      : "text-slate-900 dark:text-white";

  return (
    <div
      onClick={onClick}
      className={`group flex items-center gap-3 select-none cursor-pointer ${className}`}
      aria-label="Ply Dot Com - Luxury Architectural Plywood & Veneers, Sus Pune"
    >
      {/* Architectural Monogram Emblem Badge */}
      <div
        className={`relative ${badgeSizeClasses} ${shapeClass} ${badgeBg} border backdrop-blur-xl shadow-md group-hover:scale-105 group-hover:border-[#F1A80A]/60 group-hover:shadow-[0_0_22px_rgba(241,168,10,0.3)] transition-all duration-300 flex items-center justify-center p-2 overflow-hidden flex-shrink-0`}
      >
        {/* Subtle radial ambient warmth behind glyph */}
        <div className="absolute inset-0 bg-radial from-[#F1A80A]/15 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Concentric hairline border */}
        <div
          className={`absolute inset-0.5 ${innerShapeClass} border ${concentricBorder} pointer-events-none`}
        />

        {/* Bespoke Architectural Glyphic Vector: Letter "P" with timber flitch column, cantilever loop & illuminated amber "." */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 transition-transform duration-300 group-hover:scale-[1.04]"
        >
          <defs>
            <linearGradient id="ply-amber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="50%" stopColor="#F1A80A" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* Timber Flitch Column (The Structural Stem of the P) */}
          <rect
            x="6.75"
            y="6"
            width="3.5"
            height="20"
            rx="1.75"
            fill="currentColor"
          />

          {/* Internal Flitch Grain / Cross-ply Core Line */}
          <line
            x1="8.5"
            y1="8.5"
            x2="8.5"
            y2="23.5"
            stroke="#02475E"
            strokeWidth="0.75"
            strokeLinecap="round"
          />

          {/* Architectural Cantilever Loop (The Head of the P) */}
          <path
            d="M10.25 8H17.25C20.5637 8 23.25 10.6863 23.25 14C23.25 17.3137 20.5637 20 17.25 20H10.25"
            stroke="currentColor"
            strokeWidth="3.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Radiant Core Amber Dot (Representing the '.' in 'P.' and 'PLY DOT COM') */}
          <circle
            cx="22.5"
            cy="23.5"
            r="2.6"
            fill="url(#ply-amber-grad)"
            className="drop-shadow-[0_0_8px_rgba(241,168,10,0.85)]"
          />
        </svg>
      </div>

      {/* Typographic Brand Lockup: PLY DOT COM */}
      <div className="flex items-baseline gap-1 font-sans leading-none select-none">
        <span
          className={`${titleSizeClasses} font-black tracking-[0.06em] ${textClass} group-hover:text-[#F1A80A] transition-colors`}
        >
          PLY
        </span>
        <span
          className={`${dotWordClasses} font-black tracking-[0.08em] text-[#F1A80A] drop-shadow-[0_0_12px_rgba(241,168,10,0.55)]`}
        >
          DOT
        </span>
        <span
          className={`${titleSizeClasses} font-black tracking-[0.06em] ${textClass} transition-colors`}
        >
          COM
        </span>
      </div>
    </div>
  );
}
