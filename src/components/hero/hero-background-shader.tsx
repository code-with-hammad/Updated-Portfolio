"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { MousePosition } from "@/hooks/useMousePosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";

interface ShaderPlaneProps {
  mouse: React.MutableRefObject<MousePosition>;
  scrollProgress: number;
}

function ShaderPlane({ mouse, scrollProgress }: ShaderPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uColor1: { value: new THREE.Color("#00d4ff") },
      uColor2: { value: new THREE.Color("#06ffcc") },
      uColor3: { value: new THREE.Color("#030305") },
    }),
    []
  );

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uScroll;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;

    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      float wave1 = sin(uv.x * 4.0 + uTime * 0.3 + uMouse.x * 2.0) * 0.5 + 0.5;
      float wave2 = cos(uv.y * 5.0 + uTime * 0.25 + uMouse.y * 2.0) * 0.5 + 0.5;
      float wave3 = sin((uv.x + uv.y) * 3.0 + uTime * 0.2 + uScroll * 3.0) * 0.5 + 0.5;

      float blend1 = wave1 * wave2;
      float blend2 = wave2 * wave3;
      float blend3 = wave1 * wave3;

      vec3 color = mix(uColor3, uColor1, blend1 * 0.3);
      color = mix(color, uColor2, blend2 * 0.2);
      color = mix(color, uColor1, blend3 * 0.15);

      float vignette = 1.0 - length(uv - 0.5) * 0.8;
      color *= vignette;

      float pulse = sin(uTime * 0.15) * 0.05 + 0.95;
      color *= pulse;

      gl_FragColor = vec4(color, 0.6);
    }
  `;

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uMouse.value.x = mouse.current.smoothX;
      material.uniforms.uMouse.value.y = mouse.current.smoothY;
      material.uniforms.uScroll.value = scrollProgress;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export function HeroBackgroundShader({
  mouse,
  scrollProgress = 0,
}: {
  mouse: React.MutableRefObject<MousePosition>;
  scrollProgress?: number;
}) {
  const reducedMotion = useReducedMotion();
  const { dpr } = useDevicePerformance();

  if (reducedMotion) return null;

  return (
    <Canvas
      dpr={dpr}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0, 1] }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <ShaderPlane mouse={mouse} scrollProgress={scrollProgress} />
    </Canvas>
  );
}
