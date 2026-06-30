"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";

function LoadingTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[0.8, 0.25, 64, 8]} />
      <meshPhysicalMaterial
        color="#00d4ff"
        wireframe
        transparent
        opacity={0.3}
        metalness={0.9}
        roughness={0.1}
        emissive="#00d4ff"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

function LoadingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.4, 24, 24]} />
      <meshPhysicalMaterial
        color="#06ffcc"
        transparent
        opacity={0.12}
        metalness={0.5}
        roughness={0.3}
        emissive="#06ffcc"
        emissiveIntensity={0.05}
      />
    </mesh>
  );
}

function LoadingScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#00d4ff" />
      <pointLight position={[-3, -3, -3]} intensity={1} color="#06ffcc" />
      <LoadingTorus />
      <LoadingSphere />
    </>
  );
}

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();
  const { dpr } = useDevicePerformance();

  const loadingText = "Initializing Neural Network";

  useEffect(() => {
    const updateProgress = () => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        const increment = 1 + Math.random() * 3;
        return Math.min(prev + increment, 100);
      });
    };

    const interval = setInterval(updateProgress, 80 + Math.random() * 120);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100 && overlayRef.current && containerRef.current) {
      const tl = gsap.timeline({
        onComplete,
      });

      tl.to(containerRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });

      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.6,
          ease: "power3.inOut",
        },
        "-=0.2"
      );

      tl.set(overlayRef.current, { display: "none" });
    }
  }, [progress, onComplete]);

  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [progress]);

  useEffect(() => {
    if (!textRef.current || reducedMotion) return;

    const text = loadingText;
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (textRef.current) {
        const displayText = text.slice(0, currentIndex + 1);
        textRef.current.textContent = displayText;
        currentIndex++;
        if (currentIndex >= text.length) {
          clearInterval(typeInterval);
        }
      }
    }, 60);

    return () => clearInterval(typeInterval);
  }, [loadingText, reducedMotion]);

  if (reducedMotion) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
    >
      <div
        ref={containerRef}
        className="flex flex-col items-center gap-8"
      >
        <div className="w-32 h-32 relative">
          <Canvas
            dpr={dpr}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            camera={{ position: [0, 0, 3], fov: 45 }}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <LoadingScene />
          </Canvas>
        </div>

        <div className="flex flex-col items-center gap-3">
          <span
            ref={textRef}
            className="text-sm text-primary/60 font-mono tracking-widest uppercase"
          >
            <span className="animate-pulse">|</span>
          </span>

          <div className="w-48 h-[2px] bg-muted rounded-full overflow-hidden relative">
            <div
              ref={progressRef}
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: "0%",
                background: "linear-gradient(90deg, #00d4ff, #06ffcc, #00d4ff)",
                backgroundSize: "200% 100%",
                animation: "gradient-x 2s linear infinite",
              }}
            />
          </div>

          <span className="text-[10px] text-muted-foreground font-mono tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
}
