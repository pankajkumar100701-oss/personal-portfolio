// Poster images for the /templates cards: public/template-thumbs/<slug>.webp,
// a headless-Chrome screenshot of each data/templates/<slug>.html. Cards show
// the poster and only mount the live preview for the one card that's playing.
//
//   node scripts/template-thumbs.mjs            new templates only
//   node scripts/template-thumbs.mjs --force    redo every poster
//   node scripts/template-thumbs.mjs dot-globe  just these slugs
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const src = path.join(root, "data/templates");
const out = path.join(root, "public/template-thumbs");
mkdirSync(out, { recursive: true });

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));
const slugs = readdirSync(src)
  .filter((f) => f.endsWith(".html"))
  .map((f) => f.slice(0, -5))
  .filter((s) => (only.length ? only.includes(s) : force || !existsSync(path.join(out, `${s}.webp`))));

for (const slug of slugs) {
  // A fresh profile per run; heavy 3D pages need a long timeout or come out blank.
  const tmp = mkdtempSync(path.join(tmpdir(), "tpl-thumb-"));
  const png = path.join(tmp, "shot.png");
  execFileSync(
    "google-chrome",
    ["--headless=new", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", `--user-data-dir=${tmp}/profile`, "--hide-scrollbars", "--window-size=1440,900", "--timeout=14000", `--screenshot=${png}`, `file://${path.join(src, `${slug}.html`)}`],
    { stdio: "ignore" },
  );
  await sharp(png).resize(800, 500).webp({ quality: 74 }).toFile(path.join(out, `${slug}.webp`));
  rmSync(tmp, { recursive: true, force: true });
  console.log(`✓ ${slug}`);
}
