import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import HelpButton from "@/components/HelpButton";
import { BasketPill } from "@/components/MessageActions";
import PerfGuard from "@/components/PerfGuard";
import PortalTransition from "@/components/PortalTransition";
import PrefsSync from "@/components/PrefsSync";
import { profile } from "@/data/profile";
import { DEFAULT_PREFS, prefsScript } from "@/lib/prefs";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Editorial serif for the hero: a free, close cousin of the serif used on claude.ai.
const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.brand} — ${profile.role}`,
  description: profile.tagline,
  openGraph: {
    type: "website",
    siteName: profile.brand,
    title: `${profile.brand} — ${profile.role}`,
    description: profile.tagline,
  },
  twitter: { card: "summary_large_image" },
};

// "cover" is what makes iPhones report env(safe-area-inset-*): without it
// they read 0, and the WhatsApp / Help buttons, the phone pop-up sheets and
// the Contact bar sat behind Safari's toolbar and the home indicator.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_PREFS.theme}
      data-text={DEFAULT_PREFS.text}
      className={`${geistSans.variable} ${geistMono.variable} ${serif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: prefsScript }} />
      </head>
      <body className="min-h-full font-sans">
        <PrefsSync />
        <PerfGuard />
        {children}
        <BasketPill />
        <HelpButton />
        <PortalTransition />
      </body>
    </html>
  );
}
