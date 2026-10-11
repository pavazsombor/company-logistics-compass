import { useEffect, useSyncExternalStore } from "react";

export type Lang = "en" | "hu";
let lang: Lang = "en";
const listeners = new Set<() => void>();

export function setLang(l: Lang) {
  lang = l;
  try { localStorage.setItem("lang", l); } catch {}
  if (typeof document !== "undefined") document.documentElement.lang = l;
  listeners.forEach((f) => f());
}

const subscribe = (f: () => void) => { listeners.add(f); return () => listeners.delete(f); };

const hu: Record<string, string> = {
  Board: "Tábla", Requests: "Kérelmek", Directory: "Névjegyzék",
  "Search PO, dock, container, ETA…": "Keresés: PO, rámpa, konténer, ETA…",
  "Dispatch Board · Thu 14:02 UTC": "Diszpécsertábla · Csüt 14:02 UTC",
  "SHIFT 03 — TERMINAL B": "03. MŰSZAK — B TERMINÁL",
  "All 214": "Mind 214", "In Transit 61": "Úton 61", "At Dock 24": "Rámpánál 24", "Delayed 7": "Késik 7",
  "In Transit": "Úton", "On-Time %": "Pontosság %", "Dock Util.": "Rámpakihasználtság", "Open Requests": "Nyitott kérelmek",
  "▲ 8 since 06:00": "▲ 8 06:00 óta", "target 92.0": "cél 92.0", "21 of 27 doors": "27-ből 21 kapu", "3 breaching SLA": "3 SLA-t sért",
  "Active Shipments": "Aktív szállítmányok", shown: "látható",
  "Ref / Route": "Hiv. / Útvonal", Container: "Konténer", Dock: "Rámpa", ETA: "ETA", Status: "Állapot",
  "IN TRANSIT": "ÚTON", "AT DOCK": "RÁMPÁNÁL", DELAYED: "KÉSIK", CLOSED: "LEZÁRVA",
  now: "most", done: "kész",
  Announcements: "Közlemények", "Quick Requests": "Gyors kérelmek", Systems: "Rendszerek",
  "Terminal B gantry 4 offline 22:00": "B terminál 4-es daru 22:00-tól üzemen kívül",
  "Reefer slots capped until Fri": "Hűtőkonténer-helyek péntekig korlátozva",
  "WMS v6.2 maintenance Sat 02:00": "WMS v6.2 karbantartás szombat 02:00",
  Leave: "Szabadság", Equipment: "Eszköz", "Delivery Slot": "Szállítási idősáv", Exception: "Kivétel",
  "PTO / shift swap": "szabadság / műszakcsere", "pallet jack, MHE": "raklapemelő, anyagmozgató",
  "book dock window": "rámpaidő foglalása", "damage, customs": "kár, vám",
  "Service Desk · SLA clock running": "Ügyfélszolgálat · SLA óra fut",
  REQUESTS: "KÉRELMEK", "New Request": "Új kérelem", Details: "Részletek",
  "Dates, shift, coverage plan…": "Dátumok, műszak, helyettesítés…",
  "Item, quantity, needed by…": "Tétel, mennyiség, határidő…",
  "Dock, date, time window…": "Rámpa, dátum, idősáv…",
  "Reference, what happened, urgency…": "Hivatkozás, mi történt, sürgősség…",
  "Submit request →": "Kérelem beküldése →", "Filed as": "Rögzítve:", "routed to shift lead": "továbbítva a műszakvezetőnek",
  "Open Queue": "Nyitott sor", "breaching SLA": "SLA-t sért",
  Ref: "Hiv.", "Type / Detail": "Típus / Részlet", Requester: "Kérelmező", You: "Ön",
  PENDING: "FÜGGŐBEN", "IN REVIEW": "ELBÍRÁLÁS ALATT", "BREACHING SLA": "SLA-T SÉRT",
  "People Index": "Munkatársak", "on roster": "a névsorban", DIRECTORY: "NÉVJEGYZÉK",
  "Name or role…": "Név vagy beosztás…", All: "Mind",
  "Name / Role": "Név / Beosztás", Department: "Részleg", Shift: "Műszak", Contact: "Elérhetőség",
  "No matches — adjust the filter or search.": "Nincs találat — módosítsa a szűrőt vagy a keresést.",
  "Warehouse Lead": "Raktárvezető", "Dispatch Coordinator": "Diszpécser koordinátor", "HSE Manager": "EBK vezető",
  "Shift Supervisor": "Műszakvezető", "Customs Broker": "Vámügynök", "Fleet Controller": "Flottairányító",
  "Cold Chain Planner": "Hűtőlánc-tervező", "Yard Marshal": "Udvarfelelős", "People Partner": "HR partner",
  "Terminal B": "B terminál", "Warehouse A": "A raktár", "Cold Chain": "Hűtőlánc", Transport: "Szállítás",
  Compliance: "Megfelelőség", HR: "HR", Safety: "Biztonság", Yard: "Udvar",
};

export function useT() {
  const l = useSyncExternalStore(subscribe, () => lang, () => "en" as Lang);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if ((saved === "hu" || saved === "en") && saved !== lang) setLang(saved);
    } catch {}
  }, []);
  const t = (s: string) => (l === "hu" ? hu[s] ?? s : s);
  return { t, lang: l };
}
