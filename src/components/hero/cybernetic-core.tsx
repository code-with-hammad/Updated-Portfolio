"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";

const CYAN = new THREE.Color("#06b6d4");
const ELECTRIC_BLUE = new THREE.Color("#00d4ff");

function TorusKnotOutline({ radius = 2.2, tube = 0.05 }: { radius?: number; tube?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotion();

  useFrame((state) => {
    if (reducedMotion || !ref.current) return;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.15;
    ref.current.rotation.y = state.clock.elapsedTime * 0.1;
    ref.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.06) * 0.1;
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[radius, tube, 96, 12, 2, 3]} />
      <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.15} />
    </mesh>
  );
}

function OuterRing({ radius = 2.8 }: { radius?: number }) {
  const ref = useRef<THREE.LineSegments>(null);
  const reducedMotion = useReducedMotion();

  const geometry = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 80;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(
          Math.cos(theta) * radius,
          Math.sin(theta) * radius * 0.3,
          Math.sin(theta * 1.5) * 0.6
        )
      );
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    return geo;
  }, [radius]);

  useFrame((state) => {
    if (reducedMotion || !ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.06;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.04) * 0.1;
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineDashedMaterial
        color={ELECTRIC_BLUE}
        transparent
        opacity={0.12}
        dashSize={0.06}
        gapSize={0.15}
      />
    </lineSegments>
  );
}

function CyberCore({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const coreRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotion();
  const targetRotation = useRef({ x: 0, y: 0 });

  const geos = useRef<THREE.BufferGeometry[]>([]);
  const mats = useRef<THREE.Material[]>([]);

  const geoIcosa = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1.0, 2);
    geos.current.push(g);
    return g;
  }, []);

  const geoIcosaOuter = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1.4, 1);
    geos.current.push(g);
    return g;
  }, []);

  const wireMat = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color: CYAN,
      emissive: ELECTRIC_BLUE,
      emissiveIntensity: 0.5,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
      metalness: 0.9,
      roughness: 0.1,
    });
    mats.current.push(m);
    return m;
  }, []);

  const outerWireMat = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color: ELECTRIC_BLUE,
      emissive: CYAN,
      emissiveIntensity: 0.2,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
      metalness: 0.7,
      roughness: 0.3,
    });
    mats.current.push(m);
    return m;
  }, []);

  const coreMat = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0a1628"),
      emissive: ELECTRIC_BLUE,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.35,
      metalness: 0.4,
      roughness: 0.7,
    });
    mats.current.push(m);
    return m;
  }, []);

  const glowMat = useMemo(() => {
    const m = new THREE.MeshBasicMaterial({
      color: ELECTRIC_BLUE,
      transparent: true,
      opacity: 0.05,
      side: THREE.BackSide,
    });
    mats.current.push(m);
    return m;
  }, []);

  const glowGeo = useMemo(() => {
    const g = new THREE.SphereGeometry(2.0, 32, 32);
    geos.current.push(g);
    return g;
  }, []);

  useEffect(() => {
    return () => {
      geos.current.forEach((g) => { try { g.dispose(); } catch {} });
      mats.current.forEach((m) => { try { m.dispose(); } catch {} });
      geos.current = [];
      mats.current = [];
    };
  }, []);

  useFrame((state) => {
    if (reducedMotion) return;

    const time = state.clock.elapsedTime;
    const mX = mouse.current.x ?? 0;
    const mY = mouse.current.y ?? 0;

    targetRotation.current.x += (mY * 0.35 - targetRotation.current.x) * 0.035;
    targetRotation.current.y += (mX * 0.35 - targetRotation.current.y) * 0.035;

    if (coreRef.current) {
      coreRef.current.rotation.x = targetRotation.current.x;
      coreRef.current.rotation.y = targetRotation.current.y + time * 0.12;
    }

    if (innerRef.current) {
      const breathe = 1 + Math.sin(time * 0.7) * 0.035;
      innerRef.current.scale.setScalar(breathe);
      innerRef.current.rotation.x = Math.sin(time * 0.15) * 0.08;
      innerRef.current.rotation.z = Math.cos(time * 0.2) * 0.06;
    }

    if (glowRef.current) {
      glowRef.current.rotation.x = time * 0.015;
      glowRef.current.rotation.y = time * 0.025;
    }
  });

  return (
    <group ref={coreRef}>
      <group ref={innerRef}>
        <mesh geometry={geoIcosa} material={coreMat} />
        <mesh geometry={geoIcosa} material={wireMat} scale={1.04} />
      </group>
      <mesh geometry={geoIcosaOuter} material={outerWireMat} scale={1.3} />
      <TorusKnotOutline radius={2.0} tube={0.04} />
      <OuterRing radius={2.6} />
      <mesh ref={glowRef} geometry={glowGeo} material={glowMat} />
    </group>
  );
}

export function CyberneticCore({
  mouse,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const reducedMotion = useReducedMotion();
  const { dpr } = useDevicePerformance();

  if (reducedMotion) return null;

  return (
    <Canvas
      dpr={dpr}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color(0x000000), 0);
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={45} />
      <ambientLight intensity={0.1} />
      <pointLight position={[4, 3, 5]} intensity={2.5} color="#00d4ff" />
      <pointLight position={[-4, -2, 3]} intensity={1.5} color="#06b6d4" />
      <CyberCore mouse={mouse} />
    </Canvas>
  );
}
