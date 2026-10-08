"use client";

import { useSyncExternalStore } from "react";

// What a visitor has added to their message so far: website types (by slug)
// and websites of mine they'd like one like (by project title). Kept in this
// browser only, and read by the Contact page to pre-fill the message.
export type Basket = { types: string[]; sites: string[] };

const KEY = "message-basket";
const EVENT = "basket-change";
const EMPTY: Basket = { types: [], sites: [] };

let cached: Basket = EMPTY;
let cachedRaw: string | null = null;

function read(): Basket {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {}
  // Same string, same object: useSyncExternalStore needs a stable snapshot.
  if (raw === cachedRaw) return cached;
  cachedRaw = raw;
  try {
    const v = JSON.parse(raw ?? "null");
    cached = { types: Array.isArray(v?.types) ? v.types : [], sites: Array.isArray(v?.sites) ? v.sites : [] };
  } catch {
    cached = EMPTY;
  }
  return cached;
}

export function writeBasket(b: Basket) {
  try {
    localStorage.setItem(KEY, JSON.stringify(b));
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

export function toggleInBasket(kind: keyof Basket, id: string) {
  const b = read();
  const list = b[kind].includes(id) ? b[kind].filter((x) => x !== id) : [...b[kind], id];
  writeBasket({ ...b, [kind]: list });
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  // Another tab changed it.
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useBasket(): Basket {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}
