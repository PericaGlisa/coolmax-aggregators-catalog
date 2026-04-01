import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import { MapPin, Phone, Mail, Globe, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactItems = [
  { icon: MapPin, label: "Adresa", value: "Svetolika Nikačevića 11, 11000 Beograd", href: "https://maps.google.com/?q=Svetolika+Nikačevića+11+Beograd" },
  { icon: Phone, label: "Telefon", value: "+381 11 375 72 87", href: "tel:+381113757287" },
  { icon: Mail, label: "Email", value: "prodaja@eef.rs", href: "mailto:prodaja@eef.rs" },
  { icon: Globe, label: "Web", value: "ekoelektrofrigo.rs", href: "https://ekoelektrofrigo.rs" },
];

const Kontakt = () => {
  const [form, setForm] = useState({ ime: "", kompanija: "", email: "", telefon: "", poruka: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = "Kontakt | EKO Coolmax";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Kontaktirajte EKO Coolmax za ponudu, tehničke konsultacije i podršku za rashladne agregate."
      );
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Upit sa sajta — ${form.ime || "Posetilac"}`);
    const body = encodeURIComponent(
      `Ime: ${form.ime}\nKompanija: ${form.kompanija}\nEmail: ${form.email}\nTelefon: ${form.telefon}\n\nPoruka:\n${form.poruka}`
    );
    window.location.href = `mailto:prodaja@eef.rs?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="hero-gradient noise-overlay relative overflow-hidden py-16 text-primary-foreground sm:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-accent/8 blur-[100px]" />
          <div className="absolute -left-48 bottom-0 h-[300px] w-[300px] rounded-full bg-brand-teal/6 blur-[80px]" />
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <p className="mb-3 font-display text-xs font-bold uppercase tracking-[0.3em] text-accent animate-fade-in">Kontakt</p>
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl animate-fade-in" style={{ animationDelay: "0.1s" }}>Stojimo vam na raspolaganju</h1>
          <p className="mx-auto mt-4 max-w-lg text-sm text-primary-foreground/50 sm:text-base animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Za sve informacije o rashladnim agregatima, tehničku podršku ili ponudu — kontaktirajte nas.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container mx-auto grid gap-8 px-4 sm:gap-12 lg:grid-cols-2">
          {/* Contact info */}
          <div>
            <AnimatedSection>
              <h2 className="mb-6 font-display text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">Informacije</h2>
            </AnimatedSection>
            <div className="space-y-3 sm:space-y-4">
              {contactItems.map((c, i) => {
                const itemClassName = "group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-500 hover:shadow-[var(--shadow-premium)] hover:-translate-y-1 sm:gap-5 sm:p-6";
                const itemContent = (
                  <>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_25px_-5px_hsl(var(--primary)/0.4)]">
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{c.label}</p>
                      <p className="text-sm font-semibold text-foreground sm:text-base">{c.value}</p>
                    </div>
                    {c.href && <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground/30 transition-all duration-300 group-hover:text-accent group-hover:translate-x-1" />}
                  </>
                );
                return (
                  <AnimatedSection key={c.label} delay={i * 80}>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                        className={itemClassName}
                      >
                        {itemContent}
                      </a>
                    ) : (
                      <div className={itemClassName}>{itemContent}</div>
                    )}
                  </AnimatedSection>
                );
              })}
            </div>

          </div>

          {/* Contact form */}
          <AnimatedSection delay={200}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-shadow duration-500 hover:shadow-[var(--shadow-card-hover)] sm:p-8">
              <h2 className="mb-1 font-display text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">Pošaljite upit</h2>
              <p className="mb-6 text-sm text-muted-foreground">Popunite formu i vaš email klijent će se otvoriti sa pripremljenom porukom.</p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block font-display text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Ime i prezime *</label>
                    <Input placeholder="Vaše ime" className="bg-background transition-shadow duration-200 focus:shadow-[0_0_0_3px_hsl(var(--accent)/0.15)]" value={form.ime} onChange={(e) => setForm({ ...form, ime: e.target.value })} required />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-display text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Kompanija</label>
                    <Input placeholder="Naziv kompanije" className="bg-background transition-shadow duration-200 focus:shadow-[0_0_0_3px_hsl(var(--accent)/0.15)]" value={form.kompanija} onChange={(e) => setForm({ ...form, kompanija: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block font-display text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Email adresa *</label>
                  <Input placeholder="vas@email.com" type="email" className="bg-background transition-shadow duration-200 focus:shadow-[0_0_0_3px_hsl(var(--accent)/0.15)]" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div>
                  <label className="mb-1.5 block font-display text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Telefon</label>
                  <Input placeholder="+381 ..." type="tel" className="bg-background transition-shadow duration-200 focus:shadow-[0_0_0_3px_hsl(var(--accent)/0.15)]" value={form.telefon} onChange={(e) => setForm({ ...form, telefon: e.target.value })} />
                </div>
                <div>
                  <label className="mb-1.5 block font-display text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Poruka *</label>
                  <Textarea placeholder="Opišite vaše potrebe ili zatražite ponudu za određeni model…" rows={5} className="bg-background transition-shadow duration-200 focus:shadow-[0_0_0_3px_hsl(var(--accent)/0.15)]" value={form.poruka} onChange={(e) => setForm({ ...form, poruka: e.target.value })} required />
                </div>
                <Button type="submit" className="w-full gap-2 font-bold shadow-[0_8px_25px_-5px_hsl(var(--primary)/0.4)] transition-all duration-300 hover:shadow-[0_12px_35px_-5px_hsl(var(--primary)/0.5)] hover:-translate-y-0.5" size="lg">
                  <Send className="h-4 w-4" />
                  {sent ? "Otvaranje email klijenta…" : "Pošalji upit"}
                </Button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Kontakt;
