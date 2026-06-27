import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/Primitives";
import { TIMELINE, COMPANIES } from "@/data/portfolio";

const CompanyLogo = ({ company, align }) => {
  const c = COMPANIES[company];
  const [error, setError] = useState(false);
  if (!c) return null;
  return (
    <div
      className={`mb-3 flex ${align === "right" ? "lg:justify-end" : "lg:justify-start"} justify-start`}
      title={c.name}
    >
      <div className={`h-20 w-20 rounded-md border border-border ${c.bg} grid place-items-center overflow-hidden shrink-0 shadow-sm`}>
        {!error ? (
          <img
            src={c.logo}
            alt={`${c.name} logo`}
            className={c.fit}
            onError={() => setError(true)}
            loading="lazy"
          />
        ) : (
          <span className="font-heading font-extrabold text-sm text-primary tracking-tight">
            {c.short}
          </span>
        )}
      </div>
    </div>
  );
};

export const Timeline = () => {
  return (
    <section className="surface border-y border-border">
      <div className="container-px py-16 lg:py-20">
        <SectionHeading overline="Career Journey" title="Professional Timeline" />

        <div className="relative">
          <div className="absolute left-3 lg:left-1/2 top-0 bottom-0 w-px bg-border lg:-translate-x-1/2" />
          <div className="space-y-10 lg:space-y-2">
            {TIMELINE.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative pl-10 lg:pl-0 lg:grid lg:grid-cols-2 lg:gap-12"
                >
                  <span className="absolute left-[5px] lg:left-1/2 top-2 h-3.5 w-3.5 rounded-full bg-accent ring-4 ring-background lg:-translate-x-1/2 z-10" />
                  <div className={`${left ? "lg:text-right lg:pr-12" : "lg:col-start-2 lg:pl-12"} py-4 lg:py-8`}>
                    <CompanyLogo company={item.company} align={left ? "right" : "left"} />
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-accent">{item.year}</span>
                    <h3 className="font-heading text-xl font-bold mt-2">{item.title}</h3>
                    <div className="text-sm font-medium text-foreground/80 mt-1">{item.org}</div>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
