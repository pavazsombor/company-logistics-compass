import { createFileRoute, Link } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { SiteHeader, SiteFooter } from "@/components/site-header";

export const Route = createFileRoute("/site/")({
  head: () => ({
    meta: [
      { title: "TechLogix Kft. — Freight & Logistics" },
      { name: "description", content: "TechLogix Kft.: road, sea and air freight, warehousing and customs handling across Europe. Reliable logistics for growing businesses." },
      { property: "og:title", content: "TechLogix Kft. — Freight & Logistics" },
      { property: "og:description", content: "Road, sea and air freight, warehousing and customs handling across Europe." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SiteHome,
});

const services = [
  { code: "01", title: "Road Freight", desc: "FTL and LTL trucking across the EU with daily departures and live ETA updates.", tag: "FTL / LTL" },
  { code: "02", title: "Sea & Air Freight", desc: "FCL/LCL ocean and priority air cargo through our partner network at 40+ ports.", tag: "FCL / LCL / AIR" },
  { code: "03", title: "Warehousing", desc: "12,000 m² of bonded and cold-chain storage with WMS-tracked inventory.", tag: "12,000 m²" },
  { code: "04", title: "Customs Handling", desc: "In-house customs brokerage: import, export and transit documentation done for you.", tag: "T1 / EX / IM" },
];

const stats = [
  { value: "98.6%", label: "On-time delivery" },
  { value: "14", label: "Countries served" },
  { value: "40+", label: "Partner ports" },
  { value: "24/7", label: "Dispatch coverage" },
];

function SiteHome() {
  const { t } = useT();

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink font-sans text-frost">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_15%_0%,rgba(0,229,255,.14),transparent_60%),radial-gradient(60%_50%_at_95%_100%,rgba(60,120,200,.12),transparent_55%)]" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-[680px] w-[520px] rotate-[18deg] bg-gradient-to-b from-frost/8 to-transparent backdrop-blur-[2px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[620px] w-[460px] -rotate-[14deg] bg-gradient-to-t from-signal/6 to-transparent" />

      <div className="relative z-10">
        <SiteHeader />

        {/* Hero */}
        <section className="mx-auto max-w-[1200px] px-6 pb-16 pt-20 md:pt-28">
          <p className="font-mono text-[11px] uppercase tracking-[.22em] text-signal animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both]">
            {t("Freight forwarding · Budapest, HU")}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.02] tracking-tight animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both] [animation-delay:60ms] md:text-7xl">
            {t("YOUR CARGO,")}
            <br />
            <span className="text-signal">{t("ON SCHEDULE.")}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-mist animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both] [animation-delay:120ms]">
            {t("TechLogix moves freight across Europe by road, sea and air — with warehousing, customs and a dispatch team that answers around the clock.")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both] [animation-delay:180ms]">
            <Link
              to="/site/contact"
              className="bg-frost px-6 py-3 font-mono text-xs uppercase tracking-wider text-ink transition hover:bg-signal"
            >
              {t("Request a quote →")}
            </Link>
            <Link
              to="/site/about"
              className="bg-panel px-6 py-3 font-mono text-xs uppercase tracking-wider ring-1 ring-line transition hover:text-signal hover:ring-signal"
            >
              {t("About us")}
            </Link>
          </div>
        </section>

        {/* Stats strip */}
        <section className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-2 gap-px overflow-hidden bg-line ring-1 ring-line md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="bg-panel/80 p-5 backdrop-blur-md animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both]"
                style={{ animationDelay: `${240 + i * 40}ms` }}
              >
                <p className="font-display text-3xl text-signal">{s.value}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[.18em] text-mist">{t(s.label)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="mx-auto max-w-[1200px] px-6 py-16">
          <p className="font-mono text-[11px] uppercase tracking-[.22em] text-signal">{t("What we do")}</p>
          <h2 className="mt-2 font-display text-3xl tracking-tight md:text-4xl">{t("SERVICES")}</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {services.map((s, i) => (
              <div
                key={s.code}
                className="group relative bg-panel/60 p-6 ring-1 ring-line backdrop-blur-md transition hover:ring-signal animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both]"
                style={{ animationDelay: `${120 + i * 60}ms` }}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] text-mist">{s.code}</span>
                  <span className="bg-frost/5 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-signal ring-1 ring-line">
                    {s.tag}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl tracking-tight transition group-hover:text-signal">
                  {t(s.title)}
                </h3>
                <p className="mt-2 text-sm text-mist">{t(s.desc)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-[1200px] px-6 pb-20">
          <div className="relative overflow-hidden bg-panel/60 p-8 ring-1 ring-line backdrop-blur-md md:p-12">
            <span className="absolute inset-0 overflow-hidden">
              <span className="absolute -inset-y-8 left-0 w-1/3 animate-[sheen_6s_linear_infinite] bg-gradient-to-r from-frost/10 to-transparent" />
            </span>
            <div className="relative flex flex-wrap items-center justify-between gap-6">
              <div>
                <h2 className="font-display text-3xl tracking-tight md:text-4xl">
                  {t("READY TO SHIP?")}
                </h2>
                <p className="mt-2 max-w-md text-sm text-mist">
                  {t("Send us your route and cargo details — we reply with a quote within one business day.")}
                </p>
              </div>
              <Link
                to="/site/contact"
                className="bg-frost px-6 py-3 font-mono text-xs uppercase tracking-wider text-ink transition hover:bg-signal"
              >
                {t("Contact us →")}
              </Link>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  );
}
