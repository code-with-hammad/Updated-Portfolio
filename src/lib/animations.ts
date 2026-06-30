import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const fadeUp = (el: string | Element) => ({
  from: { opacity: 0, y: 60 },
  to: {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  },
});

export const staggerFadeUp = (
  el: string | Element,
  staggerAmount = 0.1
) => ({
  from: { opacity: 0, y: 60 },
  to: {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: staggerAmount,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  },
});

export const scaleIn = (el: string | Element) => ({
  from: { opacity: 0, scale: 0.8 },
  to: {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  },
});

export const parallaxScroll = (
  el: string | Element,
  distance = 100
) => ({
  start: "top bottom",
  end: "bottom top",
  onUpdate: (self: { progress: number }) => {
    gsap.set(el, { y: self.progress * distance });
  },
});

export const textReveal = (el: string | Element) => ({
  from: { opacity: 0, y: 30, rotateX: -20 },
  to: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  },
});

export const pinSection = (
  el: string | Element,
  endTrigger: string | Element
) => ({
  trigger: el,
  start: "top top",
  endTrigger: endTrigger,
  end: "bottom top",
  pin: true,
  anticipatePin: 1,
  scrub: 1,
});

export const magnetEffect = (
  el: HTMLElement,
  strength = 0.3
) => {
  el.addEventListener("mousemove", (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: "power2.out",
    });
  });
  el.addEventListener("mouseleave", () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
  });
};
