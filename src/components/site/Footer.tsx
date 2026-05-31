import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import companyLogo from "@/assets/generic/company_footer.png";

export function Footer() {
  return (
    <footer className="mt-24 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div>
          
          <div className="flex items-center gap-3">
            <img
              src={companyLogo}
              alt="Altis Voyage"
              className="h-14 w-auto rounded"
            />
            <span className="font-display text-2xl font-bold">
              Altis Voyage
            </span>
          </div>

          <p className="mt-3 text-sm text-background/70 leading-relaxed">
            Premium travel curated from the heart of Bihar. Crafting unforgettable journeys across Asia and beyond since day one.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/destinations" className="hover:text-gold">Destinations</Link></li>
            <li><Link to="/packages" className="hover:text-gold">Packages</Link></li>
            <li><Link to="/services" className="hover:text-gold">Services</Link></li>
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li className="flex gap-2 items-start"><MapPin size={16} className="mt-0.5 text-gold" /><span>Gaya, Bihar, India</span></li>
            <li className="flex gap-2 items-start"><Phone size={16} className="mt-0.5 text-gold" /><span>+91 99864 00886</span></li>
            <li className="flex gap-2 items-start"><Mail size={16} className="mt-0.5 text-gold" /><span>management@altisvoyage.com</span></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Follow</h4>
          <div className="flex gap-3">
            <a href="https://www.instagram.com/altis_voyage?igsh=OGVidWFwaWc1cmxk&utm_source=qr" aria-label="Instagram" className="p-2 rounded-full border border-background/20 hover:bg-gold hover:text-gold-foreground transition"><Instagram size={18} /></a>
          {/*   <a href="#" aria-label="Facebook" className="p-2 rounded-full border border-background/20 hover:bg-gold hover:text-gold-foreground transition"><Facebook size={18} /></a>  */}
          </div>
        </div>
      </div>
      <div className="border-t border-background/10 py-6 text-center text-xs text-background/60">
        © {new Date().getFullYear()} Altis Voyage. All rights reserved.
      </div>
    </footer>
  );
}
