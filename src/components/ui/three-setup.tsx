"use client";

import { useEffect } from "react";

export function ThreeSetup() {
  useEffect(() => {
    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("THREE.Clock")
      ) {
        return;
      }
      originalWarn.apply(console, args);
    };
    return () => {
      console.warn = originalWarn;
    };
  }, []);

  return null;
}
