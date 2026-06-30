"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Cpu,
  Brain,
  Library,
  MessageSquare,
  Server,
  Code2,
  Globe,
  Database,
  Workflow,
  Zap,
  MessageCircle,
  Rabbit,
} from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { capabilities } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Bot,
  Cpu,
  Brain,
  Library,
  MessageSquare,
  Server,
  Code2,
  Globe,
  Database,
  Workflow,
  Zap,
  MessageCircle,
  Rabbit,
};

const categories = [
  { id: "all", label: "All" },
  { id: "ai-agents", label: "AI Agents" },
  { id: "rag", label: "RAG & Knowledge" },
  { id: "backend", label: "Backend & Infra" },
  { id: "automation", label: "Automation" },
];

function CapabilityCard({
  name,
  category,
  icon,
  index,
}: {
  name: string;
  category: string;
  icon: string;
  index: number;
}) {
  const Icon = (iconMap as Record<string, React.ComponentType<{ className?: string }>>)[icon] || Bot;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <TiltCard tiltDegree={5} glare={false}>
        <div className="relative p-[1px] rounded-2xl overflow-hidden">
          <div
            className={cn(
              "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500",
              isHovered && "opacity-100"
            )}
            style={{
              background:
                "linear-gradient(135deg, rgba(0,212,255,0.3), rgba(6,255,204,0.3), transparent)",
            }}
          />
          <div
            className="relative p-5 rounded-2xl bg-secondary/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-cyan/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                {Icon ? <Icon className="w-6 h-6 text-primary" /> : <Bot className="w-6 h-6 text-primary" />}
              </div>
              <div>
                <h3 className="font-semibold text-sm tracking-tight">{name}</h3>
                <span className="text-xs text-muted-foreground capitalize">
                  {category.replace("-", " ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export function CapabilitiesSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredCapabilities = useMemo(
    () =>
      activeCategory === "all"
        ? capabilities
        : capabilities.filter((c) => c.category === activeCategory),
    [activeCategory]
  );

  return (
    <section id="capabilities" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/2 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm mb-6">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary/80 tracking-widest uppercase">
                Capabilities
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Full-Stack{" "}
              <span className="gradient-text">AI Engineering</span> Arsenal
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From agent orchestration to vector search — every tool needed to
              build production-grade AI systems.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground border border-border/50 hover:border-primary/30"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </SectionReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredCapabilities.map((cap, i) => (
              <CapabilityCard key={cap.name} {...cap} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
