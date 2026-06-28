import { motion } from "framer-motion";
import { GALLERY } from "@/data/portfolio";
import { SectionHeading } from "@/components/Primitives";

export const Gallery = () => {
  return (
    <section className="surface border-y border-border">
      <div className="container-px py-20 lg:py-32">
        <SectionHeading overline="Gallery" title="On site & in the field" />
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [&>*]:mb-4">
          {GALLERY.map((item, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, scale: 0.96 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
    className="relative overflow-hidden rounded-md border border-border group"
  >
    <img
      src={item.image}
      alt={`Project gallery ${i + 1}`}
      className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
      loading="lazy"
    />

    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm p-2">
      {item.caption}
    </div>
  </motion.div>
))}
      </div>
    </div>
  </section>
);
};
