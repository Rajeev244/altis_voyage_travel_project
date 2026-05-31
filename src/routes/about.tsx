import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Altis Voyage" },
      { name: "description", content: "Premium travel company born in Gaya, Bihar. Our story, mission and the team behind every journey." },
      { property: "og:title", content: "About — Altis Voyage" },
      { property: "og:description", content: "Travel obsessives from Bihar crafting world-class journeys since day one." },
    ],
  }),
  component: About,
});

const TEAM = [
  { name: "Md. Sajid", role: "Founder & Tour Director", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80" },
  { name: "Ankit Kumar", role: "Operations Head", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "Priya Verma", role: "Customer Experience", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
  { name: "Rohit Singh", role: "Pilgrimage Specialist", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
];

const STATS = [
  { value: "12+", label: "Countries" },
  { value: "120+", label: "Destinations" },
  { value: "5,000+", label: "Happy Travellers" },
  { value: "24/7", label: "WhatsApp Support" },
];

function About() {
  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-foreground/55" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 text-background">
          <p className="text-gold uppercase text-sm tracking-widest font-medium">✦ Our story</p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl font-bold">Born in Bihar.<br />Built for the world.</h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 space-y-6 text-foreground/85 leading-relaxed">
        <p>Altis Voyage was founded in Gaya, Bihar by a group of travel-obsessed locals who believed Indian travellers deserved better — fewer cookie-cutter packages, more handcrafted journeys. We started with Bodh Gaya pilgrimage circuits and quickly grew into a full-service international tour company.</p>
        <p>Today we run premium tours across 12+ countries — but our soul is still in Bihar. Every itinerary is reviewed by a human who has actually been there. Every hotel is chosen because we'd stay there ourselves. And our 24×7 WhatsApp line means you're never more than one message away from a real person who cares.</p>
        <div className="grid sm:grid-cols-2 gap-6 pt-6">
          <div className="rounded-2xl bg-card p-6 border border-border shadow-soft">
            <h3 className="font-display text-xl font-semibold text-primary">Our Mission</h3>
            <p className="mt-2 text-sm">Make world-class travel accessible, personal, and genuinely joyful for every Indian family.</p>
          </div>
          <div className="rounded-2xl bg-card p-6 border border-border shadow-soft">
            <h3 className="font-display text-xl font-semibold text-primary">Our Vision</h3>
            <p className="mt-2 text-sm">To become Eastern India's most trusted name in curated international and pilgrimage travel by 2030.</p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl sm:text-5xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">Meet the team</h2>
          <p className="mt-3 text-muted-foreground">The humans behind your perfect trip.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m) => (
            <div key={m.name} className="rounded-2xl overflow-hidden bg-card border border-border shadow-soft hover-lift text-center">
              <div className="aspect-square overflow-hidden">
                <img src={m.img} alt={m.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-semibold">{m.name}</h3>
                <p className="text-xs text-primary uppercase tracking-wider mt-1">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
