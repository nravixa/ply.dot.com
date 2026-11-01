"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Search, Eye, MessageSquare, ArrowUpRight, ArrowLeft } from "lucide-react";
import { ARCHITECTURAL_SPECIMENS, Specimen } from "@/data/specimens";

export default function CataloguePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Exotic Collection", "Architectural Series", "Heritage Line", "Signature Dark Series"];

  const filteredSpecimens = ARCHITECTURAL_SPECIMENS.filter((spec) => {
    const matchesSearch =
      spec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spec.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spec.recommendedUse.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || spec.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openInspection = (specimen: Specimen) => {
    window.dispatchEvent(
      new CustomEvent("open-specimen-modal", { detail: specimen })
    );
  };

  const handleCardPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
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
      scale: 1.018,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 1200,
    });
  };

  const handleCardPointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#121212] pt-32 pb-24 text-slate-900 dark:text-[#F5EBE1] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#02475E] dark:text-[#5BB1CD] hover:text-[#F1A80A] transition-colors mb-8 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-6xl font-sans font-bold text-slate-900 dark:text-white tracking-[-0.03em]">
            SPECIMEN <span className="heading-accent font-extrabold">CATALOGUE</span>.
          </h1>
        </div>

        {/* Search & Category Filter */}
        <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-[#F5EBE1]/10 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5BB1CD]" />
            <input
              type="text"
              placeholder="Search grain, species, use..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-[#F5EBE1] placeholder-slate-400 dark:placeholder-[#F5EBE1]/30 focus:outline-none focus:border-[#F1A80A]"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "gold-badge shadow-md"
                    : "glass-pill text-slate-700 dark:text-[#F5EBE1]/70 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Specimens Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpecimens.map((specimen) => (
            <div
              key={specimen.id}
              onPointerMove={handleCardPointerMove}
              onPointerLeave={handleCardPointerLeave}
              className="glass-panel rounded-3xl p-6 border border-slate-200/80 dark:border-[#F5EBE1]/10 hover:border-[#F1A80A]/40 transition-colors flex flex-col justify-between group shadow-xl bg-white/90 dark:bg-[#151a1c] will-change-transform cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-sans uppercase tracking-wider text-[#F1A80A] font-bold">
                    {specimen.category}
                  </span>
                  <span className="text-[10px] font-sans px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[#02475E] dark:text-[#5BB1CD] font-medium">
                    {specimen.tag}
                  </span>
                </div>

                <div
                  onClick={() => openInspection(specimen)}
                  className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 cursor-pointer group/img"
                >
                  <Image
                    src={specimen.image}
                    alt={specimen.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover/img:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] font-sans text-[#F5EBE1] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5">
                      <Eye className="w-3 h-3 text-[#F1A80A]" />
                      <span>Inspect Grain</span>
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#F1A80A] text-[#121212] flex items-center justify-center">
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-[#F5EBE1] mb-2 group-hover:text-[#F1A80A] transition-colors">
                  {specimen.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-[#F5EBE1]/70 leading-relaxed font-light mb-4 line-clamp-3">
                  {specimen.fullDescription}
                </p>

                <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-black/40 border border-slate-200/60 dark:border-white/5 text-[11px] font-sans text-[#02475E] dark:text-[#5BB1CD] mb-6">
                  Recommended: {specimen.recommendedUse}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-slate-200 dark:border-[#F5EBE1]/10">
                <button
                  onClick={() => openInspection(specimen)}
                  className="flex-1 py-2.5 rounded-full gold-badge text-xs uppercase font-bold tracking-wider text-[#121212]"
                >
                  View Details
                </button>
                <a
                  href={`https://wa.me/9108087962121?text=${encodeURIComponent(
                    `Hello Ply Dot Com, I am enquiring about ${specimen.name} from the online catalogue.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full glass-pill text-[#5BB1CD] hover:text-[#F1A80A]"
                  title="WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
