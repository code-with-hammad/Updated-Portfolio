"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Cpu,
  Zap,
  Library,
  MessageCircle,
  Globe,
  Code2,
  Workflow,
  ArrowRight,
} from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { services } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Bot,
  Cpu,
  Zap,
  Library,
  MessageCircle,
  Globe,
  Code2,
  Workflow,
};

export function ServicesSection() {
  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/2 to-background" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm mb-6">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary/80 tracking-widest uppercase">
                Services
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Premium <span className="gradient-text">AI Engineering</span> Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade AI systems tailored to your business needs.
              From autonomous agents to full-stack platforms.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = (iconMap[service.title.split(" ")[0]] || Zap) as React.ComponentType<{ className?: string }>;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                <TiltCard tiltDegree={6} glare={true}>
                  <div className="relative p-[1px] rounded-2xl h-full">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/20 via-transparent to-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative h-full p-8 rounded-2xl bg-secondary/50 backdrop-blur-sm border border-border/50 group-hover:border-primary/30 transition-all duration-500 flex flex-col">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-cyan/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>

                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                        {service.description}
                      </p>

                      <ul className="space-y-2.5 mb-8">
                        {service.features.map((feature, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center gap-2 text-sm text-primary font-medium group/link cursor-pointer">
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
