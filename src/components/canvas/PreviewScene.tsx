"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

interface PreviewSceneProps {
  option: number; // 1 to 5
}

function CentralNode({ option }: { option: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const cageRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.18;
      meshRef.current.rotation.y = t * 0.28;
    }

    if (option === 1) {
      // Hexagons
      if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.22;
      if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.16;
    } else if (option === 3) {
      // 3D Gimbal
      if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.3;
      if (ring2Ref.current) ring2Ref.current.rotation.x = -t * 0.22;
    } else if (option === 4) {
      // Polyhedral Cage
      if (cageRef.current) {
        cageRef.current.rotation.x = t * 0.08;
        cageRef.current.rotation.y = -t * 0.12;
      }
    }
  });

  return (
    <group position={[2.4, 0.1, 0]}>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
        {/* Core Wireframe Octahedron (The shape the user loves!) */}
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

        {/* ──────── OPTION 1: DUAL HEXAGONAL CYBER SHIELDS ──────── */}
        {option === 1 && (
          <>
            {/* Inner Hexagon (6 segments) in Cyber Cyan */}
            <mesh ref={ring1Ref}>
              <ringGeometry args={[1.85, 1.9, 6]} />
              <meshBasicMaterial
                color="#00f0ff"
                side={THREE.DoubleSide}
                transparent
                opacity={0.6}
              />
            </mesh>
            {/* Outer Hexagon (6 segments) in Neon Emerald */}
            <mesh ref={ring2Ref}>
              <ringGeometry args={[2.3, 2.35, 6]} />
              <meshBasicMaterial
                color="#00ff66"
                side={THREE.DoubleSide}
                transparent
                opacity={0.45}
              />
            </mesh>
          </>
        )}

        {/* ──────── OPTION 3: 3D GYROSCOPIC GIMBAL (Tilted in 3D, NOT flat) ──────── */}
        {option === 3 && (
          <>
            <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
              <torusGeometry args={[2.0, 0.015, 16, 72]} />
              <meshBasicMaterial color="#00f0ff" transparent opacity={0.5} />
            </mesh>
            <mesh ref={ring2Ref} rotation={[0, Math.PI / 3, 0]}>
              <torusGeometry args={[2.3, 0.012, 16, 72]} />
              <meshBasicMaterial color="#00ff66" transparent opacity={0.4} />
            </mesh>
          </>
        )}

        {/* ──────── OPTION 4: NESTED POLYHEDRAL OUTER CAGE ──────── */}
        {option === 4 && (
          <mesh ref={cageRef} scale={2.5}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#00f0ff"
              wireframe
              transparent
              opacity={0.22}
              emissive="#00f0ff"
              emissiveIntensity={0.3}
            />
          </mesh>
        )}

        {/* ──────── OPTION 5: CLEAN PURE CORE (ZERO RINGS AT ALL) ──────── */}
        {/* Intentionally renders NO rings or circles — pure minimal geometric power! */}
      </Float>
    </group>
  );
}

// Option 2: Animated Laser Rays connecting to Satellites
function LaserConnections() {
  const line1Ref = useRef<THREE.Line>(null);
  const line2Ref = useRef<THREE.Line>(null);

  const center = useMemo(() => new THREE.Vector3(2.4, 0.1, 0), []);
  const icoPos = useMemo(() => new THREE.Vector3(3.8, 1.8, -0.5), []);
  const cubePos = useMemo(() => new THREE.Vector3(3.6, -2.0, -0.8), []);

  const geo1 = useMemo(() => new THREE.BufferGeometry().setFromPoints([center, icoPos]), [center, icoPos]);
  const geo2 = useMemo(() => new THREE.BufferGeometry().setFromPoints([center, cubePos]), [center, cubePos]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (line1Ref.current) {
      (line1Ref.current.material as THREE.LineBasicMaterial).opacity = 0.4 + Math.sin(t * 3) * 0.3;
    }
    if (line2Ref.current) {
      (line2Ref.current.material as THREE.LineBasicMaterial).opacity = 0.4 + Math.cos(t * 3) * 0.3;
    }
  });

  const ThreeLine = "line" as any;

  return (
    <group>
      <ThreeLine ref={line1Ref as any} geometry={geo1}>
        <lineBasicMaterial color="#00ff66" transparent opacity={0.7} />
      </ThreeLine>
      <ThreeLine ref={line2Ref as any} geometry={geo2}>
        <lineBasicMaterial color="#00f0ff" transparent opacity={0.7} />
      </ThreeLine>
    </group>
  );
}

function Satellites() {
  const icoRef = useRef<THREE.Mesh>(null);
  const cubeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (icoRef.current) {
      icoRef.current.rotation.x = t * 0.3;
      icoRef.current.rotation.y = t * 0.25;
      icoRef.current.position.y = 1.8 + Math.sin(t * 0.6) * 0.25;
    }
    if (cubeRef.current) {
      cubeRef.current.rotation.x = t * 0.2;
      cubeRef.current.rotation.y = t * 0.3;
      cubeRef.current.position.y = -2.0 + Math.cos(t * 0.5) * 0.2;
    }
  });

  return (
    <>
      <mesh ref={icoRef} position={[3.8, 1.8, -0.5]} scale={0.45}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#00ff66"
          wireframe
          emissive="#00ff66"
          emissiveIntensity={0.6}
        />
      </mesh>

      <mesh ref={cubeRef} position={[3.6, -2.0, -0.8]} scale={0.5}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#00f0ff"
          wireframe
          emissive="#00f0ff"
          emissiveIntensity={0.5}
        />
      </mesh>
    </>
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

export default function PreviewScene({ option }: PreviewSceneProps) {
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
        <CentralNode option={option} />
        <Satellites />
        {option === 2 && <LaserConnections />}
        <GridFloor />
      </Canvas>
    </div>
  );
}
