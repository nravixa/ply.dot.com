"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone,
  MessageSquare,
  Menu,
  X,
  Bell,
  ArrowUpRight,
  Sun,
  Moon,
  ChevronRight,
  MapPin,
  Layers,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import BrandLogo from "./BrandLogo";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const { isLight, toggleTheme } = useTheme();

  // Helper to determine if a tab is active
  const isTabActive = (tabId: string) => {
    if (tabId === "contact") return pathname === "/contact";
    if (tabId === "about") return pathname === "/about";
    if (tabId === "catalog") return pathname === "/catalogue";
    if (tabId === "estimator") {
      return (pathname === "/" && activeTab === "estimator") || pathname === "/estimator";
    }
    if (tabId === "showroom") {
      return (pathname === "/" && activeTab === "showroom") || pathname === "/showroom";
    }
    if (tabId === "spaces") return pathname === "/" && activeTab === "spaces";
    if (tabId === "specimens") return pathname === "/" && activeTab === "specimens";
    if (tabId === "home") return pathname === "/" && activeTab === "home";
    return false;
  };

  // Synchronize activeTab whenever route (pathname) changes
  useEffect(() => {
    if (pathname === "/catalogue") {
      setActiveTab("catalog");
    } else if (pathname === "/about") {
      setActiveTab("about");
    } else if (pathname === "/contact") {
      setActiveTab("contact");
    } else if (pathname === "/estimator") {
      setActiveTab("estimator");
    } else if (pathname === "/showroom") {
      setActiveTab("showroom");
    } else if (pathname === "/") {
      if (typeof window !== "undefined" && window.location.hash) {
        const hash = window.location.hash.replace("#", "");
        if (hash === "calculator") setActiveTab("estimator");
        else if (["specimens", "spaces", "showroom"].includes(hash)) setActiveTab(hash);
        else setActiveTab("home");
      } else {
        const scrollPos = typeof window !== "undefined" ? (window.scrollY || document.documentElement.scrollTop) : 0;
        if (scrollPos < 200) {
          setActiveTab("home");
        } else {
          const sections = [
            { id: "home", tab: "home" },
            { id: "specimens", tab: "specimens" },
            { id: "spaces", tab: "spaces" },
            { id: "calculator", tab: "estimator" },
            { id: "showroom", tab: "showroom" },
          ];
          let currentSection = "home";
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i].id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 220) {
                currentSection = sections[i].tab;
                break;
              }
            }
          }
          setActiveTab(currentSection);
        }
      }
    }
  }, [pathname]);

  // Scroll spy & condensed glass header state
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollPos > 24);

      // Scroll Spy when on homepage
      if (window.location.pathname === "/") {
        const sections = [
          { id: "home", tab: "home" },
          { id: "specimens", tab: "specimens" },
          { id: "spaces", tab: "spaces" },
          { id: "calculator", tab: "estimator" },
          { id: "showroom", tab: "showroom" },
        ];

        let currentSection = "home";
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i].id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 220) {
              currentSection = sections[i].tab;
              break;
            }
          }
        }
        setActiveTab(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Also connect to Lenis scroll instance
    const lenis = (window as unknown as { __lenis?: { on: (event: string, cb: () => void) => void } }).__lenis;
    if (lenis) {
      lenis.on("scroll", handleScroll);
    }

    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Smooth scroll handler using Lenis
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
    fallbackHref: string
  ) => {
    setMobileMenuOpen(false);

    if (pathname === "/") {
      e.preventDefault();

      if (targetId === "home") {
        const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number | HTMLElement, opts?: object) => void } }).__lenis;
        if (lenis) {
          lenis.scrollTo(0, { duration: 1.4 });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        setActiveTab("home");
        window.history.pushState(null, "", "/");
        return;
      }

      const el = document.getElementById(targetId);
      if (el) {
        const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number | HTMLElement, opts?: object) => void } }).__lenis;
        if (lenis) {
          lenis.scrollTo(el, { offset: -90, duration: 1.4 });
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
        setActiveTab(targetId === "calculator" ? "estimator" : targetId);
        window.history.pushState(null, "", `#${targetId}`);
        return;
      }
    } else {
      // Default route navigation for separate pages (/catalogue, /about, /contact)
      setActiveTab(targetId === "calculator" ? "estimator" : targetId);
    }
  };

  const navMenuItems = [
    {
      num: "01",
      id: "home",
      label: "Home Atelier",
      desc: "Curated architectural timber experience",
      href: "/",
    },
    {
      num: "02",
      id: "specimens",
      label: "Specimens",
      desc: "Vavona burl, smoked teak & sycamore",
      href: "/#specimens",
    },
    {
      num: "03",
      id: "spaces",
      label: "Spaces",
      desc: "Kitchens, wardrobes & luxury living",
      href: "/#spaces",
    },
    {
      num: "04",
      id: "calculator",
      label: "Estimator",
      desc: "Interactive sheet & core planning",
      href: "/#calculator",
    },
    {
      num: "05",
      id: "showroom",
      label: "Showroom",
      desc: "Full-sheet lighting racks in Sus, Pune",
      href: "/#showroom",
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-3 sm:px-6 lg:px-12 ${
          isScrolled ? "pt-2.5 sm:pt-3 pb-2" : "pt-3.5 sm:pt-6 pb-2 sm:pb-4"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 rounded-full border border-black/10 dark:border-white/15 ${
            isScrolled
              ? "bg-white/95 dark:bg-[#121619]/90 backdrop-blur-2xl px-3.5 sm:px-5 py-2 sm:py-2.5 shadow-[0_15px_35px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
              : "bg-white/90 dark:bg-[#121619]/80 backdrop-blur-2xl px-3.5 sm:px-5 py-2 sm:py-2 shadow-[0_10px_25px_rgba(0,0,0,0.05)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
          }`}
        >
          {/* Brand Logo (Left) */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "home", "/")}
            className="select-none flex items-center gap-2"
          >
            <BrandLogo size="sm" shape="circle" />
          </Link>

          {/* Desktop Center Navigation Bar & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-2">
            <nav className="flex items-center gap-1 bg-black/[0.04] dark:bg-white/[0.08] border border-black/5 dark:border-white/10 backdrop-blur-2xl px-2 py-1.5 rounded-full shadow-sm">
              <Link
                href="/"
                onClick={(e) => handleNavClick(e, "home", "/")}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                  isTabActive("home")
                    ? "bg-slate-900 text-white dark:bg-white dark:text-[#121212] font-semibold shadow-sm"
                    : "text-slate-600 hover:text-slate-950 dark:text-white/75 dark:hover:text-white"
                }`}
              >
                Home
              </Link>

              <Link
                href="/#specimens"
                onClick={(e) => handleNavClick(e, "specimens", "/#specimens")}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                  isTabActive("specimens")
                    ? "bg-slate-900 text-white dark:bg-white dark:text-[#121212] font-semibold shadow-sm"
                    : "text-slate-600 hover:text-slate-950 dark:text-white/75 dark:hover:text-white"
                }`}
              >
                Specimens
              </Link>

              <Link
                href="/#spaces"
                onClick={(e) => handleNavClick(e, "spaces", "/#spaces")}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                  isTabActive("spaces")
                    ? "bg-slate-900 text-white dark:bg-white dark:text-[#121212] font-semibold shadow-sm"
                    : "text-slate-600 hover:text-slate-950 dark:text-white/75 dark:hover:text-white"
                }`}
              >
                Spaces
              </Link>

              <Link
                href="/#calculator"
                onClick={(e) => handleNavClick(e, "calculator", "/#calculator")}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                  isTabActive("estimator")
                    ? "bg-slate-900 text-white dark:bg-white dark:text-[#121212] font-semibold shadow-sm"
                    : "text-slate-600 hover:text-slate-950 dark:text-white/75 dark:hover:text-white"
                }`}
              >
                Estimator
              </Link>

              <Link
                href="/#showroom"
                onClick={(e) => handleNavClick(e, "showroom", "/#showroom")}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                  isTabActive("showroom")
                    ? "bg-slate-900 text-white dark:bg-white dark:text-[#121212] font-semibold shadow-sm"
                    : "text-slate-600 hover:text-slate-950 dark:text-white/75 dark:hover:text-white"
                }`}
              >
                Showroom
              </Link>

              <Link
                href="/catalogue"
                onClick={() => setActiveTab("catalog")}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                  isTabActive("catalog")
                    ? "bg-slate-900 text-white dark:bg-white dark:text-[#121212] font-semibold shadow-sm"
                    : "text-slate-600 hover:text-slate-950 dark:text-white/75 dark:hover:text-white"
                }`}
              >
                Catalog
              </Link>

              <Link
                href="/about"
                onClick={() => setActiveTab("about")}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                  isTabActive("about")
                    ? "bg-slate-900 text-white dark:bg-white dark:text-[#121212] font-semibold shadow-sm"
                    : "text-slate-600 hover:text-slate-950 dark:text-white/75 dark:hover:text-white"
                }`}
              >
                About
              </Link>

              <Link
                href="/contact"
                onClick={() => setActiveTab("contact")}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                  isTabActive("contact")
                    ? "bg-slate-900 text-white dark:bg-white dark:text-[#121212] font-semibold shadow-sm"
                    : "text-slate-600 hover:text-slate-950 dark:text-white/75 dark:hover:text-white"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Dark Mode Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/10 dark:border-white/20 flex items-center justify-center transition-all backdrop-blur-md shadow-sm active:scale-95 group cursor-pointer"
              title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
              aria-label="Toggle dark mode"
            >
              {isLight ? (
                <Moon className="w-4 h-4 text-slate-800 group-hover:scale-110 transition-transform" />
              ) : (
                <Sun className="w-4 h-4 text-[#F1A80A] group-hover:rotate-45 transition-transform" />
              )}
            </button>
          </div>

          {/* Desktop Right Action Icons */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Notification Bell Icon */}
            <div
              className="hidden md:flex w-9 h-9 rounded-full bg-black/[0.04] dark:bg-white/10 border border-black/10 dark:border-white/20 items-center justify-center text-slate-700 dark:text-white/90 hover:text-[#F1A80A] transition-all backdrop-blur-md cursor-pointer"
              title="Showroom Notifications"
            >
              <Bell className="w-4 h-4" />
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/9108087962121?text=Hello%20Ply%20Dot%20Com%2C%20I%20would%20like%20to%20know%20more%20about%20your%20plywood%20and%20veneer%20options."
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-black/[0.04] dark:bg-white/10 border border-black/10 dark:border-white/20 flex items-center justify-center text-slate-700 dark:text-white/90 hover:text-[#F1A80A] hover:bg-black/[0.08] dark:hover:bg-white/20 transition-all backdrop-blur-md"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            {/* Direct Call */}
            <a
              href="tel:08087962121"
              className="w-9 h-9 rounded-full bg-black/[0.04] dark:bg-white/10 border border-black/10 dark:border-white/20 flex items-center justify-center text-slate-700 dark:text-white/90 hover:text-[#F1A80A] hover:bg-black/[0.08] dark:hover:bg-white/20 transition-all backdrop-blur-md"
              title="Call Showroom Desk"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Action Pill: Get Quote */}
            <Link
              href="/#quote"
              onClick={(e) => handleNavClick(e, "quote", "/#quote")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-[#F1A80A] text-white hover:text-slate-950 dark:bg-white dark:hover:bg-[#F1A80A] dark:text-[#121212] dark:hover:text-slate-950 text-xs font-bold uppercase tracking-wider shadow-md transition-all hover:scale-105"
            >
              <span>Get Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          </div>

          {/* Redesigned Mobile View Header Action Cluster (Sleek, Uncluttered, High-End) */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
            {/* Quick WhatsApp Concierge Button */}
            <a
              href="https://wa.me/9108087962121?text=Hello%20Ply%20Dot%20Com%2C%20I%20would%20like%20to%20enquire%20about%20materials."
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/[0.04] dark:bg-white/10 border border-black/10 dark:border-white/15 flex items-center justify-center text-slate-700 dark:text-white/90 active:scale-95 transition-all backdrop-blur-md"
              title="WhatsApp Concierge"
              aria-label="WhatsApp Concierge"
            >
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#02475E] dark:text-[#5BB1CD]" />
            </a>

            {/* Mobile Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/[0.04] dark:bg-white/10 border border-black/10 dark:border-white/15 flex items-center justify-center text-slate-700 dark:text-white/90 active:scale-95 transition-all backdrop-blur-md cursor-pointer"
              title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
              aria-label="Toggle dark mode"
            >
              {isLight ? (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-800" />
              ) : (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F1A80A]" />
              )}
            </button>

            {/* Redesigned Architectural Menu Trigger Pill */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center gap-1.5 pl-3 pr-2.5 py-1.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-[#121212] font-sans text-[11px] font-bold tracking-wider uppercase shadow-md active:scale-95 transition-transform cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <span>{mobileMenuOpen ? "CLOSE" : "MENU"}</span>
              <div className="w-5 h-5 rounded-full bg-white text-slate-900 dark:bg-[#121212] dark:text-white flex items-center justify-center">
                {mobileMenuOpen ? (
                  <X className="w-3 h-3 text-[#F1A80A]" />
                ) : (
                  <Menu className="w-3 h-3 text-slate-900 dark:text-white" />
                )}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Redesigned Full-Screen Mobile Drawer Atelier Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0a0d10]/98 backdrop-blur-3xl transition-all duration-500 lg:hidden flex flex-col justify-between ${mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
          }`}
        style={{ height: "100dvh" }}
      >
        {/* Top Header Row inside Mobile Drawer */}
        <div className="flex-shrink-0 pt-4 pb-3 px-5 sm:px-6 border-b border-white/10 flex items-center justify-between">
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "home", "/")}
            className="flex items-center gap-2"
          >
            <BrandLogo size="sm" shape="circle" />
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-sans tracking-widest uppercase text-[#5BB1CD] px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10">
              SUS • PUNE
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white active:scale-95 transition-transform"
              aria-label="Close Navigation"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Middle Content (Directory, Pages Grid & Specimen Spotlight) */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 space-y-6">
          {/* Main Editorial Directory Links */}
          <div>
            <span className="text-[10.5px] font-sans font-bold tracking-[0.22em] uppercase text-white/40 block mb-3">
              PRIMARY DIRECTORY
            </span>

            <div className="space-y-1.5">
              {navMenuItems.map((item) => {
                const tabKey = item.id === "calculator" ? "estimator" : item.id;
                const isActive = isTabActive(tabKey);
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id, item.href)}
                    className={`group flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-300 ${isActive
                        ? "bg-white/[0.08] border-[#F1A80A]/40 text-white"
                        : "bg-white/[0.02] border-white/5 hover:border-white/15 text-white/80"
                      }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="font-sans text-xs font-semibold text-[#F1A80A]">
                        {item.num}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-sans font-bold text-base text-white group-hover:text-[#F1A80A] transition-colors">
                            {item.label}
                          </span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F1A80A] animate-pulse" />
                          )}
                        </div>
                        <span className="text-xs text-white/50 block font-light">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[#F1A80A] group-hover:translate-x-1 transition-all" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Dedicated Subpages Quick Grid */}
          <div>
            <span className="text-[10.5px] font-sans font-bold tracking-[0.22em] uppercase text-white/40 block mb-3">
              CURATED ARCHIVES
            </span>

            <div className="grid grid-cols-3 gap-2">
              <Link
                href="/catalogue"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-xl border flex flex-col justify-between group transition-all ${
                  isTabActive("catalog")
                    ? "bg-white/[0.08] border-[#F1A80A]/50 text-white"
                    : "bg-white/[0.03] border-white/10 hover:border-[#F1A80A]/50"
                }`}
              >
                <Layers className="w-4 h-4 text-[#5BB1CD] mb-2" />
                <span className="font-sans font-bold text-xs text-white block">
                  Catalog
                </span>
                <span className="text-[10px] text-white/50 font-sans">50+ Veneers</span>
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-xl border flex flex-col justify-between group transition-all ${
                  isTabActive("about")
                    ? "bg-white/[0.08] border-[#F1A80A]/50 text-white"
                    : "bg-white/[0.03] border-white/10 hover:border-[#F1A80A]/50"
                }`}
              >
                <Layers className="w-4 h-4 text-[#F1A80A] mb-2" />
                <span className="font-sans font-bold text-xs text-white block">
                  About
                </span>
                <span className="text-[10px] text-white/50 font-sans">Timber Atelier</span>
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-xl border flex flex-col justify-between group transition-all ${
                  isTabActive("contact")
                    ? "bg-white/[0.08] border-[#F1A80A]/50 text-white"
                    : "bg-white/[0.03] border-white/10 hover:border-[#F1A80A]/50"
                }`}
              >
                <MapPin className="w-4 h-4 text-[#5BB1CD] mb-2" />
                <span className="font-sans font-bold text-xs text-white block">
                  Contact
                </span>
                <span className="text-[10px] text-white/50 font-sans">Directions</span>
              </Link>
            </div>
          </div>

          {/* Featured Specimen Mini Banner */}
          <Link
            href="/catalogue"
            onClick={() => setMobileMenuOpen(false)}
            className="block p-3.5 rounded-2xl bg-gradient-to-r from-[#02475E]/40 to-[#121619] border border-[#5BB1CD]/25 relative overflow-hidden group"
          >
            <div className="flex items-center gap-3.5 relative z-10">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/20 flex-shrink-0">
                <img
                  src="/images/specimen_figured_amber_burl.jpg"
                  alt="Figured Amber Burl"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[9.5px] font-sans uppercase tracking-widest text-[#F1A80A] font-bold">
                    FEATURED SPECIMEN
                  </span>
                  <span className="text-[9.5px] font-sans text-white/40">• DUAL-SIDE CALIBRATED</span>
                </div>
                <h4 className="text-sm font-sans font-bold text-white group-hover:text-[#F1A80A] transition-colors">
                  Figured Golden Amber Vavona
                </h4>
                <span className="text-xs text-[#5BB1CD] flex items-center gap-1 font-sans">
                  <span>View in 8K Material Archive</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Bottom Fixed Action Dock inside Mobile Drawer */}
        <div className="flex-shrink-0 p-5 sm:px-6 bg-[#0c1012] border-t border-white/10 space-y-3">
          <div className="grid grid-cols-2 gap-2.5">
            <Link
              href="/#quote"
              onClick={(e) => handleNavClick(e, "quote", "/#quote")}
              className="py-3 px-4 rounded-xl bg-white text-[#121212] font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-all"
            >
              <span>Get Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href="https://wa.me/9108087962121?text=Hello%20Ply%20Dot%20Com%2C%20I%20would%20like%20to%20send%20an%20enquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#5BB1CD]" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="flex items-center justify-between text-[11px] font-sans text-white/50 pt-1">
            <a
              href="tel:08087962121"
              className="hover:text-[#F1A80A] transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-[#F1A80A]" />
              <span>+91 080 8796 2121</span>
            </a>
            <span>SUS - PASHAN RD</span>
          </div>
        </div>
      </div>

      {/* Secondary Left Side Floating Navigation Tab: Quick Architectural Quote */}
      <aside
        aria-label="Secondary Left Navigation"
        className="fixed left-0 top-1/2 -translate-y-1/2 z-30 select-none"
      >
        <Link
          href="/#quote"
          onClick={(e) => handleNavClick(e, "quote", "/#quote")}
          className="group relative flex items-center gap-2 py-3.5 px-2 sm:px-2.5 bg-white/95 text-slate-900 hover:bg-white border-y border-r border-black/10 shadow-[0_15px_35px_rgba(0,0,0,0.12)] hover:border-[#F1A80A] dark:bg-[#121619]/90 dark:text-white dark:hover:bg-black dark:border-white/20 dark:hover:border-[#F1A80A]/80 backdrop-blur-2xl rounded-r-xl sm:rounded-r-2xl transition-all duration-300 hover:pl-3.5 cursor-pointer"
          style={{ writingMode: "vertical-rl" }}
          title="Request Architectural Quote"
        >
          <div className="flex items-center gap-2 rotate-180">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#F1A80A] shadow-[0_0_8px_#F1A80A] animate-pulse" />
            <span className="font-sans text-[9.5px] sm:text-[11px] font-black uppercase tracking-[0.22em] text-slate-900 dark:text-white group-hover:text-[#F1A80A] transition-colors">
              GET QUOTE
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-3.5 sm:h-3.5 text-slate-600 dark:text-white/70 group-hover:text-slate-950 dark:group-hover:text-white transition-transform group-hover:scale-110" />
          </div>
        </Link>
      </aside>
    </>
  );
}
