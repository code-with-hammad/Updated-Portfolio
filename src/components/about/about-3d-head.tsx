"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function WireframeHead() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={0.5} floatIntensity={0.1} rotationIntensity={0.02}>
        <mesh>
          <dodecahedronGeometry args={[1.2, 0]} />
          <meshPhysicalMaterial
            color="#00d4ff"
            wireframe
            transparent
            opacity={0.12}
            metalness={0.9}
            roughness={0.1}
            emissive="#00d4ff"
            emissiveIntensity={0.05}
          />
        </mesh>
      </Float>

      <Float speed={0.7} floatIntensity={0.15} rotationIntensity={0.03}>
        <mesh>
          <icosahedronGeometry args={[0.8, 0]} />
          <meshPhysicalMaterial
            color="#06ffcc"
            wireframe
            transparent
            opacity={0.08}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
      </Float>

      <mesh>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#00d4ff" />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 2, 3]} intensity={2} color="#00d4ff" />
      <pointLight position={[-3, -2, -3]} intensity={1} color="#06ffcc" />
      <WireframeHead />
    </>
  );
}

export function About3DHead() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div className="w-full h-full min-h-[400px] relative">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 3.5], fov: 40 }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
