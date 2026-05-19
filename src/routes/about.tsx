import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Shield, Truck, Headphones } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Held Rider" },
      { name: "description", content: "Held Rider — passionate about motorcycle protection since day one." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="bg-secondary border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="font-display text-4xl md:text-5xl uppercase">About Held</h1>
          </div>
        </div>
        <section className="max-w-4xl mx-auto px-4 py-14">
          <p className="text-lg text-foreground/85 leading-relaxed">
            Held Rider is Morocco's destination for premium motorcycle gear. We bring together helmets,
            leathers, gloves, and accessories from the world's most trusted brands — all under one roof.
          </p>
          <p className="mt-5 text-foreground/75 leading-relaxed">
            Founded by riders for riders, we believe protection should never compromise style. Every product
            we carry has been chosen for one reason: it's gear we'd ride in ourselves.
          </p>
        </section>
        <section className="bg-secondary py-14">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "100% Protection", desc: "Certified gear that meets the highest safety standards." },
              { icon: Truck, title: "Fast Shipping", desc: "Free delivery on orders over 1990 DH across Morocco." },
              { icon: Headphones, title: "Rider Support", desc: "Real bikers ready to help you choose the right gear." },
            ].map((f) => (
              <div key={f.title} className="bg-white p-6 border border-border">
                <f.icon className="w-10 h-10 text-brand-red mb-3" />
                <h3 className="font-display text-xl uppercase mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
