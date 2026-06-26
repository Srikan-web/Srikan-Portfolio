import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, Download } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";

const LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Research", id: "research" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToId(id), 120);
    } else {
      scrollToId(id);
    }
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80 });
      else el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border"
          : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <nav className="container-px h-16 lg:h-20 flex items-center justify-between">
        <button
          onClick={() => goTo("home")}
          className="font-heading font-extrabold tracking-tight text-lg lg:text-xl group flex items-center gap-2"
          data-testid="nav-logo"
        >
          <span className="inline-block h-2.5 w-2.5 bg-accent rotate-45 group-hover:rotate-[135deg] transition-transform duration-500" />
          Srikan<span className="text-accent">.</span>
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => goTo(l.id)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent hover:after:w-full after:transition-all after:duration-300"
              data-testid={`nav-link-${l.id}`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9 grid place-items-center rounded-md border border-border hover:bg-secondary transition-colors"
            aria-label="Toggle dark mode"
            data-testid="theme-toggle"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Button asChild size="sm" className="rounded-md gap-2 hidden sm:inline-flex" data-testid="nav-download-cv">
            <a href="/cv-srikan-dewasumithra.pdf" download="Srikan-Dewasumithra-CV.pdf">
              <Download className="h-4 w-4" /> CV
            </a>
          </Button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden h-9 w-9 grid place-items-center rounded-md border border-border"
            aria-label="Menu"
            data-testid="nav-mobile-toggle"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="container-px py-4 flex flex-col gap-1">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => goTo(l.id)}
                className="text-left py-3 text-base font-medium hover:text-accent transition-colors"
                data-testid={`nav-mobile-link-${l.id}`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
