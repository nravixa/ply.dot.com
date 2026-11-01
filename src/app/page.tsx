import React from "react";
import HeroSection from "@/components/HeroSection";
import LumiereSwatchBar from "@/components/LumiereSwatchBar";
import SpecimenShowcaseSection from "@/components/SpecimenShowcaseSection";
import SpacesBentoSection from "@/components/SpacesBentoSection";
import MaterialJourneySection from "@/components/MaterialJourneySection";
import InteractiveEstimatorSection from "@/components/InteractiveEstimatorSection";
import ShowroomSusSection from "@/components/ShowroomSusSection";
import AuthorizedBrandsSection from "@/components/AuthorizedBrandsSection";
import DirectContactSection from "@/components/DirectContactSection";

export default function HomePage() {
  return (
    <div className="relative w-full overflow-hidden bg-transparent transition-colors duration-500">
      {/* 1. Hero Landing with Multi-layer Parallax (Curved Pavilion Villa over Reflective Water) */}
      <HeroSection />

      <div className="section-seam" />

      {/* 2. Architectural Swatch Spectrum */}
      <LumiereSwatchBar />

      <div className="section-seam" />

      {/* 3. Texture Gallery & 4 Architectural Specimens */}
      <SpecimenShowcaseSection />

      <div className="section-seam" />

      {/* 4. Spaces & Interior Bento */}
      <SpacesBentoSection />

      <div className="section-seam" />

      {/* 5. 4-Step Material Consultation Journey */}
      <MaterialJourneySection />

      <div className="section-seam" />

      {/* 6. Interactive Sheet & Plywood Estimator Tool */}
      <InteractiveEstimatorSection />

      <div className="section-seam" />

      {/* 7. Showroom in Sus, Pune & Interactive Google Maps */}
      <ShowroomSusSection />

      <div className="section-seam" />

      {/* 8. Authorized Brand Partnerships & Architect Testimonials */}
      <AuthorizedBrandsSection />

      <div className="section-seam" />

      {/* 9. Direct WhatsApp Enquiry & Contact */}
      <DirectContactSection />
    </div>
  );
}
