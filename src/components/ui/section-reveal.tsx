"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
  distance?: number;
}

export function SectionReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.7,
  once = true,
  distance = 60,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const variants = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{
          opacity: 0,
          ...variants[direction],
        }}
        animate={{
          opacity: isInView ? 1 : 0,
          x: isInView ? 0 : variants[direction].x,
          y: isInView ? 0 : variants[direction].y,
        }}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
