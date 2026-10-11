import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { OpsHeader } from "@/components/ops-header";

export const Route = createFileRoute("/requests")({
  head: () => ({
    meta: [
      { title: "Requests — TechLogix Kft." },
      { name: "description", content: "Submit and track internal requests: leave, equipment, delivery slots and shipment exceptions at TechLogix." },
      { property: "og:title", content: "Requests — TechLogix Kft." },
      { property: "og:description", content: "Submit and track internal requests at TechLogix." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RequestsPage,
});

type RequestType = "Leave" | "Equipment" | "Delivery Slot" | "Exception";

type OpenRequest = {
  id: string;
  type: RequestType;
  detail: string;
  requester: string;
  sla: string;
  status: "PENDING" | "IN REVIEW" | "BREACHING SLA";
};

const initialRequests: OpenRequest[] = [
  { id: "REQ-4412", type: "Delivery Slot", detail: "Dock B-14 · Thu 08:00–10:00", requester: "T. Okafor", sla: "4h", status: "IN REVIEW" },
  { id: "REQ-4409", type: "Equipment", detail: "2× pallet jack, Warehouse A", requester: "M. Kessler", sla: "6h", status: "PENDING" },
  { id: "REQ-4403", type: "Exception", detail: "Customs hold · PO-8779", requester: "S. Lindqvist", sla: "1h", status: "BREACHING SLA" },
  { id: "REQ-4398", type: "Leave", detail: "Shift swap · Fri→Mon next week", requester: "D. Reinholt", sla: "24h", status: "PENDING" },
  { id: "REQ-4391", type: "Equipment", detail: "Reefer probe calibration kit", requester: "Cold Chain", sla: "12h", status: "IN REVIEW" },
  { id: "REQ-4388", type: "Delivery Slot", detail: "Dock D-03 · Fri 14:00–16:00", requester: "Yard Ops", sla: "4h", status: "BREACHING SLA" },
];

const requestTypes: { type: RequestType; meta: string }[] = [
  { type: "Leave", meta: "PTO / shift swap" },
  { type: "Equipment", meta: "pallet jack, MHE" },
  { type: "Delivery Slot", meta: "book dock window" },
  { type: "Exception", meta: "damage, customs" },
];

const statusColor: Record<OpenRequest["status"], string> = {
  PENDING: "text-mist",
  "IN REVIEW": "text-signal",
  "BREACHING SLA": "text-danger",
};

function RequestsPage() {
  const { t } = useT();
  const [requests, setRequests] = useState<OpenRequest[]>(initialRequests);
  const [type, setType] = useState<RequestType>("Leave");
  const [detail, setDetail] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!detail.trim()) return;
    const id = `REQ-${4400 + requests.length + 13}`;
    setRequests([
      { id, type, detail: detail.trim(), requester: "You", sla: "8h", status: "PENDING" },
      ...requests,
    ]);
    setSubmitted(id);
    setDetail("");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink font-sans text-frost">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_15%_0%,rgba(0,229,255,.14),transparent_60%),radial-gradient(60%_50%_at_95%_100%,rgba(60,120,200,.12),transparent_55%)]" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-[680px] w-[520px] rotate-[18deg] bg-gradient-to-b from-frost/8 to-transparent backdrop-blur-[2px]" />

      <div className="relative z-10">
        <OpsHeader />

        <div className="mx-auto max-w-[1400px] px-6 pt-6">
          <div className="animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both]">
            <p className="font-mono text-[11px] uppercase tracking-[.22em] text-signal">
              {t("Service Desk · SLA clock running")}
            </p>
            <h1 className="mt-1 font-display text-4xl tracking-tight md:text-5xl">{t("REQUESTS")}</h1>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-6 py-6 lg:grid-cols-12">
          <section className="ring-1 ring-line bg-panel/60 p-5 backdrop-blur-md animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both] [animation-delay:60ms] lg:col-span-5">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[.18em] text-mist">{t("New Request")}</p>
            <div className="mb-4 grid grid-cols-2 gap-2">
              {requestTypes.map((r) => (
                <button
                  key={r.type}
                  type="button"
                  onClick={() => setType(r.type)}
                  className={
                    type === r.type
                      ? "bg-signal/10 px-3 py-2.5 text-left ring-1 ring-signal transition"
                      : "bg-frost/5 px-3 py-2.5 text-left ring-1 ring-line transition hover:ring-signal"
                  }
                >
                  <p className="text-sm font-medium">{t(r.type)}</p>
                  <p className="font-mono text-[10px] text-mist">{t(r.meta)}</p>
                </button>
              ))}
            </div>
            <form onSubmit={submit} className="flex flex-col gap-3">
              <label className="font-mono text-[10px] uppercase tracking-[.18em] text-mist">
                {t("Details")}
                <textarea
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  rows={4}
                  placeholder={
                    type === "Leave"
                      ? t("Dates, shift, coverage plan…")
                      : type === "Equipment"
                        ? t("Item, quantity, needed by…")
                        : type === "Delivery Slot"
                          ? t("Dock, date, time window…")
                          : t("Reference, what happened, urgency…")
                  }
                  className="mt-2 w-full resize-none bg-ink/60 p-3 text-sm text-frost outline-none ring-1 ring-line transition placeholder:text-mist focus:ring-signal"
                />
              </label>
              <button
                type="submit"
                className="bg-frost px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-ink transition hover:bg-signal"
              >
                {t("Submit request →")}
              </button>
              {submitted && (
                <p className="font-mono text-[11px] text-signal">
                  {t("Filed as")} {submitted} · {t("routed to shift lead")}
                </p>
              )}
            </form>
          </section>

          <section className="ring-1 ring-line bg-panel/60 backdrop-blur-md animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both] [animation-delay:120ms] lg:col-span-7">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="font-mono text-[11px] uppercase tracking-[.18em] text-mist">
                {t("Open Queue")}
              </span>
              <span className="font-mono text-[11px] text-warn">
                {requests.filter((r) => r.status === "BREACHING SLA").length} {t("breaching SLA")}
              </span>
            </div>
            <div className="grid grid-cols-[.8fr_1.4fr_1fr_.7fr] gap-2 border-b border-line px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-mist">
              <span>{t("Ref")}</span>
              <span>{t("Type / Detail")}</span>
              <span>{t("Requester")}</span>
              <span>{t("Status")}</span>
            </div>
            {requests.map((r, i) => (
              <div
                key={r.id}
                className={`grid grid-cols-[.8fr_1.4fr_1fr_.7fr] gap-2 px-4 py-3 text-sm transition hover:bg-frost/5 hover:[box-shadow:inset_3px_0_0_var(--color-signal)] ${
                  i < requests.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <span className="font-mono text-xs">{r.id}</span>
                <span>
                  <span className="font-medium">{t(r.type)}</span>{" "}
                  <span className="text-mist text-xs">{r.detail}</span>
                </span>
                <span className="text-mist text-xs">{t(r.requester)}</span>
                <span className={`font-mono text-xs ${statusColor[r.status]}`}>{t(r.status)}</span>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
