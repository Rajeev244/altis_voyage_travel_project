import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/site/ContactForm";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/components/site/WhatsAppButton";
import { FaWhatsapp } from "react-icons/fa";

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>) => ({
    destination: typeof s.destination === "string" ? s.destination : "",
  }),
  head: () => ({
    meta: [
      { title: "Contact — Altis Voyage" },
      { name: "description", content: "Talk to Altis Voyage. Call +91 99864 00886, email management@altisvoyage.com or visit us in Gaya, Bihar." },
      { property: "og:title", content: "Contact — Altis Voyage" },
      { property: "og:description", content: "We reply within 24 hours. WhatsApp 24×7." },
    ],
  }),
  component: Contact,
});


function Contact() {
  const { destination } = Route.useSearch();

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/10 via-background to-gold/10 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold tracking-widest text-sm uppercase font-medium">✦ Let's plan your trip</p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl font-bold">Get in touch</h1>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">Tell us your dream destination — we'll reply within 24 hours with a custom quote.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 rounded-2xl bg-card p-6 sm:p-8 border border-border shadow-soft">
          <h2 className="font-display text-2xl font-semibold mb-6">Send us an enquiry</h2>
          <ContactForm defaultDestination={destination} />
        </div>
        <aside className="space-y-4">
          <InfoCard icon={Phone} title="Call us" body="+91 99864 00886" href="tel:+919986400886" />
          <InfoCard icon={Mail} title="Email" body="management@altisvoyage.com" href="mailto:management@altisvoyage.com" />
          <InfoCard icon={MapPin} title="Visit us" body="Gaya, Bihar, India" />
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-[#25D366] text-white p-5 shadow-soft hover-lift">
            <FaWhatsapp size={22} />
            <div>
              <p className="text-xs opacity-80">Fastest reply</p>
              <p className="font-semibold">Chat on WhatsApp</p>
            </div>
          </a>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-2xl overflow-hidden border border-border shadow-soft">
          <iframe title="Altis Voyage Gaya" src="https://www.google.com/maps?q=Gaya,Bihar,India&output=embed" className="w-full h-[400px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
    </div>
  );
}

function InfoCard({ icon: Icon, title, body, href }: { icon: typeof Phone; title: string; body: string; href?: string }) {
  const Comp = (href ? "a" : "div") as "a";
  return (
    <Comp href={href} className="flex items-start gap-3 rounded-2xl bg-card p-5 border border-border shadow-soft hover-lift">
      <Icon size={20} className="text-primary mt-1" />
      <div>
        <p className="text-xs text-muted-foreground">{title}</p>
        <p className="font-semibold">{body}</p>
      </div>
    </Comp>
  );
}
