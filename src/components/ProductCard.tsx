import { Link } from "@tanstack/react-router";

type Props = {
  slug: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
};

export function ProductCard({ slug, name, price, oldPrice, image, badge }: Props) {
  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  return (
    <Link
      to="/product/$slug"
      params={{ slug }}
      className="group bg-white border border-border hover:border-brand-red transition-colors overflow-hidden block"
    >
      <div className="relative aspect-square bg-secondary overflow-hidden">
        {discount > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-brand-red text-white text-xs font-bold px-2 py-1">
            -{discount}%
          </span>
        )}
        {badge && (
          <span className="absolute top-3 right-3 z-10 bg-brand-yellow text-brand-black text-xs font-bold px-2 py-1">
            {badge}
          </span>
        )}
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-sm mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-brand-red transition-colors">{name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-display text-brand-red">{price.toLocaleString()} DH</span>
          {oldPrice && <span className="text-xs text-muted-foreground line-through">{oldPrice.toLocaleString()} DH</span>}
        </div>
      </div>
    </Link>
  );
}
