import { createFileRoute, Link } from "@tanstack/react-router";
import { COUNTRIES } from "@/lib/destinations";
import { getCountryCover } from "@/lib/imageRegistry";
import { ArrowRight } from "lucide-react";
import { useState } from "react";


export const Route = createFileRoute("/destinations/")({
  head: () => ({
    meta: [
      { title: "Destinations — Altis Voyage" },
      { name: "description", content: "Explore curated tours across 12 countries — Bali, Thailand, Maldives, Nepal, Sri Lanka, Bodh Gaya and more." },
      { property: "og:title", content: "Destinations — Altis Voyage" },
      { property: "og:description", content: "12 countries. Hundreds of places. Crafted by Altis Voyage." },
    ],
  }),
  component: Destinations,
});

const FILTERS = ["All", "South Asia", "Southeast Asia", "India", "Pilgrimage"] as const;

function Destinations() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const list = filter === "All" ? COUNTRIES : COUNTRIES.filter((c) => c.region === filter);

  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80&auto=format&fit=crop" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-foreground/55" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-background">
          <p className="text-gold tracking-widest text-sm uppercase font-medium">✦ Explore the world</p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl font-bold">Our Destinations</h1>
          <p className="mt-4 max-w-xl text-background/85">Hand-picked countries, real local knowledge, and itineraries designed around you.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-5 py-2 text-sm font-medium border transition ${filter === f ? "bg-primary text-primary-foreground border-primary" : "border-border bg-card text-foreground/70 hover:border-primary hover:text-primary"}`}>
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <Link key={c.slug} to="/destinations/$country" params={{ country: c.slug }} className="group rounded-2xl overflow-hidden bg-card shadow-soft hover-lift border border-border block">
              <div className="aspect-[5/3] overflow-hidden">
                <img src={getCountryCover(c.slug)} alt={c.name} className="h-full w-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-semibold">{c.flag} {c.name}</h3>
                  <span className="text-xs rounded-full bg-secondary px-3 py-1 text-secondary-foreground">{c.places.length} places</span>
                </div>
                <p className="mt-2 text-xs text-primary font-medium uppercase tracking-wider">{c.region}</p>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{c.overview}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore <ArrowRight size={14} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
