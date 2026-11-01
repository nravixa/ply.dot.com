export interface Specimen {
  id: string;
  name: string;
  category: string;
  tag: string;
  colorCode: string;
  image: string;
  description: string;
  fullDescription: string;
  grainCharacter: string;
  flitchCut: string;
  sheetFormat: string;
  coreOption: string;
  finishOption: string;
  recommendedUse: string;
  durabilityRating: string;
  moistureResistance: string;
  warranty: string;
}

export const ARCHITECTURAL_SPECIMENS: Specimen[] = [
  {
    id: "figured-amber-burl",
    name: "Figured Amber Burl",
    category: "Exotic Collection",
    tag: "Rare Flitch",
    colorCode: "#F1A80A",
    image: "/images/specimen_figured_amber_burl.jpg",
    description:
      "Rare swirling burl grain with deep golden-amber hues, capturing mesmerizing organic waves and natural luster.",
    fullDescription:
      "Crafted from rare, slow-growth burl flitches, this veneer features a breathtaking multi-directional swirl grain with luminous amber depths. Book-matched panels create symmetrical kaleidoscope reflections, making it the definitive choice for statement luxury accents and custom architectural millwork.",
    grainCharacter: "High-Figure Swirl with Natural Burled Eyes & Dynamic Optical Depth",
    flitchCut: "Consecutive Book-Matched Flitch",
    sheetFormat: "8ft × 4ft (2440 × 1220 mm) & Jumbo 10ft × 4ft",
    coreOption: "Calibrated 100% Gurjan / BWR Grade Core (Zero Undulation)",
    finishOption: "Clear Satin Luster, High-Gloss Polyester, or Natural Linseed Oil",
    recommendedUse: "Focal Feature Walls, Bespoke Conference Tables, Master Headboards & Luxury Millwork",
    durabilityRating: "Grade A+ Architectural",
    moistureResistance: "High with BWR Calibrated Substrate",
    warranty: "Lifetime Structural Warranty Against Delamination",
  },
  {
    id: "nordic-white-ash",
    name: "Nordic White Ash",
    category: "Architectural Series",
    tag: "Scandinavian Minimal",
    colorCode: "#F5EBE1",
    image: "/images/specimen_nordic_white_ash.jpg",
    description:
      "Clean Scandinavian blonde timber with vertical linear grain rhythm, engineered for light-filled contemporary aesthetics.",
    fullDescription:
      "Embodying minimalist Nordic refinement, this veneer delivers an exceptionally clean, uniform vertical grain with subtle plank articulation. Its bright, airy blonde tone reflects natural daylight effortlessly, making spaces feel expansive, tranquil, and modern.",
    grainCharacter: "Uniform Straight Flitch & Fine Subtle Pores with Linear Rhythm",
    flitchCut: "Quarter Sliced Vertical Linear Grain",
    sheetFormat: "8ft × 4ft (2440 × 1220 mm)",
    coreOption: "Precision Dual-Side Calibrated Hardwood Plywood Core",
    finishOption: "Zero-Gloss Dead Matte, Nordic White Wash, or Nano-Ceramic Clear",
    recommendedUse: "Acoustic Wall Slats, Minimalist Wardrobes, Kitchen Fronts & Reception Backdrops",
    durabilityRating: "Commercial Heavy Duty",
    moistureResistance: "BWR / BWP Exterior Grade Core",
    warranty: "25-Year Guarantee with Anti-Termite & Borer Treatment",
  },
  {
    id: "crown-royal-teak",
    name: "Crown Royal Teak",
    category: "Heritage Line",
    tag: "Heirloom Grade",
    colorCode: "#02475E",
    image: "/images/specimen_crown_royal_teak.jpg",
    description:
      "Distinguished cathedral grain flow with balanced honey-gold undertones, delivering timeless heirloom sophistication.",
    fullDescription:
      "Harvested from mature golden teak logs, Crown Royal Teak is sliced along the natural growth rings to yield majestic, flowing cathedral peaks. Renowned for its natural water resistance and dimensional stability, it brings enduring warmth to any architectural interior.",
    grainCharacter: "Continuous Parabolic Cathedral Flow & Silky Amber Sheen",
    flitchCut: "Crown Flat Cut with Mirrored Cathedrals",
    sheetFormat: "8ft × 4ft (2440 × 1220 mm)",
    coreOption: "Marine Grade IS:710 Calibrated Core",
    finishOption: "Hand-Rubbed Natural Oil, Semi-Gloss PU, or Melamine Polish",
    recommendedUse: "Executive Suites, Architectural Entrance Doors, Premium Cabinetry & Library Wall Paneling",
    durabilityRating: "Exceptional / Weather-Proof Substrate",
    moistureResistance: "100% Boiling Water Proof (IS:710 Marine Calibrated)",
    warranty: "30-Year Performance Warranty",
  },
  {
    id: "smoked-royal-walnut",
    name: "Smoked Royal Walnut",
    category: "Signature Dark Series",
    tag: "Architectural Noir",
    colorCode: "#121212",
    image: "/images/specimen_smoked_royal_walnut.jpg",
    description:
      "Deep espresso-charcoal hues with dramatic architectural shadow relief and high-contrast fumed grain depth.",
    fullDescription:
      "Subjected to an artisanal smoking process that naturally reacts with the wood tannins, Smoked Royal Walnut acquires an opulent deep mocha coloration through the entire veneer thickness. Under directional lighting, its tactile grain casts velvety highlights and dramatic depth.",
    grainCharacter: "Deep High-Contrast Grain with Velvet Shadows & Espresso Undertones",
    flitchCut: "Quarter Sliced Vertical with Subtle Ribbon",
    sheetFormat: "8ft × 4ft (2440 × 1220 mm)",
    coreOption: "Calibrated Birch Core / Gurjan BWP 710",
    finishOption: "Smoked Low-Sheen Polyurethane, Dead Matte Lacquer, or Hardwax Oil",
    recommendedUse: "Private Theatres, Penthouse Lounges, Cigar Rooms & Luxury Hospitality Cladding",
    durabilityRating: "Architectural Grade Commercial",
    moistureResistance: "High BWP Treated Core",
    warranty: "Lifetime Structural Integrity Guarantee",
  },
];

