"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionReveal } from "@/components/ui/section-reveal";
import { aboutContent } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { formatNumber } from "@/lib/utils";


gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
  format = false,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  format?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { textContent: 0 },
        {
          textContent: value,
          duration: 2,
          ease: "power3.out",
          snap: { textContent: 10 ** -decimals },
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [value, decimals]);

  return (
    <span ref={ref}>
      {format ? formatNumber(value) : value}
      {suffix}
    </span>
  );
}

function StatCard({
  label,
  value,
  suffix,
  decimals,
  format,
}: {
  label: string;
  value: number;
  suffix: string;
  decimals?: number;
  format?: boolean;
}) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative p-6 text-center">
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
          <span className="gradient-text">
            <AnimatedCounter
              value={value}
              suffix={suffix}
              decimals={decimals}
              format={format}
            />
          </span>
        </div>
        <div className="text-sm text-muted-foreground tracking-wide uppercase">
          {label}
        </div>
      </div>
    </div>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      if (textRef.current) {
        const paragraphs = textRef.current.querySelectorAll(".about-paragraph");
        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm mb-6">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary/80 tracking-widest uppercase">
                About
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Building the <span className="gradient-text">Intelligent</span>{" "}
              Backbone of Modern Business
            </h2>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center mb-20">
          <div ref={textRef} className="lg:col-span-5 space-y-8">
            {aboutContent.paragraphs.map((p, i) => (
              <div key={i} className="about-paragraph">
                <div className="flex items-start gap-5">
                  <div className="hidden sm:flex flex-col items-center gap-2 mt-1">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-cyan flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-background">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    {i < aboutContent.paragraphs.length - 1 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-primary/30 to-transparent" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-primary mb-3 tracking-wide">
                      {p.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      {p.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {aboutContent.stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
