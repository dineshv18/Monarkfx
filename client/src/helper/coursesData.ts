export interface Category {
  id: string;
  name: string;
  slug?: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  duration?: string;
  thumbnail?: string;
  category?: Category;
  isPublished: boolean;
  subheading?: string;
}

export const staticCategories: Category[] = [
  { id: "1", name: "Indian Market", slug: "indian-market" },
  { id: "2", name: "Forex", slug: "forex" },
  { id: "3", name: "Crypto", slug: "crypto" },
  { id: "4", name: "Workshop", slug: "workshop" },
];

export const staticCourses: Course[] = [
  {
    id: "101",
    title: "5-Day Trading Starter Workshop",
    slug: "trading-starter-workshop",
    description: "5 din mein trading ki foundation. Basics seekho, live Q&A karo, aur decide karo ki aapke liye kaunsa market best hai.",
    subheading: "Pehla kadam — Trading Starter Workshop",
    price: 999,
    salePrice: 999,
    duration: "5 Days",
    category: staticCategories[3],
    isPublished: true,
  },
  {
    id: "102",
    title: "MPTP Indian Market Mentorship",
    slug: "indian-market-mentorship",
    description: "Nifty, Bank Nifty, F&O, Stocks — India mein trade karo. Master institutional concepts and risk management.",
    subheading: "90-day mentorship for Indian Markets",
    price: 20000,
    salePrice: 15000,
    duration: "90 Days",
    category: staticCategories[0],
    isPublished: true,
  },
  {
    id: "103",
    title: "MPTP Forex & Gold Mentorship",
    slug: "forex-gold-mentorship",
    description: "EUR/USD, GBP/JPY, XAUUSD — global markets mein trade karo. Deep dive into institutional order flow.",
    subheading: "Master Global Forex Markets",
    price: 20000,
    salePrice: 15000,
    duration: "90 Days",
    category: staticCategories[1],
    isPublished: true,
  },
  {
    id: "104",
    title: "MPTP Crypto Mentorship",
    slug: "crypto-mentorship",
    description: "BTC, ETH, altcoins — spot & futures trading seekho. On-chain analysis and cycle psychology.",
    subheading: "High-probability Crypto Strategies",
    price: 18000,
    salePrice: 12000,
    duration: "90 Days",
    category: staticCategories[2],
    isPublished: true,
  },
  {
    id: "105",
    title: "Monark Options X",
    slug: "monark-options-x",
    description: "Trade options with confidence — Greeks, premium selling strategies, hedging and structured expiry plays.",
    subheading: "Advanced Options & Derivatives",
    price: 15000,
    salePrice: 9999,
    duration: "3 Weeks",
    category: staticCategories[0],
    isPublished: true,
  },
];
