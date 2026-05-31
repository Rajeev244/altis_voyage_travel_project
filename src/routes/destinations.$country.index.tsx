import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCountryBySlug, placeNameToSlug, type Country } from "@/lib/destinations";
import { getCountryCover, getPlaceHero } from "@/lib/imageRegistry";
import { ArrowRight, Clock, Mountain, Calendar } from "lucide-react";
import { WHATSAPP_URL } from "@/components/site/WhatsAppButton";

export const Route = createFileRoute("/destinations/$country/")({
  loader: ({ params }) => {
    const country = getCountryBySlug(params.country);
    if (!country) throw notFound();
    return { country };
  },
  head: ({ loaderData, params }) => ({
    meta: [
      { title: `${loaderData?.country.name} Tours — Altis Voyage` },
      { name: "description", content: `Discover the best of ${loaderData?.country.name}: ${loaderData?.country.places.map((p) => p.name).slice(0, 4).join(", ")} and more.` },
      { property: "og:title", content: `${loaderData?.country.name} — Altis Voyage` },
      { property: "og:description", content: loaderData?.country.overview.slice(0, 160) ?? "" },
      { property: "og:image", content: getCountryCover(params.country) },
    ],
  }),
  component: CountryPage,
});


function CountryPage() {
  const { country } = Route.useLoaderData() as { country: Country };
  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={getCountryCover(country.slug)} alt={country.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 to-foreground/70" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 md:py-40 text-background">
          <nav className="text-xs text-background/70 mb-4">
            <Link to="/" className="hover:text-gold">Home</Link> / <Link to="/destinations" className="hover:text-gold">Destinations</Link> / <span className="text-background">{country.name}</span>
          </nav>
          <h1 className="font-display text-4xl sm:text-6xl font-bold">{country.flag} {country.name}</h1>
          <p className="mt-3 text-gold text-sm tracking-widest uppercase font-medium">{country.region}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-lg text-foreground/80 leading-relaxed">{country.overview}</p>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="font-display text-3xl sm:text-4xl font-bold">Top places to visit</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {country.places.map((p) => (
            <Link key={p.id} to="/destinations/$country/$place" params={{ country: country.slug, place: placeNameToSlug(p.name) }} className="group rounded-2xl overflow-hidden bg-card shadow-soft hover-lift border border-border block">
              <div className="aspect-[5/3] overflow-hidden">
                <img src={getPlaceHero(country.slug, placeNameToSlug(p.name))} alt={p.name} className="h-full w-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-1 mb-2">
                  {p.category.slice(0, 3).map((c) => (
                    <span key={c} className="text-[10px] uppercase tracking-wider rounded-full bg-accent text-accent-foreground px-2 py-0.5">{c}</span>
                  ))}
                </div>
                <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.tagline}</p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {p.bestTimeToVisit.months.split(" ")[0]}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {p.duration}</span>
                  <span className="flex items-center gap-1"><Mountain size={12} /> {p.difficulty}</span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore Place <ArrowRight size={14} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-10 md:p-14 text-primary-foreground text-center shadow-lift">
          <h2 className="font-display text-3xl md:text-4xl font-bold">Plan your trip to {country.name}</h2>
          <p className="mt-3 text-primary-foreground/85 max-w-xl mx-auto">Get a tailor-made itinerary in under 24 hours.</p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link to="/contact" search={{ destination: `${country.name} (any place)` }} className="rounded-full bg-gold px-7 py-3 font-semibold text-gold-foreground hover:opacity-90 transition">Get a Quote</Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-background/40 text-background px-7 py-3 font-semibold hover:bg-background/10 transition">WhatsApp Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}
