"use client";

import { ReactNode, useEffect, useRef, useState, useCallback } from "react";
import Lenis from "lenis";
import { ThemeProvider } from "next-themes";
import { ThreeSetup } from "@/components/ui/three-setup";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { NoiseOverlay } from "@/components/ui/noise-overlay";

export function Providers({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ThreeSetup />
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <NoiseOverlay />
      {children}
    </ThemeProvider>
  );
}
