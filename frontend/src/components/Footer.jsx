import { Linkedin, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { PROFILE } from "@/data/portfolio";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface" data-testid="footer">
      <div className="container-px py-16 grid gap-10 md:grid-cols-3">
        <div>
          <div className="font-heading text-2xl font-extrabold tracking-tight">
            Srikan<span className="text-accent">.</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
            {PROFILE.role}
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-4">
            Contact
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-accent" />
              <a href={`mailto:${PROFILE.email}`} className="hover:text-accent transition-colors" data-testid="footer-email">
                {PROFILE.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-accent" />
              <a href={`tel:${PROFILE.phone}`} className="hover:text-accent transition-colors">{PROFILE.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-accent" />
              <span className="text-muted-foreground">{PROFILE.location}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-4">
            Connect
          </h4>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors group"
            data-testid="footer-linkedin"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
            <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
      <div className="container-px py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>© {year} {PROFILE.name}. All rights reserved.</span>
        <span>Civil Engineering & Construction Management</span>
      </div>
    </footer>
  );
};
