import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { SiteHeader, SiteFooter } from "@/components/site-header";

export const Route = createFileRoute("/site/contact")({
  head: () => ({
    meta: [
      { title: "Contact — TechLogix Kft." },
      { name: "description", content: "Request a freight quote or contact TechLogix Kft.: Budapest HQ, 24/7 dispatch line, response within one business day." },
      { property: "og:title", content: "Contact — TechLogix Kft." },
      { property: "og:description", content: "Request a freight quote or contact TechLogix Kft. — response within one business day." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SiteContact,
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const contactInfo = [
  { label: "Head Office", value: "1134 Budapest, Váci út 45.", mono: false },
  { label: "Email", value: "info@techlogix.hu", mono: true },
  { label: "Dispatch (24/7)", value: "+36 1 555 0142", mono: true },
  { label: "Response Time", value: "within 1 business day", mono: false },
];

type Errors = { name?: string; email?: string; message?: string };

function SiteContact() {
  const { t } = useT();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = t("Please enter your name.");
    if (!EMAIL_RE.test(email.trim())) next.email = t("Please enter a valid email address.");
    if (message.trim().length < 10) next.message = t("Please describe your shipment or question (min. 10 characters).");
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    // No backend connected yet: show confirmation locally.
    setSent(true);
  };

  const inputClass =
    "mt-2 w-full bg-ink/60 p-3 text-sm text-frost outline-none ring-1 ring-line transition placeholder:text-mist focus:ring-signal";
  const labelClass = "font-mono text-[10px] uppercase tracking-[.18em] text-mist";

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink font-sans text-frost">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_15%_0%,rgba(0,229,255,.14),transparent_60%),radial-gradient(60%_50%_at_95%_100%,rgba(60,120,200,.12),transparent_55%)]" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-[680px] w-[520px] rotate-[18deg] bg-gradient-to-b from-frost/8 to-transparent backdrop-blur-[2px]" />

      <div className="relative z-10">
        <SiteHeader />

        <section className="mx-auto max-w-[1200px] px-6 pb-12 pt-16 md:pt-24">
          <p className="font-mono text-[11px] uppercase tracking-[.22em] text-signal animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both]">
            {t("Contact · Quote requests")}
          </p>
          <h1 className="mt-4 font-display text-5xl tracking-tight animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both] [animation-delay:60ms] md:text-6xl">
            {t("LET'S MOVE")} <span className="text-signal">{t("YOUR FREIGHT.")}</span>
          </h1>
        </section>

        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 px-6 pb-20 lg:grid-cols-12">
          {/* Form */}
          <section className="bg-panel/60 p-6 ring-1 ring-line backdrop-blur-md animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both] [animation-delay:120ms] lg:col-span-7">
            {sent ? (
              <div className="py-10 text-center">
                <p className="font-display text-3xl tracking-tight text-signal">{t("MESSAGE RECEIVED.")}</p>
                <p className="mx-auto mt-3 max-w-sm text-sm text-mist">
                  {t("Thanks for reaching out — our team will reply within one business day.")}
                </p>
                <button
                  type="button"
                  onClick={() => { setSent(false); setName(""); setEmail(""); setCompany(""); setMessage(""); }}
                  className="mt-6 bg-panel px-5 py-2.5 font-mono text-xs uppercase tracking-wider ring-1 ring-line transition hover:text-signal hover:ring-signal"
                >
                  {t("Send another message")}
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className={labelClass}>
                    {t("Name")} *
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={100}
                      placeholder={t("Your full name")}
                      className={inputClass}
                    />
                    {errors.name && <span className="mt-1 block font-mono text-[11px] normal-case tracking-normal text-danger">{errors.name}</span>}
                  </label>
                  <label className={labelClass}>
                    {t("Email")} *
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      maxLength={255}
                      placeholder="you@company.com"
                      className={inputClass}
                    />
                    {errors.email && <span className="mt-1 block font-mono text-[11px] normal-case tracking-normal text-danger">{errors.email}</span>}
                  </label>
                </div>
                <label className={labelClass}>
                  {t("Company")}
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    maxLength={100}
                    placeholder={t("Company name (optional)")}
                    className={inputClass}
                  />
                </label>
                <label className={labelClass}>
                  {t("Message")} *
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    maxLength={1000}
                    placeholder={t("Route, cargo type, volume, timeline…")}
                    className={`${inputClass} resize-none`}
                  />
                  {errors.message && <span className="mt-1 block font-mono text-[11px] normal-case tracking-normal text-danger">{errors.message}</span>}
                </label>
                <button
                  type="submit"
                  className="bg-frost px-4 py-3 font-mono text-xs uppercase tracking-wider text-ink transition hover:bg-signal"
                >
                  {t("Send message →")}
                </button>
              </form>
            )}
          </section>

          {/* Contact info */}
          <aside className="flex flex-col gap-4 lg:col-span-5">
            <section className="bg-panel/60 p-6 ring-1 ring-line backdrop-blur-md animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both] [animation-delay:180ms]">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[.18em] text-mist">{t("Reach us directly")}</p>
              {contactInfo.map((c, i) => (
                <div key={c.label} className={i < contactInfo.length - 1 ? "border-b border-line pb-3 mb-3" : ""}>
                  <p className="font-mono text-[10px] uppercase tracking-[.18em] text-mist">{t(c.label)}</p>
                  <p className={`mt-1 text-sm ${c.mono ? "font-mono text-signal" : "font-medium"}`}>{t(c.value)}</p>
                </div>
              ))}
            </section>
            <section className="bg-panel/60 p-6 ring-1 ring-line backdrop-blur-md animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both] [animation-delay:240ms]">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[.18em] text-mist">{t("Opening hours")}</p>
              <p className="text-sm">{t("Office: Mon–Fri 08:00–17:00")}</p>
              <p className="mt-1 text-sm text-mist">{t("Dispatch & warehouse: 24/7")}</p>
            </section>
          </aside>
        </div>

        <SiteFooter />
      </div>
    </div>
  );
}
