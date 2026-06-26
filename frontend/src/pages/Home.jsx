import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Timeline } from "@/components/sections/Timeline";
import { Projects } from "@/components/sections/Projects";
import { WorldMap } from "@/components/sections/WorldMap";
import { Research } from "@/components/sections/Research";
import { Skills } from "@/components/sections/Skills";
import { Gallery } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  useEffect(() => {
    document.title = "Srikan Dewasumithra — Civil Engineer & Construction Manager";
  }, []);

  return (
    <main className="bg-background">
      <Navbar />
      <Hero />
      <About />
      <Timeline />
      <Projects />
      <WorldMap />
      <Research />
      <Skills />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
