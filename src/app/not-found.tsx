import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4 sm:p-8 text-[#F5EBE1] relative overflow-hidden">
      {/* Ambient auroras */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#02475E]/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#F1A80A]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-xl w-full text-center relative z-10 glass-panel p-8 sm:p-12 rounded-3xl border border-[#F5EBE1]/15 shadow-2xl bg-[#151a1c]/90">
        <h1 className="font-display font-black text-7xl sm:text-9xl text-[#F1A80A] tracking-tighter leading-none mb-4">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-serif text-[#F5EBE1] font-bold mb-4">
          Specimen Not Located
        </h2>

        <p className="text-xs sm:text-sm text-[#F5EBE1]/70 leading-relaxed font-light mb-8 max-w-md mx-auto">
          The architectural space, flitch catalog item, or link you navigated to has been moved or archived from our Sus library.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full gold-badge text-xs uppercase font-bold tracking-wider text-[#121212] inline-flex items-center justify-center gap-2 shadow-lg"
          >
            <Home className="w-4 h-4" />
            <span>Return to Landing Page</span>
          </Link>
          <Link
            href="/catalogue"
            className="w-full sm:w-auto px-6 py-3 rounded-full glass-pill text-xs uppercase font-semibold text-[#F5EBE1] hover:text-[#F1A80A] inline-flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#5BB1CD]" />
            <span>View Catalogue</span>
          </Link>
        </div>

        <span className="text-[10px] font-sans text-[#F5EBE1]/40 block mt-8">
          Ply Dot Com • The Material of Spaces • Sus, Pune
        </span>
      </div>
    </div>
  );
}
