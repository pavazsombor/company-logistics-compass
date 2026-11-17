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
  // Public website
  "Website →": "Weboldal →", "Intranet →": "Intranet →",
  Home: "Főoldal", About: "Rólunk", "Contact Us": "Kapcsolat",
  "Freight forwarding & contract logistics": "Fuvarszervezés és szerződéses logisztika",
  "Freight forwarding · Budapest, HU": "Fuvarszervezés · Budapest, HU",
  "YOUR CARGO,": "AZ ÁRUJA,", "ON SCHEDULE.": "PONTOSAN.",
  "TechLogix moves freight across Europe by road, sea and air — with warehousing, customs and a dispatch team that answers around the clock.":
    "A TechLogix közúton, vízen és légi úton szállít árut egész Európában — raktározással, vámügyintézéssel és egy éjjel-nappal elérhető diszpécsercsapattal.",
  "Request a quote →": "Árajánlat kérése →", "About us": "Rólunk",
  "On-time delivery": "Pontos kiszállítás", "Countries served": "Ország", "Partner ports": "Partnerkikötő", "Dispatch coverage": "Diszpécser-lefedettség",
  "What we do": "Amiben segítünk", SERVICES: "SZOLGÁLTATÁSOK",
  "Road Freight": "Közúti fuvarozás",
  "FTL and LTL trucking across the EU with daily departures and live ETA updates.":
    "FTL és LTL közúti fuvarok az EU-ban, napi indulásokkal és élő ETA-követéssel.",
  "Sea & Air Freight": "Tengeri és légi fuvarozás",
  "FCL/LCL ocean and priority air cargo through our partner network at 40+ ports.":
    "FCL/LCL tengeri és elsőbbségi légi fuvarok 40+ kikötői partnerhálózatunkon keresztül.",
  Warehousing: "Raktározás",
  "12,000 m² of bonded and cold-chain storage with WMS-tracked inventory.":
    "12 000 m² vámraktári és hűtőláncos tárolás WMS-nyilvántartott készlettel.",
  "Customs Handling": "Vámügyintézés",
  "In-house customs brokerage: import, export and transit documentation done for you.":
    "Házi vámügynökség: import, export és tranzit okmányok teljes körű intézése.",
  "READY TO SHIP?": "KÉSZÜLJÖN AZ INDULÁSRA?",
  "Send us your route and cargo details — we reply with a quote within one business day.":
    "Küldje el az útvonalat és az áru adatait — egy munkanapon belül árajánlattal válaszolunk.",
  "Contact us →": "Kapcsolat →",
  "About the company": "A cégről",
  "BUILT ON THE DOCK,": "A RÁMPÁRÓL NŐTTÜNK KI,",
  "NOT IN A BOARDROOM.": "NEM AZ IRODÁBÓL.",
  "TechLogix Kft. started in 2011 as a two-truck hauler in Budapest. Today we run road, sea and air freight, 12,000 m² of warehousing and an in-house customs desk — serving importers, manufacturers and retailers in 14 European countries.":
    "A TechLogix Kft. 2011-ben indult két teherautóval Budapesten. Ma közúti, tengeri és légi fuvarozást, 12 000 m² raktározást és saját vámügyintézést üzemeltetünk — importőröket, gyártókat és kereskedőket szolgálva ki 14 európai országban.",
  MILESTONES: "MÉRFÖLDKÖVEK",
  "Founded in Budapest with two trucks and a leased warehouse bay.": "Alapítás Budapesten, két teherautóval és egy bérelt raktárrésszel.",
  "Opened Terminal B cross-dock and launched scheduled EU linehauls.": "B terminál cross-dock megnyitása, menetrend szerinti EU távolsági járatok indítása.",
  "Added bonded warehousing and in-house customs brokerage.": "Vámraktározás és saját vámügynökség beindítása.",
  "Cold-chain division launched; fleet passed 60 units.": "Hűtőláncos üzletág indítása; a flotta meghaladta a 60 egységet.",
  "HOW WE WORK": "AHOGY DOLGOZUNK",
  Reliability: "Megbízhatóság",
  "We measure ourselves on on-time delivery, not promises. 98.6% and audited monthly.":
    "A pontos kiszállításban mérjük magunkat, nem az ígéretekben. 98,6%, havonta auditálva.",
  Transparency: "Átláthatóság",
  "Live ETAs, honest delays, no hidden surcharges. You see what our dispatchers see.":
    "Élő ETA-k, őszinte késések, rejtett felárak nélkül. Ön is azt látja, amit a diszpécsereink.",
  "Care for cargo": "Gondos árukezelés",
  "From pallets to pharma cold chain, every shipment gets the handling its contents demand.":
    "A raklapoktól a gyógyszer-hűtőláncig minden szállítmány a tartalmának megfelelő kezelést kapja.",
  "Want to work with a forwarder that treats your cargo like its own?":
    "Szeretne olyan fuvarszervezővel dolgozni, amely úgy bánik az árujával, mintha a sajátja lenne?",
  "Get in touch →": "Kapcsolatfelvétel →",
  "Contact · Quote requests": "Kapcsolat · Árajánlatkérés",
  "LET'S MOVE": "MOZDISSUK MEG", "YOUR FREIGHT.": "AZ ÁRUJÁT.",
  Name: "Név", Email: "E-mail", Company: "Cég", Message: "Üzenet",
  "Your full name": "Az Ön teljes neve", "Company name (optional)": "Cégnév (nem kötelező)",
  "Route, cargo type, volume, timeline…": "Útvonal, árutípus, mennyiség, határidő…",
  "Send message →": "Üzenet küldése →",
  "Please enter your name.": "Kérjük, adja meg a nevét.",
  "Please enter a valid email address.": "Kérjük, adjon meg egy érvényes e-mail címet.",
  "Please describe your shipment or question (min. 10 characters).": "Kérjük, írja le a szállítmányt vagy a kérdését (min. 10 karakter).",
  "MESSAGE RECEIVED.": "ÜZENET MEGÉRKEZETT.",
  "Thanks for reaching out — our team will reply within one business day.":
    "Köszönjük megkeresését — csapatunk egy munkanapon belül válaszol.",
  "Send another message": "Új üzenet küldése",
  "Reach us directly": "Közvetlen elérhetőség",
  "Head Office": "Központ", "Dispatch (24/7)": "Diszpécser (0-24)",
  "Response Time": "Válaszidő", "within 1 business day": "1 munkanapon belül",
  "Opening hours": "Nyitvatartás",
  "Office: Mon–Fri 08:00–17:00": "Iroda: H–P 08:00–17:00",
  "Dispatch & warehouse: 24/7": "Diszpécser és raktár: 0-24",
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
