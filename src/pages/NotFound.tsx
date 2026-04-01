import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Stranica nije pronađena | EKO Coolmax";
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)] sm:p-10">
          <p className="mb-2 font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">404</p>
          <h1 className="mb-4 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">Stranica nije pronađena</h1>
          <p className="mb-7 text-sm text-muted-foreground sm:text-base">
            Link koji ste otvorili ne postoji ili je promenjen.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Povratak na početnu
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
