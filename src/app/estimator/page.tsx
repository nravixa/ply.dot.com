import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import InteractiveEstimatorSection from "@/components/InteractiveEstimatorSection";

export default function EstimatorPage() {
  return (
    <div className="min-h-screen bg-[#121212] pt-32 pb-24 text-[#F5EBE1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#5BB1CD] hover:text-[#F1A80A] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </Link>
      </div>
      <InteractiveEstimatorSection />
    </div>
  );
}
