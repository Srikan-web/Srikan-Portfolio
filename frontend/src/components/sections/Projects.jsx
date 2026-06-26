import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/Primitives";
import { PROJECTS } from "@/data/portfolio";

export const Projects = () => {
  const navigate = useNavigate();

  return (
    <section id="projects" className="container-px py-20 lg:py-32">
      <SectionHeading
        overline="Featured Projects"
        title="Infrastructure delivered worldwide"
        subtitle="A selection of major construction and infrastructure projects across the Maldives, Kenya, Uganda and Myanmar."
      />

      <div className="grid gap-6 md:grid-cols-6 auto-rows-fr">
        {PROJECTS.map((p, i) => {
          // Tetris layout: first two large, rest medium
          const span = i < 2 ? "md:col-span-3" : "md:col-span-2";
          return (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              onClick={() => navigate(`/projects/${p.id}`)}
              className={`group relative overflow-hidden rounded-md border border-border text-left bg-card hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${span}`}
              data-testid={`project-card-${p.id}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-1.5 text-white/90 text-xs font-semibold uppercase tracking-[0.15em]">
                  <MapPin className="h-3.5 w-3.5" /> {p.location}
                </div>
                <div className="absolute bottom-0 inset-x-0 p-5 lg:p-6">
                  <div className="text-[11px] uppercase tracking-[0.15em] text-white/70 mb-1">{p.category}</div>
                  <h3 className="font-heading text-xl lg:text-2xl font-bold text-white leading-tight pr-8">
                    {p.title}
                  </h3>
                </div>
                <div className="absolute top-4 right-4 h-9 w-9 grid place-items-center rounded-full bg-white/15 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 group-hover:rotate-0 -rotate-45 transition-all duration-300">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};
