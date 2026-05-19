import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, products } from "@/data/products";
import { useState } from "react";
import { Check, Truck, ShieldCheck, RotateCcw, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Product"} — Held Rider` },
      { name: "description", content: loaderData?.product.description ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <>
      <SiteHeader />
      <main className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-4xl uppercase">Product not found</h1>
        <Link to="/store" className="inline-block mt-6 bg-brand-red text-white px-6 py-3 font-display uppercase tracking-wider text-sm">Back to Store</Link>
      </main>
      <SiteFooter />
    </>
  ),
  errorComponent: ({ error }) => (
    <>
      <SiteHeader />
      <main className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-muted-foreground">{error.message}</p>
      </main>
      <SiteFooter />
    </>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: import("@/data/products").Product };
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <SiteHeader />
      <main>
        <div className="border-b border-border bg-secondary">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-brand-red">Home</Link>
            <ChevronRight size={12} />
            <Link to="/store" className="hover:text-brand-red">Store</Link>
            <ChevronRight size={12} />
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-10">
          <div>
            <div className="relative aspect-square bg-secondary border border-border overflow-hidden">
              {discount > 0 && (
                <span className="absolute top-4 left-4 z-10 bg-brand-red text-white text-sm font-bold px-3 py-1.5">-{discount}%</span>
              )}
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-2 mt-3">
              {[0,1,2,3].map((i) => (
                <div key={i} className="aspect-square bg-secondary border border-border hover:border-brand-red cursor-pointer overflow-hidden">
                  <img src={product.image} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-display uppercase tracking-widest text-brand-red">{product.brand}</span>
            <h1 className="font-display text-3xl md:text-4xl uppercase mt-1 leading-tight">{product.name}</h1>
            <div className="flex items-baseline gap-3 mt-4">
              <span className="font-display text-3xl text-brand-red">{product.price.toLocaleString()} DH</span>
              {product.oldPrice && <span className="text-lg text-muted-foreground line-through">{product.oldPrice.toLocaleString()} DH</span>}
            </div>
            <p className="text-foreground/80 mt-5 leading-relaxed">{product.description}</p>

            <div className="mt-7">
              <div className="flex items-center justify-between mb-3">
                <span className="font-display uppercase text-xs tracking-widest">Size</span>
                <button className="text-xs text-brand-red hover:underline">Size guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`min-w-[3rem] px-4 py-2 border text-sm font-medium transition-colors ${
                      size === s ? "border-brand-red bg-brand-red text-white" : "border-border bg-white hover:border-brand-black"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7 flex gap-3">
              <div className="flex items-center border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-secondary">−</button>
                <span className="px-4 font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-3 hover:bg-secondary">+</button>
              </div>
              {/* ✅ Pass product info as search params to contact page */}
              <Link
                to="/contact"
                search={{
                  product: product.name,
                  size: size ?? "",
                  price: String(product.price),
                }}
                className="flex-1 bg-brand-red hover:bg-brand-red/90 text-white px-6 py-3 font-display uppercase tracking-wider text-sm text-center"
              >
                Order Now
              </Link>
            </div>
            <a
              href={`https://wa.me/212600000000?text=${encodeURIComponent(`Hi, I'm interested in ${product.name}${size ? ` (Size: ${size})` : ""}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="mt-3 block w-full bg-[#25D366] hover:bg-[#1ebe57] text-white px-6 py-3 font-display uppercase tracking-wider text-sm text-center"
            >
              Order via WhatsApp
            </a>

            <div className="grid grid-cols-3 gap-2 mt-7 pt-7 border-t border-border text-center">
              <div><Truck className="w-5 h-5 mx-auto text-brand-red mb-1" /><span className="text-[11px] text-muted-foreground block">Free Shipping</span></div>
              <div><ShieldCheck className="w-5 h-5 mx-auto text-brand-red mb-1" /><span className="text-[11px] text-muted-foreground block">CE Certified</span></div>
              <div><RotateCcw className="w-5 h-5 mx-auto text-brand-red mb-1" /><span className="text-[11px] text-muted-foreground block">Easy Returns</span></div>
            </div>
          </div>
        </div>

        <section className="bg-secondary border-y border-border">
          <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display text-2xl uppercase mb-5">Key Features</h2>
              <ul className="space-y-3">
                {product.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm">
                    <Check className="w-5 h-5 text-brand-red shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase mb-5">Specifications</h2>
              <dl className="text-sm divide-y divide-border bg-white border border-border">
                {[["Brand", product.brand],["Category", product.category],["Material", "Premium grade"],["Warranty", "2 years"]].map(([k, v]) => (
                  <div key={k} className="flex justify-between px-4 py-3">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 py-14">
            <h2 className="font-display text-3xl uppercase mb-8">You may also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((p) => <ProductCard key={p.slug} {...p} />)}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}