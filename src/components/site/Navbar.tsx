import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import companyLogo from "@/assets/generic/company_logo.jpeg";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/destinations", label: "Destinations" },
  { to: "/packages", label: "Packages" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },

] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        
        
        <Link to="/" className="flex items-center gap-3">
          <img
              src={companyLogo}
              alt="Altis Voyage"
              className="h-14 w-auto rounded"
          />
          <span className="font-display text-xl font-bold text-primary">
            Altis Voyage
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>
              {l.label}
            </Link>
          ))}
          <Link to="/contact" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition">Book Now</Link>
        </nav>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {NAV.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="px-3 py-2 rounded text-sm font-medium hover:bg-accent" activeProps={{ className: "bg-accent text-primary" }}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
