"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { projects } from "@/lib/constants";

function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof projects)[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl bg-secondary/95 backdrop-blur-xl border border-border/50 p-8 md:p-12"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/50 flex items-center justify-center hover:bg-background/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-8">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h3>
            <p className="text-primary text-lg">{project.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="text-xs tracking-widest uppercase text-primary mb-3">Challenge</h4>
                <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
              </div>
              <div>
                <h4 className="text-xs tracking-widest uppercase text-primary mb-3">Solution</h4>
                <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-xs tracking-widest uppercase text-primary mb-3">Architecture</h4>
                <p className="text-muted-foreground leading-relaxed">{project.architecture}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase text-primary mb-4">Results</h4>
            <div className="grid grid-cols-3 gap-4">
              {project.results.map((result, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-background/50 border border-border/50 text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold gradient-text">
                    {result.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{result.desc}</div>
                  <div className="text-sm font-medium mt-1">{result.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase text-primary mb-3">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/2 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm mb-6">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary/80 tracking-widest uppercase">
                Case Studies
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
              AI Systems <span className="gradient-text">in Production</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade AI solutions deployed for real businesses. Each case
              study shows measurable business impact.
            </p>
          </div>
        </SectionReveal>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <TiltCard tiltDegree={3} glare={false}>
                <div
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer relative p-[1px] rounded-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-6 md:p-8 rounded-2xl bg-secondary/30 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-500">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm text-primary font-mono">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="w-px h-4 bg-border" />
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">
                            {project.subtitle}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {project.tech.slice(0, 4).map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-1 rounded-lg bg-primary/5 text-primary/80 text-xs font-medium"
                            >
                              {t}
                            </span>
                          ))}
                          {project.tech.length > 4 && (
                            <span className="px-2.5 py-1 rounded-lg bg-secondary text-muted-foreground text-xs">
                              +{project.tech.length - 4}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 md:flex-shrink-0">
                        <div className="hidden md:flex items-center gap-4">
                          {project.results.slice(0, 2).map((r, j) => (
                            <div key={j} className="text-right">
                              <div className="text-lg font-bold gradient-text">{r.value}</div>
                              <div className="text-xs text-muted-foreground">{r.label}</div>
                            </div>
                          ))}
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
