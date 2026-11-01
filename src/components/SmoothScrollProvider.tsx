"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis with exact ERA Residence gliding physics
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      infinite: false,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Initial refresh to ensure all triggers calculate correct positions
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Provide global access for smooth scroll jumping
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Refresh ScrollTrigger on window resize to ensure precise parallax boundaries
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    // Comprehensive Anchor smooth jump handler for all hash links (e.g. #specimens, /#specimens)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const rawHref = anchor.getAttribute("href") || "";
      if (!rawHref.includes("#")) return;

      const hashIndex = rawHref.indexOf("#");
      const hash = rawHref.slice(hashIndex);
      const path = rawHref.slice(0, hashIndex);

      const currentPath = window.location.pathname;
      const isCurrentPage =
        path === "" ||
        (path === "/" && currentPath === "/") ||
        path === currentPath;

      if (isCurrentPage) {
        if (hash === "#" || hash === "#home") {
          e.preventDefault();
          lenis.scrollTo(0, { duration: 1.4 });
          window.history.pushState(null, "", window.location.pathname);
          return;
        }

        if (hash.length > 1) {
          const targetEl = document.querySelector(hash);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl as HTMLElement, {
              offset: -90,
              duration: 1.5,
            });
            window.history.pushState(null, "", hash);
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Always land on Hero section on page refresh / reload
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
      const isReload =
        (navEntries.length > 0 && navEntries[0].type === "reload") ||
        ((window.performance as unknown as { navigation?: { type?: number } }).navigation?.type === 1);

      if (isReload) {
        // Strip any trailing anchor hash from previous navigation so browser doesn't anchor down
        if (window.location.hash) {
          window.history.replaceState(null, "", window.location.pathname);
        }
        window.scrollTo(0, 0);
        lenis.scrollTo(0, { immediate: true });
        requestAnimationFrame(() => {
          window.scrollTo(0, 0);
          lenis.scrollTo(0, { immediate: true });
        });
        setTimeout(() => {
          window.scrollTo(0, 0);
          lenis.scrollTo(0, { immediate: true });
        }, 60);
      } else if (window.location.hash) {
        // Initial hash scroll on direct external bookmark link
        setTimeout(() => {
          const targetEl = document.querySelector(window.location.hash);
          if (targetEl) {
            lenis.scrollTo(targetEl as HTMLElement, {
              offset: -90,
              duration: 1.2,
            });
          }
        }, 400);
      } else {
        // Initial clean visit
        window.scrollTo(0, 0);
        lenis.scrollTo(0, { immediate: true });
      }
    }

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
