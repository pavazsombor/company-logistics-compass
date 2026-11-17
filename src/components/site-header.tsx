import { Link, useRouterState } from "@tanstack/react-router";
import { setLang, useT } from "@/lib/i18n";

const navItems = [
  { to: "/site" as const, label: "Home" },
  { to: "/site/about" as const, label: "About" },
  { to: "/site/contact" as const, label: "Contact Us" },
];

export function SiteHeader() {
  const { t, lang } = useT();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-8 px-6">
        <Link to="/site" className="flex items-center gap-3">
          <div className="grid size-8 -skew-x-12 place-items-center bg-signal/90 font-display text-lg text-ink">
            T
          </div>
          <span className="font-display text-xl tracking-wide">TECHLOGIX</span>
          <span className="font-mono text-[10px] uppercase tracking-[.2em] text-mist">kft.</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-mist md:flex">
          {navItems.map((item) => {
            const isActive =
              item.to === "/site" ? pathname === "/site" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={isActive ? "text-frost" : "transition hover:text-signal"}
              >
                {t(item.label)}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <div className="flex font-mono text-[11px] uppercase tracking-wider ring-1 ring-line" role="group" aria-label="Language">
            {(["en", "hu"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={lang === l ? "bg-frost px-2.5 py-1.5 text-ink" : "bg-panel px-2.5 py-1.5 text-mist transition hover:text-signal"}
              >
                {l === "en" ? "EN" : "HU"}
              </button>
            ))}
          </div>
          <Link
            to="/"
            className="hidden bg-panel px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-mist ring-1 ring-line transition hover:text-signal md:block"
          >
            {t("Intranet →")}
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { t } = useT();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="grid size-7 -skew-x-12 place-items-center bg-signal/90 font-display text-sm text-ink">T</div>
          <span className="font-display text-lg tracking-wide">TECHLOGIX</span>
          <span className="font-mono text-[10px] uppercase tracking-[.2em] text-mist">kft.</span>
        </div>
        <p className="font-mono text-[11px] text-mist">
          © 2026 TechLogix Kft. · {t("Freight forwarding & contract logistics")}
        </p>
        <nav className="flex gap-5 font-mono text-[11px] uppercase tracking-wider text-mist">
          <Link to="/site/about" className="transition hover:text-signal">{t("About")}</Link>
          <Link to="/site/contact" className="transition hover:text-signal">{t("Contact Us")}</Link>
          <Link to="/" className="transition hover:text-signal">{t("Intranet →")}</Link>
        </nav>
      </div>
    </footer>
  );
}
