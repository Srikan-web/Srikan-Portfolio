import { CheckCircle2 } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Primitives";
import { ABOUT, PROFILE } from "@/data/portfolio";

export const About = () => {
  return (
    <section id="about" className="container-px py-20 lg:py-32">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-3 grid-bg opacity-40 -z-10" />
            <img
              src={PROFILE.aboutImage}
              alt="Srikan on a construction site"
              className="w-full aspect-[4/5] object-cover rounded-md border border-border"
            />
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-primary text-primary-foreground p-5 rounded-md shadow-xl">
              <div className="text-4xl font-heading font-extrabold leading-none">10+</div>
              <div className="text-xs uppercase tracking-[0.15em] mt-1 opacity-80">Years Experience</div>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            overline="About"
            title="Engineering precision across continents"
          />
          <Reveal delay={0.1}>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              {ABOUT.intro}
            </p>
          </Reveal>

          <ul className="mt-8 space-y-4">
            {ABOUT.points.map((p, i) => (
              <Reveal key={i} delay={0.12 + i * 0.06}>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-foreground/90">{p}</span>
                </li>
              </Reveal>
            ))}
          </ul>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border border-border rounded-md overflow-hidden">
            {ABOUT.stats.map((s, i) => (
              <div key={i} className="bg-background p-5 text-center">
                <div className="font-heading text-2xl lg:text-3xl font-extrabold text-accent">{s.value}</div>
                <div className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
