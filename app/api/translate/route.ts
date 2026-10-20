// Translates a visitor's note into English, so someone who writes in their
// own language (Tamil, Bengali, Arabic…) still reaches me in English.
// POST { text } → { text, from }: `from` is the detected language code
// ("en" when it was English already). Google's free endpoint first, then
// MyMemory; if both fail, the original comes back unchanged (from: "").

const MAX = 2000;
const TIMEOUT_MS = 6000;
const CHUNK = 160;

async function google(text: string) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`google ${res.status}`);
  const data = await res.json();
  // [[["translated","original",…],…], null, "detected-lang", …]
  const out = (data?.[0] as [string][] | undefined)?.map((part) => part[0]).join("") ?? "";
  if (!out) throw new Error("google: empty");
  return { text: out, from: String(data?.[2] ?? "") };
}

async function myMemoryChunk(text: string) {
  // MyMemory needs a source language; "autodetect" lets it guess.
  const url = `https://api.mymemory.translated.net/get?langpair=autodetect|en&q=${encodeURIComponent(text)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`mymemory ${res.status}`);
  const data = await res.json();
  // It refuses English → English: the text was English already.
  if (/DISTINCT LANGUAGES/i.test(data?.responseDetails ?? "")) return { text, from: "en" };
  const out: string = data?.responseData?.translatedText ?? "";
  if (!out || Number(data?.responseStatus) !== 200) throw new Error("mymemory: failed");
  return { text: out, from: String(data?.responseData?.detectedLanguage ?? "").slice(0, 2).toLowerCase() };
}

// MyMemory takes up to 500 bytes a request (160 characters is under that
// even in Devanagari or Tamil, at 3 bytes each): send longer notes a few
// sentences at a time.
async function myMemory(text: string) {
  const chunks: string[] = [];
  for (const part of text.match(/[^.!?।\n]+[.!?।\n]*/g) ?? [text]) {
    if (chunks.length && chunks[chunks.length - 1].length + part.length <= CHUNK) chunks[chunks.length - 1] += part;
    else for (let i = 0; i < part.length; i += CHUNK) chunks.push(part.slice(i, i + CHUNK));
  }
  const done = await Promise.all(chunks.map(myMemoryChunk));
  return { text: done.map((d) => d.text).join(" ").replace(/\s+/g, " ").trim(), from: done.find((d) => d.from !== "en")?.from ?? "en" };
}

// Abuse guards: this route is only for the Contact page, not a free
// translation proxy for anyone. Same-origin requests only, a small JSON body,
// and a per-visitor budget (per server instance, so best-effort on serverless).
const MAX_BODY = 16_000;
const WINDOW_MS = 60_000;
const PER_WINDOW = 30;
const hits = new Map<string, { start: number; n: number }>();

function sameOrigin(request: Request) {
  // Browsers send this on every fetch; "same-origin" means our own page.
  const site = request.headers.get("sec-fetch-site");
  if (site) return site === "same-origin";
  // Older browsers: fall back to comparing the Origin with our own host.
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function overBudget(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "?";
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.start > WINDOW_MS) {
    // Drop stale entries now and then so the map can't grow without bound.
    if (hits.size > 5000) for (const [k, v] of hits) if (now - v.start > WINDOW_MS) hits.delete(k);
    hits.set(ip, { start: now, n: 1 });
    return false;
  }
  return ++h.n > PER_WINDOW;
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ text: "", from: "" }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ text: "", from: "" }, { status: 415 });
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY) return Response.json({ text: "", from: "" }, { status: 413 });
  if (overBudget(request)) return Response.json({ text: "", from: "" }, { status: 429, headers: { "Retry-After": "60" } });

  let text = "";
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY) return Response.json({ text: "", from: "" }, { status: 413 });
    const body = JSON.parse(raw);
    text = typeof body?.text === "string" ? body.text.slice(0, MAX) : "";
  } catch {}
  if (!text.trim()) return Response.json({ text: "", from: "" }, { status: 400 });

  for (const provider of [google, myMemory]) {
    try {
      return Response.json(await provider(text));
    } catch {}
  }
  return Response.json({ text, from: "" });
}
