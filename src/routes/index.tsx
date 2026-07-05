import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";
import arghyaPhoto from "@/assets/arghya.png.asset.json";
const heroPhoto = { url: "/hero-photo.webp" };
import resumeAsset from "@/assets/Arghya_Jana_Resume.pdf.asset.json";
import { toast, Toaster } from "sonner";
import { buttonVariants as neonVariants } from "@/components/ui/neon-button";
import { cn } from "@/lib/utils";
import { Hero3D } from "@/components/Hero3D";
import { SplineShowcase } from "@/components/SplineShowcase";

function NeonAnchor({
  href,
  variant = "default",
  size = "lg",
  neon = true,
  className,
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "default" | "solid" | "ghost";
  size?: "default" | "sm" | "lg";
  neon?: boolean;
}) {
  return (
    <a href={href} className={cn(neonVariants({ variant, size }), "font-mono text-sm", className)} {...rest}>
      <span
        className={cn(
          "absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 -top-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-primary to-transparent hidden",
          neon && "block",
        )}
      />
      {children}
      <span
        className={cn(
          "absolute group-hover:opacity-40 transition-all duration-500 ease-in-out inset-x-0 -bottom-px h-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-primary to-transparent hidden",
          neon && "block",
        )}
      />
    </a>
  );
}


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arghya Jana — CSE Student & Aspiring Software Engineer" },
      { name: "description", content: "Portfolio of Arghya Jana, 1st-year B.Tech CSE student at Heritage Institute of Technology." },
      { property: "og:title", content: "Arghya Jana — CSE Student Portfolio" },
      { property: "og:description", content: "1st-year B.Tech CSE student at HITK. SGPA 9.53. Building foundations in software engineering." },
    ],
    links: [{ rel: "preload", as: "image", href: heroPhoto.url, fetchPriority: "high" }],
  }),
  component: Portfolio,
});

// ---------- Nav ----------
const NAV = [
  { id: "home", label: "home" },
  { id: "about", label: "about" },
  { id: "skills", label: "skills" },
  { id: "projects", label: "projects" },
  { id: "activities", label: "activities" },
  { id: "contact", label: "contact" },
];

function useReveal() {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

function Portfolio() {
  useReveal();
  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans">
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Activities />
        <Contact />
      </main>
      <Footer />
      <Toaster theme="dark" position="bottom-right" richColors />
    </div>
  );
}

// ---------- Nav ----------
function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[color-mix(in_oklab,var(--background)_70%,transparent)] border-b border-border">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#home" className="font-mono text-sm font-bold text-primary">
          <span className="text-muted-foreground">~</span>arghya<span className="text-accent">.dev</span>
        </a>
        <ul className="hidden md:flex items-center gap-1 font-mono text-xs rounded-full border border-border/60 bg-surface/40 backdrop-blur px-1.5 py-1">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className="group relative inline-flex items-center rounded-full px-3.5 py-1.5 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <span className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-1 ring-inset ring-primary/40 shadow-[0_0_12px_-2px_var(--primary)]" />
                <span className="relative">{n.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a
            href={resumeAsset.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View resume"
            title="View resume"
            onClick={async (e) => {
              e.preventDefault();
              try {
                const res = await fetch(resumeAsset.url);
                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                window.open(url, "_blank", "noopener,noreferrer");
                setTimeout(() => URL.revokeObjectURL(url), 60_000);
              } catch {
                window.open(resumeAsset.url, "_blank", "noopener,noreferrer");
              }
            }}
            className="font-mono text-xs rounded-md border border-border p-2 text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          >
            <FileText className="h-4 w-4" />
          </a>



          <NeonAnchor href="#contact" variant="default" size="sm" className="text-xs whitespace-nowrap">
            let's talk →
          </NeonAnchor>
        </div>
      </nav>
    </header>
  );
}


// ---------- Hero ----------
function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center pt-24 pb-16">
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden />
      <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-[1.4fr_1fr] items-center gap-12 px-5 relative">
        <div className="reveal">
          <img
            src={heroPhoto.url}
            alt="Arghya Jana"
            width={224}
            height={224}
            fetchPriority="high"
            decoding="async"
            className="mb-6 h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 rounded-full object-cover object-center border-2 border-primary/70 shadow-[0_0_40px_-6px_var(--primary)]"
          />

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Arghya <span className="text-gradient">Jana</span>
          </h1>
          <p className="mt-5 font-mono text-sm sm:text-base text-muted-foreground">
            <span className="text-primary">&gt;</span> Computer Science Engineering Student
            <span className="mx-2 text-border">|</span>
            <span className="text-accent">Aspiring Software Engineer</span>
          </p>
          <p className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed">
            An aspiring engineering student with a strong foundation in computational logic,
            applying analytical skills toward impactful engineering work — with the long-term goal
            of growing into a leadership role.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <NeonAnchor href="#projects" variant="solid" size="lg" className="font-semibold">
              view projects
            </NeonAnchor>
            <NeonAnchor href="#contact" variant="default" size="lg">
              contact me
            </NeonAnchor>
          </div>
        </div>

        {/* Box */}
        <div className="reveal relative aspect-square w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[480px] mx-auto overflow-hidden rounded-xl border border-border bg-surface/30 backdrop-blur">
          <Hero3D />
        </div>
      </div>
    </section>
  );
}

