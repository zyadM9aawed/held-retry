import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export const Route = createFileRoute("/store")({
  head: () => ({
    meta: [
      { title: "Store — Held Biker Gear" },
      { name: "description", content: "Browse our full collection of helmets, jackets, gloves and boots." },
    ],
  }),
  component: StorePage,
});

const categories = ["All", "Helmets", "Jackets", "Gloves", "Boots", "Accessories"];

function StorePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="bg-secondary border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="font-display text-4xl md:text-5xl uppercase">Store</h1>
            <p className="text-muted-foreground mt-2">All your biker gear in one place.</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((c, i) => (
              <button
                key={c}
                className={`px-4 py-2 text-sm font-display uppercase tracking-wider border transition-colors ${
                  i === 0
                    ? "bg-brand-black text-white border-brand-black"
                    : "bg-white border-border hover:border-brand-red hover:text-brand-red"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {products.map((p) => <ProductCard key={p.name} {...p} />)}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
