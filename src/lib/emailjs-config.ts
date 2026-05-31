// EmailJS configuration
// Reads from Vite env when available, otherwise uses hardcoded fallbacks.
export const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_4l13w2j",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_27vk3qp",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "PDriKzNKWFezlLpMf",
  toEmail: "management@altisvoyage.com",
};
export const WHATSAPP_NUMBER = "919986400886";
