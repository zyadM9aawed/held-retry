import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/brands")({
  head: () => ({
    meta: [
      { title: "Our Brands — Held" },
      { name: "description", content: "We carry the world's best motorcycle gear brands." },
    ],
  }),
  component: BrandsPage,
});

const brands = ["Held", "AGV", "Shoei", "Alpinestars", "Dainese", "REV'IT!", "Arai", "Furygan", "Bering", "Spidi", "Scorpion", "LS2"];

function BrandsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="bg-secondary border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="font-display text-4xl md:text-5xl uppercase">Our Brands</h1>
            <p className="text-muted-foreground mt-2">Only the most trusted names in motorcycle gear.</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {brands.map((b) => (
            <div key={b} className="aspect-[3/2] bg-white border border-border hover:border-brand-red flex items-center justify-center transition-colors">
              <span className="font-display uppercase text-xl text-brand-black">{b}</span>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
