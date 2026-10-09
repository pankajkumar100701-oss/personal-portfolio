// Viewer preferences (theme, text size, motion). Stored in
// localStorage and mirrored onto <html> as data-* attributes the CSS reads.

export type Prefs = {
  theme: "dark" | "light" | "system";
  text: "small" | "default" | "large";
  // Our own switch, not the OS "reduce motion" setting: plenty of laptops ship
  // with OS animations off, which would silently strip the whole site's motion.
  // "lite" keeps the scroll animations but drops the decorative idle loops
  // (the same as PerfGuard's automatic data-lite); "reduce" stills everything.
  motion: "full" | "lite" | "reduce";
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

// True once the viewer has picked a motion level themselves; PerfGuard then
// leaves it alone.
export function motionChosen() {
  try {
    return "motion" in JSON.parse(localStorage.getItem(KEY) ?? "{}");
  } catch {
    return false;
  }
}

export function applyPrefs(p: Prefs) {
  const html = document.documentElement;
  html.dataset.theme = resolveTheme(p.theme);
  html.dataset.text = p.text;
  html.dataset.motion = p.motion === "reduce" ? "reduce" : "full";
  if (p.motion === "lite") html.setAttribute("data-lite", "");
  else if (p.motion === "full") {
    html.removeAttribute("data-lite");
    try {
      sessionStorage.removeItem(LITE_KEY);
    } catch {}
  }
}

// How this page is running right now, over `ms`:
// - `fps`: frames actually shown. Browsers draw at most once per screen
//   refresh, so this tops out at the screen's rate (60, 120, 144…).
// - `capacity`: frames this device could make with no cap. Each frame, a
//   message posted from requestAnimationFrame arrives once that frame's work
//   (scripts, style, layout, paint) is done; 1000 / that work time is how
//   many such frames would fit in a second. Not capped, so a fast PC shows
//   hundreds; it covers the main thread, not the GPU.
export function measureFps(ms = 1000): Promise<{ fps: number; capacity: number }> {
  return new Promise((resolve) => {
    let frames = 0;
    let start = 0;
    let work = 0;
    let samples = 0;
    let frameStart = 0;
    const channel = new MessageChannel();
    channel.port1.onmessage = () => {
      work += performance.now() - frameStart;
      samples++;
    };
    const tick = (now: number) => {
      if (!start) start = now;
      else frames++;
      if (now - start < ms) {
        frameStart = performance.now();
        channel.port2.postMessage(0);
        requestAnimationFrame(tick);
        return;
      }
      channel.port1.close();
      const fps = Math.round((frames * 1000) / (now - start));
      // At least a quarter of a millisecond a frame: below that the timer's
      // own resolution is the limit, not the device.
      const avg = Math.max(0.25, samples ? work / samples : 1000 / Math.max(fps, 1));
      resolve({ fps, capacity: Math.max(fps, Math.round(1000 / avg)) });
    };
    requestAnimationFrame(tick);
  });
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
export const prefsScript = `(function(){try{var p=JSON.parse(localStorage.getItem("${KEY}")||"{}"),h=document.documentElement,t=p.theme||"${DEFAULT_PREFS.theme}";if(t==="system")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";h.dataset.theme=t;h.dataset.text=p.text||"${DEFAULT_PREFS.text}";h.dataset.motion=p.motion==="reduce"?"reduce":"full";if(p.motion==="lite"||(!p.motion&&sessionStorage.getItem("${LITE_KEY}")))h.dataset.lite=""}catch(e){}})()`;
