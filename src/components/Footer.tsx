import { MapPin, Phone, Mail, Globe } from "lucide-react";
import logo from "@/assets/eko_coolmax_logo.webp";

const Footer = () => (
  <footer className="hero-gradient relative overflow-hidden py-14 text-primary-foreground sm:py-16">
    {/* Decorative elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -left-32 -top-32 h-[300px] w-[300px] rounded-full bg-accent/8 blur-[100px]" />
      <div className="absolute -bottom-20 -right-20 h-[200px] w-[200px] rounded-full bg-brand-teal/6 blur-[80px]" />
    </div>

    <div className="container relative mx-auto px-4">
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-12">
        <div>
          <div className="mb-4 inline-flex rounded-2xl px-3 py-2">
            <img src={logo} alt="EKO Coolmax" className="h-[4.5rem] w-auto object-contain brightness-0 invert contrast-125 drop-shadow-[0_6px_12px_rgba(0,0,0,0.4)] sm:h-[5.5rem]" />
          </div>
          <p className="text-sm leading-relaxed text-primary-foreground/50">
            Premium rashladni agregati za industrijske i komercijalne primene. Kvalitet, pouzdanost, dugotrajnost.
          </p>
        </div>

        <div>
          <h4 className="mb-5 font-display text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground/40">Kontakt</h4>
          <div className="space-y-3.5 text-sm">
            <a href="tel:+381113757287" className="group flex items-center gap-3 text-primary-foreground/60 transition-colors hover:text-primary-foreground">
              <Phone className="h-4 w-4 shrink-0 transition-colors group-hover:text-accent" /> +381 11 375 72 87
            </a>
            <a href="mailto:prodaja@eef.rs" className="group flex items-center gap-3 text-primary-foreground/60 transition-colors hover:text-primary-foreground">
              <Mail className="h-4 w-4 shrink-0 transition-colors group-hover:text-accent" /> prodaja@eef.rs
            </a>
            <a href="https://ekoelektrofrigo.rs" target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-primary-foreground/60 transition-colors hover:text-primary-foreground">
              <Globe className="h-4 w-4 shrink-0 transition-colors group-hover:text-accent" /> ekoelektrofrigo.rs
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-5 font-display text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground/40">Adresa</h4>
          <div className="flex items-start gap-3 text-sm text-primary-foreground/60">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            <span>Svetolika Nikačevića 11<br />11000 Beograd, Srbija</span>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-primary-foreground/8 pt-6">
        <div className="flex flex-col items-center gap-1.5 text-center text-[11px] text-primary-foreground/30 sm:flex-row sm:justify-between sm:text-left">
          <p className="order-2 sm:order-1">© {new Date().getFullYear()} EKO Coolmax. Sva prava zadržana.</p>
          <p className="order-1 sm:order-2">Cene su informativnog karaktera i ne uključuju PDV.</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
