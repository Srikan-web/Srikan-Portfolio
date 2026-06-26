import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/Primitives";
import { MAP_LOCATIONS } from "@/data/portfolio";

const MAP_IMAGE =
  "https://static.prod-images.emergentagent.com/jobs/86bad6dc-f530-4d18-980a-23d37c5a229d/images/d7c07dd9eb553bb064726682ec455e01f19861b87a1aa7ad32d013cb4ffade48.png";

export const WorldMap = () => {
  const [active, setActive] = useState(null);

  return (
    <section className="container-px py-20 lg:py-32">
      <SectionHeading
        overline="Global Footprint"
        title="Projects across Asia, Africa & Oceania"
        subtitle="Hover or tap a marker to explore where these projects were delivered."
      />

      <div className="relative w-full rounded-md border border-border bg-surface overflow-hidden">
        <div className="relative w-full" style={{ aspectRatio: "1264 / 848" }}>
          <img
            src={MAP_IMAGE}
            alt="World map of project locations"
            className="absolute inset-0 h-full w-full object-contain p-4 opacity-90 dark:invert dark:opacity-80"
          />

          {MAP_LOCATIONS.map((loc, i) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.12, type: "spring", stiffness: 220 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ top: loc.top, left: loc.left }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <button
                onClick={() => setActive(active === i ? null : i)}
                className="relative block"
                data-testid={`map-marker-${loc.name.toLowerCase().replace(/\s+/g, "-")}`}
                aria-label={loc.name}
              >
                <span className={`relative grid place-items-center h-4 w-4 rounded-full ${loc.home ? "bg-primary" : "bg-accent"} pulse-ring`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
              </button>

              {active === i && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-6 w-48 z-20 bg-popover text-popover-foreground border border-border rounded-md shadow-xl p-3 text-left"
                >
                  <div className="flex items-center gap-1.5 text-accent text-[11px] font-bold uppercase tracking-[0.15em]">
                    <MapPin className="h-3 w-3" /> {loc.name}
                  </div>
                  <div className="text-sm font-medium mt-1 leading-snug">{loc.project}</div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        {MAP_LOCATIONS.map((loc) => (
          <div key={loc.name} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className={`h-2.5 w-2.5 rounded-full ${loc.home ? "bg-primary" : "bg-accent"}`} />
            {loc.name}
          </div>
        ))}
      </div>
    </section>
  );
};
