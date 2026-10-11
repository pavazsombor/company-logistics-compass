import { Link, useRouterState } from "@tanstack/react-router";

const navItems = [
  { to: "/" as const, label: "Board" },
  { to: "/requests" as const, label: "Requests" },
  { to: "/directory" as const, label: "Directory" },
];

export function OpsHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-8 px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid size-8 -skew-x-12 place-items-center bg-signal/90 font-display text-lg text-ink">
            T
          </div>
          <span className="font-display text-xl tracking-wide">TECHLOGIX</span>
          <span className="font-mono text-[10px] uppercase tracking-[.2em] text-mist">kft.</span>
        </Link>
        <div className="flex h-9 max-w-md flex-1 items-center gap-2 bg-panel px-3 ring-1 ring-line">
          <span className="font-mono text-xs text-mist">⌕</span>
          <input
            type="search"
            placeholder="Search PO, dock, container, ETA…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-mist"
          />
        </div>
        <nav className="hidden items-center gap-6 text-sm text-mist md:flex">
          {navItems.map((item) => {
            const isActive =
              item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={
                  isActive ? "text-frost" : "transition hover:text-signal"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-signal/40 to-frost/20 font-mono text-xs ring-1 ring-line">
          RD
        </div>
      </div>
    </header>
  );
}
