import dynamic from "next/dynamic";
import { HeroSection } from "@/components/hero/hero-section";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackToTop } from "@/components/ui/back-to-top";
import { FloatingCTA } from "@/components/ui/floating-cta";

const AboutSection = dynamic(() =>
  import("@/components/about/about-section").then((m) => ({ default: m.AboutSection }))
);
const CapabilitiesSection = dynamic(() =>
  import("@/components/capabilities/capabilities-section").then((m) => ({ default: m.CapabilitiesSection }))
);
const ServicesSection = dynamic(() =>
  import("@/components/services/services-section").then((m) => ({ default: m.ServicesSection }))
);
const ArchitectureSection = dynamic(() =>
  import("@/components/architecture/architecture-section").then((m) => ({
    default: m.ArchitectureSection,
  }))
);
const TestimonialsSection = dynamic(() =>
  import("@/components/testimonials/testimonials-section").then((m) => ({ default: m.TestimonialsSection }))
);
const ProjectsSection = dynamic(() =>
  import("@/components/projects/projects-section").then((m) => ({ default: m.ProjectsSection }))
);
const ContactSection = dynamic(() =>
  import("@/components/contact/contact-section").then((m) => ({ default: m.ContactSection }))
);

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main>
        <HeroSection />
        <AboutSection />
        <CapabilitiesSection />
        <ServicesSection />
        <ArchitectureSection />
        <TestimonialsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <FloatingCTA />
      <BackToTop />
    </>
  );
}
