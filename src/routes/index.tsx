import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { OpsHeader } from "@/components/ops-header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dispatch Board — TechLogix Kft." },
      { name: "description", content: "Live operations board: shipments in transit, dock utilization, open requests and announcements for TechLogix." },
      { property: "og:title", content: "Dispatch Board — TechLogix Kft." },
      { property: "og:description", content: "Live operations board for TechLogix: shipments, docks, requests and announcements." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type ShipmentStatus = "IN TRANSIT" | "AT DOCK" | "DELAYED" | "CLOSED";

type Shipment = {
  ref: string;
  route: string;
  container: string;
  dock: string;
  eta: string;
  status: ShipmentStatus;
};

const shipments: Shipment[] = [
  { ref: "PO-8841", route: "CNX→RTM", container: "TCLU774120", dock: "B-14", eta: "17:40", status: "IN TRANSIT" },
  { ref: "PO-8802", route: "SHA→HAM", container: "MSKU339015", dock: "A-07", eta: "now", status: "AT DOCK" },
  { ref: "PO-8779", route: "NGB→FRA", container: "HLXU118842", dock: "C-21", eta: "-2h", status: "DELAYED" },
  { ref: "PO-8765", route: "XMN→GOT", container: "CMAU550913", dock: "B-09", eta: "21:15", status: "IN TRANSIT" },
  { ref: "PO-8740", route: "SZV→AMS", container: "OOLU227746", dock: "D-03", eta: "done", status: "CLOSED" },
  { ref: "PO-8853", route: "HAM→NYK", container: "BEAU441008", dock: "A-12", eta: "19:05", status: "IN TRANSIT" },
  { ref: "PO-8847", route: "PUS→LAX", container: "OOLU663219", dock: "C-02", eta: "Thu 06:20", status: "IN TRANSIT" },
  { ref: "PO-8836", route: "RTM→MAD", container: "TCLU221874", dock: "B-11", eta: "18:30", status: "AT DOCK" },
  { ref: "PO-8828", route: "SIN→HAM", container: "MSKU884510", dock: "D-08", eta: "-45m", status: "DELAYED" },
  { ref: "PO-8812", route: "GOT→OSL", container: "HLXU770612", dock: "A-04", eta: "done", status: "CLOSED" },
];

const statusFilters = ["All 214", "In Transit 61", "At Dock 24", "Delayed 7"] as const;
const statusFilterMap: Record<(typeof statusFilters)[number], ShipmentStatus | null> = {
  "All 214": null,
  "In Transit 61": "IN TRANSIT",
  "At Dock 24": "AT DOCK",
  "Delayed 7": "DELAYED",
};

const statusColor: Record<ShipmentStatus, string> = {
  "IN TRANSIT": "text-signal",
  "AT DOCK": "text-warn",
  DELAYED: "text-danger",
  CLOSED: "text-mist",
};

const announcements = [
  { tone: "bg-signal", title: "Terminal B gantry 4 offline 22:00", meta: "14:02 · Facilities", pulse: true },
  { tone: "bg-warn", title: "Reefer slots capped until Fri", meta: "11:20 · Cold Chain", pulse: false },
  { tone: "bg-mist", title: "WMS v6.2 maintenance Sat 02:00", meta: "09:05 · IT Ops", pulse: false },
];

const quickRequests = [
  { title: "Leave", meta: "PTO / shift swap", to: "/requests" as const },
  { title: "Equipment", meta: "pallet jack, MHE", to: "/requests" as const },
  { title: "Delivery Slot", meta: "book dock window", to: "/requests" as const },
  { title: "Exception", meta: "damage, customs", to: "/requests" as const },
];

const systems = ["WMS", "TMS", "EDI", "Yard", "Directory"];

const kpis = [
  { label: "In Transit", value: "61", note: "▲ 8 since 06:00", noteClass: "text-signal", sheen: true },
  { label: "On-Time %", value: "94.2", note: "target 92.0", noteClass: "text-mist", sheen: false },
  { label: "Dock Util.", value: "78%", note: "21 of 27 doors", noteClass: "text-mist", bar: 78, sheen: false },
  { label: "Open Requests", value: "12", note: "3 breaching SLA", noteClass: "text-warn", sheen: false },
];

function Index() {
  const { t } = useT();
  const [filter, setFilter] = useState<(typeof statusFilters)[number]>("All 214");
  const activeStatus = statusFilterMap[filter];
  const rows = activeStatus ? shipments.filter((s) => s.status === activeStatus) : shipments;

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink font-sans text-frost">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_15%_0%,rgba(0,229,255,.14),transparent_60%),radial-gradient(60%_50%_at_95%_100%,rgba(60,120,200,.12),transparent_55%)]" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-[680px] w-[520px] rotate-[18deg] bg-gradient-to-b from-frost/8 to-transparent backdrop-blur-[2px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[620px] w-[460px] -rotate-[14deg] bg-gradient-to-t from-signal/6 to-transparent" />

      <div className="relative z-10">
        <OpsHeader />

        <div className="mx-auto max-w-[1400px] px-6 pt-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
            <div className="animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both]">
              <p className="font-mono text-[11px] uppercase tracking-[.22em] text-signal">
                {t("Dispatch Board · Thu 14:02 UTC")}
              </p>
              <h1 className="mt-1 font-display text-4xl tracking-tight md:text-5xl">
                {t("SHIFT 03 — TERMINAL B")}
              </h1>
            </div>
            <div className="flex gap-2 font-mono text-[11px] uppercase tracking-wider">
              {statusFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={
                    f === filter
                      ? "bg-frost px-3 py-1.5 text-ink"
                      : "bg-panel px-3 py-1.5 ring-1 ring-line transition hover:text-signal"
                  }
                >
                  {t(f)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden bg-line ring-1 ring-line md:grid-cols-4">
            {kpis.map((kpi, i) => (
              <div
                key={kpi.label}
                className="relative bg-panel/80 p-4 backdrop-blur-md animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both]"
                style={{ animationDelay: `${60 + i * 40}ms` }}
              >
                {kpi.sheen && (
                  <span className="absolute inset-0 overflow-hidden">
                    <span className="absolute -inset-y-8 left-0 w-1/3 animate-[sheen_6s_linear_infinite] bg-gradient-to-r from-frost/10 to-transparent" />
                  </span>
                )}
                <p className="font-mono text-[10px] uppercase tracking-[.18em] text-mist">{t(kpi.label)}</p>
                <p className="mt-2 font-display text-3xl">{kpi.value}</p>
                {kpi.bar != null ? (
                  <div className="mt-2 h-1 bg-line">
                    <div className="h-full bg-signal" style={{ width: `${kpi.bar}%` }} />
                  </div>
                ) : (
                  <p className={`mt-1 font-mono text-[11px] ${kpi.noteClass}`}>{t(kpi.note)}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-6 py-6 lg:grid-cols-12">
          <main className="ring-1 ring-line bg-panel/60 backdrop-blur-md animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both] [animation-delay:220ms] lg:col-span-8">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="font-mono text-[11px] uppercase tracking-[.18em] text-mist">
                {t("Active Shipments")}
              </span>
              <span className="font-mono text-[11px] text-signal">
                LIVE · {String(rows.length).padStart(2, "0")} {t("shown")}
              </span>
            </div>
            <div className="grid grid-cols-[1fr_.8fr_.5fr_.9fr_.8fr] gap-2 border-b border-line px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-mist">
              <span>{t("Ref / Route")}</span>
              <span>{t("Container")}</span>
              <span>{t("Dock")}</span>
              <span>{t("ETA")}</span>
              <span>{t("Status")}</span>
            </div>
            {rows.map((s, i) => (
              <div
                key={s.ref}
                className={`grid grid-cols-[1fr_.8fr_.5fr_.9fr_.8fr] gap-2 px-4 py-3 text-sm transition hover:bg-frost/5 hover:[box-shadow:inset_3px_0_0_var(--color-signal)] ${
                  i < rows.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <span className="font-medium">
                  {s.ref} <span className="font-mono text-xs text-mist">{s.route}</span>
                </span>
                <span className="font-mono text-xs text-mist">{s.container}</span>
                <span className="font-mono text-xs">{s.dock}</span>
                <span className="font-mono text-xs">{t(s.eta)}</span>
                <span className={`font-mono text-xs ${statusColor[s.status]}`}>{t(s.status)}</span>
              </div>
            ))}
          </main>

          <aside className="flex flex-col gap-4 lg:col-span-4">
            <section className="bg-panel/60 p-4 ring-1 ring-line backdrop-blur-md animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both] [animation-delay:260ms]">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[.18em] text-mist">{t("Announcements")}</p>
              {announcements.map((a, i) => (
                <div
                  key={a.title}
                  className={`flex gap-3 ${
                    i < announcements.length - 1 ? "border-b border-line pb-3" : ""
                  } ${i > 0 ? "pt-3" : ""}`}
                >
                  <span className={`mt-2 size-1.5 ${a.tone} ${a.pulse ? "animate-[pulse-dot_2s_ease-in-out_infinite]" : ""}`} />
                  <div>
                    <p className="text-sm font-medium">{t(a.title)}</p>
                    <p className="mt-0.5 font-mono text-[11px] text-mist">{a.meta}</p>
                  </div>
                </div>
              ))}
            </section>

            <section className="bg-panel/60 p-4 ring-1 ring-line backdrop-blur-md animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both] [animation-delay:300ms]">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[.18em] text-mist">{t("Quick Requests")}</p>
              <div className="grid grid-cols-2 gap-2">
                {quickRequests.map((q) => (
                  <a
                    key={q.title}
                    href={q.to}
                    className="bg-frost/5 px-3 py-2.5 text-left ring-1 ring-line transition hover:bg-signal/10 hover:ring-signal"
                  >
                    <p className="text-sm font-medium">{t(q.title)}</p>
                    <p className="font-mono text-[10px] text-mist">{t(q.meta)}</p>
                  </a>
                ))}
              </div>
            </section>

            <section className="bg-panel/60 p-4 ring-1 ring-line backdrop-blur-md animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both] [animation-delay:340ms]">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[.18em] text-mist">{t("Systems")}</p>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {systems.map((sys) => (
                  <a
                    key={sys}
                    href="/directory"
                    className="px-3 py-1.5 ring-1 ring-line transition hover:border-signal hover:text-signal"
                  >
                    {sys} →
                  </a>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
