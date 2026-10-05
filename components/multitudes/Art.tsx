import type { Multitude } from "@/data/profile";
import { Hero } from "./ui";

// Painting / Art: just the title and intro for now; the page's Websites
// section (added by the route) holds the art websites.
export default function Art({ m }: { m: Multitude }) {
  return <Hero m={m} />;
}
