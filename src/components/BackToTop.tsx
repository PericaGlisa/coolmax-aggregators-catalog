import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 400);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const circumference = 2 * Math.PI * 18;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_30px_-5px_hsl(var(--primary)/0.5)] transition-all duration-500 hover:scale-110 hover:shadow-[0_12px_40px_-5px_hsl(var(--primary)/0.6)] active:scale-95 ${
        show ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none"
      }`}
      aria-label="Nazad na vrh"
    >
      {/* Progress ring */}
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="18" fill="none" stroke="hsl(var(--accent) / 0.3)" strokeWidth="2" />
        <circle
          cx="24" cy="24" r="18" fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-150"
        />
      </svg>
      <ArrowUp className="relative h-4.5 w-4.5" />
    </button>
  );
};

export default BackToTop;