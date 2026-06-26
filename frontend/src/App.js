import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import ProjectDetail from "@/pages/ProjectDetail";
import Admin from "@/pages/Admin";

function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.__lenis = lenis;
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);
  return null;
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="srikan-theme">
      <div className="App">
        <BrowserRouter>
          <SmoothScroll />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Toaster position="top-right" richColors />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
