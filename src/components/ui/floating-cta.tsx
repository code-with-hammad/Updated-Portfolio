"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall } from "lucide-react";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#contact"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-6 bottom-24 z-40 flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-primary to-cyan text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow duration-300 group"
        >
          <PhoneCall className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span className="text-sm font-medium whitespace-nowrap">Book a Call</span>
          <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
