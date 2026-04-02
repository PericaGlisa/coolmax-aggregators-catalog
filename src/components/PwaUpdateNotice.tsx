import { RefreshCw, X } from "lucide-react";
import { useRegisterSW } from "virtual:pwa-register/react";

const PwaUpdateNotice = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    immediate: true,
  });

  if (!needRefresh) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-[80] px-4">
      <div className="mx-auto flex w-full max-w-lg items-center gap-3 rounded-2xl border border-border bg-card/95 p-3 shadow-[0_16px_50px_-20px_hsl(var(--primary)/0.5)] backdrop-blur-xl">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
          <RefreshCw className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">Nova verzija kataloga je dostupna</p>
          <p className="text-xs text-muted-foreground">Osvežite aplikaciju da učitate najnovije izmene.</p>
        </div>
        <button
          onClick={() => updateServiceWorker(true)}
          className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Osveži
        </button>
        <button
          onClick={() => setNeedRefresh(false)}
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
          aria-label="Zatvori obaveštenje"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default PwaUpdateNotice;
