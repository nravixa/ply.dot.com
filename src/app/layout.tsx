import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Syne, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpecimenInspectionModal from "@/components/SpecimenInspectionModal";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#02475E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://plydotcom.in"),
  title: "Ply Dot Com | The Material of Spaces — Architectural Plywood & Veneers in Pune",

  description:
    "Ply Dot Com brings premium calibrated plywood solutions, exotic natural veneers, and architectural timber guidance to Sus, Pune. Authorized partner for CenturyPly, Greenply, Archidply, and Royale Touche.",
  keywords: [
    "Plywood Pune",
    "Ply Dot Com",
    "Sus Pashan Road",
    "CenturyPly Pune",
    "Greenply",
    "Natural Veneers",
    "Architectural Plywood",
    "BWR Calibrated Plywood",
    "Interior Timber",
    "Marine Plywood Pune",
  ],
  authors: [{ name: "Ply Dot Com" }],
  openGraph: {
    title: "Ply Dot Com | The Material of Spaces",
    description:
      "A curated selection of premium calibrated plywood and exotic architectural veneers for homes, kitchens, furniture, and commercial interiors.",
    url: "https://plydotcom.in",
    siteName: "Ply Dot Com",
    images: [
      {
        url: "/images/hero_specimen.jpg",
        width: 1200,
        height: 630,
        alt: "Ply Dot Com Luxury Architectural Plywood & Veneers",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${syne.variable} ${plusJakarta.variable} light scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('plydotcom_theme');
                if (t === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                  document.documentElement.style.colorScheme = 'dark';
                } else {
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                  document.documentElement.style.colorScheme = 'light';
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen font-sans antialiased selection:bg-[#F1A80A] selection:text-[#121212] overflow-x-hidden relative transition-colors duration-500">
        <ThemeProvider>
          <SmoothScrollProvider>
            <div className="fixed inset-0 pointer-events-none z-0 ambient-noise opacity-20" />
            <Header />
            <main className="relative z-10">{children}</main>
            <Footer />
            <SpecimenInspectionModal />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
