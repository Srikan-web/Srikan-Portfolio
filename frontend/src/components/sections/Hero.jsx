import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROFILE } from "@/data/portfolio";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80 });
  else el.scrollIntoView({ behavior: "smooth" });
};

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={PROFILE.heroImage}
          alt="Infrastructure engineering"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/92 to-background/40 dark:from-background dark:via-background/90 dark:to-background/30" />
        <div className="absolute inset-0 grid-bg opacity-[0.35]" />
      </div>

      <div className="container-px relative z-10 pt-28 pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-6"
        >
          <MapPin className="h-4 w-4 text-accent" />
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-muted-foreground">
            {PROFILE.location}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[0.95] max-w-4xl text-balance"
          data-testid="hero-name"
        >
          Manameldura Srikan D.{" "}
          <span className="text-accent">Dewasumithra</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 text-lg lg:text-2xl font-medium text-foreground/90 font-heading"
        >
          {PROFILE.role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-5 text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed"
        >
          {PROFILE.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Button
            size="lg"
            className="rounded-md gap-2 group hover:-translate-y-0.5 transition-transform"
            onClick={() => scrollTo("projects")}
            data-testid="hero-view-projects"
          >
            View Projects
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-md gap-2 hover:-translate-y-0.5 transition-transform" data-testid="hero-download-cv">
            <a href="/cv-srikan-dewasumithra.pdf" target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4" /> Download CV
            </a>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="rounded-md gap-2 hover:-translate-y-0.5 transition-transform"
            onClick={() => scrollTo("contact")}
            data-testid="hero-contact"
          >
            <Mail className="h-4 w-4" /> Contact Me
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
