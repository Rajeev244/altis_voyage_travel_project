export const WHATSAPP_URL =
  "https://wa.me/919986400886?text=Hi%20Altis%20Voyage%2C%20I%27d%20like%20to%20plan%20a%20trip.";

function WhatsAppIcon({ size = 30 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.11 17.21c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" />
      <path d="M26.78 5.22A13.93 13.93 0 0 0 16.02 1C8.28 1 1.99 7.29 1.98 15.02c0 2.47.65 4.88 1.88 7.01L1.86 31l9.18-2.41a14 14 0 0 0 6.97 1.78h.01c7.73 0 14.02-6.29 14.03-14.02a13.9 13.9 0 0 0-5.27-11.13zM16.02 28.06h-.01a11.65 11.65 0 0 1-5.93-1.63l-.42-.25-5.45 1.43 1.46-5.31-.28-.44a11.62 11.62 0 0 1-1.78-6.18c0-6.43 5.24-11.67 11.68-11.67 3.12 0 6.05 1.22 8.25 3.42a11.6 11.6 0 0 1 3.42 8.26c0 6.43-5.24 11.67-11.66 11.67z" />
    </svg>
  );
}

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift animate-pulse-ring hover:scale-110 transition-transform"
    >
      <WhatsAppIcon size={30} />
    </a>
  );
}