// ---------- About ----------
function About() {
  const timeline = [
    { year: "2022", title: "Secondary (Class X)", org: "WBCSE", score: "94.5%" },
    { year: "2024", title: "Higher Secondary — PCMB", org: "WBCHSE", score: "93%" },
    { year: "2025–29", title: "B.Tech, Computer Science & Engineering", org: "Heritage Institute of Technology (MAKAUT)", score: "SGPA 9.53" },
  ];
  return (
    <section id="about" className="py-24 px-5">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="01 / about" title="A quick introduction" />
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="reveal space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I'm <span className="text-foreground font-medium">Arghya Jana</span>, a first-year
              B.Tech CSE student at <span className="text-primary">Heritage Institute of Technology</span>
              {" "}(affiliated to MAKAUT), graduating in 2029.
            </p>
            <p>
              Currently maintaining an <span className="text-foreground">SGPA of 9.53</span>, I'm
              focused on building strong fundamentals in computer science — from data structures
              and algorithms to systems and software engineering principles.
            </p>
            <p>
              Outside the classroom, I take part in student communities and tech events to
              broaden my perspective and meet people building interesting things.
            </p>
            <div className="flex flex-wrap gap-2 pt-4">
              <Chip>WELCOME.YML — ACM HITK Student Chapter</Chip>
              <Chip>E-SUMMIT 2025 — EDIC</Chip>
            </div>
          </div>

          {/* Timeline */}
          <div className="reveal rounded-xl border border-border bg-surface/60 backdrop-blur p-6">
            <div className="font-mono text-xs text-muted-foreground mb-5 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-2">education</span>
            </div>
            <ol className="relative ml-3 border-l border-border space-y-7">
              {timeline.map((t) => (
                <li key={t.title} className="pl-6 relative">
                  <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-primary glow-cyan" />
                  <div className="font-mono text-xs text-primary">[{t.year}]</div>
                  <div className="mt-1 font-semibold text-foreground">{t.title}</div>
                  <div className="text-sm text-muted-foreground">{t.org}</div>
                  <div className="font-mono text-xs mt-1 text-accent">{t.score}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Skills ----------
function Skills() {
  const groups = [
    { key: "languages", label: "Languages", items: ["C", "C++", "Java"], tag: "Foundational" },
    { key: "web", label: "Web Development", items: ["HTML", "CSS", "JavaScript"], tag: "Currently Learning" },
    { key: "cs", label: "Exploring", items: ["Data Structures", "Algorithms", "CS Fundamentals"], tag: "In Progress" },
  ];
  return (
    <section id="skills" className="py-24 px-5">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="02 / skills" title="What I'm building with" />
        <div className="reveal mt-10 rounded-xl border border-border bg-surface/60 backdrop-blur overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border font-mono text-xs text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            <span className="ml-2">bash</span>
          </div>
          <div className="p-6 font-mono text-sm">
            <div className="text-primary">skills list</div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {groups.map((g) => (
                <div key={g.key} className="rounded-lg border border-border bg-background/40 p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-foreground font-semibold">{g.label}</div>
                    <span className="text-[10px] rounded-full border border-accent/50 text-accent px-2 py-0.5">
                      {g.tag}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <span
                        key={it}
                        className="text-xs rounded-md border border-border bg-surface-elevated px-2.5 py-1 text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-muted-foreground">
              "still learning — every commit counts."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Projects ----------
// NOTE: Placeholder/sample project cards — replace with real projects when available.
const PROJECTS = [
  {
    title: "Personal Portfolio Website",
    desc: "A responsive single-page portfolio built to showcase academic progress and projects.",
    tags: ["React.js", "HTML", "CSS", "JavaScript", "Vercel", "Email.js"],
  },
  {
    title: "Heritage Study Material",
    desc: "A study-material web app for heritage topics with a clean UI and a Supabase-powered backend for storing and serving content.",
    tags: ["HTML", "CSS", "Supabase"],
    link: "https://heritage-study-material.vercel.app/",
    github: "https://github.com/arghyajana8348-arch/heritage-study-material",
    wip: true,
  },
];

function Projects() {
  return (
    <section id="projects" className="py-24 px-5">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="03 / projects" title="Things I've been building" />
        <p className="reveal mt-3 text-sm text-muted-foreground font-mono">
          <span className="text-primary">//</span> sample cards — real projects coming soon
        </p>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((p, i) => (
            <article
              key={p.title}
              className="reveal group relative rounded-xl border border-border bg-surface/60 backdrop-blur p-6 hover:border-primary transition-colors"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="font-mono text-xs text-muted-foreground">
                  project_{String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex gap-2">
                  {/* PLACEHOLDER links — replace href="#" with real GitHub & live demo URLs */}
                  <a
                    href={(p as { github?: string }).github ?? "#"}
                    target={(p as { github?: string }).github ? "_blank" : undefined}
                    rel={(p as { github?: string }).github ? "noopener noreferrer" : undefined}
                    aria-label="GitHub repository"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <IconGitHub />
                  </a>
                  <a
                    href={(p as { link?: string }).link ?? "#"}
                    target={(p as { link?: string }).link ? "_blank" : undefined}
                    rel={(p as { link?: string }).link ? "noopener noreferrer" : undefined}
                    aria-label="Live demo"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <IconExternal />
                  </a>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                {(p as { wip?: boolean }).wip && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider rounded-full bg-accent/15 text-accent px-2 py-0.5 border border-accent/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    In Progress
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono rounded-md bg-primary/10 text-primary px-2 py-1 border border-primary/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
            ))}
          </div>

          <aside className="reveal">
            <div className="font-mono text-xs text-muted-foreground mb-3">
              <span className="text-primary">//</span> 3d experiments
            </div>
            <SplineShowcase
              models={[
                {
                  title: "Robot Playground",
                  desc: "Interactive Spline scene — drag to explore.",
                  scene: "https://prod.spline.design/sVeEmN1NRk0vpwDo/scene.splinecode",
                  tags: ["Spline", "3D"],
                },
              ]}
            />
          </aside>
        </div>
      </div>
    </section>
  );
}

// ---------- Activities ----------
function Activities() {
  const items = [
    "Quiz Competition — DAKSH HITK 2026",
    "Valorant Gaming Event — DAKSH HITK 2026",
    "WELCOME.YML — ACM HITK Student Chapter",
    "E-SUMMIT 2025 — EDIC",
  ];
  return (
    <section id="activities" className="py-20 px-5">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="04 / activities" title="Beyond the curriculum" />
        <div className="reveal mt-8 flex flex-wrap gap-3">
          {items.map((it) => (
            <span
              key={it}
              className="rounded-full border border-border bg-surface/60 backdrop-blur px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              <span className="text-accent mr-2">★</span>
              {it}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Contact ----------
// EmailJS credentials (public key is safe to expose client-side)
const EMAILJS_SERVICE_ID = "service_h8ebh5l";
const EMAILJS_TEMPLATE_ID = "template_wqxdd8j";
const EMAILJS_PUBLIC_KEY = "5s7kjSd0IA01EriRs";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name.trim(),
          from_email: form.email.trim(),
          reply_to: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      toast.error("Couldn't send message. Please try again or email me directly.");
    } finally {
      setSending(false);
    }
  }

  const inputCls =
    "w-full rounded-md border border-border bg-surface/60 px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";
  const labelCls = "block font-mono text-xs text-muted-foreground mb-1.5";

  return (
    <section id="contact" className="py-24 px-5">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="05 / contact" title="Let's connect" />
        <p className="reveal mt-4 text-muted-foreground max-w-2xl">
          Open to learning opportunities, internships, hackathons, and study collaborations.
        </p>


        <div className="mt-12 grid md:grid-cols-5 gap-6">
          {/* Form card */}
          <div className="md:col-span-3 reveal">
            <div className="rounded-lg border border-border bg-surface/40 overflow-hidden">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2.5 bg-surface/60">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">send_message</span>
              </div>
              <form onSubmit={onSubmit} className="p-5 sm:p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cf-name" className={labelCls}>
                      {"\u00a0"}name
                    </label>
                    <input
                      id="cf-name"
                      type="text"
                      required
                      maxLength={100}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Ada Lovelace"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="cf-email" className={labelCls}>
                      {"\u00a0"}email
                    </label>
                    <input
                      id="cf-email"
                      type="email"
                      required
                      maxLength={150}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@domain.com"
                      className={inputCls}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="cf-subject" className={labelCls}>
                    {"\u00a0"}subject
                  </label>
                  <input
                    id="cf-subject"
                    type="text"
                    required
                    maxLength={150}
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Internship opportunity / collab / hello"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="cf-message" className={labelCls}>
                    {"\u00a0"}message
                  </label>
                  <textarea
                    id="cf-message"
                    required
                    maxLength={2000}
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me a bit about what you're working on…"
                    className={`${inputCls} resize-y min-h-[140px]`}
                  />
                  <div className="mt-1 text-right font-mono text-[10px] text-muted-foreground/70">
                    {form.message.length}/2000
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-mono text-sm font-medium text-primary-foreground bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <IconMail /> {sending ? "sending..." : ".send message"}
                </button>
              </form>
            </div>
          </div>

          {/* Direct links */}
          <div className="md:col-span-2 reveal">
            <div className="h-full rounded-lg border border-border bg-surface/40 p-5 sm:p-6 flex flex-col">
              <div className="font-mono text-xs text-muted-foreground">contact.info</div>
              <div className="mt-4">
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Email</div>
                <a
                  href="mailto:arghyajana8348@gmail.com"
                  className="mt-2 inline-flex items-center gap-2 font-mono text-sm rounded-md border border-primary/60 px-3 py-2 text-primary hover:bg-primary hover:text-primary-foreground transition-colors break-all"
                >
                  <IconMail /> arghyajana8348@gmail.com
                </a>
              </div>
              <div className="mt-6">
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Elsewhere</div>
                <div className="mt-2 flex gap-3">
                  <a href="https://linkedin.com/in/arghya-jana" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-md border border-border bg-surface p-3 text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                    <IconLinkedIn />
                  </a>
                  <a href="https://github.com/arghyajana8348-arch" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-md border border-border bg-surface p-3 text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                    <IconGitHub />
                  </a>
                </div>
              </div>
              <div className="mt-auto pt-6 font-mono text-xs text-muted-foreground">
                <span className="text-primary">›</span> usually replies within a day
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="border-t border-border py-8 px-5 mt-10">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-muted-foreground">
        <div>© 2026 Arghya Jana</div>
        <div>
          {"\n"}
        </div>
      </div>
    </footer>
  );
}

// ---------- Bits ----------
function SectionHeading({ label, title }: { label: string; title: string }) {
  const cleanLabel = label.replace(/^\s*\d+\s*\/\s*/, "");
  return (
    <div className="reveal">
      <div className="font-mono text-sm sm:text-base uppercase tracking-[0.25em] text-primary">
        {cleanLabel}
      </div>
      <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
        {title}
      </h2>
      <div className="mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" />
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

// ---------- Icons (inline SVG, no external deps) ----------
function IconGitHub() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.7.5.7 5.5.7 11.8c0 5 3.3 9.3 7.8 10.8.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.8C23.3 5.5 18.3.5 12 .5z" />
    </svg>
  );
}
function IconExternal() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M14 3h7v7M10 14L21 3M21 14v7H3V3h7" />
    </svg>
  );
}
function IconLinkedIn() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.4v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56z" />
    </svg>
  );
}
// ---------- Profile Avatar (photo with techy frame) ----------
function MonogramAvatar() {
  return (
    <div
      className="relative h-56 w-56 sm:h-72 sm:w-72 rounded-full"
      style={{ animation: "pulse-glow 4s ease-in-out infinite" }}
    >
      <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full pointer-events-none" aria-hidden>
        <defs>
          <pattern id="mg-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0H0V16" fill="none" stroke="var(--primary)" strokeOpacity="0.12" strokeWidth="1" />
          </pattern>
        </defs>
        <circle cx="120" cy="120" r="118" fill="url(#mg-grid)" />
        <circle cx="120" cy="120" r="116" fill="none" stroke="var(--primary)" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 6" />
        <circle cx="120" cy="120" r="104" fill="none" stroke="var(--accent)" strokeOpacity="0.3" strokeWidth="1" />
      </svg>

      {/* photo */}
      <img
        src={arghyaPhoto.url}
        alt="Arghya Jana portrait"
        className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] rounded-full object-cover border border-primary/40"
        style={{ boxShadow: "inset 0 0 40px color-mix(in oklab, var(--background) 40%, transparent)" }}
      />

      {/* corner brackets */}
      <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full pointer-events-none" aria-hidden>
        <g stroke="var(--primary)" strokeWidth="2.5" fill="none" strokeLinecap="round">
          <path d="M28 56 V28 H56" />
          <path d="M212 56 V28 H184" />
          <path d="M28 184 V212 H56" />
          <path d="M212 184 V212 H184" />
        </g>
      </svg>
    </div>
  );
}


function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
