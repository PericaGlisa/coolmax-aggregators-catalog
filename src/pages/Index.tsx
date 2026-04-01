import { Link } from "react-router-dom";
import { ArrowRight, Snowflake, Thermometer, Shield, Award, Wrench, BarChart3, Share2, CheckCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/eko_coolmax_logo.webp";
import heroImg from "@/assets/products/plus-large.webp";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import { products, formatPrice, standardnaOprema } from "@/data/products";
import { useEffect, useRef } from "react";

const stats = [
  { value: "14", label: "Modela agregata" },
  { value: "2", label: "Serije proizvoda" },
  { value: "-25°C", label: "Min. temperatura" },
  { value: "16.09", label: "Max snaga (kW)" },
];

const features = [
  { icon: Thermometer, title: "Plusni agregati", desc: "MLZ serija za rad na temperaturama -10/45°C. Idealni za hladnjače i rashladne komore.", color: "text-accent" },
  { icon: Snowflake, title: "Minusni agregati", desc: "EKOL serija za duboko zamrzavanje -25/50°C. Visoke performanse u ekstremnim uslovima.", color: "text-brand-teal" },
  { icon: Shield, title: "Kompletna oprema", desc: "Svaki agregat dolazi sa kompletnom elektro-opremom, zaštitom i priborom za montažu.", color: "text-accent" },
  { icon: Award, title: "Garancija kvaliteta", desc: "Sertifikovani kompresori vrhunskih proizvođača. Dugogodišnje iskustvo u rashladnoj tehnici.", color: "text-brand-teal" },
  { icon: Wrench, title: "Servis i podrška", desc: "Tim stručnjaka za montažu, puštanje u rad i redovno održavanje vaših rashladnih sistema.", color: "text-accent" },
  { icon: BarChart3, title: "Energetska efikasnost", desc: "Optimizovani za minimalan utrošak energije uz maksimalne rashladne performanse.", color: "text-brand-teal" },
];

const heroBadges = [
  {
    icon: Wrench,
    title: "Kompresor",
    desc: "Stabilan rad i u plus i u minus režimu.",
    accent: "text-accent border-accent/20 bg-accent/10",
  },
  {
    icon: BarChart3,
    title: "Ventilatori",
    desc: "Optimizovan protok za bolju efikasnost.",
    accent: "text-accent border-accent/20 bg-accent/10",
  },
  {
    icon: Shield,
    title: "Zaštita kućišta",
    desc: "Antikorozivna obrada produžava vek agregata.",
    accent: "text-accent border-accent/20 bg-accent/10",
  },
];


const handleShare = async () => {
  const shareData = {
    title: "EKO Coolmax — Rashladni agregati",
    text: "Pogledajte ponudu premium rashladnih agregata EKO Coolmax.",
    url: window.location.href,
  };
  if (navigator.share) {
    try { await navigator.share(shareData); } catch { return; }
  } else {
    await navigator.clipboard.writeText(window.location.href);
    alert("Link kopiran u clipboard!");
  }
};

/* Animated counter hook */
const useCounter = (end: string, duration = 2000) => {
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true;
        const numMatch = end.match(/^-?([\d.]+)/);
        if (!numMatch) { el.textContent = end; return; }
        const target = parseFloat(numMatch[1]);
        const prefix = end.startsWith("-") ? "-" : "";
        const suffix = end.replace(/^-?[\d.]+/, "");
        const isFloat = end.includes(".");
        const startTime = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          const current = target * eased;
          el.textContent = prefix + (isFloat ? current.toFixed(2) : Math.round(current).toString()) + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return ref;
};

const StatItem = ({ value, label, delay }: { value: string; label: string; delay: number }) => {
  const ref = useCounter(value);
  return (
    <AnimatedSection delay={delay}>
      <div className="text-center">
        <p className="font-display text-3xl font-extrabold text-primary sm:text-4xl">
          <span ref={ref}>0</span>
        </p>
        <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">{label}</p>
      </div>
    </AnimatedSection>
  );
};

const Index = () => {
  useEffect(() => {
    document.title = "EKO Coolmax | Pametno hlađenje za svaki temperaturni režim";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "EKO Coolmax rashladni agregati za plusne i minusne temperaturne režime. Industrijska pouzdanost, energetska efikasnost i kompletna podrška."
      );
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

    {/* Hero */}
    <section className="hero-gradient noise-overlay relative overflow-hidden text-primary-foreground">
      {/* Cinematic background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-accent/12 blur-[150px] animate-glow-pulse" />
        <div className="absolute -bottom-60 -left-60 h-[500px] w-[500px] rounded-full bg-brand-teal/10 blur-[120px] animate-glow-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-primary-foreground/[0.03] blur-[100px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        {/* Diagonal accent lines */}
        <div className="absolute -right-20 top-0 h-full w-px rotate-[15deg] bg-gradient-to-b from-transparent via-accent/15 to-transparent" />
        <div className="absolute left-1/4 top-0 h-full w-px rotate-[15deg] bg-gradient-to-b from-transparent via-brand-teal/8 to-transparent" />
      </div>

      <div className="container relative mx-auto grid items-center gap-8 px-4 py-16 sm:py-24 lg:grid-cols-[1fr,1.1fr] lg:gap-12 lg:py-28 xl:py-36">
        {/* Left: Text content */}
        <div className="max-w-xl">
          <div className="mb-8 flex flex-col items-start gap-4">
            <div className="inline-flex rounded-2xl px-3 py-2 animate-fade-in">
              <img src={logo} alt="EKO Coolmax" className="h-14 w-auto object-contain brightness-0 invert contrast-125 drop-shadow-[0_6px_12px_rgba(0,0,0,0.4)] sm:h-16" />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-4 py-1.5 text-xs font-semibold text-accent animate-fade-in backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Premium rashladna tehnika
            </div>
          </div>
          <h1 className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
            EKO Coolmax
            <span className="mt-1 block text-gradient">Rashladni agregati za plus i minus režime</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-primary-foreground/50 sm:mt-6 sm:text-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Industrijski i komercijalni rashladni sistemi za plusne i minusne temperature. Pouzdanost. Efikasnost. Dugotrajnost.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/katalog">
              <Button size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_8px_30px_-5px_hsl(var(--accent)/0.5)] text-sm sm:text-base px-6 sm:px-8 h-12 font-bold transition-all duration-300 hover:shadow-[0_12px_40px_-5px_hsl(var(--accent)/0.6)] hover:-translate-y-0.5">
                Pregledaj katalog <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/kontakt">
              <Button size="lg" className="gap-2 border border-primary-foreground/25 bg-primary-foreground/8 text-primary-foreground hover:bg-primary-foreground/15 px-6 sm:px-8 h-12 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5">
                Kontakt
              </Button>
            </Link>
          </div>
          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap items-center gap-4 text-[11px] font-medium text-primary-foreground/35 animate-fade-in sm:gap-6" style={{ animationDelay: "0.5s" }}>
            <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-accent/50" /> Širok asortiman</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-accent/50" /> Garancija kvaliteta</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-accent/50" /> Servis i podrška</span>
          </div>
        </div>

        {/* Right: Premium product showcase — MUCH more visible */}
        <div className="flex items-center justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="relative w-full max-w-xl lg:max-w-[56rem]">
            {/* Outer dramatic glow */}
            <div className="absolute -inset-16 rounded-full bg-gradient-to-br from-accent/20 via-brand-teal/12 to-accent/8 blur-[80px] animate-glow-pulse" />
            {/* Secondary ring glow */}
            <div className="absolute -inset-8 rounded-3xl bg-accent/5 blur-[40px]" />
            {/* Glass card container */}
            <div className="relative rounded-3xl border border-primary-foreground/10 bg-gradient-to-br from-primary-foreground/10 via-primary-foreground/5 to-primary-foreground/[0.02] p-4 backdrop-blur-md sm:p-6 lg:p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_30px_80px_-20px_rgba(0,0,0,0.5)]">
              {/* Corner accents */}
              <div className="absolute left-3 top-3 h-12 w-12 border-l-2 border-t-2 border-accent/30 rounded-tl-xl" />
              <div className="absolute bottom-3 right-3 h-12 w-12 border-b-2 border-r-2 border-accent/30 rounded-br-xl" />
              {/* Product image — larger and brighter */}
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-4 xl:gap-5">
                <div className="relative flex-1 lg:min-w-[21.5rem] xl:min-w-[24rem]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-40 w-40 rounded-full bg-accent/8 blur-[60px] sm:h-52 sm:w-52" />
                  </div>
                  <img
                    src={heroImg}
                    alt="EKO Coolmax rashladni agregat"
                    className="relative z-10 mx-auto h-56 w-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] brightness-110 contrast-105 sm:h-72 md:h-80 lg:h-[23rem] xl:h-[24rem] animate-float"
                  />
                </div>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:w-52 lg:grid-cols-1 xl:w-64">
                  {heroBadges.map((badge) => (
                    <div key={badge.title} className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/[0.03] p-2.5 backdrop-blur-sm shadow-[0_10px_25px_-18px_rgba(0,0,0,0.85)]">
                      <div className="mb-2 inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary-foreground/80 sm:text-[11px] lg:text-[9px] xl:text-[10px]">
                        <span className={`inline-flex h-5 w-5 items-center justify-center rounded-md border ${badge.accent}`}>
                          <badge.icon className="h-3 w-3" />
                        </span>
                        {badge.title}
                      </div>
                      <p className="text-[11px] leading-snug text-primary-foreground/65">{badge.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Bottom accent bar */}
              <div className="mt-4 flex items-center justify-center gap-3 sm:mt-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent/40" />
                <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-accent/60">EKO Coolmax</span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent/40" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>

    {/* Stats bar */}
    <section className="relative -mt-6 z-10 pb-6 sm:-mt-8 sm:pb-8">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-premium)] sm:p-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s, i) => (
              <StatItem key={s.label} value={s.value} label={s.label} delay={i * 100} />
            ))}
          </div>
        </div>
      </div>
    </section>


    {/* Features */}
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <AnimatedSection className="mb-12 text-center sm:mb-16">
          <p className="mb-3 font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">Zašto EKO Coolmax</p>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Kompletno rešenje za rashladnu tehniku
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Od projektovanja do montaže i servisa — tu smo za svaki korak vašeg rashladnog sistema.
          </p>
        </AnimatedSection>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 80}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-premium)] sm:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted transition-all duration-400 group-hover:bg-accent/10 group-hover:scale-110 group-hover:shadow-[var(--shadow-glow-accent)]">
                  <f.icon className={`h-6 w-6 ${f.color} transition-colors`} />
                </div>
                <h3 className="mb-2 font-display text-base font-bold text-foreground">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Price range preview */}
    <section className="relative overflow-hidden bg-muted/50 py-16 sm:py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 top-20 h-[300px] w-[300px] rounded-full bg-accent/5 blur-[100px]" />
        <div className="absolute -left-20 bottom-20 h-[250px] w-[250px] rounded-full bg-brand-teal/5 blur-[80px]" />
      </div>
      <div className="container relative mx-auto px-4">
        <AnimatedSection className="mb-12 text-center sm:mb-16">
          <p className="mb-3 font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">Cenovnik</p>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Raspon cena po kategorijama
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
            Sve cene su bez PDV-a i uključuju kompletnu opremu za montažu.
          </p>
        </AnimatedSection>
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {[
            {
              title: "Plusni agregati",
              subtitle: "MLZ serija · -10/45°C · 9 modela",
              icon: Thermometer,
              items: products.filter((p) => p.kategorija === "plus"),
              accentClass: "text-accent bg-accent/10",
              borderAccent: "hover:border-accent/30",
              hoverGlow: "hover:shadow-[0_20px_60px_-15px_hsl(var(--accent)/0.15)]",
            },
            {
              title: "Minusni agregati",
              subtitle: "EKOL serija · -25/50°C · 5 modela",
              icon: Snowflake,
              items: products.filter((p) => p.kategorija === "minus"),
              accentClass: "text-brand-teal bg-brand-teal/10",
              borderAccent: "hover:border-brand-teal/30",
              hoverGlow: "hover:shadow-[0_20px_60px_-15px_hsl(var(--brand-teal)/0.15)]",
            },
          ].map((cat, ci) => (
            <AnimatedSection key={cat.title} delay={ci * 150}>
              <div className={`overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 ${cat.borderAccent} ${cat.hoverGlow}`}>
                <div className="flex items-center gap-4 border-b border-border p-5 sm:p-6">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${cat.accentClass}`}>
                    <cat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground">{cat.title}</h3>
                    <p className="text-xs text-muted-foreground">{cat.subtitle}</p>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {cat.items.map((p) => (
                    <div key={p.sifra} className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-muted/50 sm:px-6">
                      <img src={p.slika} alt={p.naziv} className={`h-10 w-14 rounded-lg object-contain bg-muted/50 ${p.imageScale === "small" ? "scale-75" : ""}`} loading="lazy" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-foreground">{p.sifra}</p>
                        <p className="text-xs text-muted-foreground">{p.snaga_kw} kW</p>
                      </div>
                      <p className="shrink-0 font-display text-sm font-bold text-primary">{formatPrice(p.cena_rsd)}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4">
                  <Link to="/katalog">
                    <Button variant="ghost" className="w-full gap-2 text-accent hover:text-accent font-bold">
                      Pogledaj sve modele <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Standard equipment */}
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <AnimatedSection className="mb-12 text-center sm:mb-16">
          <p className="mb-3 font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">Uključeno u svaki agregat</p>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Standardna oprema
          </h2>
        </AnimatedSection>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {standardnaOprema.map((item, i) => (
            <AnimatedSection key={item} delay={i * 50}>
              <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 transition-all duration-400 hover:shadow-[0_8px_30px_-10px_hsl(var(--primary)/0.12)] hover:-translate-y-0.5 sm:p-5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <CheckCircle className="h-4 w-4 text-accent" />
                </div>
                <span className="text-xs leading-relaxed text-foreground sm:text-sm">{item}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="hero-gradient noise-overlay relative overflow-hidden py-16 text-primary-foreground sm:py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[400px] w-[400px] rounded-full bg-accent/12 blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 h-[300px] w-[300px] rounded-full bg-brand-teal/8 blur-[80px]" />
      </div>
      <div className="container relative mx-auto px-4 text-center">
        <AnimatedSection>
          <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">Zatražite ponudu</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-primary-foreground/50 sm:text-base">
            Kontaktirajte nas za detaljnu ponudu, tehničke konsultacije ili informacije o dostupnosti.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4">
            <Link to="/kontakt">
              <Button size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_8px_30px_-5px_hsl(var(--accent)/0.5)] font-bold transition-all duration-300 hover:shadow-[0_12px_40px_-5px_hsl(var(--accent)/0.6)] hover:-translate-y-0.5">
                Kontakt <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="tel:+381113757287">
              <Button size="lg" className="gap-2 border border-primary-foreground/25 bg-primary-foreground/8 text-primary-foreground hover:bg-primary-foreground/15 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5">
                <Phone className="h-4 w-4" /> +381 11 375 72 87
              </Button>
            </a>
            <Button size="lg" variant="ghost" className="gap-2 text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/8" onClick={handleShare}>
              <Share2 className="h-4 w-4" /> Podeli
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
