import { readFileSync } from "node:fs";
import path from "node:path";

// A template's HTML (data/templates/<slug>.html). Server-only; read at build
// time, since every /templates page is static.
export function templateSource(slug: string) {
  return readFileSync(path.join(process.cwd(), "data/templates", `${slug}.html`), "utf8");
}
