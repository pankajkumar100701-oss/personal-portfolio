import type { WebsiteType } from "@/data/profile";
import { Hero } from "./ui";

// Painting / Art: just the title and intro for now; the page's Websites
// section (added by the route) holds the art websites.
export default function Art({ m }: { m: WebsiteType }) {
  return <Hero m={m} />;
}
