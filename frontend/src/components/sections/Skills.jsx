import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { SectionHeading } from "@/components/Primitives";
import { SKILLS } from "@/data/portfolio";

export const Skills = () => {
  return (
    <section id="skills" className="container-px py-20 lg:py-32">
      <SectionHeading
        overline="Capabilities"
        title="Technical & management expertise"
        subtitle="A balanced blend of engineering, digital tools and leadership built over a decade of delivery."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((s, i) => {
          const Icon = Icons[s.icon] || Icons.Wrench;
          return (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className="group rounded-md border border-border bg-card p-5 hover:border-accent/60 hover:-translate-y-1 transition-all duration-300"
              data-testid={`skill-${s.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 grid place-items-center rounded-md bg-secondary text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-heading font-semibold">{s.name}</span>
                </div>
                <span className="text-sm font-bold text-accent">{s.level}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className="h-full rounded-full bg-accent"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
