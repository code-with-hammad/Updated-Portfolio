"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform, type PanInfo } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { TiltCard } from "@/components/ui/tilt-card";

const testimonials = [
  {
    quote:
      "Hammad built our entire AI lead scoring system from scratch. The results were immediate \u2014 312% increase in conversion within the first month. He doesn't just code, he architects complete business solutions.",
    author: "George Robert",
    role: "CEO, Premier Solutions",
    rating: 5,
  },
  {
    quote:
      "The AI customer support agent Hammad deployed handles 87% of our tickets autonomously. Our team went from drowning in requests to focusing on high-value work. Game changer for our operations.",
    author: "Elena Vasquez",
    role: "VP Engineering, DataStream AI",
    rating: 5,
  },
  {
    quote:
      "Working with Hammad felt like having a full AI engineering department. He understood our complex requirements and delivered a RAG system that made 30 years of legal documents instantly searchable.",
    author: "David Kim",
    role: "CTO, VentureLab",
    rating: 5,
  },
  {
    quote:
      "The platform Hammad architected from zero to production in 6 weeks would have taken our team 6 months. Full-stack AI engineering at its finest. We saw 3x revenue lift in the first quarter post-launch.",
    author: "Marcus Williams",
    role: "Head of Product, FinScale",
    rating: 5,
  },
  {
    quote:
      "Hammad automated 15 manual processes across 8 different tools for our logistics company. Error rates dropped from 23% to 0.3%. The ROI was realized in under 6 weeks.",
    author: "Rachel Torres",
    role: "Director of AI, MediCore Systems",
    rating: 5,
  },
  {
    quote:
      "We interviewed 12 agencies before finding Hammad. He shipped in 3 days what others quoted 3 weeks for. Our conversion pipeline went from chaotic to surgical precision. Absolute elite talent.",
    author: "Michael Chen",
    role: "CTO, NexaTech Solutions",
    rating: 5,
  },
];

const duplicated = [...testimonials, ...testimonials];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 mb-4">
      {Array.from({ length: rating }).map((_, j) => (
        <Star
          key={j}
          className="w-4 h-4 fill-primary text-primary drop-shadow-[0_0_6px_rgba(0,212,255,0.5)]"
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  t,
  index,
}: {
  t: (typeof testimonials)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: (index % testimonials.length) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative shrink-0 w-[380px] sm:w-[420px] select-none"
    >
      <TiltCard tiltDegree={4} glare={false}>
        <div className="relative p-[2px] rounded-2xl h-full overflow-hidden">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 via-cyan/20 to-primary/30 opacity-0 group-hover:opacity-100 transition-all duration-700 animate-gradient-x"
            style={{ backgroundSize: "200% 200%" }}
          />
          <div className="relative h-full p-8 rounded-2xl bg-secondary/40 backdrop-blur-xl border border-border/60 group-hover:border-primary/30 transition-all duration-500">
            <div className="absolute top-6 right-6 text-primary/10 group-hover:text-primary/20 transition-colors duration-500">
              <Quote className="w-12 h-12" />
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6 relative z-10 text-[15px]">
              &ldquo;{t.quote}&rdquo;
            </p>

            <StarRating rating={t.rating} />

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-cyan to-primary opacity-60 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-500" />
                <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-primary to-cyan flex items-center justify-center text-sm font-bold text-black">
                  {t.author.charAt(0)}
                </div>
              </div>
              <div>
                <div className="font-semibold text-sm">{t.author}</div>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const baseVelocity = useRef(-0.35);

  const cardWidth = 420;
  const gap = 24;
  const totalWidth = (cardWidth + gap) * testimonials.length;
  const [constraintRange, setConstraintRange] = useState({ min: -totalWidth, max: 0 });

  useEffect(() => {
    setConstraintRange({ min: -totalWidth, max: 0 });
  }, [totalWidth]);

  useAnimationFrame((_, delta) => {
    if (isHovered || isDragging) return;
    const current = x.get();
    const step = baseVelocity.current * (delta / 16);
    let next = current + step;
    if (next < constraintRange.min) {
      next -= constraintRange.min;
    } else if (next > constraintRange.max) {
      next += constraintRange.min;
    }
    x.set(next);
  });

  const handleDragStart = useCallback(() => setIsDragging(true), []);
  const handleDragEnd = useCallback(
    (_: any, info: PanInfo) => {
      setIsDragging(false);
      const current = x.get();
      const velocity = info.velocity.x;
      const target = current + velocity * 0.3;
      if (target < constraintRange.min) {
        x.set(target + constraintRange.min * -1);
      } else if (target > constraintRange.max) {
        x.set(target - constraintRange.min * -1);
      } else {
        x.set(target);
      }
    },
    [x, constraintRange],
  );

  const springX = useSpring(x, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.5,
  });

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/2 to-background" />

      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan/5 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-16">
        <SectionReveal>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm mb-6">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary/80 tracking-widest uppercase">
                Testimonials
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Trusted by{" "}
              <span className="gradient-text">Industry Leaders</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real results from real businesses. Here is what founders and
              executives say about working with me.
            </p>
          </div>
        </SectionReveal>
      </div>

      <div
        ref={containerRef}
        className="relative w-full cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6 px-6"
          style={{ x: springX }}
          drag="x"
          dragConstraints={{ left: constraintRange.min, right: constraintRange.max }}
          dragElastic={0.1}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          whileTap={{ cursor: "grabbing" }}
        >
          {duplicated.map((t, i) => (
            <TestimonialCard key={`${t.author}-${i}`} t={t} index={i} />
          ))}
        </motion.div>
      </div>

      <SectionReveal delay={0.2}>
        <div className="flex items-center justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              className="w-2 h-2 rounded-full bg-primary/40 hover:bg-primary transition-all duration-300"
              whileHover={{ scale: 1.5 }}
              onClick={() => {
                const target = -(cardWidth + gap) * i;
                x.set(target);
              }}
            />
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
