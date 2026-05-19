import helmet from "@/assets/cat-helmets.jpg";
import jacket from "@/assets/cat-jackets.jpg";
import gloves from "@/assets/cat-gloves.jpg";
import boots from "@/assets/cat-boots.jpg";
import intercom from "@/assets/cardo-freecom-2x-single.jpg";

export type Product = {
  slug: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
  category: string;
  brand: string;
  description: string;
  features: string[];
  sizes: string[];
};

export const products: Product[] = [
  { slug: "gtr-sport-helmet", name: "GTR Sport Full-Face Helmet", price: 1890, oldPrice: 2490, image: helmet, badge: "NEW", category: "Helmets", brand: "Held", description: "Race-bred full-face helmet built for daily riders who demand track-level protection. Aerodynamic shell, anti-fog Pinlock visor, premium interior comfort.", features: ["ECE 22.06 certified", "Pinlock-ready visor", "Removable washable lining", "Aerodynamic spoiler", "Quick-release strap"], sizes: ["S","M","L","XL"] },
  { slug: "urban-modular-helmet", name: "Urban Modular Helmet", price: 1490, oldPrice: 1990, image: helmet, category: "Helmets", brand: "Held", description: "Versatile flip-up helmet ideal for city commuters and tourers. Switch between full-face and open in seconds.", features: ["Flip-up chin bar","Internal sun visor","Bluetooth ready","ECE certified"], sizes: ["S","M","L","XL"] },
  { slug: "classic-leather-jacket", name: "Held Classic Leather Jacket", price: 2790, oldPrice: 3490, image: jacket, category: "Jackets", brand: "Held", description: "Timeless full-grain cowhide leather jacket with CE-rated armor at shoulders, elbows and back. Built to last a lifetime.", features: ["Full-grain cowhide","CE Level 2 armor","Connection zip","Stretch panels"], sizes: ["S","M","L","XL","XXL"] },
  { slug: "touring-textile-jacket", name: "Touring Textile Jacket", price: 1690, oldPrice: 2290, image: jacket, category: "Jackets", brand: "Held", description: "Waterproof, breathable touring jacket with removable thermal liner — for all-weather adventures.", features: ["Waterproof membrane","Removable thermal liner","Reflective panels","8 pockets"], sizes: ["S","M","L","XL","XXL"] },
  { slug: "sport-riding-gloves", name: "Held Sport Riding Gloves", price: 590, image: gloves, category: "Gloves", brand: "Held", description: "Premium leather sport gloves with carbon knuckle protection and pre-curved fingers for a perfect grip.", features: ["Goatskin leather","Carbon knuckle","Touchscreen index","Visor wiper"], sizes: ["S","M","L","XL"] },
  { slug: "winter-touring-gloves", name: "Winter Touring Gloves", price: 549, oldPrice: 790, image: gloves, category: "Gloves", brand: "Held", description: "Heated waterproof winter gloves keep your hands warm on the coldest rides.", features: ["Waterproof","Thermal lining","Reinforced palm","Hipora membrane"], sizes: ["S","M","L","XL"] },
  { slug: "adventure-touring-boots", name: "Adventure Touring Boots", price: 1990, oldPrice: 2390, image: boots, badge: "TOP", category: "Boots", brand: "Held", description: "Heavy-duty adventure boots with shin and ankle protection for long-distance off-road riding.", features: ["Waterproof","Shin armor","Reinforced sole","Adjustable buckles"], sizes: ["40","41","42","43","44","45","46"] },
  { slug: "urban-riding-boots", name: "Urban Riding Boots", price: 1190, oldPrice: 1690, image: boots, category: "Boots", brand: "Held", description: "Stylish urban riding boots that blend casual looks with serious protection.", features: ["YKK zipper","Ankle protection","Anti-slip sole","Breathable lining"], sizes: ["40","41","42","43","44","45"] },
  { slug: "cardo-freecom-2x", name: "Cardo Freecom 2X Intercom", price: 1290, oldPrice: 1590, image: intercom, badge: "NEW", category: "Intercoms", brand: "Cardo", description: "Bluetooth motorcycle intercom with up to 1.2km range, music sharing, and instant voice operation. Pair with a second rider for seamless communication on the road.", features: ["1.2km range", "Bluetooth 5.2", "Instant voice operation", "Music sharing", "Universal helmet fit"], sizes: ["One Size"] },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);