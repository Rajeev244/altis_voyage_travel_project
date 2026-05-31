import { createFileRoute, Link } from "@tanstack/react-router";
import { COUNTRIES } from "@/lib/destinations";
import { getCountryCover } from "@/lib/imageRegistry";
import { ArrowRight, Star, Shield, Globe2, HeartHandshake, MapPin } from "lucide-react";
import { WHATSAPP_URL } from "@/components/site/WhatsAppButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Altis Voyage — Premium Travel from Gaya, Bihar" },
      { name: "description", content: "Your Journey. Our Passion. Curated international tours, pilgrimage journeys and bespoke getaways across Asia." },
      { property: "og:title", content: "Altis Voyage — Premium Travel" },
      { property: "og:description", content: "Curated tours across Bali, Thailand, Maldives, Nepal, Sri Lanka and beyond." },
    ],
  }),
  component: Home,
});

const WHY = [
  { icon: Shield, title: "Trusted Locally", text: "Gaya-based with on-ground expertise across South & Southeast Asia." },
  { icon: Globe2, title: "12+ Destinations", text: "From Bali beaches to Bodh Gaya temples — handcrafted itineraries." },
  { icon: HeartHandshake, title: "Personal Touch", text: "Every trip designed around your pace, budget and interests." },
  { icon: Star, title: "5-Star Service", text: "Premium stays, vetted guides and 24×7 WhatsApp support." },
];

const TESTIMONIALS = [
  { name: "Rahul Sharma", flag: "🇮🇳", text: "Our Bali honeymoon was flawless. Every detail from villas to private dinners was perfect." },
  { name: "Priya Mehta", flag: "🇮🇳", text: "The Bodh Gaya pilgrimage was deeply moving. Altis Voyage took care of everything." },
  { name: "Karan Singh", flag: "🇮🇳", text: "Thailand with my family — kids loved it, parents loved it. 10/10 service." },
];

function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80&auto=format&fit=crop" alt="Tropical paradise" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 md:py-44 text-background">
          <p className="text-gold font-medium tracking-widest text-sm uppercase animate-fade-up">✦ Premium Travel from Bihar</p>
          <h1 className="mt-4 font-display text-4xl sm:text-6xl md:text-7xl font-bold leading-tight max-w-3xl animate-fade-up">
            Your Journey.<br />Our Passion.
          </h1>
          <p className="mt-6 max-w-xl text-base sm:text-lg text-background/85 animate-fade-up">
            Handcrafted holidays, pilgrimage circuits and bespoke escapes across Asia — curated by travel experts from the heart of Gaya, Bihar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up">
            <Link to="/destinations" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition">
              Explore Destinations <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-gold text-gold px-7 py-3 font-semibold hover:bg-gold hover:text-gold-foreground transition">
              Get a Custom Quote
            </Link>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">Why travel with us</h2>
          <p className="mt-3 text-muted-foreground">Real people, real expertise, real journeys — backed by an obsessive eye for detail.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w) => (
            <div key={w.title} className="rounded-2xl bg-card p-6 shadow-soft hover-lift border border-border">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <w.icon size={22} />
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">{w.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED DESTINATIONS */}
      <section className="bg-secondary/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold">Featured destinations</h2>
              <p className="mt-2 text-muted-foreground">12 countries. Hundreds of places. One trusted partner.</p>
            </div>
            <Link to="/destinations" className="text-primary font-semibold hover:underline inline-flex items-center gap-1">View all <ArrowRight size={16} /></Link>
          </div>
          <div className="mt-10 flex gap-5 overflow-x-auto pb-4 no-scrollbar snap-x">
            {COUNTRIES.map((c) => (
              <Link key={c.slug} to="/destinations/$country" params={{ country: c.slug }} className="group min-w-[260px] sm:min-w-[300px] snap-start rounded-2xl overflow-hidden bg-card shadow-soft hover-lift border border-border">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={getCountryCover(c.slug)} alt={c.name} className="h-full w-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-semibold">{c.flag} {c.name}</h3>
                    <span className="text-xs text-muted-foreground">{c.places.length} places</span>
                  </div>
                  <p className="mt-1 text-xs text-primary font-medium">{c.region}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">Loved by travellers</h2>
          <p className="mt-3 text-muted-foreground">Real reviews from real journeys.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-2xl bg-card p-6 shadow-soft border border-border">
              <div className="flex gap-1 text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
              <p className="mt-4 text-sm text-foreground/80 leading-relaxed">"{t.text}"</p>
              <p className="mt-4 font-semibold">{t.flag} {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHATSAPP CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-10 md:p-14 text-primary-foreground text-center shadow-lift">
          <MapPin className="mx-auto text-gold" size={32} />
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold">Ready to start your journey?</h2>
          <p className="mt-3 text-primary-foreground/85 max-w-xl mx-auto">Tell us your dream — beach, mountain, temple or city — and we'll handcraft it.</p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 font-semibold text-gold-foreground hover:opacity-90 transition">Plan My Trip</Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-background/40 text-background px-7 py-3 font-semibold hover:bg-background/10 transition">WhatsApp Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}
