import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Linkedin, Send, Loader2, Download } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PROFILE } from "@/data/portfolio";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const INFO = [
  { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { icon: Phone, label: "Phone", value: PROFILE.phone, href: `tel:${PROFILE.phone}` },
  { icon: Linkedin, label: "LinkedIn", value: "View profile", href: PROFILE.linkedin },
  { icon: MapPin, label: "Location", value: PROFILE.location, href: null },
];

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent — thank you! I'll be in touch shortly.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="container-px py-20 lg:py-32">
      <SectionHeading
        overline="Get In Touch"
        title="Let's build something exceptional"
        subtitle="Available for construction management roles, project delivery, consulting and research collaboration."
      />

      <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
        <div className="lg:col-span-2 space-y-px bg-border border border-border rounded-md overflow-hidden h-fit">
          {INFO.map((item, i) => {
            const Icon = item.icon;
            const content = (
              <div className="bg-background p-5 flex items-center gap-4 group hover:bg-secondary/50 transition-colors">
                <span className="h-11 w-11 grid place-items-center rounded-md bg-secondary text-accent shrink-0">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{item.label}</div>
                  <div className="font-medium text-sm mt-0.5 break-all">{item.value}</div>
                </div>
              </div>
            );
            return item.href ? (
              <a key={i} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" data-testid={`contact-info-${item.label.toLowerCase()}`}>
                {content}
              </a>
            ) : (
              <div key={i}>{content}</div>
            );
          })}
          <a href="/cv-srikan-dewasumithra.pdf" download className="block">
            <div className="bg-primary text-primary-foreground p-5 flex items-center gap-4 hover:opacity-90 transition-opacity">
              <span className="h-11 w-11 grid place-items-center rounded-md bg-white/15 shrink-0">
                <Download className="h-5 w-5" />
              </span>
              <div>
                <div className="text-[11px] uppercase tracking-[0.15em] opacity-70">Resume</div>
                <div className="font-medium text-sm mt-0.5">Download CV (PDF)</div>
              </div>
            </div>
          </a>
        </div>

        <Reveal delay={0.1} className="lg:col-span-3">
          <form onSubmit={submit} className="border border-border rounded-md p-6 lg:p-8 bg-card" data-testid="contact-form">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="name" className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Name</Label>
                <Input id="name" value={form.name} onChange={update("name")} placeholder="Your name" className="mt-2 rounded-md" data-testid="contact-name" />
              </div>
              <div>
                <Label htmlFor="email" className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={update("email")} placeholder="you@company.com" className="mt-2 rounded-md" data-testid="contact-email" />
              </div>
            </div>
            <div className="mt-5">
              <Label htmlFor="subject" className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Subject</Label>
              <Input id="subject" value={form.subject} onChange={update("subject")} placeholder="How can I help?" className="mt-2 rounded-md" data-testid="contact-subject" />
            </div>
            <div className="mt-5">
              <Label htmlFor="message" className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Message</Label>
              <Textarea id="message" value={form.message} onChange={update("message")} placeholder="Tell me about your project or opportunity..." rows={5} className="mt-2 rounded-md resize-none" data-testid="contact-message" />
            </div>
            <Button type="submit" size="lg" disabled={loading} className="mt-6 rounded-md gap-2 w-full sm:w-auto" data-testid="contact-submit">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};
