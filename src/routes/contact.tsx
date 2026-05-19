import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, MapPin, CheckCircle2, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

// ─── EmailJS config (from your .env) ───────────────────────────────────────
const EJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// ─── Google Sheets config (from your .env) ──────────────────────────────────
const SHEET_URL    = import.meta.env.VITE_GOOGLE_SHEET_URL;

export const Route = createFileRoute("/contact")({
  // ✅ Read product/size/price passed from product page
  validateSearch: (search: Record<string, unknown>) => ({
    product: (search.product as string) ?? "",
    size:    (search.size    as string) ?? "",
    price:   (search.price   as string) ?? "",
  }),
  head: () => ({
    meta: [
      { title: "Contact — Held Biker Morocco" },
      { name: "description", content: "Get in touch with the Held Biker Morocco team." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name:     z.string().trim().min(2, "Name is required").max(100),
  email:    z.string().trim().email("Invalid email").max(255),
  phone:    z.string().trim().min(6, "Phone required").max(30),
  location: z.string().trim().min(2, "Location required").max(120),
  message:  z.string().trim().max(1000).optional(),
});

type FormData = z.infer<typeof schema>;

async function sendToGoogleSheets(data: FormData & { product: string; size: string; price: string }) {
  if (!SHEET_URL) return;
  await fetch(SHEET_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      date:     new Date().toLocaleString("fr-MA", { timeZone: "Africa/Casablanca" }),
      name:     data.name,
      email:    data.email,
      phone:    data.phone,
      location: data.location,
      product:  data.product || "—",
      size:     data.size    || "—",
      price:    data.price   || "—",
      message:  data.message ?? "",
    }),
  });
}

function ContactPage() {
  // ✅ Get product info from URL search params
  const { product, size, price } = Route.useSearch();

  const [errors,   setErrors]   = useState<Record<string, string>>({});
  const [sent,     setSent]     = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [apiError, setApiError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd   = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const r    = schema.safeParse(data);

    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }

    setErrors({});
    setApiError("");
    setLoading(true);

    // Capture form ref before async ops
    const formEl = e.currentTarget;

    try {
      // 1️⃣ Send email via EmailJS (with product info)
      await emailjs.send(
        EJS_SERVICE,
        EJS_TEMPLATE,
        {
          name:    r.data.name,
          email:   r.data.email,
          phone:   r.data.phone,
          city:    r.data.location,
          message: r.data.message ?? "—",
          product: product || "—",
          size:    size    || "—",
          price:   price   || "—",
        },
        EJS_KEY
      );

      // 2️⃣ Log to Google Sheets (with product info)
      await sendToGoogleSheets({
        ...r.data,
        product: product || "—",
        size:    size    || "—",
        price:   price   || "—",
      });

      setSent(true);
      formEl.reset();
    } catch (err) {
      console.error(err);
      setApiError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SiteHeader />
      <main>
        <div className="bg-brand-black text-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="font-display text-4xl md:text-5xl uppercase">Contact Us</h1>
            <p className="text-white/70 mt-2">Questions about gear? Need sizing help? Drop us a line.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-14 grid lg:grid-cols-3 gap-10">
          {/* ── Info sidebar ── */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex gap-4">
              <MapPin className="w-6 h-6 text-brand-red shrink-0" />
              <div>
                <h3 className="font-display uppercase text-sm tracking-wider mb-1">Location</h3>
                <p className="text-sm text-muted-foreground">Bd Mohammed V<br />Casablanca, Morocco</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="w-6 h-6 text-brand-red shrink-0" />
              <div>
                <h3 className="font-display uppercase text-sm tracking-wider mb-1">Phone</h3>
                <p className="text-sm text-muted-foreground">+212 5 22 00 00 00</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="w-6 h-6 text-brand-red shrink-0" />
              <div>
                <h3 className="font-display uppercase text-sm tracking-wider mb-1">Email</h3>
                <p className="text-sm text-muted-foreground">contact@held-rider.ma</p>
              </div>
            </div>

            {/* ✅ Show order summary if coming from product page */}
            {product && (
              <div className="border border-brand-red/30 bg-brand-red/5 p-4 rounded">
                <h3 className="font-display uppercase text-xs tracking-widest mb-3 text-brand-red">Your Order</h3>
                <p className="text-sm font-medium">{product}</p>
                {size  && <p className="text-sm text-muted-foreground mt-1">Size: {size}</p>}
                {price && <p className="text-sm text-brand-red font-display mt-1">{Number(price).toLocaleString()} DH</p>}
              </div>
            )}
          </div>

          {/* ── Form ── */}
          <div className="lg:col-span-2 bg-secondary p-6 md:p-10 border border-border">
            {sent ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-14 h-14 text-brand-red mx-auto mb-4" />
                <h2 className="font-display text-2xl uppercase mb-2">Message Sent!</h2>
                <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm text-brand-red font-display uppercase tracking-wider hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field name="name"     label="Full Name"    placeholder="John Rider"             error={errors.name} />
                  <Field name="email"    label="Email"        type="email" placeholder="you@example.com" error={errors.email} />
                  <Field name="phone"    label="Phone Number" type="tel"   placeholder="+212 6 00 00 00 00" error={errors.phone} />
                  <Field name="location" label="Location"     placeholder="Casablanca"              error={errors.location} />
                </div>
                <div>
                  <label className="block font-display uppercase text-xs tracking-widest mb-2">
                    Message (optional)
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    maxLength={1000}
                    className="w-full bg-white border border-border px-4 py-3 focus:border-brand-red outline-none text-sm"
                    placeholder="How can we help?"
                  />
                </div>

                {apiError && (
                  <p className="text-sm text-brand-red border border-brand-red/30 bg-brand-red/5 px-4 py-3 rounded">
                    {apiError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-brand-red hover:bg-brand-red/90 disabled:opacity-60 text-white px-8 py-3 font-display uppercase tracking-wider text-sm transition-opacity"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function Field({
  name, label, type = "text", placeholder, error,
}: {
  name: string; label: string; type?: string; placeholder?: string; error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block font-display uppercase text-xs tracking-widest mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`w-full bg-white border px-4 py-3 outline-none text-sm transition-colors ${
          error ? "border-brand-red" : "border-border focus:border-brand-red"
        }`}
      />
      {error && <p className="mt-1 text-xs text-brand-red">{error}</p>}
    </div>
  );
}