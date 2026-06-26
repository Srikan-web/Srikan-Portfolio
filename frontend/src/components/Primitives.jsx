import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 24, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: [0.21, 0.61, 0.35, 1] }}
  >
    {children}
  </motion.div>
);

export const Overline = ({ children, className = "" }) => (
  <span
    className={`uppercase text-xs tracking-[0.25em] font-bold text-accent ${className}`}
  >
    {children}
  </span>
);

export const SectionHeading = ({ overline, title, subtitle, id }) => (
  <div className="mb-12 lg:mb-16 max-w-3xl" id={id}>
    {overline && <Overline className="mb-4 block">{overline}</Overline>}
    <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter leading-[1.05]">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-5 text-base lg:text-lg text-muted-foreground leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);
