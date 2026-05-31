import { createFileRoute, Link } from "@tanstack/react-router";

import { getCountryCover } from "@/lib/imageRegistry";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Tour Packages — Altis Voyage" },
      { name: "description", content: "Curated holiday packages across Asia — beach, pilgrimage, adventure, cultural & honeymoon trips." },
      { property: "og:title", content: "Tour Packages — Altis Voyage" },
      { property: "og:description", content: "All-inclusive trips with premium stays and vetted guides." },
    ],
  }),
  component: Packages,
});

// NOTE: package imagery is sourced from the centralized image registry via
// `getCountryCover(countrySlug)` — change the image once in
// `src/lib/imageRegistry.ts` and every package card here updates automatically.
type Pkg = { id: string; title: string; country: string; countrySlug: string; nights: number; price: number; type: string; highlights: string[] };

const PACKAGES: Pkg[] = [
  { id: "p1", title: "Bali Beach & Culture",        country: "Indonesia",          countrySlug: "bali",      nights: 6, price: 54999,  type: "Beach",      highlights: ["Ubud + Seminyak", "Private villa stay", "Mount Batur sunrise"] },
  { id: "p2", title: "Thailand Island Escape",      country: "Thailand",           countrySlug: "thailand",  nights: 7, price: 62000,  type: "Beach",      highlights: ["Phi Phi Islands", "Bangkok shopping", "James Bond Island"] },
  { id: "p3", title: "Bodh Gaya Pilgrimage",        country: "India",              countrySlug: "bodh-gaya", nights: 3, price: 14999,  type: "Pilgrimage", highlights: ["Mahabodhi Temple", "Bodhi Tree meditation", "Vishnupad Temple"] },
  { id: "p4", title: "Singapore + Malaysia Twin",   country: "Singapore/Malaysia", countrySlug: "singapore", nights: 6, price: 71000,  type: "Cultural",   highlights: ["Marina Bay Sands", "Universal Studios", "KL Twin Towers"] },
  { id: "p5", title: "Maldives Honeymoon",          country: "Maldives",           countrySlug: "maldives",  nights: 5, price: 109000, type: "Honeymoon",  highlights: ["Overwater villa", "Sunset cruise", "Private dinner"] },
  { id: "p6", title: "Nepal Himalaya Adventure",    country: "Nepal",              countrySlug: "nepal",     nights: 8, price: 48000,  type: "Adventure",  highlights: ["Pokhara lake", "Annapurna views", "Pashupatinath Temple"] },
  { id: "p7", title: "Sri Lanka Cultural Triangle", country: "Sri Lanka",          countrySlug: "sri-lanka", nights: 7, price: 56000,  type: "Cultural",   highlights: ["Sigiriya climb", "Kandy temple", "Mirissa whales"] },
  { id: "p8", title: "Andaman Island Dream",        country: "Andaman",            countrySlug: "andaman",   nights: 6, price: 52000,  type: "Beach",      highlights: ["Radhanagar Beach", "Cellular Jail", "Snorkelling"] },
  { id: "p9", title: "Vietnam Heritage Journey",    country: "Vietnam",            countrySlug: "vietnam",   nights: 8, price: 64000,  type: "Cultural",   highlights: ["Ha Long Bay cruise", "Hoi An lanterns", "Mekong Delta"] },
];



const TYPES = ["All", "Beach", "Pilgrimage", "Adventure", "Cultural", "Honeymoon"] as const;

function Packages() {
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const [country, setCountry] = useState<string>("All");
  const filtered = useMemo(() => PACKAGES.filter((p) => (type === "All" || p.type === type) && (country === "All" || p.country === country)), [type, country]);
  const countries = ["All", ...Array.from(new Set(PACKAGES.map((p) => p.country)))];

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 via-background to-gold/10 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold font-medium tracking-widest text-sm uppercase">✦ All-inclusive</p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl font-bold">Holiday Packages</h1>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">Premium stays, transfers, guided experiences and our 24×7 support — bundled into one easy price.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button key={t} onClick={() => setType(t)} className={`rounded-full px-4 py-2 text-sm font-medium border transition ${type === t ? "bg-primary text-primary-foreground border-primary" : "border-border bg-card text-foreground/70 hover:border-primary"}`}>{t}</button>
            ))}
          </div>
          <select value={country} onChange={(e) => setCountry(e.target.value)} className="ml-auto rounded-full border border-border bg-card px-4 py-2 text-sm">
            {countries.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <div key={p.id} className="rounded-2xl overflow-hidden bg-card border border-border shadow-soft hover-lift flex flex-col">
              <Link to="/contact" search={{ destination: `${p.title} — ${p.country}` }} className="block group">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={getCountryCover(p.countrySlug)} alt={p.title} className="h-full w-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
                  <span className="absolute top-3 left-3 rounded-full bg-gold text-gold-foreground text-xs font-bold px-3 py-1">{p.type}</span>
                </div>
              </Link>
              <div className="p-5 flex flex-col flex-1">
                <Link to="/contact" search={{ destination: `${p.title} — ${p.country}` }} className="hover:text-primary transition">
                  <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                </Link>
                <p className="mt-1 text-xs text-muted-foreground flex items-center gap-3">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {p.country}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {p.nights}N / {p.nights + 1}D</span>
                </p>
                <ul className="mt-3 space-y-1 text-sm text-foreground/75">
                  {p.highlights.map((h) => <li key={h} className="flex gap-2"><span className="text-primary">✓</span>{h}</li>)}
                </ul>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">From</p>
                    <p className="font-display text-2xl font-bold text-primary">₹{p.price.toLocaleString("en-IN")}</p>
                  </div>
                  <Link to="/contact" search={{ destination: `${p.title} — ${p.country}` }} className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition">Enquire <ArrowRight size={14} /></Link>
                </div>
              </div>
            </div>
          ))}

        </div>

        {filtered.length === 0 && <p className="text-center text-muted-foreground py-12">No packages match — try changing filters.</p>}
      </section>
    </div>
  );
}
