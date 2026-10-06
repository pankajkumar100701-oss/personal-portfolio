// The site's public address, used by the sitemap, robots.txt and share
// previews. Set NEXT_PUBLIC_SITE_URL once you have a domain (e.g.
// https://pankaj.dev); on Vercel it falls back to the production URL.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");