export const SPACE_CATEGORIES = [
  {
    id: "home-interiors",
    title: "Home Interiors",
    tag: "Residential Luxury",
    image: "/images/space_home_interiors.jpg",
    description:
      "Bespoke living spaces crafted with warm timber flitches, zero-emission calibrated plywood, and acoustic wall cladding designed for comfort and heirloom longevity.",
    specs: ["E0 Formaldehyde Safe", "BWR Moisture Shield", "Acoustic Slats Ready"],
    features: ["Living room feature walls", "Walk-in wardrobes", "Master suite bed headboards"],
  },
  {
    id: "kitchens",
    title: "Kitchens & Damp Zones",
    tag: "100% Boiling Water Proof",
    image: "/images/space_kitchens.jpg",
    description:
      "Engineered with marine-calibrated IS:710 cores that withstand 72-hour boiling water immersion, steam exposure, and heavy daily usage without warping or swelling.",
    specs: ["IS:710 Marine Calibrated", "72-Hr Boil Water Proof", "Anti-Fungal Barrier"],
    features: ["Modular under-sink carcases", "Shutter bases", "Pantry and island units"],
  },
  {
    id: "furniture",
    title: "Handcrafted Furniture",
    tag: "Zero-Undulation Calibrated",
    image: "/images/space_furniture.jpg",
    description:
      "Perfect dual-surface calibration ensuring zero undulation for seamless laminate and veneer pressing on bespoke tables, curved credenzas, and consoles.",
    specs: ["4-Stage Sanded Core", "Uniform Thickness ±0.1mm", "High Screw-Holding Strength"],
    features: ["Dining & conference tables", "Curved reception counters", "Floating consoles"],
  },
  {
    id: "commercial-spaces",
    title: "Commercial & Hospitality",
    tag: "High-Traffic Grade",
    image: "/images/space_commercial.jpg",
    description:
      "Heavy-duty fire-retardant and borer-proof plywood solutions for corporate offices, luxury retail stores, restaurants, and five-star hospitality lounges.",
    specs: ["Fire Retardant IS:5509", "Heavy Load Bearing", "Commercial Warranty"],
    features: ["Executive boardrooms", "Retail display fixtures", "Hotel lobby wall cladding"],
  },
];

export const AUTHORIZED_BRANDS = [
  { name: "CENTURYPLY", tag: "Authorised Distributor", tier: "Gold Standard", origin: "India" },
  { name: "GREENPLY", tag: "Certified Partner", tier: "E0 Zero Emission", origin: "India" },
  { name: "ARCHIDPLY", tag: "Direct Wholesaler", tier: "Marine & Calibrated", origin: "India" },
  { name: "ROYALE TOUCHÉ", tag: "Premium Laminates", tier: "Luxury Surfaces", origin: "Global" },
  { name: "MERINO", tag: "Architectural Veneers", tier: "High-Pressure Compacts", origin: "Global" },
];
