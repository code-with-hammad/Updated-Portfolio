"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { SectionReveal } from "@/components/ui/section-reveal";
import { architectureFlow } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";

const NODE_COLORS: Record<string, string> = {
  user: "#00d4ff",
  agent: "#06ffcc",
  mcp: "#00d4ff",
  tools: "#06ffcc",
  knowledge: "#00d4ff",
  qdrant: "#06ffcc",
  neondb: "#00d4ff",
  response: "#06ffcc",
};

interface FlowNode {
  id: string;
  label: string;
  description: string;
}

function FlowParticles() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 80;

  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = Math.random() * 10 - 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geom;
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= 0.008;
      if (pos[i * 3 + 1] < -4) pos[i * 3 + 1] = 6;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.04}
        color="#00d4ff"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function ConnectionLine({
  start,
  end,
  color,
  progress,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  progress: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!ref.current) return;
    const midX = (start[0] + end[0]) / 2;
    const midY = (start[1] + end[1]) / 2 - 0.3;
    const midZ = (start[2] + end[2]) / 2;

    const t = progress;
    const points = [
      new THREE.Vector3(start[0], start[1] - t * 0.3, start[2]),
      new THREE.Vector3(midX, midY, midZ),
      new THREE.Vector3(end[0], end[1] + 0.3 - t * 0.3, end[2]),
    ];
    const curve = new THREE.QuadraticBezierCurve3(points[0], points[1], points[2]);
    const curvePoints = curve.getPoints(20);
    const geom = new THREE.BufferGeometry().setFromPoints(curvePoints);
    ref.current.geometry.dispose();
    ref.current.geometry = geom;
  });

  return (
    <mesh ref={ref}>
      <bufferGeometry />
      <meshBasicMaterial color={color} transparent opacity={0.15} />
    </mesh>
  );
}

function FlowNode3D({
  node,
  index,
  total,
}: {
  node: FlowNode;
  index: number;
  total: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = NODE_COLORS[node.id] || "#00d4ff";
  const x = (index / (total - 1)) * 9 - 4.5;
  const y = Math.sin(index * 1.2) * 0.2;

  useFrame((state) => {
    if (!meshRef.current) return;
    const scale = 0.4 + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.05;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <group position={[x, y, 0]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.85}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>
      <mesh scale={[0.6, 0.6, 0.6]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function FlowLabel({ node, index, total }: { node: FlowNode; index: number; total: number }) {
  const x = (index / (total - 1)) * 9 - 4.5;
  const y = Math.sin(index * 1.2) * 0.2;

  return (
    <group position={[x, y - 0.9, 0]}>
      <Text
        fontSize={0.2}
        color="#fafafa"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {node.label}
      </Text>
    </group>
  );
}

function Scene() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame((state) => {
    if (!cameraRef.current) return;
    const time = state.clock.elapsedTime;
    cameraRef.current.position.x = Math.sin(time * 0.08) * 1;
    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 6]} fov={50} />
      {architectureFlow.map((node, i) => (
        <FlowNode3D
          key={node.id}
          node={node}
          index={i}
          total={architectureFlow.length}
        />
      ))}
      {architectureFlow.map((node, i) => (
        <FlowLabel
          key={`label-${node.id}`}
          node={node}
          index={i}
          total={architectureFlow.length}
        />
      ))}
      <FlowParticles />
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#00d4ff" />
    </>
  );
}

export function ArchitectureSection() {
  const reducedMotion = useReducedMotion();
  const { dpr } = useDevicePerformance();

  if (reducedMotion) {
    return (
      <section id="architecture" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/2 to-background" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm mb-6">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs text-primary/80 tracking-widest uppercase">Architecture</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
                AI System <span className="gradient-text">Architecture</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                How my AI systems process, reason, and deliver intelligent responses.
              </p>
            </div>
          </SectionReveal>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {architectureFlow.map((node, i) => (
                <div key={node.id} className="flex items-center gap-6 p-4 rounded-xl bg-secondary/30 border border-border/50">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: NODE_COLORS[node.id] }}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{node.label}</h3>
                    <p className="text-sm text-muted-foreground">{node.description}</p>
                  </div>
                  {i < architectureFlow.length - 1 && (
                    <div className="text-muted-foreground/30">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="architecture" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/2 to-background" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm mb-6">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary/80 tracking-widest uppercase">Architecture</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
              AI System <span className="gradient-text">Architecture</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              End-to-end flow of intelligent request processing — from user input to
              AI-powered response.
            </p>
          </div>
        </SectionReveal>

        <div className="relative h-[400px] rounded-2xl overflow-hidden border border-border/30 bg-secondary/20 backdrop-blur-sm">
          <Canvas
            dpr={dpr}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            camera={{ position: [0, 0, 6], fov: 50 }}
            style={{ width: "100%", height: "100%" }}
          >
            <Scene />
          </Canvas>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {architectureFlow.map((node) => (
            <div
              key={node.id}
              className="p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors duration-300"
            >
              <div
                className="w-2 h-2 rounded-full mb-2"
                style={{ backgroundColor: NODE_COLORS[node.id] }}
              />
              <h3 className="font-semibold text-sm mb-1">{node.label}</h3>
              <p className="text-xs text-muted-foreground">{node.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
