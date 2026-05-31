import { createFileRoute } from "@tanstack/react-router";
import { Plane, Landmark, Hotel, Bus } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Altis Voyage" },
      { name: "description", content: "International tours, pilgrimage circuits, hotel & homestay bookings and transport rentals from Gaya." },
      { property: "og:title", content: "Services — Altis Voyage" },
      { property: "og:description", content: "Everything you need for a perfect trip — under one roof." },
    ],
  }),
  component: Services,
});

const SERVICES = [
  { icon: Plane, title: "International Tours", text: "Hand-built itineraries across 12+ countries — Bali, Thailand, Maldives, Singapore, Sri Lanka and more. Premium stays, vetted local guides and 24×7 WhatsApp support." },
  { icon: Landmark, title: "Pilgrimage Tours", text: "Bodh Gaya, Varanasi, Nepal Buddhist circuit, Char Dham and Pind Daan rituals — all handled by our in-house priests and Gaya specialists." },
  { icon: Hotel, title: "Hotel & Homestay Booking", text: "Best rates on 3⭐ to 5⭐ hotels worldwide, plus authentic homestays for the most local experience. Same-day confirmations." },
  { icon: Bus, title: "Transport Rental", text: "Sedan, Innova, Tempo Traveller (12/17), 25, 35 and 45-seater buses for domestic tours, weddings and corporate travel. Verified drivers." },
];

const FLEET = [
  { seats: "4", type: "Sedan / SUV" },
  { seats: "7", type: "Innova / Ertiga" },
  { seats: "12", type: "Tempo Traveller" },
  { seats: "18", type: "Mini Coach" },
  { seats: "25", type: "Mini Bus" },
  { seats: "35", type: "Coach" },
  { seats: "45", type: "Luxury Bus" },
];

function Services() {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 via-background to-gold/10 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold tracking-widest text-sm uppercase font-medium">✦ What we offer</p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl font-bold">Our Services</h1>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">From a single hotel booking to a 21-day Asian odyssey — we do it all.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s) => (
            <div key={s.title} className="rounded-2xl bg-card p-7 border border-border shadow-soft hover-lift">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><s.icon size={22} /></div>
              <h3 className="mt-4 font-display text-2xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-foreground/75 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-center">Our transport fleet</h2>
          <p className="text-center text-muted-foreground mt-2">Verified drivers • GPS tracked • Insured</p>
          <div className="mt-10 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-7">
            {FLEET.map((f) => (
              <div key={f.seats} className="rounded-2xl bg-card p-5 text-center border border-border shadow-soft hover-lift">
                <p className="font-display text-3xl font-bold text-primary">{f.seats}</p>
                <p className="text-xs text-muted-foreground">seats</p>
                <p className="mt-2 text-sm font-medium">{f.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
