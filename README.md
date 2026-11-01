# PLY DOT COM — The Material of Spaces
### Ultra-Luxury Architectural Plywood & Natural Timber Veneer Web Application

Rebuilt with **cinematic parallax scroll**, **GSAP + ScrollTrigger**, and **Lenis smooth inertia scrolling** for [Ply Dot Com](https://plydotcom2.vercel.app/), located in Sus, Pune, Maharashtra.

---

## 🎨 Color Palette & Aesthetic System

Crafted to merge the haute-couture editorial mood of **LUMIÈRE MIDTOWN** (Image 1) with the bold, modular botanical bento architecture of **GROWTH** (Image 2):

| Color Name | Hex Code | Visual Role |
| :--- | :--- | :--- |
| **Deep Midnight Petrol** | `#02475E` | Primary architectural backdrop, luxury velvet accents & depth |
| **Radiant Amber Gold** | `#F1A80A` | Metallic foil headlines, glowing active badges & call-to-actions |
| **Silken Ivory Cream** | `#F5EBE1` | Primary typographic hierarchy, raw silk texture & light balance |
| **Coastal Sky Teal** | `#5BB1CD` | Architectural specs, technical subheadings & fine badges |
| **Obsidian Core** | `#121212` | Deep canvas foundation & high-contrast card surfaces |

### 🌿 Moodboard Shades (Lumière Midtown Inspired)
1. **Botanic Opulence** (`#02475E`): Executive boardrooms & acoustic lounges
2. **Olive Mist** (`#5BB1CD`): Minimalist kitchen cabinetry & bathroom vanities
3. **Silken Ivory** (`#F5EBE1`): Living room millwork & gallery wall slats
4. **Rustic Cedar** (`#8A4A28`): Bespoke dining tables & entrance portals
5. **Dawn Brilliance** (`#F1A80A`): Statement feature walls & accent inlays

---

## 🚀 Key Architectural Features

### 1. Multi-Layer GSAP Parallax & Lenis Inertia
- **Hero Section**: 3D parallax depth scrub with background scale and offset, kinetic split typography reveal, and floating trust badges that drift faster than the content.
- **Specimen Showcase**: Staggered parallax scrolling where cards in alternating columns glide at varying speeds (`speed: 15` vs `speed: -15`).
- **Smooth Inertia**: Lenis smooth wheel and touch interpolation hooked into `gsap.ticker` with `lagSmoothing(0)`.

### 2. Specimen Inspection Modal & Macro Zoom
- 4 Featured Architectural Specimens:
  - **Figured Amber Burl** (Exotic Collection)
  - **Nordic White Ash** (Architectural Series)
  - **Crown Royal Teak** (Heritage Line)
  - **Smoked Royal Walnut** (Signature Dark Series)
- Interactive macro zoom toggle, flitch cut details, core calibration specs, sheet dimensions (8ft × 4ft), and one-click direct WhatsApp sample requests.

### 3. Modular Spaces Bento Grid (Growth Layout)
- Asymmetrical bento grid for **Home Interiors**, **Kitchens & Damp Zones**, **Handcrafted Furniture**, and **Commercial Spaces**.
- Interactive category filtering pills and video demonstration modal.

### 4. 4-Step Consultation Journey
- Guided selection workflow: *Understand the Requirement*, *Choose the Right Core*, *Compare Flitches*, *Make an Informed Decision with Warranty*.

### 5. Interactive Sheet & Wastage Estimator
- Instant calculations based on square footage with a standard 8ft × 4ft sheet yield and 10% cutting wastage allowance.
- Real-time grade and thickness guidance with instant prefilled WhatsApp quote generation.

### 6. Showroom Experience in Sus, Pune
- Embedded interactive Google Maps iframe with GPS directions to:
  `Sr No 48, 11/2, Sus - Pashan Rd, near Shell Petrol Pump, Tapkir Vasti, Sus, Pune, Maharashtra 411021`
- Operating hours: Monday – Saturday (9:30 AM – 8:00 PM), Sunday (10:00 AM – 5:00 PM).
- Direct call buttons: `+91 080 8796 2121` & `+91 88056 21111`.

### 7. Authorized Partner & Distributor Network
- CenturyPly, Greenply, Archidply, Royale Touché, and Merino.

---

## 🔒 Security & Best Practice Files

- `public/.well-known/security.txt`: RFC 9116 compliant security disclosure policy.
- `public/robots.txt`: Search engine crawling directives.
- `src/app/sitemap.ts`: Dynamic XML sitemap generator.
- `next.config.ts`: Strict security headers including:
  - **Content-Security-Policy (CSP)**
  - **Strict-Transport-Security (HSTS)**
  - **X-Frame-Options (SAMEORIGIN)**
  - **X-Content-Type-Options (nosniff)**
  - **Referrer-Policy**
  - **Permissions-Policy**
- Custom 404 Page (`src/app/not-found.tsx`): Bespoke error layout with luxury styling and direct navigation recovery.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 & Custom Glassmorphism System
- **Animation**: GSAP 3 + ScrollTrigger
- **Smooth Scroll**: Lenis
- **Icons**: Lucide React
- **Fonts**: Cormorant Garamond, Syne, Inter

---

## 💻 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open browser
http://localhost:3000

# 4. Production build validation
npm run build
```
