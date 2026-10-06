import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

// The preview card shown when the site's link is shared (WhatsApp, X, LinkedIn…).
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const dots = ["#d7ff3f", "#ff6338", "#6e8cff"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(circle at 85% 10%, rgba(110,140,255,0.35), transparent 50%), radial-gradient(circle at 0% 100%, rgba(255,99,56,0.25), transparent 55%), #0b0b0f",
          color: "#f4f1ea",
        }}
      >
        <div style={{ display: "flex", gap: 14 }}>
          {dots.map((c) => (
            <div key={c} style={{ width: 22, height: 22, borderRadius: 999, background: c }} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, letterSpacing: 6, textTransform: "uppercase", color: "#9a9d96" }}>
            {profile.hero.eyebrow}
          </div>
          <div style={{ display: "flex", fontSize: 120, fontWeight: 700, marginTop: 16, lineHeight: 1 }}>
            {profile.hero.first}
            <span style={{ color: "#d7ff3f", fontStyle: "italic", marginLeft: 28 }}>{profile.hero.accent}</span>
          </div>
          <div style={{ fontSize: 38, marginTop: 32, color: "#c4c7bf" }}>{profile.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
