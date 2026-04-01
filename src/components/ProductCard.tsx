import { Link } from "react-router-dom";
import { type Product, formatPrice } from "@/data/products";
import { Snowflake, Thermometer, Zap, Ruler, Weight, Fan, Cpu, Plug, ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isPlus = product.kategorija === "plus";

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-600 hover:-translate-y-2.5 hover:shadow-[var(--shadow-premium)]">
      {/* Hover glow */}
      <div className={`absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
        isPlus ? "bg-gradient-to-br from-accent/20 via-transparent to-accent/5" : "bg-gradient-to-br from-brand-teal/20 via-transparent to-brand-teal/5"
      }`} style={{ zIndex: 0 }} />

      {/* Category ribbon */}
      <div className={`absolute left-0 top-0 z-10 rounded-br-2xl px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-md ${
        isPlus ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
      }`}>
        {isPlus ? "PLUS" : "MINUS"}
      </div>

      {/* Image area */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-muted via-muted/70 to-muted/30">
        {product.slika ? (
          <img
            src={product.slika}
            alt={product.naziv}
            className={`h-full w-full object-contain transition-all duration-700 group-hover:scale-105 ${
              product.imageScale === "small" ? "p-8 scale-75" : "p-4"
            }`}
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            {isPlus ? <Thermometer className="h-20 w-20 text-accent/20" /> : <Snowflake className="h-20 w-20 text-primary/20" />}
          </div>
        )}
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-card via-card/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative p-5 sm:p-6">
        <div className="mb-4">
          <p className="mb-1 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{product.sifra}</p>
          <h3 className="font-display text-sm font-bold leading-tight text-foreground sm:text-[15px]">{product.naziv}</h3>
          <div className="mt-2.5 flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
              isPlus ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
            }`}>
              {isPlus ? <Thermometer className="h-3 w-3" /> : <Snowflake className="h-3 w-3" />}
              {product.temperatura}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
              <Zap className="h-3 w-3" />
              {product.snaga_kw} kW
            </span>
          </div>
        </div>

        {/* Specs grid */}
        <div className="mb-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
          {[
            { icon: Cpu, label: "Kompresor", value: product.kompresor },
            { icon: Plug, label: "Napon", value: product.napon },
            { icon: Fan, label: "Ventilatori", value: product.ventilatori },
            { icon: Zap, label: "Kondenzator", value: product.kondenzator },
            { icon: Ruler, label: "Dimenzije", value: product.dimenzije },
            { icon: Weight, label: "Težina", value: `${product.tezina} kg` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-1.5">
              <Icon className="mt-0.5 h-3 w-3 shrink-0 text-accent/70" />
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                <p className="text-[11px] font-medium text-foreground">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-end justify-between border-t border-border pt-4">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Cena bez PDV-a</p>
            <span className="font-display text-xl font-bold text-primary sm:text-2xl">{formatPrice(product.cena_rsd)}</span>
          </div>
          <Link
            to="/kontakt"
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:opacity-0 sm:-translate-x-2 ${
              isPlus
                ? "bg-accent/10 text-accent hover:bg-accent/20"
                : "bg-primary/10 text-primary hover:bg-primary/20"
            }`}
          >
            Ponuda <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
