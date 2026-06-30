"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";

interface StatOrbProps {
  position: [number, number, number];
  color: string;
  index: number;
}

function StatOrb({ position, color, index }: StatOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 + index;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 + index;
    }
  });

  return (
    <Float speed={0.5 + index * 0.1} floatIntensity={0.2 + index * 0.05} rotationIntensity={0.05}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          transparent
          opacity={0.25}
          wireframe
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={position}>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.08}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

function StatOrbitals() {
  const stats = [
    { label: "AI Systems", value: "47+", color: "#00d4ff" },
    { label: "Industries", value: "12+", color: "#06ffcc" },
    { label: "Uptime", value: "99.2%", color: "#00d4ff" },
    { label: "Tasks", value: "3.2M+", color: "#06ffcc" },
  ];

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[2, 2, 2]} intensity={1} color="#00d4ff" />
      {stats.map((stat, i) => {
        const angle = (i / stats.length) * Math.PI * 2;
        const radius = 1.8;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <StatOrb
            key={stat.label}
            position={[x, 0, z]}
            color={stat.color}
            index={i}
          />
        );
      })}
    </>
  );
}

export function About3DStats() {
  const reducedMotion = useReducedMotion();
  const { dpr } = useDevicePerformance();

  if (reducedMotion) return null;

  return (
    <div className="w-full h-full min-h-[300px] relative">
      <Canvas
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0.5, 4], fov: 45 }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <StatOrbitals />
      </Canvas>
    </div>
  );
}
