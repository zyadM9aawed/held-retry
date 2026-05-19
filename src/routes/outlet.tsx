import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export const Route = createFileRoute("/outlet")({
  head: () => ({
    meta: [
      { title: "Outlet — Held Biker Promotions" },
      { name: "description", content: "Limited-time deals on premium biker gear, up to 40% off." },
    ],
  }),
  component: OutletPage,
});

const deals = products.filter((p) => p.oldPrice);

function OutletPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="bg-brand-red text-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <span className="inline-block bg-brand-yellow text-brand-black text-xs font-bold tracking-widest px-3 py-1 mb-3">
              LIMITED STOCK
            </span>
            <h1 className="font-display text-4xl md:text-6xl uppercase">Outlet — Up to 40% Off</h1>
            <p className="mt-2 text-white/85">Premium gear at unbeatable prices. While supplies last.</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {deals.map((p) => <ProductCard key={p.slug} {...p} />)}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
