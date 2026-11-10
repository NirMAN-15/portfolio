import DevOpsScene from "@/components/canvas/DevOpsScene";
import Hero from "@/components/ui/Hero";
import About from "@/components/ui/About";
import Contact from "@/components/ui/Contact";

export default function Home() {
  return (
    <main style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Fixed 3D Background — stays across all scroll */}
      <DevOpsScene />

      {/* Hero Section */}
      <Hero />

      {/* Divider */}
      <div className="section-divider" />

      {/* About Section */}
      <About />

      {/* Divider */}
      <div className="section-divider" />

      {/* Contact Section */}
      <Contact />
    </main>
  );
}
