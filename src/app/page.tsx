import DevOpsScene from "@/components/canvas/DevOpsScene";
import Hero from "@/components/ui/Hero";
import About from "@/components/ui/About";

export default function Home() {
  return (
    <main style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* 3D Background */}
      <DevOpsScene />
      
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />
    </main>
  );
}
