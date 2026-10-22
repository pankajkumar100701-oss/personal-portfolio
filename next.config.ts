import type { NextConfig } from "next";

const dev = process.env.NODE_ENV === "development";

// The site's Content Security Policy. Everything (fonts, images, templates) is
// served from this site, and nothing calls out to other sites. Inline scripts stay allowed for Next's own bootstrapping and
// the theme script in <head> (nonces would make every page dynamic); React's
// dev mode also needs eval.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${dev ? " ws: wss:" : ""}`,
  "frame-src 'self'",
  "worker-src 'self' blob:",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

// Template previews run the template's own scripts: sandboxed (a unique
// origin, so even opened full screen they can't read this site's storage or
// cookies), and allowed the inline code and data: images templates use.
const previewCsp = [
  "sandbox allow-scripts allow-forms",
  "default-src 'self' data: blob:",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // The site was "Pankaj Multitudes" before it became Pankaj Studio: keep old
  // shared links to the website-type pages working.
  async redirects() {
    return [{ source: "/multitudes/:slug", destination: "/websites/:slug", permanent: true }];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Later entries win: the previews get their own, sandboxing policy.
      { source: "/templates/:slug/preview", headers: [{ key: "Content-Security-Policy", value: previewCsp }] },
    ];
  },
};

export default nextConfig;
