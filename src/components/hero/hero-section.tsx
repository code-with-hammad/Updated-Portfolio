"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { CyberneticCore } from "./cybernetic-core";

import { HeroBackgroundShader } from "./hero-background-shader";
import { useMousePosition } from "@/hooks/useMousePosition";
import { personalInfo } from "@/lib/constants";

export function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const heroHeight = window.innerHeight;
    const progress = Math.min(1, Math.max(0, scrollTop / heroHeight));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".hero-word");
        if (words.length > 0) {
          gsap.fromTo(
            words,
            { opacity: 0, y: 60, rotateX: -30 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.9,
              stagger: 0.08,
              ease: "power4.out",
              delay: 0.3,
            }
          );
        }
      }

      if (subheadlineRef.current) {
        gsap.fromTo(
          subheadlineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, delay: 1.0, ease: "power3.out" }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            delay: 1.4,
            ease: "power3.out",
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const headline = personalInfo.headline;
  const words = headline.split(" ");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-electric-blue/5 via-transparent to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,212,255,0.08)_0%,_transparent_70%)]" />

      <div className="absolute inset-0">
        <HeroBackgroundShader mouse={mouse} scrollProgress={scrollProgress} />
      </div>

      <div className="absolute inset-0">
        <CyberneticCore mouse={mouse} />
      </div>

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-electric-blue/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-cyan/5 rounded-full blur-[80px]" />

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-transparent bg-background/50 backdrop-blur-sm mb-8 relative overflow-hidden"
          style={{
            animation: "gradient-x 3s ease infinite",
            backgroundSize: "200% 200%",
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #06ffcc, #00d4ff)",
              backgroundSize: "200% 200%",
              animation: "gradient-x 3s ease infinite",
              margin: "-1px",
              zIndex: -1,
              borderRadius: "9999px",
            }}
          />
          <Sparkles className="w-4 h-4 text-primary relative z-10" />
          <span className="text-sm text-primary tracking-wider uppercase relative z-10">
            Agentic AI Engineer
          </span>
        </motion.div>

        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight max-w-6xl mx-auto text-balance"
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="hero-word inline-block mr-[0.25em]"
              style={{
                background:
                  i > 1
                    ? "linear-gradient(135deg, #00d4ff, #06ffcc)"
                    : "linear-gradient(135deg, #fafafa, #a1a1aa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        <p
          ref={subheadlineRef}
          className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance"
        >
          {personalInfo.subheadline}
        </p>

        <div
          ref={ctaRef}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton strength={0.2}>
            <Button
              size="lg"
              variant="gradient"
              className="group text-base"
              onClick={() => {
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View My Systems
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </MagneticButton>
          <MagneticButton strength={0.2}>
            <Button
              size="lg"
              variant="glass"
              className="group text-base"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Book a Discovery Call
              <Sparkles className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
            </Button>
          </MagneticButton>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="flex flex-col items-center gap-2 text-muted-foreground/50"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
