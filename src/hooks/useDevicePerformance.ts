"use client";

import { useMemo } from "react";

export type DeviceTier = "low" | "medium" | "high";

export function useDevicePerformance(): {
  tier: DeviceTier;
  dpr: [number, number];
  particleMultiplier: number;
  enablePostProcessing: boolean;
  enable3D: boolean;
} {
  return useMemo(() => {
    if (typeof window === "undefined") {
      return { tier: "high", dpr: [1, 2], particleMultiplier: 1, enablePostProcessing: true, enable3D: true };
    }

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as any).deviceMemory || 8;
    const isLowEnd = cores <= 4 || memory <= 4 || isMobile;
    const isMidEnd = cores <= 6 || memory <= 6;

    if (isLowEnd) {
      return {
        tier: "low",
        dpr: [0.5, 1],
        particleMultiplier: 0.25,
        enablePostProcessing: false,
        enable3D: true,
      };
    }

    if (isMidEnd) {
      return {
        tier: "medium",
        dpr: [0.75, 1.25],
        particleMultiplier: 0.5,
        enablePostProcessing: true,
        enable3D: true,
      };
    }

    return {
      tier: "high",
      dpr: [1, 1.5],
      particleMultiplier: 0.75,
      enablePostProcessing: true,
      enable3D: true,
    };
  }, []);
}
