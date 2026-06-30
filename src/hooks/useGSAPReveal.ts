"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGSAPReveal<T extends HTMLElement>({
  animation = "fadeUp",
  delay = 0,
  duration = 0.8,
  stagger = 0.1,
  threshold = 0.1,
}: {
  animation?: "fadeUp" | "fadeIn" | "scaleIn" | "slideInLeft" | "slideInRight";
  delay?: number;
  duration?: number;
  stagger?: number;
  threshold?: number;
} = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const animations: Record<string, gsap.TweenVars> = {
      fadeUp: { opacity: 0, y: 60 },
      fadeIn: { opacity: 0 },
      scaleIn: { opacity: 0, scale: 0.8 },
      slideInLeft: { opacity: 0, x: -100 },
      slideInRight: { opacity: 0, x: 100 },
    };

    const vars = animations[animation];

    const ctx = gsap.context(() => {
      const children = el.children;
      if (children.length > 0) {
        gsap.fromTo(
          children,
          { ...vars },
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration,
            delay,
            stagger,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [animation, delay, duration, stagger, threshold]);

  return ref;
}
