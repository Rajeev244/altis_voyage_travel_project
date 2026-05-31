import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { EMAILJS, WHATSAPP_NUMBER } from "@/lib/emailjs-config";
import { COUNTRIES } from "@/lib/destinations";
import { Send, Loader2, MessageCircle } from "lucide-react";
import { FaWhatsapp} from "react-icons/fa";

const isEmbeddedPreview = () => {
  try {
    return window.top !== window;
  } catch {
    return true;
  }
};

// Build a flat option list: each country + each place inside it.
const DESTINATION_OPTIONS: { group: string; options: string[] }[] = COUNTRIES.map((c) => ({
  group: `${c.flag} ${c.name}`,
  options: [`${c.name} (any place)`, ...c.places.map((p) => `${p.name}, ${c.name}`)],
}));

export function ContactForm({ defaultMessage = "", defaultDestination = "" }: { defaultMessage?: string; defaultDestination?: string }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", destination: defaultDestination, message: defaultMessage });
  const [loading, setLoading] = useState(false);
  const [manualWhatsAppUrl, setManualWhatsAppUrl] = useState<string | null>(null);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value });

  const buildWaUrl = (f: typeof form) => {
    const params = new URLSearchParams({
      phone: WHATSAPP_NUMBER,
      text: `Hi Altis Voyage! My name is ${f.name || "(guest)"} and I am interested in a tour to ${f.destination || "your destinations"}. Please contact me.\n\nEmail: ${f.email}\nPhone: ${f.phone}\n\n${f.message}`,
    });

    return `https://api.whatsapp.com/send?${params.toString()}`;
  };

  const openWhatsApp = (waUrl: string) => {
    if (isEmbeddedPreview()) {
      setManualWhatsAppUrl(waUrl);
      toast.message("WhatsApp auto-open is blocked in preview mode. Please use the button below to open WhatsApp.");
      return;
    }

    const popup = window.open(waUrl, "_blank", "noopener,noreferrer");
    if (popup) {
      setManualWhatsAppUrl(null);
      return;
    }

    setManualWhatsAppUrl(waUrl);
    toast.message("WhatsApp did not open automatically. Please use the button below to open WhatsApp.");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const waUrl = buildWaUrl(form);

    const configured = EMAILJS.publicKey && !EMAILJS.publicKey.startsWith("YOUR_");
    try {
      if (configured) {
        await emailjs.send(
          EMAILJS.serviceId,
          EMAILJS.templateId,
          {
            to_email: EMAILJS.toEmail,
            from_name: form.name,
            from_email: form.email,
            phone: form.phone,
            destination: form.destination,
            message: form.message,
          },
          { publicKey: EMAILJS.publicKey }
        );
        toast.success("Thank you! We will contact you within 24 hours.");
        setForm({ name: "", email: "", phone: "", destination: "", message: "" });
      } else {
        toast.message("Email service not configured.");
      }
      // openWhatsApp(waUrl);
    } catch (err) {
      console.error("EmailJS error:", err);
      const message = err instanceof Error ? err.message : String(err);
      if (/service id not found/i.test(message)) {
       toast.error("Email service configuration error.");
      } else {
        toast.error("Failed to send email. Please try again");
      }
     // openWhatsApp(waUrl);
    } finally {
      setLoading(false);
    }
  };

  const input = "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition";
  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input required placeholder="Your name" value={form.name} onChange={update("name")} className={input} />
        <input required type="email" placeholder="Email address" value={form.email} onChange={update("email")} className={input} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input required placeholder="Phone / WhatsApp" value={form.phone} onChange={update("phone")} className={input} />
        <select value={form.destination} onChange={update("destination")} className={input}>
          <option value="">— Destination of interest —</option>
          {/* If the prefilled destination doesn't match any option, still show it. */}
          {form.destination && !DESTINATION_OPTIONS.some((g) => g.options.includes(form.destination)) && (
            <option value={form.destination}>{form.destination}</option>
          )}
          {DESTINATION_OPTIONS.map((grp) => (
            <optgroup key={grp.group} label={grp.group}>
              {grp.options.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </optgroup>
          ))}
          <option value="Other / Custom trip">Other / Custom trip</option>
        </select>
      </div>
      <textarea required rows={5} placeholder="Tell us about your dream trip…" value={form.message} onChange={update("message")} className={input} />
      <div className="flex flex-wrap gap-3">
        <button disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition disabled:opacity-60 min-h-[44px]">
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
          {loading ? "Sending…" : "Send Enquiry"}
        </button>
        <a
          href={buildWaUrl(form)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#25D366] text-[#25D366] px-7 py-3 font-semibold hover:bg-[#25D366] hover:text-white transition min-h-[44px]"
        >
          <FaWhatsapp size={18} /> WhatsApp directly
        </a>
      </div>
      {manualWhatsAppUrl ? (
        <a
          href={manualWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 text-sm font-medium text-primary underline underline-offset-4"
        >
          <MessageCircle size={16} /> Open WhatsApp manually
        </a>
      ) : null}
    </form>
  );
}
