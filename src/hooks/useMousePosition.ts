"use client";

import { useRef, useEffect, useCallback } from "react";
import { lerp } from "@/lib/utils";

export interface MousePosition {
  x: number;
  y: number;
  smoothX: number;
  smoothY: number;
  scrollY: number;
}

export function useMousePosition() {
  const mouse = useRef<MousePosition>({
    x: 0,
    y: 0,
    smoothX: 0,
    smoothY: 0,
    scrollY: 0,
  });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    mouse.current.x = x;
    mouse.current.y = y;
  }, []);

  const handleScroll = useCallback(() => {
    mouse.current.scrollY = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    const smoothInterval = setInterval(() => {
      mouse.current.smoothX = lerp(mouse.current.smoothX, mouse.current.x, 0.08);
      mouse.current.smoothY = lerp(mouse.current.smoothY, mouse.current.y, 0.08);
    }, 16);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearInterval(smoothInterval);
    };
  }, [handleMouseMove, handleScroll]);

  return mouse;
}
