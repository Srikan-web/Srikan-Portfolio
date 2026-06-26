import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, CheckCircle2, AlertTriangle, Trophy, ListChecks } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/data/portfolio";

const Block = ({ icon: Icon, title, items }) => (
  <div className="border border-border rounded-md p-6 bg-card">
    <div className="flex items-center gap-2 mb-4">
      <Icon className="h-5 w-5 text-accent" />
      <h3 className="font-heading font-bold text-lg">{title}</h3>
    </div>
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-sm text-foreground/85">
          <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
          {it}
        </li>
      ))}
    </ul>
  </div>
);

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) document.title = `${project.title} — Srikan Dewasumithra`;
  }, [project]);

  if (!project) {
    return (
      <main className="bg-background min-h-screen">
        <Navbar />
        <div className="container-px pt-40 pb-32 text-center">
          <h1 className="font-heading text-3xl font-bold">Project not found</h1>
          <Button className="mt-6" onClick={() => navigate("/")}>Back home</Button>
        </div>
        <Footer />
      </main>
    );
  }

  const idx = PROJECTS.findIndex((p) => p.id === id);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <main className="bg-background">
      <Navbar />

      <section className="relative h-[70vh] min-h-[460px] flex items-end">
        <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="container-px relative z-10 pb-14 w-full">
          <button onClick={() => navigate("/")} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6" data-testid="project-back">
            <ArrowLeft className="h-4 w-4" /> Back to projects
          </button>
          <div className="text-xs uppercase tracking-[0.2em] font-bold text-accent">{project.category}</div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tighter mt-3 max-w-3xl">{project.title}</h1>
          <div className="flex flex-wrap gap-5 mt-5 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> {project.location}</span>
            <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4 text-accent" /> {project.year}</span>
          </div>
        </div>
      </section>

      <section className="container-px py-16 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
          <h2 className="font-heading text-2xl font-bold mb-4">Project Overview</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{project.overview}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Block icon={ListChecks} title="Responsibilities" items={project.responsibilities} />
          <Block icon={AlertTriangle} title="Challenges" items={project.challenges} />
          <Block icon={Trophy} title="Achievements" items={project.achievements} />
        </div>

        <div className="mt-16">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="h-5 w-5 text-accent" />
            <h2 className="font-heading text-2xl font-bold">Project Gallery</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {project.gallery.map((src, i) => (
              <div key={i} className="overflow-hidden rounded-md border border-border group">
                <img src={src} alt={`${project.title} gallery ${i + 1}`} className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-border flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Next project</span>
          <Link to={`/projects/${next.id}`} className="font-heading text-lg sm:text-xl font-bold hover:text-accent transition-colors" data-testid="project-next">
            {next.title} →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
