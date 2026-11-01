import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DirectContactSection from "@/components/DirectContactSection";
import ShowroomSusSection from "@/components/ShowroomSusSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#121212] pt-32 pb-24 text-slate-900 dark:text-[#F5EBE1] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#02475E] dark:text-[#5BB1CD] hover:text-[#F1A80A] transition-colors mb-8 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </Link>
      </div>
      <DirectContactSection />
      <ShowroomSusSection />
    </div>
  );
}
