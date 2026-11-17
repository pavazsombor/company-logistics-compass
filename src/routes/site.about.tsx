import { createFileRoute, Link } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { SiteHeader, SiteFooter } from "@/components/site-header";

export const Route = createFileRoute("/site/about")({
  head: () => ({
    meta: [
      { title: "About Us — TechLogix Kft." },
      { name: "description", content: "TechLogix Kft. is a Budapest-based freight forwarder and contract logistics provider serving 14 European countries since 2011." },
      { property: "og:title", content: "About Us — TechLogix Kft." },
      { property: "og:description", content: "Budapest-based freight forwarder and contract logistics provider serving 14 European countries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SiteAbout,
});

const milestones = [
  { year: "2011", text: "Founded in Budapest with two trucks and a leased warehouse bay." },
  { year: "2015", text: "Opened Terminal B cross-dock and launched scheduled EU linehauls." },
  { year: "2019", text: "Added bonded warehousing and in-house customs brokerage." },
  { year: "2023", text: "Cold-chain division launched; fleet passed 60 units." },
];

const values = [
  { title: "Reliability", desc: "We measure ourselves on on-time delivery, not promises. 98.6% and audited monthly." },
  { title: "Transparency", desc: "Live ETAs, honest delays, no hidden surcharges. You see what our dispatchers see." },
  { title: "Care for cargo", desc: "From pallets to pharma cold chain, every shipment gets the handling its contents demand." },
];

function SiteAbout() {
  const { t } = useT();

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink font-sans text-frost">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_15%_0%,rgba(0,229,255,.14),transparent_60%),radial-gradient(60%_50%_at_95%_100%,rgba(60,120,200,.12),transparent_55%)]" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-[680px] w-[520px] rotate-[18deg] bg-gradient-to-b from-frost/8 to-transparent backdrop-blur-[2px]" />

      <div className="relative z-10">
        <SiteHeader />

        <section className="mx-auto max-w-[1200px] px-6 pb-12 pt-16 md:pt-24">
          <p className="font-mono text-[11px] uppercase tracking-[.22em] text-signal animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both]">
            {t("About the company")}
          </p>
          <h1 className="mt-4 font-display text-5xl tracking-tight animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both] [animation-delay:60ms] md:text-6xl">
            {t("BUILT ON THE DOCK,")}
            <br />
            <span className="text-signal">{t("NOT IN A BOARDROOM.")}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-mist animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both] [animation-delay:120ms]">
            {t("TechLogix Kft. started in 2011 as a two-truck hauler in Budapest. Today we run road, sea and air freight, 12,000 m² of warehousing and an in-house customs desk — serving importers, manufacturers and retailers in 14 European countries.")}
          </p>
        </section>

        {/* Timeline */}
        <section className="mx-auto max-w-[1200px] px-6 py-8">
          <h2 className="font-display text-2xl tracking-tight md:text-3xl">{t("MILESTONES")}</h2>
          <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden bg-line ring-1 ring-line md:grid-cols-4">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="bg-panel/80 p-5 backdrop-blur-md animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both]"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <p className="font-display text-2xl text-signal">{m.year}</p>
                <p className="mt-2 text-sm text-mist">{t(m.text)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mx-auto max-w-[1200px] px-6 py-12">
          <h2 className="font-display text-2xl tracking-tight md:text-3xl">{t("HOW WE WORK")}</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="bg-panel/60 p-6 ring-1 ring-line backdrop-blur-md animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both]"
                style={{ animationDelay: `${120 + i * 60}ms` }}
              >
                <h3 className="font-display text-xl tracking-tight text-signal">{t(v.title)}</h3>
                <p className="mt-2 text-sm text-mist">{t(v.desc)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-[1200px] px-6 pb-20">
          <div className="flex flex-wrap items-center justify-between gap-6 bg-panel/60 p-8 ring-1 ring-line backdrop-blur-md">
            <p className="max-w-md text-sm text-mist">
              {t("Want to work with a forwarder that treats your cargo like its own?")}
            </p>
            <Link
              to="/site/contact"
              className="bg-frost px-6 py-3 font-mono text-xs uppercase tracking-wider text-ink transition hover:bg-signal"
            >
              {t("Get in touch →")}
            </Link>
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  );
}
