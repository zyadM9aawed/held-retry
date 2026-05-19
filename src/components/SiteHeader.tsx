import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import logo from "@/assets/held-logo.png";
import { products, type Product } from "@/data/products";

const nav: { to: string; label: string; badge?: string }[] = [
  { to: "/", label: "Home" },
  { to: "/store", label: "Store" },
  { to: "/outlet", label: "Outlet", badge: "PROMO" },
  { to: "/brands", label: "Brands" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Filter products on query change
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults([]);
      return;
    }
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
    setResults(filtered.slice(0, 6));
  }, [query]);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [searchOpen]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(slug: string) {
    setSearchOpen(false);
    navigate({ to: `/store/${slug}` as any });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") setSearchOpen(false);
    if (e.key === "Enter" && results.length > 0) {
      handleSelect(results[0].slug);
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="bg-brand-black text-white text-xs tracking-widest text-center py-2 font-display">
        FREE SHIPPING & EASY RETURNS — RIDE WITH HELD
      </div>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Held" className="h-12 w-auto" />
          <div className="leading-none hidden sm:block">
            <div className="font-display text-2xl uppercase tracking-wide text-brand-black">Held</div>
            <div className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Biker </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to as any}
              className="relative px-4 py-2 text-sm font-display uppercase tracking-wider text-foreground hover:text-brand-red transition-colors"
              activeProps={{ className: "text-brand-red" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
              {n.badge && (
                <span className="ml-2 inline-block bg-brand-red text-white text-[10px] px-1.5 py-0.5 rounded-sm align-middle">
                  {n.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Search area */}
          <div ref={searchRef} className="relative">
            {searchOpen ? (
              <div className="flex items-center gap-2 border border-border rounded-sm px-3 py-1.5 bg-white shadow-md">
                <Search size={16} className="text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search products..."
                  className="w-48 sm:w-64 text-sm outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-muted-foreground hover:text-brand-red transition-colors"
                  aria-label="Close search"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:text-brand-red transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            )}

            {/* Dropdown results */}
            {searchOpen && query.trim() && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-border rounded-sm shadow-xl z-50 overflow-hidden">
                {results.length > 0 ? (
                  <>
                    <div className="px-3 py-2 border-b border-border">
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-display">
                        {results.length} result{results.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <ul>
                      {results.map((product) => (
                        <li key={product.slug}>
                          <button
                            onClick={() => handleSelect(product.slug)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-secondary transition-colors text-left group"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded-sm shrink-0 bg-secondary"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-display uppercase tracking-wide text-foreground truncate group-hover:text-brand-red transition-colors">
                                {product.name}
                              </div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                                  {product.category}
                                </span>
                                {product.badge && (
                                  <span className="text-[9px] bg-brand-red text-white px-1 py-0.5 rounded-sm">
                                    {product.badge}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-sm font-semibold text-brand-black shrink-0">
                              {product.price.toLocaleString()} MAD
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-border px-3 py-2">
                      <Link
                        to="/store"
                        onClick={() => setSearchOpen(false)}
                        className="text-xs text-brand-red font-display uppercase tracking-widest hover:underline"
                      >
                        View all in Store →
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="px-4 py-6 text-center">
                    <p className="text-sm text-muted-foreground">No products found for</p>
                    <p className="text-sm font-semibold text-brand-black mt-1">"{query}"</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-border bg-white">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to as any}
              onClick={() => setOpen(false)}
              className="block px-5 py-3 border-b border-border font-display uppercase tracking-wider text-sm hover:bg-secondary"
            >
              {n.label}
              {n.badge && (
                <span className="ml-2 bg-brand-red text-white text-[10px] px-1.5 py-0.5 rounded-sm">
                  {n.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}