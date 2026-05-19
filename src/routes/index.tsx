import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import hero from "@/assets/hero-rider.jpg";
import helmet from "@/assets/cat-helmets.jpg";
import jacket from "@/assets/cat-jackets.jpg";
import gloves from "@/assets/cat-gloves.jpg";
import boots from "@/assets/cat-boots.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Held — Premium Biker Gear in Morocco" },
      { name: "description", content: "Helmets, jackets, gloves and boots. 100% biker protection by Held." },
    ],
  }),
  component: HomePage,
});

const featured = products.slice(0, 4);

function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* HERO */}
        <section className="relative h-[78vh] min-h-[520px] overflow-hidden">
          <img src={hero} alt="Rider" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto h-full px-4 flex items-center">
            <div className="max-w-xl text-white">
              <span className="inline-block bg-brand-yellow text-brand-black text-xs font-bold tracking-widest px-3 py-1 mb-4">
                NEW SEASON 2026
              </span>
              <h1 className="font-display text-5xl md:text-7xl uppercase leading-none">
                Ride Hard. <span className="text-brand-red">Ride Safe.</span>
              </h1>
              <p className="mt-5 text-white/85 text-lg max-w-md">
                Premium helmets, leathers and accessories built for the road. Trusted by riders across Morocco.
              </p>
              <div className="mt-8 flex gap-3">
                <Link to="/store" className="bg-brand-red hover:bg-brand-red/90 text-white px-7 py-3 font-display uppercase tracking-wider text-sm">
                  Shop Store
                </Link>
                <Link to="/outlet" className="bg-white hover:bg-brand-yellow text-brand-black px-7 py-3 font-display uppercase tracking-wider text-sm transition-colors">
                  Outlet Deals
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-3xl md:text-4xl uppercase">Shop by Category</h2>
            <Link to="/store" className="text-sm font-display uppercase tracking-wider text-brand-red hover:underline">View all →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Helmets", img: helmet },
              { label: "Jackets", img: jacket },
              { label: "Gloves", img: gloves },
              { label: "Boots", img: boots },
            ].map((c) => (
              <Link key={c.label} to="/store" className="group relative aspect-square overflow-hidden bg-secondary">
                <img src={c.img} alt={c.label} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-5">
                  <span className="font-display uppercase text-white text-xl">{c.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* PROMO BANNER */}
        <section className="bg-brand-red text-white py-14">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-4xl uppercase">Outlet — Up to 40% Off</h2>
              <p className="text-white/80 mt-2">Limited stock on selected gear. Don't miss out.</p>
            </div>
            <Link to="/outlet" className="bg-brand-yellow text-brand-black hover:bg-white px-8 py-4 font-display uppercase tracking-wider transition-colors">
              Browse Outlet
            </Link>
          </div>
        </section>

        {/* FEATURED */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="font-display text-3xl md:text-4xl uppercase mb-8">Featured Gear</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {featured.map((p) => <ProductCard key={p.slug} {...p} />)}
          </div>
        </section>
      </main>
      <SiteFooter />
      <Outlet />
    </>
  );
}
