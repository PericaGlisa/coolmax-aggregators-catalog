import { useEffect, useState } from "react";
import { Monitor, Plus, RefreshCw, Share2, X } from "lucide-react";
import { useRegisterSW } from "virtual:pwa-register/react";

const PwaUpdateNotice = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    immediate: true,
  });
  const [showIosInstallHint, setShowIosInstallHint] = useState(false);
  const [showMacInstallHint, setShowMacInstallHint] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isIosDevice =
      /iPad|iPhone|iPod/.test(userAgent) || (window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
    const isMacDesktop = /Macintosh/.test(userAgent) && window.navigator.maxTouchPoints < 2;
    const isSafariBrowser = /Safari/.test(userAgent) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(userAgent);
    const isStandaloneByMedia = window.matchMedia("(display-mode: standalone)").matches;
    const isStandaloneByNavigator =
      "standalone" in window.navigator && Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone);
    const isStandalone = isStandaloneByMedia || isStandaloneByNavigator;
    const isIosDismissed = window.localStorage.getItem("ios-install-hint-dismissed") === "1";
    const isMacDismissed = window.localStorage.getItem("mac-install-hint-dismissed") === "1";

    setShowIosInstallHint(isIosDevice && isSafariBrowser && !isStandalone && !isIosDismissed);
    setShowMacInstallHint(isMacDesktop && isSafariBrowser && !isStandalone && !isMacDismissed);
  }, []);

  const dismissIosHint = () => {
    window.localStorage.setItem("ios-install-hint-dismissed", "1");
    setShowIosInstallHint(false);
  };

  const dismissMacHint = () => {
    window.localStorage.setItem("mac-install-hint-dismissed", "1");
    setShowMacInstallHint(false);
  };

  if (!needRefresh && !showIosInstallHint && !showMacInstallHint) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-[80] px-4">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-3">
        {needRefresh && (
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/95 p-3 shadow-[0_16px_50px_-20px_hsl(var(--primary)/0.5)] backdrop-blur-xl">
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
        )}
        {showIosInstallHint && (
          <div className="flex items-center gap-3 rounded-2xl border border-accent/20 bg-card/95 p-3 shadow-[0_16px_50px_-20px_hsl(var(--accent)/0.45)] backdrop-blur-xl">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Share2 className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">Dodajte katalog na početni ekran</p>
              <p className="text-xs text-muted-foreground">Otvori Share i izaberi Add to Home Screen.</p>
            </div>
            <div className="flex items-center gap-1 rounded-lg bg-accent/15 px-2 py-1 text-xs font-semibold text-accent">
              <Plus className="h-3.5 w-3.5" />
              A2HS
            </div>
            <button
              onClick={dismissIosHint}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
              aria-label="Zatvori iOS obaveštenje"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        {showMacInstallHint && (
          <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-card/95 p-3 shadow-[0_16px_50px_-20px_hsl(var(--primary)/0.45)] backdrop-blur-xl">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Monitor className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">Dodajte katalog kao app na Mac-u</p>
              <p className="text-xs text-muted-foreground">U Safari meniju izaberi File → Add to Dock.</p>
            </div>
            <div className="rounded-lg bg-primary/15 px-2 py-1 text-xs font-semibold text-primary">Add to Dock</div>
            <button
              onClick={dismissMacHint}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
              aria-label="Zatvori macOS obaveštenje"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PwaUpdateNotice;
