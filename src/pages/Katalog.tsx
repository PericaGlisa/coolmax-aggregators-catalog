import { useEffect, useState, useMemo } from "react";
import { products, standardnaOprema, formatPrice, type Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, CheckCircle, Thermometer, Snowflake, LayoutGrid, Table } from "lucide-react";

type Kategorija = "sve" | "plus" | "minus";
type SnagaFilter = "sve" | "mala" | "srednja" | "velika";

const Katalog = () => {
  const [kategorija, setKategorija] = useState<Kategorija>("sve");
  const [snaga, setSnaga] = useState<SnagaFilter>("sve");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  useEffect(() => {
    document.title = "Katalog | EKO Coolmax rashladni agregati";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Katalog EKO Coolmax rashladnih agregata: plusni i minusni modeli, specifikacije, snaga i cene."
      );
    }
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (kategorija !== "sve" && p.kategorija !== kategorija) return false;
      if (snaga === "mala" && p.snaga_kw > 5) return false;
      if (snaga === "srednja" && (p.snaga_kw <= 5 || p.snaga_kw > 12)) return false;
      if (snaga === "velika" && p.snaga_kw <= 12) return false;
      if (search && !p.naziv.toLowerCase().includes(search.toLowerCase()) && !p.sifra.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [kategorija, snaga, search]);

  const plusProducts = filtered.filter((p) => p.kategorija === "plus");
  const minusProducts = filtered.filter((p) => p.kategorija === "minus");

  const FilterBtn = ({ label, active, onClick, icon }: { label: string; active: boolean; onClick: () => void; icon?: React.ReactNode }) => (
    <Button
      size="sm"
      variant={active ? "default" : "outline"}
      onClick={onClick}
      className={`gap-1.5 text-xs font-bold transition-all duration-300 ${active ? "shadow-md" : "hover:shadow-sm"}`}
    >
      {icon}
      {label}
    </Button>
  );

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero header */}
      <section className="hero-gradient noise-overlay relative overflow-hidden py-14 text-primary-foreground sm:py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 top-0 h-[400px] w-[400px] rounded-full bg-accent/8 blur-[100px]" />
          <div className="absolute -left-20 bottom-0 h-[250px] w-[250px] rounded-full bg-brand-teal/6 blur-[80px]" />
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <p className="mb-3 font-display text-xs font-bold uppercase tracking-[0.3em] text-accent animate-fade-in">Katalog proizvoda</p>
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl animate-fade-in" style={{ animationDelay: "0.1s" }}>Rashladni agregati</h1>
          <p className="mx-auto mt-4 max-w-lg text-sm text-primary-foreground/50 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Kompletna ponuda plusnih (9 modela) i minusnih (5 modela) rashladnih agregata sa svim specifikacijama.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[58px] z-40 border-b border-border glass py-3 sm:top-[64px] sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <FilterBtn label="Sve" active={kategorija === "sve"} onClick={() => setKategorija("sve")} />
              <FilterBtn label="Plusni" active={kategorija === "plus"} onClick={() => setKategorija("plus")} icon={<Thermometer className="h-3 w-3" />} />
              <FilterBtn label="Minusni" active={kategorija === "minus"} onClick={() => setKategorija("minus")} icon={<Snowflake className="h-3 w-3" />} />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">Snaga:</span>
              <FilterBtn label="Sve" active={snaga === "sve"} onClick={() => setSnaga("sve")} />
              <FilterBtn label="≤5 kW" active={snaga === "mala"} onClick={() => setSnaga("mala")} />
              <FilterBtn label="5–12 kW" active={snaga === "srednja"} onClick={() => setSnaga("srednja")} />
              <FilterBtn label=">12 kW" active={snaga === "velika"} onClick={() => setSnaga("velika")} />
            </div>
            <div className="flex items-center gap-2 sm:ml-auto">
              <div className="relative w-full sm:w-auto sm:min-w-[220px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Pretraži…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-background pl-9"
                />
              </div>
              <div className="hidden sm:flex items-center gap-1 rounded-lg border border-border p-0.5">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded-md p-1.5 transition-all duration-200 ${viewMode === "grid" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`rounded-md p-1.5 transition-all duration-200 ${viewMode === "table" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  aria-label="Table view"
                >
                  <Table className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 sm:py-16">
        {viewMode === "grid" ? (
          <>
            {plusProducts.length > 0 && (
              <div className="mb-16 sm:mb-20">
                <AnimatedSection>
                  <div className="mb-8 flex flex-wrap items-center gap-3 sm:mb-10 sm:gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                      <Thermometer className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">Plusni agregati</h2>
                      <p className="text-xs text-muted-foreground sm:text-sm">MLZ serija · Radni opseg -10/45°C</p>
                    </div>
                    <div className="rounded-full bg-accent/10 px-3.5 py-1.5 font-display text-xs font-bold text-accent sm:ml-auto">
                      {plusProducts.length} modela
                    </div>
                  </div>
                </AnimatedSection>
                <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                  {plusProducts.map((p, i) => (
                    <AnimatedSection key={p.sifra} delay={i * 60}>
                      <ProductCard product={p} />
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            )}

            {minusProducts.length > 0 && (
              <div className="mb-16 sm:mb-20">
                <AnimatedSection>
                  <div className="mb-8 flex flex-wrap items-center gap-3 sm:mb-10 sm:gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal/10">
                      <Snowflake className="h-5 w-5 text-brand-teal" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">Minusni agregati</h2>
                      <p className="text-xs text-muted-foreground sm:text-sm">EKOL serija · Radni opseg -25/50°C</p>
                    </div>
                    <div className="rounded-full bg-brand-teal/10 px-3.5 py-1.5 font-display text-xs font-bold text-brand-teal sm:ml-auto">
                      {minusProducts.length} modela
                    </div>
                  </div>
                </AnimatedSection>
                <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                  {minusProducts.map((p, i) => (
                    <AnimatedSection key={p.sifra} delay={i * 60}>
                      <ProductCard product={p} />
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <AnimatedSection>
            <div className="mb-16 overflow-x-auto rounded-2xl border border-border shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="hero-gradient text-primary-foreground">
                    {["Slika", "Model", "Tip", "Temp.", "Snaga", "Kompresor", "Ventilatori", "Dimenzije", "Cena"].map((h) => (
                      <th key={h} className="whitespace-nowrap px-4 py-3.5 text-left font-display text-[10px] font-bold uppercase tracking-[0.15em] sm:px-5 sm:py-4">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((p, i) => (
                    <tr key={p.sifra} className={`transition-colors hover:bg-accent/5 ${i % 2 === 0 ? "bg-card" : "bg-muted/30"}`}>
                      <td className="px-4 py-2.5 sm:px-5">
                        <img src={p.slika} alt={p.naziv} className={`h-10 w-14 rounded-lg object-contain bg-muted/30 ${p.imageScale === "small" ? "scale-75" : ""}`} loading="lazy" />
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-display font-bold text-primary sm:px-5">{p.sifra}</td>
                      <td className="px-4 py-3 sm:px-5">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                          p.kategorija === "plus" ? "bg-accent/10 text-accent" : "bg-brand-teal/10 text-brand-teal"
                        }`}>
                          {p.kategorija === "plus" ? "Plus" : "Minus"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground sm:px-5">{p.temperatura}</td>
                      <td className="px-4 py-3 font-semibold sm:px-5">{p.snaga_kw} kW</td>
                      <td className="px-4 py-3 text-muted-foreground sm:px-5">{p.kompresor}</td>
                      <td className="px-4 py-3 text-muted-foreground sm:px-5">{p.ventilatori}</td>
                      <td className="px-4 py-3 text-muted-foreground sm:px-5">{p.dimenzije}</td>
                      <td className="whitespace-nowrap px-4 py-3 font-display font-bold text-primary sm:px-5">{formatPrice(p.cena_rsd)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        )}

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <Snowflake className="mx-auto mb-4 h-12 w-12 text-muted-foreground/20" />
            <p className="text-muted-foreground">Nema rezultata za zadate filtere.</p>
          </div>
        )}

        {/* Standardna oprema */}
        <section>
          <AnimatedSection>
            <div className="mb-8">
              <p className="mb-2 font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">Uključeno</p>
              <h2 className="font-display text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                Standardna oprema
              </h2>
              <p className="mt-2 text-xs text-muted-foreground sm:text-sm">Svaki agregat isporučuje se sa kompletnom opremom za montažu i rad.</p>
            </div>
          </AnimatedSection>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {standardnaOprema.map((item, i) => (
              <AnimatedSection key={item} delay={i * 40}>
                <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 transition-all duration-400 hover:shadow-[0_8px_30px_-10px_hsl(var(--primary)/0.12)] hover:-translate-y-0.5 sm:p-5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <CheckCircle className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-xs leading-relaxed text-foreground sm:text-sm">{item}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>
      </div>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Katalog;
