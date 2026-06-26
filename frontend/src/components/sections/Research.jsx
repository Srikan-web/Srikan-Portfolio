import { FileText, Microscope, ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Primitives";
import { RESEARCH } from "@/data/portfolio";

export const Research = () => {
  return (
    <section id="research" className="surface border-y border-border">
      <div className="container-px py-20 lg:py-32">
        <SectionHeading overline="Research" title="Advancing construction science" />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <Reveal>
            <div className="relative overflow-hidden rounded-md border border-border">
              <img src={RESEARCH.image} alt="Timber structural research" className="w-full aspect-[4/3] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-xs uppercase tracking-[0.15em] font-bold">
                <Microscope className="h-4 w-4" /> Master's Research
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-accent">{RESEARCH.level}</span>
              <h3 className="font-heading text-2xl lg:text-3xl font-bold mt-3 leading-tight">
                {RESEARCH.title}
              </h3>
              <p className="mt-5 text-muted-foreground leading-relaxed">{RESEARCH.abstract}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 flex flex-wrap gap-2">
                {RESEARCH.themes.map((t) => (
                  <span key={t} className="text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-background">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <h4 className="mt-10 text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground">Publications</h4>
              <div className="mt-4 space-y-px bg-border border border-border rounded-md overflow-hidden">
                {RESEARCH.publications.map((pub, i) => (
                  <div key={i} className="bg-background p-4 flex items-start gap-3 group hover:bg-secondary/50 transition-colors">
                    <FileText className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{pub.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{pub.venue} · {pub.year}</div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
