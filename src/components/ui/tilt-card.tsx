"use client";

import { useRef, useCallback, type ReactNode } from "react";

export function TiltCard({
  children,
  className = "",
  tiltDegree = 8,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  tiltDegree?: number;
  glare?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * tiltDegree;
      const rotateY = ((centerX - x) / centerX) * tiltDegree;

      cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        cardRef.current.style.setProperty("--glare-x", `${glareX}%`);
        cardRef.current.style.setProperty("--glare-y", `${glareY}%`);
      }
    },
    [tiltDegree, glare]
  );

  const onMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        transformStyle: "preserve-3d",
      }}
    >
      {glare && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.06) 0%, transparent 60%)",
            transition: "background 0.2s",
          }}
        />
      )}
      {children}
    </div>
  );
}
