// Viewer preferences (theme, text size, motion). Stored in
// localStorage and mirrored onto <html> as data-* attributes the CSS reads.

export type Prefs = {
  theme: "dark" | "light" | "system";
  text: "default" | "large";
  // Our own switch, not the OS "reduce motion" setting: plenty of laptops ship
  // with OS animations off, which would silently strip the whole site's motion.
  motion: "full" | "reduce";
};

export const DEFAULT_PREFS: Prefs = { theme: "dark", text: "default", motion: "full" };

const KEY = "prefs";
// Set by PerfGuard once this browser is seen dropping frames (see there).
export const LITE_KEY = "perf-lite";
export const PREFS_EVENT = "prefs-change";

export function readPrefs(): Prefs {
  try {
    return { ...DEFAULT_PREFS, ...JSON.parse(localStorage.getItem(KEY) ?? "{}") };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function resolveTheme(theme: Prefs["theme"]) {
  if (theme !== "system") return theme;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function applyPrefs(p: Prefs) {
  const html = document.documentElement;
  html.dataset.theme = resolveTheme(p.theme);
  html.dataset.text = p.text;
  html.dataset.motion = p.motion;
}

export function motionReduced() {
  return document.documentElement.dataset.motion === "reduce";
}

export function savePrefs(p: Prefs) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {}
  applyPrefs(p);
  window.dispatchEvent(new Event(PREFS_EVENT));
}

// Same as readPrefs + applyPrefs, inlined in <head> so the page paints in the
// right theme before React loads.
export const prefsScript = `(function(){try{var p=JSON.parse(localStorage.getItem("${KEY}")||"{}"),h=document.documentElement,t=p.theme||"${DEFAULT_PREFS.theme}";if(t==="system")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";h.dataset.theme=t;h.dataset.text=p.text||"${DEFAULT_PREFS.text}";h.dataset.motion=p.motion||"${DEFAULT_PREFS.motion}";if(sessionStorage.getItem("${LITE_KEY}"))h.dataset.lite=""}catch(e){}})()`;
