"use client";

import { useRef, type HTMLAttributes } from "react";

export default function TiltCard({ children, className = "", ...rest }: HTMLAttributes<HTMLDivElement> & { "data-reveal"?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
    el.style.setProperty("--glow-x", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--glow-y", `${(y + 0.5) * 100}%`);
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} {...rest} className={`tilt-card ${className}`}>
      {children}
    </div>
  );
}
