import { Link } from "@tanstack/react-router";
import logo from "@/assets/held-logo.png";

export function SiteFooter() {
  return (
    <footer className="bg-brand-black text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <img src={logo} alt="Held" className="h-14 w-auto mb-3" />
          <p className="text-sm text-white/70">100% biker protection. Premium gear, helmets and accessories trusted by riders.</p>
        </div>
        <div>
          <h4 className="font-display uppercase text-sm tracking-widest mb-3 text-brand-yellow">Shop</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/store" className="hover:text-brand-red">Store</Link></li>
            <li><Link to="/outlet" className="hover:text-brand-red">Outlet</Link></li>
            <li><Link to="/brands" className="hover:text-brand-red">Brands</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display uppercase text-sm tracking-widest mb-3 text-brand-yellow">Company</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/about" className="hover:text-brand-red">About</Link></li>
            <li><Link to="/contact" className="hover:text-brand-red">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display uppercase text-sm tracking-widest mb-3 text-brand-yellow">Get in touch</h4>
          <p className="text-sm text-white/80">Casablanca, Morocco</p>
          <p className="text-sm text-white/80">contact@held-rider.ma</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Held Rider. All rights reserved.
      </div>
    </footer>
  );
}
