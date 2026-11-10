"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/ui/Hero";

// Dynamic import with ssr: false for R3F canvas (identical to main page)
const PreviewScene = dynamic(() => import("@/components/canvas/PreviewScene"), {
  ssr: false,
});

const OPTIONS = [
  {
    id: 1,
    tag: "Option 01 // Angular Precision",
    name: "Dual Hexagonal Cyber Shields",
    badge: "Recommended",
    desc: "Replaces smooth circular rings with 6-sided geometric wireframe hexagons in Cyber Cyan & Neon Emerald. Their sharp angular edges align with the triangles of the central Octahedron!",
  },
  {
    id: 2,
    tag: "Option 02 // Live Network Links",
    name: "Pulsing Data Laser Beams",
    badge: "Dynamic",
    desc: "Removes circles entirely! Instead, animated pulsing cyan and emerald laser line beams connect the central Octahedron directly to the satellite nodes (representing microservices & cluster communication).",
  },
  {
    id: 3,
    tag: "Option 03 // 3D Gyroscope",
    name: "3D Gyroscopic Gimbal (Tilted Rings)",
    badge: "3D Depth",
    desc: "Instead of flat circles facing the screen, 2 delicate gyroscopic gimbal rings tilted on realistic 3D angles (45° on X/Y and 60° on Y/Z) rotating in 3D space like an atomic particle accelerator.",
  },
  {
    id: 4,
    tag: "Option 04 // Geometric Enclosure",
    name: "Nested Polyhedral Outer Cage",
    badge: "Pure Polyhedral",
    desc: "A larger, delicate, semi-transparent wireframe icosahedron cage orbiting the octahedron like an atmospheric containment shield. 100% geometric consistency!",
  },
  {
    id: 5,
    tag: "Option 05 // Minimalist Cyber",
    name: "Clean Pure Core (Zero Rings)",
    badge: "Minimalist",
    desc: "Completely strips away all rings and circles! Shows only the pure floating Octahedron, satellite nodes, stars, and grid floor. Clean, sleek, and uncluttered.",
  },
];

export default function PreviewPage() {
  const [activeOpt, setActiveOpt] = useState(1);
  const current = OPTIONS.find((o) => o.id === activeOpt) || OPTIONS[0];

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* 3D Scene Background using the exact R3F engine */}
      <PreviewScene option={activeOpt} />

      {/* Floating Top Control Panel */}
      <div
        style={{
          position: "sticky",
          top: "4.5rem",
          zIndex: 40,
          margin: "0 auto",
          maxWidth: "1100px",
          padding: "0.75rem 1.5rem",
          background: "rgba(10, 10, 26, 0.9)",
          border: "1px solid rgba(0, 240, 255, 0.3)",
          borderRadius: "14px",
          backdropFilter: "blur(16px)",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 240, 255, 0.15)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.6rem" }}>
          <div>
            <h1 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", margin: 0 }}>
              Live 3D Test: <span style={{ color: "#00f0ff" }}>Circle Replacement Options</span>
            </h1>
            <p style={{ fontSize: "0.78rem", color: "#94a3b8", margin: 0 }}>
              Click any button below to see the 3D scene update live on your screen:
            </p>
          </div>
          <div style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "#00ff66" }}>
            ● LIVE R3F CANVAS SYNCD
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActiveOpt(opt.id)}
              style={{
                background: activeOpt === opt.id ? "rgba(0, 240, 255, 0.2)" : "rgba(15, 23, 42, 0.8)",
                border: activeOpt === opt.id ? "1px solid #00f0ff" : "1px solid rgba(148, 163, 184, 0.25)",
                color: activeOpt === opt.id ? "#00f0ff" : "#cbd5e1",
                padding: "0.45rem 0.85rem",
                borderRadius: "8px",
                fontSize: "0.8rem",
                fontFamily: "monospace",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: activeOpt === opt.id ? "0 0 12px rgba(0, 240, 255, 0.3)" : "none",
              }}
            >
              <span style={{ color: activeOpt === opt.id ? "#00ff66" : "#64748b" }}>0{opt.id}.</span> {opt.name}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Typography in front of the 3D scene */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <Hero />
      </div>

      {/* Floating Info & Selection Card (Bottom Right) */}
      <div
        style={{
          position: "fixed",
          bottom: "1.5rem",
          left: "2rem",
          zIndex: 40,
          background: "rgba(10, 10, 26, 0.92)",
          border: "1px solid rgba(0, 240, 255, 0.35)",
          borderRadius: "12px",
          padding: "1rem 1.4rem",
          maxWidth: "460px",
          backdropFilter: "blur(16px)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8)",
        }}
      >
        <div style={{ fontSize: "0.7rem", color: "#00f0ff", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "1px" }}>
          {current.tag}
        </div>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", margin: "0.2rem 0 0.3rem 0" }}>
          {current.name}
        </h3>
        <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.4, margin: "0 0 0.8rem 0" }}>
          {current.desc}
        </p>
        <div style={{ fontSize: "0.8rem", color: "#00ff66", fontFamily: "monospace", fontWeight: 600 }}>
          ✓ Tell me in chat: &quot;Apply Option {current.id}&quot; to set this as your homepage design!
        </div>
      </div>
    </div>
  );
}
