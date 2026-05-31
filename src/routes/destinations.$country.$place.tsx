import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPlace, getCountryBySlug, placeNameToSlug, type Country, type PlaceDetail } from "@/lib/destinations";
import { getPlaceHero, getPlaceGallery } from "@/lib/imageRegistry";
import { Clock, Calendar, Mountain, IndianRupee, Plane, Train, Bus, Car, Check, Utensils, Activity, ShoppingBag, MapPin } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";


export const Route = createFileRoute("/destinations/$country/$place")({
  loader: ({ params }) => {
    const result = getPlace(params.country, params.place);
    const country = getCountryBySlug(params.country);
    if (!result || !country) throw notFound();
    return { place: result.place, country };
  },
  head: ({ loaderData, params }) => ({
    meta: [
      { title: `${loaderData?.place.name} — ${loaderData?.place.country} | Altis Voyage` },
      { name: "description", content: loaderData?.place.tagline ?? "" },
      { property: "og:title", content: `${loaderData?.place.name} — Altis Voyage` },
      { property: "og:description", content: loaderData?.place.tagline ?? "" },
      { property: "og:image", content: getPlaceHero(params.country, params.place) },
    ],
  }),
  component: PlacePage,
});


function PlacePage() {
  const { place, country } = Route.useLoaderData() as { place: PlaceDetail; country: Country };
  const placeSlug = placeNameToSlug(place.name);
  const heroImage = getPlaceHero(country.slug, placeSlug);
  const gallery = getPlaceGallery(country.slug, placeSlug);
  const waMsg = `https://wa.me/919986400886?text=${encodeURIComponent(`Hi Altis Voyage! I want to visit ${place.name} in ${country.name}. Please send me tour details.`)}`;


  return (
    <div>
      {/* HERO */}
      <section className="relative isolate overflow-hidden min-h-[60vh] flex items-end">
        <div className="absolute inset-0 -z-10">
          <img src={heroImage} alt={place.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-foreground/30" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-background w-full">
          <nav className="text-xs text-background/70 mb-3">
            <Link to="/" className="hover:text-gold">Home</Link> / <Link to="/destinations" className="hover:text-gold">Destinations</Link> / <Link to="/destinations/$country" params={{ country: country.slug }} className="hover:text-gold">{country.name}</Link> / <span className="text-background">{place.name}</span>
          </nav>
          <p className="text-gold uppercase tracking-widest text-xs font-medium">{country.flag} {country.name}</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl md:text-6xl font-bold max-w-3xl">{place.name}</h1>
          <p className="mt-3 text-base sm:text-lg text-background/85 italic max-w-2xl">"{place.tagline}"</p>
        </div>
      </section>

      {/* QUICK INFO */}
      <section className="bg-card border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Clock, label: "Duration", value: place.duration },
            { icon: Calendar, label: "Best Time", value: place.bestTimeToVisit.months },
            { icon: IndianRupee, label: "Entry", value: place.entryFee.indian },
            { icon: Mountain, label: "Difficulty", value: place.difficulty },
          ].map((q) => (
            <div key={q.label} className="flex items-start gap-3">
              <q.icon size={20} className="text-primary mt-1" />
              <div>
                <p className="text-xs text-muted-foreground">{q.label}</p>
                <p className="text-sm font-semibold">{q.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">Photo gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {gallery.map((g, i) => (
            <a key={i} href={g} target="_blank" rel="noopener noreferrer" className={`relative overflow-hidden rounded-xl group ${i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square"}`}>
              <img src={g} alt={`${place.name} ${i + 1}`} className="h-full w-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
            </a>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-14">
        <h2 className="font-display text-3xl font-bold">About {place.name}</h2>
        <p className="mt-4 text-foreground/80 leading-relaxed whitespace-pre-line">{place.description}</p>
        <ul className="mt-8 grid sm:grid-cols-2 gap-3">
          {place.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm">
              <Check size={18} className="text-primary mt-0.5 shrink-0" /> <span>{h}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* PRACTICAL INFO */}
      <section className="bg-secondary/50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold mb-8">Practical information</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <Card title="Best Time to Visit">
              <span className="inline-block rounded-full bg-green-100 text-green-800 px-3 py-1 text-xs font-semibold">{place.bestTimeToVisit.months}</span>
              <p className="mt-3 text-sm text-foreground/80">{place.bestTimeToVisit.reason}</p>
              <p className="mt-3 text-xs"><span className="rounded-full bg-red-100 text-red-700 px-2 py-0.5 font-semibold">Avoid:</span> <span className="text-muted-foreground">{place.bestTimeToVisit.avoid}</span></p>
              <div className="mt-4 text-xs text-muted-foreground space-y-1">
                <p>☀️ Summer: {place.weather.summer}</p>
                <p>❄️ Winter: {place.weather.winter}</p>
                <p>🌧 Monsoon: {place.weather.monsoon}</p>
              </div>
            </Card>
            <Card title="How to Reach">
              <Row icon={Plane} label="By Air" text={place.howToReach.byAir} />
              <Row icon={Train} label="By Train" text={place.howToReach.byTrain} />
              <Row icon={Bus} label="By Road" text={place.howToReach.byRoad} />
              <Row icon={Car} label="Local" text={place.howToReach.localTransport} />
            </Card>
            <Card title="Entry & Timing">
              <p className="text-sm"><span className="font-semibold">Indian:</span> {place.entryFee.indian}</p>
              <p className="mt-2 text-sm"><span className="font-semibold">Foreign:</span> {place.entryFee.foreigner}</p>
              <p className="mt-2 text-xs text-muted-foreground">{place.entryFee.note}</p>
              <p className="mt-4 text-sm"><span className="font-semibold">Duration:</span> {place.duration}</p>
            </Card>
            <Card title="Travel Tips">
              <ul className="space-y-2">
                {place.travelTips.map((t) => (
                  <li key={t} className="text-sm text-foreground/80 flex gap-2"><span className="text-primary">•</span> {t}</li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* MUST TRY */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="font-display text-3xl font-bold mb-8">Must try in {place.name}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <MustCard icon={Utensils} title="Local Food" items={place.mustTry.food} />
          <MustCard icon={Activity} title="Activities" items={place.mustTry.activity} />
          <MustCard icon={ShoppingBag} title="Shopping" items={place.mustTry.shopping} />
        </div>
      </section>

      {/* NEARBY */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14">
        <h2 className="font-display text-3xl font-bold mb-6">Nearby attractions</h2>
        <div className="flex gap-4 overflow-x-auto pb-3 no-scrollbar snap-x">
          {place.nearbyPlaces.map((n, i) => {
            const matchingPlace = country.places.find((p) => p.name.toLowerCase().includes(n.toLowerCase().split(" ")[0]));
            const content = (
              <>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={gallery[i % gallery.length] ?? heroImage} alt={n} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{n}</h3>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><MapPin size={12} /> Near {place.name}</p>
                </div>
              </>
            );
            return matchingPlace ? (
              <Link key={n} to="/destinations/$country/$place" params={{ country: country.slug, place: placeNameToSlug(matchingPlace.name) }} className="min-w-[240px] snap-start rounded-2xl overflow-hidden bg-card border border-border shadow-soft hover-lift block">
                {content}
              </Link>
            ) : (
              <div key={n} className="min-w-[240px] snap-start rounded-2xl overflow-hidden bg-card border border-border shadow-soft hover-lift block">
                {content}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA + INLINE FORM */}
      <section className="bg-gradient-to-br from-primary to-primary/80 py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Want to visit {place.name}?</h2>
            <p className="mt-3 text-primary-foreground/85">Let us plan your perfect trip. Get a custom quote in 24 hours or chat with us on WhatsApp now.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href={waMsg} target="_blank" rel="noopener noreferrer" className="rounded-full bg-gold px-7 py-3 font-semibold text-gold-foreground text-center hover:opacity-90 transition">WhatsApp Us Now</a>
              <Link to="/contact" search={{ destination: `${place.name}, ${country.name}` }} className="rounded-full border border-background/40 text-background px-7 py-3 font-semibold text-center hover:bg-background/10 transition">Full Quote Form</Link>
            </div>
          </div>
          <div className="rounded-2xl bg-card text-foreground p-6 shadow-lift">
            <h3 className="font-display text-xl font-semibold mb-4">Quick enquiry</h3>
            <ContactForm defaultDestination={`${place.name}, ${country.name}`} defaultMessage={`I'm interested in visiting ${place.name}, ${country.name}.`} />

          </div>
        </div>
      </section>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-card p-5 shadow-soft border border-border">
      <h3 className="font-display text-lg font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}
function Row({ icon: Icon, label, text }: { icon: typeof Plane; label: string; text: string }) {
  return (
    <div className="flex gap-2 items-start mt-2 first:mt-0">
      <Icon size={16} className="text-primary mt-0.5 shrink-0" />
      <div className="text-xs"><span className="font-semibold">{label}:</span> <span className="text-foreground/75">{text}</span></div>
    </div>
  );
}
function MustCard({ icon: Icon, title, items }: { icon: typeof Utensils; title: string; items: string[] }) {
  return (
    <div className="rounded-2xl bg-card p-6 border border-border shadow-soft">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon size={20} /></div>
      <h3 className="mt-3 font-display text-xl font-semibold">{title}</h3>
      <ul className="mt-4 space-y-2">
        {items.map((it) => <li key={it} className="text-sm text-foreground/80 flex gap-2"><span className="text-gold">★</span>{it}</li>)}
      </ul>
    </div>
  );
}
