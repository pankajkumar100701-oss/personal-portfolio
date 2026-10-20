"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { highlight } from "@/lib/highlight";

// A template's page body: Preview (the template running in a sandboxed
// iframe) and Code (that same HTML, numbered), with copy, download and
// full-screen actions. What's copied is exactly what's previewed (the preview
// route serves the same file with a guard that keeps its links inside the frame).
export default function TemplateViewer({ slug, title, code }: { slug: string; title: string; code: string }) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {}
  };
  const download = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([code], { type: "text/html" }));
    a.download = `${slug}.html`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  // Full screen: the preview stage covers the window (and, where the browser
  // allows it, goes truly full screen, hiding its bars). Phones without the
  // Fullscreen API (iPhone Safari) still get the window-filling stage.
  // Close, Esc or the browser's own exit all leave it.
  const stage = useRef<HTMLDivElement>(null);
  const [full, setFull] = useState(false);
  const openFull = () => {
    setTab("preview");
    setFull(true);
  };
  const closeFull = () => {
    setFull(false);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  };
  useEffect(() => {
    if (!full) return;
    stage.current?.requestFullscreen?.().catch(() => {});
    const html = document.documentElement;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFull(false);
    const onChange = () => !document.fullscreenElement && setFull(false);
    window.addEventListener("keydown", onKey);
    document.addEventListener("fullscreenchange", onChange);
    return () => {
      html.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("fullscreenchange", onChange);
    };
  }, [full]);

  // Only tokenised once the Code tab is first opened.
  const [codeSeen, setCodeSeen] = useState(false);
  if (tab === "code" && !codeSeen) setCodeSeen(true);
  const lines = useMemo(() => (codeSeen ? highlight(code) : []), [code, codeSeen]);

  return (
    <div className="t-viewer m-rise">
      <div className="t-bar">
        <div className="t-tabs" role="tablist" aria-label="View">
          <button type="button" role="tab" id="t-tab-preview" aria-controls="t-panel" aria-selected={tab === "preview"} onClick={() => setTab("preview")}>
            Preview
          </button>
          <button type="button" role="tab" id="t-tab-code" aria-controls="t-panel" aria-selected={tab === "code"} onClick={() => setTab("code")}>
            Code
          </button>
        </div>
        <div className="t-actions">
          <button type="button" onClick={copy} className="t-act t-act-main">
            {copied ? "Copied ✓" : "Copy code"}
          </button>
          <button type="button" onClick={download} className="t-act">
            Download
          </button>
          <button type="button" onClick={openFull} className="t-act t-act-wide">
            Full screen ⤢
          </button>
        </div>
      </div>

      {tab === "preview" ? (
        <div ref={stage} className="t-stage" id="t-panel" role="tabpanel" aria-labelledby="t-tab-preview" data-full={full || undefined}>
          <div className="m-browser-bar t-browser-bar">
            <i />
            <i />
            <i />
            <span>{slug}.html</span>
            {full ? (
              <div className="t-full-acts">
                <a href={`/templates/${slug}/preview`} target="_blank" rel="noopener" className="t-full-btn">
                  New tab ↗
                </a>
                <button type="button" onClick={closeFull} className="t-full-btn t-full-close" autoFocus>
                  Close ✕
                </button>
              </div>
            ) : (
              <button type="button" onClick={openFull} className="t-full-btn" aria-label="View full screen">
                ⤢ Full screen
              </button>
            )}
          </div>
          <iframe title={`${title} — live preview`} src={`/templates/${slug}/preview`} sandbox="allow-scripts allow-forms" className="t-frame" />
        </div>
      ) : (
        <div className="t-editor" id="t-panel" role="tabpanel" aria-labelledby="t-tab-code">
          <div className="t-editor-bar" aria-hidden>
            <i />
            <i />
            <i />
            <span>{slug}.html</span>
          </div>
          <pre className="t-code" tabIndex={0} aria-label={`${title} source code`}>
            <code>
              {lines.map((l, i) => (
                <span key={i} className="t-line">
                  <b aria-hidden>{i + 1}</b>
                  {l.length === 0
                    ? " "
                    : l.map((tok, k) =>
                        tok.c ? (
                          <span key={k} className={`hl-${tok.c}`}>
                            {tok.t}
                          </span>
                        ) : (
                          tok.t
                        ),
                      )}
                </span>
              ))}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
}
