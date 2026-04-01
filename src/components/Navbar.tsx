import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Share2, Home, BookOpen, MessageCircle, ArrowRight } from "lucide-react";
import logo from "@/assets/eko_coolmax_logo.webp";

const navItems = [
  { path: "/", label: "Početna", icon: Home },
  { path: "/katalog", label: "Katalog", icon: BookOpen },
  { path: "/kontakt", label: "Kontakt", icon: MessageCircle },
];
const siteTitle = "EKO Coolmax";

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

const Navbar = () => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "hero-gradient shadow-[0_4px_30px_-5px_hsl(215_62%_26%/0.4)] backdrop-blur-xl"
          : "hero-gradient"
      }`}>
        {/* Top accent line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

        <div className="container mx-auto flex items-center justify-between px-4 py-2.5 sm:py-3">
          <Link to="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
            <div className="rounded-xl px-2 py-1.5">
              <img
                src={logo}
                alt={siteTitle}
                className="h-10 w-auto object-contain brightness-0 invert contrast-125 drop-shadow-[0_5px_10px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-105 sm:h-12"
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-2 md:flex lg:gap-4">
            <ul className="flex items-center gap-0.5">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`relative rounded-lg px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 lg:px-5 ${
                      pathname === item.path
                        ? "bg-primary-foreground/15 text-primary-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
                        : "text-primary-foreground/60 hover:bg-primary-foreground/8 hover:text-primary-foreground"
                    }`}
                  >
                    {item.label}
                    {pathname === item.path && (
                      <span className="absolute bottom-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_8px_hsl(var(--accent)/0.6)]" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mx-1 h-6 w-px bg-primary-foreground/10" />
            <button
              onClick={handleShare}
              className="hidden items-center gap-1.5 rounded-lg bg-primary-foreground/8 px-3 py-2 text-xs font-semibold text-primary-foreground/60 transition-all duration-300 hover:bg-primary-foreground/15 hover:text-primary-foreground lg:flex"
              aria-label="Podeli"
            >
              <Share2 className="h-3 w-3" />
              Podeli
            </button>
            <a
              href="tel:+381113757287"
              className="flex items-center gap-2 rounded-lg bg-accent/20 px-4 py-2 text-xs font-bold text-accent transition-all duration-300 hover:bg-accent/30 hover:shadow-[0_0_20px_-5px_hsl(var(--accent)/0.4)]"
            >
              <Phone className="h-3.5 w-3.5" />
              +381 11 375 72 87
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="relative z-[60] rounded-lg p-2 text-primary-foreground transition-colors md:hidden hover:bg-primary-foreground/10"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <div className="relative h-5 w-5">
              <Menu className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${mobileOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
              <X className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${mobileOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[55] transition-all duration-400 md:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={`absolute right-0 top-0 h-full w-[88%] max-w-[360px] hero-gradient shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.5)] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col pt-6 pb-8">
            <div className="mb-6 flex items-center justify-between gap-3 px-5">
              <div className="min-w-0">
                <div className="mb-1 inline-flex rounded-xl px-2 py-1.5">
                  <img src={logo} alt={siteTitle} className="h-10 w-auto object-contain brightness-0 invert contrast-125 drop-shadow-[0_5px_10px_rgba(0,0,0,0.4)]" />
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/10 text-primary-foreground transition-all duration-200 hover:bg-primary-foreground/20 active:scale-95"
                aria-label="Zatvori meni"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mx-6 h-px bg-gradient-to-r from-transparent via-primary-foreground/15 to-transparent" />

            <nav className="flex-1 px-4 py-4 space-y-1">
              {navItems.map((item, i) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center gap-4 rounded-xl px-4 py-3.5 text-[15px] font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-accent/15 text-accent shadow-[inset_0_1px_0_0_hsl(var(--accent)/0.15)]"
                        : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground active:scale-[0.98]"
                    }`}
                    style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms" }}
                  >
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                      isActive ? "bg-accent/20" : "bg-primary-foreground/10 group-hover:bg-primary-foreground/15"
                    }`}>
                      <item.icon className={`h-4.5 w-4.5 ${isActive ? "text-accent" : ""}`} />
                    </div>
                    <span className="flex-1">{item.label}</span>
                    <ArrowRight className={`h-4 w-4 transition-all duration-200 ${
                      isActive ? "text-accent opacity-100" : "opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0"
                    }`} />
                  </Link>
                );
              })}
            </nav>

            <div className="mx-6 h-px bg-gradient-to-r from-transparent via-primary-foreground/15 to-transparent" />

            <div className="px-4 pt-4 space-y-2">
              <a
                href="tel:+381113757287"
                className="flex items-center gap-3 rounded-xl bg-accent/15 px-4 py-3 text-sm font-semibold text-accent transition-all duration-200 active:scale-[0.98]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/20">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-accent/60">Pozovite nas</p>
                  <p>+381 11 375 72 87</p>
                </div>
              </a>
              <button
                onClick={() => { handleShare(); setMobileOpen(false); }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-primary-foreground/60 transition-all duration-200 hover:bg-primary-foreground/10 active:scale-[0.98]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10">
                  <Share2 className="h-4 w-4" />
                </div>
                Podeli stranicu
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
