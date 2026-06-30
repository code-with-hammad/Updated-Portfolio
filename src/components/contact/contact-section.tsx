"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MessageCircle,
  Sparkles,
  Download,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = "Name is required";
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formState.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormState({ name: "", email: "", message: "" });

    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/2 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm mb-6">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary/80 tracking-widest uppercase">
                Connect
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Let&apos;s Build Your{" "}
              <span className="gradient-text">AI System</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to automate your business with intelligent AI systems?
              Let&apos;s discuss how I can help you build the future.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Form */}
          <SectionReveal delay={0.1} direction="left" className="lg:col-span-3">
            <div className="relative p-[1px] rounded-3xl overflow-hidden h-full">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 via-cyan/20 to-transparent animate-gradient-x" />
              <div className="relative p-8 rounded-3xl bg-secondary/80 backdrop-blur-xl border border-border/30 h-full">
                <h3 className="text-xl font-bold mb-6">Send a Message</h3>

                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-cyan flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-black" />
                    </div>
                    <h4 className="text-lg font-bold mb-2">Message Sent!</h4>
                    <p className="text-muted-foreground text-sm text-center">
                      Thank you for reaching out. I&apos;ll get back to you
                      within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 focus-within:opacity-100" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(6,255,204,0.15))", margin: "-1px" }} />
                        <input
                          id="name"
                          type="text"
                          value={formState.name}
                          onChange={(e) =>
                            setFormState({ ...formState, name: e.target.value })
                          }
                          className={cn(
                            "w-full px-4 py-3 rounded-xl bg-background/50 border transition-all duration-300 relative z-10",
                            "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
                            errors.name
                              ? "border-red-500/50"
                              : "border-border/50 hover:border-primary/30"
                          )}
                          placeholder="Your name"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 focus-within:opacity-100" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(6,255,204,0.15))", margin: "-1px" }} />
                        <input
                          id="email"
                          type="email"
                          value={formState.email}
                          onChange={(e) =>
                            setFormState({ ...formState, email: e.target.value })
                          }
                          className={cn(
                            "w-full px-4 py-3 rounded-xl bg-background/50 border transition-all duration-300 relative z-10",
                            "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
                            errors.email
                              ? "border-red-500/50"
                              : "border-border/50 hover:border-primary/30"
                          )}
                          placeholder="your@email.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        Message
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 focus-within:opacity-100" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(6,255,204,0.15))", margin: "-1px" }} />
                        <textarea
                          id="message"
                          rows={4}
                          value={formState.message}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              message: e.target.value,
                            })
                          }
                          className={cn(
                            "w-full px-4 py-3 rounded-xl bg-background/50 border transition-all duration-300 resize-none relative z-10",
                            "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
                            errors.message
                              ? "border-red-500/50"
                              : "border-border/50 hover:border-primary/30"
                          )}
                          placeholder="Tell me about your project..."
                        />
                      </div>
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="gradient"
                      size="lg"
                      className="w-full group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </SectionReveal>

          {/* Contact Info */}
          <SectionReveal delay={0.2} direction="right" className="lg:col-span-2">
            <div className="space-y-6">
              {/* Direct Contact */}
              <TiltCard tiltDegree={3} glare={false}>
                <div className="relative p-[1px] rounded-3xl overflow-hidden h-full">
                  <div className="relative p-6 rounded-3xl bg-secondary/50 backdrop-blur-sm border border-border/30 h-full">
                    <h3 className="font-bold mb-4">Direct Contact</h3>

                    <div className="space-y-3">
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="group flex items-center gap-4 p-4 rounded-2xl bg-background/30 border border-border/30 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-cyan/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-muted-foreground">
                            Email
                          </div>
                          <div className="text-sm font-medium truncate">
                            {personalInfo.email}
                          </div>
                        </div>
                      </a>

                      <a
                        href={`https://wa.me/${personalInfo.whatsapp.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 p-4 rounded-2xl bg-background/30 border border-border/30 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-cyan/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <MessageCircle className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-muted-foreground">
                            WhatsApp
                          </div>
                          <div className="text-sm font-medium">
                            {personalInfo.whatsapp}
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>

              {/* Social & Resume */}
              <TiltCard tiltDegree={3} glare={false}>
                <div className="relative p-[1px] rounded-3xl overflow-hidden h-full">
                  <div className="relative p-6 rounded-3xl bg-secondary/50 backdrop-blur-sm border border-border/30 h-full">
                    <h3 className="font-bold mb-4">Connect & Download</h3>

                    <div className="flex items-center gap-3 mb-5">
                      <a
                        href={personalInfo.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-xl bg-background/30 border border-border/30 flex items-center justify-center hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all duration-300 group"
                        aria-label="GitHub"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                      <a
                        href={personalInfo.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-xl bg-background/30 border border-border/30 flex items-center justify-center hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all duration-300 group"
                        aria-label="LinkedIn"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    </div>

                    <a
                      href={personalInfo.resumeUrl}
                      download
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-background/30 border border-border/30 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-cyan/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Download className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          Download Resume
                        </div>
                        <div className="text-xs text-muted-foreground">
                          PDF - 2.4 MB
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </TiltCard>
            </div>
          </SectionReveal>
        </div>

        <SectionReveal delay={0.3}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-border/30 bg-background/30 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Typical response time: &lt; 2 hours
              </span>
              <Sparkles className="w-4 h-4 text-cyan" />
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
