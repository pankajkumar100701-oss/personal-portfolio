// Prices in Indian rupees, used by the FAQ and the blog. No per-type price
// list on the site for now (the old one is kept with the Contact plan builder
// in ~/pankajstudio/talk-to-me): just where websites start.
export const startsAt = 1000;

// Keeping a site running after it's live, a month: small changes (text,
// prices, photos) cost less; new pages and big changes, more.
export const maintenance = { from: 500, to: 3000, small: { from: 500, to: 1000 }, big: { from: 1000, to: 3000 } };
// A domain name and hosting, a year (paid to the provider, not to me).
export const domainHosting = { from: 800, to: 3000 };

// Rough exchange rates: how many rupees one unit of each currency buys.
// Prices are shown as approximate; I confirm the final figure on chat.
export const currencies = [
  { code: "INR", symbol: "₹", label: "Indian rupee", perUnit: 1 },
  { code: "USD", symbol: "$", label: "US dollar", perUnit: 88 },
  { code: "EUR", symbol: "€", label: "Euro", perUnit: 103 },
  { code: "GBP", symbol: "£", label: "British pound", perUnit: 118 },
  { code: "AED", symbol: "AED ", label: "UAE dirham", perUnit: 24 },
  { code: "CAD", symbol: "C$", label: "Canadian dollar", perUnit: 63 },
  { code: "AUD", symbol: "A$", label: "Australian dollar", perUnit: 58 },
  { code: "SGD", symbol: "S$", label: "Singapore dollar", perUnit: 68 },
  { code: "NPR", symbol: "Rs ", label: "Nepalese rupee", perUnit: 0.625 },
] as const;

export type CurrencyCode = (typeof currencies)[number]["code"];

// A rupee amount in another currency, rounded to a friendly figure
// (₹12,000 → "$140"; whole hundreds of rupees, tens of others).
export function money(inr: number, code: CurrencyCode = "INR") {
  const c = currencies.find((x) => x.code === code) ?? currencies[0];
  const raw = inr / c.perUnit;
  const step = code === "INR" || code === "NPR" ? 100 : raw >= 1000 ? 50 : 10;
  const n = Math.max(step, Math.round(raw / step) * step);
  return `${c.symbol}${n.toLocaleString(code === "INR" ? "en-IN" : "en-US")}`;
}
