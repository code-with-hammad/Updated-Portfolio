import { Sparkles } from "lucide-react";
import { personalInfo } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/30 bg-background">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/3 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-bold text-sm">{personalInfo.name}</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a
              href={`mailto:${personalInfo.email}`}
              className="hover:text-primary transition-colors"
            >
              Email
            </a>
            <a
              href={`https://wa.me/${personalInfo.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              WhatsApp
            </a>
          </div>

          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
