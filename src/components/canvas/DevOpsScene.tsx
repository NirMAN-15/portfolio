"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

// Central Core Server Node with Option 4: Nested Polyhedral Outer Cage (Zero Circles)
function ServerNode() {
  const meshRef = useRef<THREE.Mesh>(null);
  const cageRef = useRef<THREE.Mesh>(null);
  const cage2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.18;
      meshRef.current.rotation.y = t * 0.28;
    }
    // Smooth polyhedral cage rotations
    if (cageRef.current) {
      cageRef.current.rotation.x = t * 0.08;
      cageRef.current.rotation.y = -t * 0.12;
    }
    if (cage2Ref.current) {
      cage2Ref.current.rotation.x = -t * 0.06;
      cage2Ref.current.rotation.z = t * 0.09;
    }
  });

  return (
    <group position={[2.4, 0.1, 0]}>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
        {/* Core Wireframe Octahedron in matching Cyber Cyan */}
        <mesh ref={meshRef} scale={1.65}>
          <octahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial
            color="#00f0ff"
            wireframe
            distort={0.3}
            speed={2}
            emissive="#00f0ff"
            emissiveIntensity={0.65}
          />
        </mesh>

        {/* ── Option 4: Primary Nested Polyhedral Cage (Icosahedron Shield) ── */}
        <mesh ref={cageRef} scale={2.5}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#00f0ff"
            wireframe
            transparent
            opacity={0.25}
            emissive="#00f0ff"
            emissiveIntensity={0.35}
          />
        </mesh>

        {/* ── Option 4: Secondary Subtle Outer Boundary (Counter-Rotating Octahedron) ── */}
        <mesh ref={cage2Ref} scale={2.85}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#00ff66"
            wireframe
            transparent
            opacity={0.14}
            emissive="#00ff66"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

// Upper floating satellite node (Icosahedron)
function SatelliteNode() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.3;
      meshRef.current.rotation.y = t * 0.25;
      meshRef.current.position.y = 1.8 + Math.sin(t * 0.6) * 0.25;
    }
  });

  return (
    <mesh ref={meshRef} position={[3.8, 1.8, -0.5]} scale={0.45}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#00ff66"
        wireframe
        emissive="#00ff66"
        emissiveIntensity={0.6}
      />
    </mesh>
  );
}

// Lower floating satellite node (Micro Cube)
function MicroNode() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
      meshRef.current.position.y = -2.0 + Math.cos(t * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[3.6, -2.0, -0.8]} scale={0.5}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#00f0ff"
        wireframe
        emissive="#00f0ff"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 600;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      // Kept towards background and right side
      arr[i] = (Math.random() - 0.3) * 16;
      arr[i + 1] = (Math.random() - 0.5) * 12;
      arr[i + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00f0ff"
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

function GridFloor() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.getElapsedTime() * 0.25) % 1;
    }
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[35, 35, "#00f0ff", "#081426"]}
      position={[0, -3.2, 0]}
    />
  );
}

export default function DevOpsScene() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 52 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 5, 4]} intensity={0.9} color="#00f0ff" />
        <directionalLight position={[-4, -3, -2]} intensity={0.4} color="#00ff66" />
        <pointLight position={[2.4, 0, 2]} intensity={0.7} color="#00f0ff" distance={7} />
        <Stars radius={70} depth={40} count={2200} factor={2.5} fade speed={0.4} />
        <ServerNode />
        <SatelliteNode />
        <MicroNode />
        <Particles />
        <GridFloor />
      </Canvas>
    </div>
  );
}
