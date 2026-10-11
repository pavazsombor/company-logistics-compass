import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { OpsHeader } from "@/components/ops-header";

export const Route = createFileRoute("/directory")({
  head: () => ({
    meta: [
      { title: "Directory — TechLogix Kft." },
      { name: "description", content: "Staff directory for TechLogix: find colleagues by name, role, department and shift." },
      { property: "og:title", content: "Directory — TechLogix Kft." },
      { property: "og:description", content: "Staff directory for TechLogix." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DirectoryPage,
});

type StaffMember = {
  initials: string;
  name: string;
  role: string;
  dept: string;
  shift: string;
  contact: string;
};

const staff: StaffMember[] = [
  { initials: "MK", name: "Maya Kessler", role: "Warehouse Lead", dept: "Warehouse A", shift: "Shift 01", contact: "ext 2104" },
  { initials: "TO", name: "Tom Okafor", role: "Dispatch Coordinator", dept: "Terminal B", shift: "Shift 03", contact: "ext 3318" },
  { initials: "SL", name: "Sofia Lindqvist", role: "HSE Manager", dept: "Safety", shift: "Shift 02", contact: "ext 1120" },
  { initials: "DR", name: "Dana Reinholt", role: "Shift Supervisor", dept: "Terminal B", shift: "Shift 03", contact: "ext 3301" },
  { initials: "JW", name: "Jonas Weber", role: "Customs Broker", dept: "Compliance", shift: "Shift 01", contact: "ext 1477" },
  { initials: "AP", name: "Amir Patel", role: "Fleet Controller", dept: "Transport", shift: "Shift 02", contact: "ext 2266" },
  { initials: "LK", name: "Lena Kovač", role: "Cold Chain Planner", dept: "Cold Chain", shift: "Shift 03", contact: "ext 3412" },
  { initials: "RB", name: "Rui Barbosa", role: "Yard Marshal", dept: "Yard", shift: "Shift 01", contact: "ext 2090" },
  { initials: "NS", name: "Nina Sørensen", role: "People Partner", dept: "HR", shift: "Shift 02", contact: "ext 1010" },
];

const depts = ["All", "Terminal B", "Warehouse A", "Cold Chain", "Transport", "Compliance", "HR", "Safety", "Yard"];

function DirectoryPage() {
  const [dept, setDept] = useState("All");
  const [query, setQuery] = useState("");

  const rows = staff.filter(
    (s) =>
      (dept === "All" || s.dept === dept) &&
      (s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.role.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink font-sans text-frost">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_15%_0%,rgba(0,229,255,.14),transparent_60%),radial-gradient(60%_50%_at_95%_100%,rgba(60,120,200,.12),transparent_55%)]" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-[680px] w-[520px] rotate-[18deg] bg-gradient-to-b from-frost/8 to-transparent backdrop-blur-[2px]" />

      <div className="relative z-10">
        <OpsHeader />

        <div className="mx-auto max-w-[1400px] px-6 pt-6">
          <div className="animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both]">
            <p className="font-mono text-[11px] uppercase tracking-[.22em] text-signal">
              People Index · {staff.length} on roster
            </p>
            <h1 className="mt-1 font-display text-4xl tracking-tight md:text-5xl">DIRECTORY</h1>
          </div>
        </div>

        <div className="mx-auto max-w-[1400px] px-6 py-6">
          <div className="mb-4 flex flex-wrap items-center gap-2 animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both] [animation-delay:60ms]">
            <div className="flex h-9 w-64 items-center gap-2 bg-panel px-3 ring-1 ring-line">
              <span className="font-mono text-xs text-mist">⌕</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Name or role…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-mist"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono text-[11px] uppercase tracking-wider">
              {depts.map((d) => (
                <button
                  key={d}
                  onClick={() => setDept(d)}
                  className={
                    d === dept
                      ? "bg-frost px-3 py-1.5 text-ink"
                      : "bg-panel px-3 py-1.5 ring-1 ring-line transition hover:text-signal"
                  }
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <section className="ring-1 ring-line bg-panel/60 backdrop-blur-md animate-[rise_.5s_cubic-bezier(.32,.72,0,1)_both] [animation-delay:120ms]">
            <div className="grid grid-cols-[auto_1.6fr_1.4fr_.8fr_.9fr] gap-3 border-b border-line px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-mist">
              <span />
              <span>Name / Role</span>
              <span>Department</span>
              <span>Shift</span>
              <span>Contact</span>
            </div>
            {rows.map((p, i) => (
              <div
                key={p.name}
                className={`grid grid-cols-[auto_1.6fr_1.4fr_.8fr_.9fr] items-center gap-3 px-4 py-3 text-sm transition hover:bg-frost/5 hover:[box-shadow:inset_3px_0_0_var(--color-signal)] ${
                  i < rows.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <div className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-signal/40 to-frost/20 font-mono text-[11px] ring-1 ring-line">
                  {p.initials}
                </div>
                <span>
                  <span className="font-medium">{p.name}</span>{" "}
                  <span className="text-mist text-xs">{p.role}</span>
                </span>
                <span className="font-mono text-xs text-mist">{p.dept}</span>
                <span className="font-mono text-xs">{p.shift}</span>
                <span className="font-mono text-xs text-signal">{p.contact}</span>
              </div>
            ))}
            {rows.length === 0 && (
              <div className="px-4 py-8 text-center font-mono text-xs text-mist">
                No matches — adjust the filter or search.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
