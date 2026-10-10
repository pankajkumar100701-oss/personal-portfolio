import { readFileSync } from "node:fs";
import path from "node:path";

// A template's HTML (data/templates/<slug>.html). Server-only; read at build
// time, since every /templates page is static.
export function templateSource(slug: string) {
  return readFileSync(path.join(process.cwd(), "data/templates", `${slug}.html`), "utf8");
}

// Inside a srcdoc iframe, links resolve against *this* site's URL, so a
// template's href="#" or "Sign in" would load the portfolio inside the
// preview (and a preview of a template page inside itself). This guard keeps
// every click in the preview: "#section" links scroll, the rest do nothing,
// and forms never submit anywhere.
const GUARD = `<script>(function(){document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href]");if(!a)return;e.preventDefault();var h=a.getAttribute("href")||"";if(h.length>1&&h[0]==="#"){var t=document.getElementById(h.slice(1));if(t)t.scrollIntoView({behavior:"smooth"})}else if(h==="#")window.scrollTo({top:0,behavior:"smooth"})},true);document.addEventListener("submit",function(e){e.preventDefault()},true)})()</script>`;

// The template as shown in a preview: the same file plus the guard above
// (the code tab and downloads still hand out the untouched file).
export function previewSource(slug: string) {
  const html = templateSource(slug);
  return html.includes("<head>") ? html.replace("<head>", `<head>${GUARD}`) : GUARD + html;
}
