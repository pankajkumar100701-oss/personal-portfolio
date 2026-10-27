import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { legal } from "@/data/legal";
import { profile } from "@/data/profile";
import { pageMeta } from "@/lib/site";

const doc = legal.privacy;

export const metadata: Metadata = pageMeta(`${doc.title} — ${profile.brand}`, doc.blurb, "/privacy");

export default function Page() {
  return <LegalPage doc={doc} />;
}
