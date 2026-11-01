"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, MessageSquare, Phone, CheckCircle2, Layers, Maximize2, ShieldCheck } from "lucide-react";
import { ARCHITECTURAL_SPECIMENS, Specimen } from "@/data/specimens";

export default function SpecimenInspectionModal() {
  const [selectedSpecimen, setSelectedSpecimen] = useState<Specimen | null>(null);
  const [zoomActive, setZoomActive] = useState(false);

  useEffect(() => {
    const handleOpen = (e: CustomEvent<Specimen | string>) => {
      if (typeof e.detail === "string") {
        const found = ARCHITECTURAL_SPECIMENS.find((s) => s.id === e.detail);
        if (found) setSelectedSpecimen(found);
      } else {
        setSelectedSpecimen(e.detail);
      }
    };

    window.addEventListener("open-specimen-modal" as unknown as keyof WindowEventMap, handleOpen as EventListener);
    return () => {
      window.removeEventListener("open-specimen-modal" as unknown as keyof WindowEventMap, handleOpen as EventListener);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedSpecimen(null);
    };
    if (selectedSpecimen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedSpecimen]);

  if (!selectedSpecimen) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello Ply Dot Com, I am interested in requesting a flitch sample / quote for the "${selectedSpecimen.name}" (${selectedSpecimen.category}). Please share availability and showroom viewing details.`
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-xl animate-fadeIn">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={() => setSelectedSpecimen(null)} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto glass-panel rounded-3xl border border-[#F5EBE1]/20 shadow-2xl flex flex-col lg:flex-row bg-[#121212]/95">
        {/* Close Button */}
        <button
          onClick={() => setSelectedSpecimen(null)}
          className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full glass-panel flex items-center justify-center text-[#F5EBE1] hover:text-[#F1A80A] hover:scale-105 transition-all"
          aria-label="Close specimen inspection"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image & Zoom Preview */}
        <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#F5EBE1]/10 bg-gradient-to-br from-[#02475E]/30 to-[#121212]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-[10px] tracking-widest font-sans uppercase bg-[#F1A80A]/20 text-[#F1A80A] border border-[#F1A80A]/30">
                {selectedSpecimen.tag}
              </span>
              <button
                onClick={() => setZoomActive(!zoomActive)}
                className="inline-flex items-center gap-1.5 text-xs text-[#5BB1CD] hover:text-[#F1A80A] transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{zoomActive ? "Standard View" : "Macro Zoom"}</span>
              </button>
            </div>

            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#F5EBE1]/15 group cursor-crosshair shadow-2xl">
              <Image
                src={selectedSpecimen.image}
                alt={selectedSpecimen.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`object-cover transition-transform duration-700 ease-out ${
                  zoomActive ? "scale-150" : "scale-100 group-hover:scale-110"
                }`}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-sans text-[#F5EBE1]/90 flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-[#F1A80A]" />
                <span>Authentic Flitch Specimen</span>
              </div>
            </div>
          </div>

          {/* Quick Core Spec Pills */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] uppercase font-sans tracking-wider text-[#5BB1CD] block">Sheet Format</span>
              <span className="text-xs font-semibold text-[#F5EBE1]">{selectedSpecimen.sheetFormat}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] uppercase font-sans tracking-wider text-[#5BB1CD] block">Flitch Cut</span>
              <span className="text-xs font-semibold text-[#F5EBE1]">{selectedSpecimen.flitchCut}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Specifications */}
        <div className="lg:w-1/2 p-6 sm:p-8 sm:pr-12 flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <span className="text-xs font-sans uppercase tracking-widest text-[#F1A80A] block mb-1">
                {selectedSpecimen.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#F5EBE1] font-bold">
                {selectedSpecimen.name}
              </h2>
            </div>

            <p className="text-sm text-[#F5EBE1]/80 leading-relaxed font-light mb-6">
              {selectedSpecimen.fullDescription}
            </p>

            {/* Spec Matrix */}
            <div className="flex flex-col gap-3.5 mb-6 pb-6 border-b border-[#F5EBE1]/10 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#F1A80A] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#F5EBE1] block">Grain Character:</span>
                  <span className="text-[#F5EBE1]/70">{selectedSpecimen.grainCharacter}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Layers className="w-4 h-4 text-[#5BB1CD] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#F5EBE1] block">Calibrated Core:</span>
                  <span className="text-[#F5EBE1]/70">{selectedSpecimen.coreOption}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Layers className="w-4 h-4 text-[#F1A80A] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#F5EBE1] block">Recommended Finishes:</span>
                  <span className="text-[#F5EBE1]/70">{selectedSpecimen.finishOption}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#5BB1CD] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#F5EBE1] block">Warranty & Durability:</span>
                  <span className="text-[#F5EBE1]/70">{selectedSpecimen.warranty}</span>
                </div>
              </div>
            </div>

            {/* Applications */}
            <div className="mb-6">
              <span className="text-[11px] font-sans uppercase tracking-wider text-[#F5EBE1]/60 block mb-2">
                Ideal Architectural Applications:
              </span>
              <p className="text-xs text-[#5BB1CD] font-medium leading-relaxed bg-[#02475E]/30 p-3 rounded-xl border border-[#02475E]">
                {selectedSpecimen.recommendedUse}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#F5EBE1]/10">
            <a
              href={`https://wa.me/9108087962121?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-full gold-badge text-center text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Request Flitch Sample</span>
            </a>
            <a
              href="tel:08087962121"
              className="py-3 px-5 rounded-full glass-pill text-center text-xs font-semibold text-[#F5EBE1] hover:text-[#F1A80A] flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#5BB1CD]" />
              <span>Call Showroom</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
