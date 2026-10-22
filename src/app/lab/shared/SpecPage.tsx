import { useState, useEffect, useRef, type ReactNode } from "react";
import { ComponentSwitcher, useComponentLabNav } from "./ComponentLabNav";

/** Looping step driver used by animated spec widgets. */
export function useAnimLoop(inView: boolean, totalMs: number, timestamps: number[]) {
  const [step, setStep] = useState(0);
  const tsRef = useRef(timestamps);
  tsRef.current = timestamps;

  useEffect(() => {
    if (!inView) {
      setStep(0);
      return;
    }
    const start = Date.now();
    const last = { s: -1 };
    let raf: number;
    const tick = () => {
      const t = (Date.now() - start) % totalMs;
      let s = 0;
      for (let i = 0; i < tsRef.current.length; i++) {
        if (t >= tsRef.current[i]) s = i;
      }
      if (last.s !== s) {
        last.s = s;
        setStep(s);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, totalMs]);

  return step;
}

export function SpecStencil({
  w,
  h = 7,
  opacity = 0.22,
}: {
  w: string | number;
  h?: number;
  opacity?: number;
}) {
  return (
    <div style={{ width: w, height: h, background: "#9ca3af", borderRadius: 3, opacity }} />
  );
}

export function SpecChrome({ url }: { url: string }) {
  return (
    <div
      className="px-3 py-2 flex items-center gap-2"
      style={{ background: "#f3f4f6", borderBottom: "1px solid #e5e7eb" }}
    >
      <div className="flex gap-1">
        {["#FF5F57", "#FFBD2E", "#28C840"].map((c) => (
          <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
        ))}
      </div>
      <div
        className="flex-1 max-w-[220px] mx-auto rounded px-2 py-0.5"
        style={{ background: "#ffffff", border: "1px solid #e5e7eb" }}
      >
        <span className="block truncate text-[9px]" style={{ color: "#6b7280" }}>
          {url}
        </span>
      </div>
    </div>
  );
}

export function SpecShell({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        border: "1px solid #e5e7eb",
        boxShadow: "0 12px 40px rgba(15,23,42,0.08)",
        background: "#ffffff",
      }}
    >
      <SpecChrome url={url} />
      {children}
    </div>
  );
}

export function SpecCanvas({
  children,
  minH = 240,
  bg = "#F5F5F3",
}: {
  children: ReactNode;
  minH?: number;
  bg?: string;
}) {
  return (
    <div style={{ background: bg, minHeight: minH, position: "relative" }}>{children}</div>
  );
}

export type SpecSection = {
  num: string;
  tag: string;
  title: string;
  desc: string;
  bullets: string[];
  Widget: (props: { inView: boolean }) => ReactNode;
};

/** Scroll-highlight design-spec page used across the Components library. */
export function SpecPage({
  monoLabel,
  title,
  subtitle,
  inUse,
  sections,
}: {
  monoLabel: string;
  title: string;
  subtitle: string;
  /** Optional “component in use” hero rendered under the title block */
  inUse?: ReactNode;
  sections: SpecSection[];
}) {
  const [activeIdx, setActiveIdx] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const update = () => {
      const cRect = container.getBoundingClientRect();
      const mid = cRect.top + cRect.height / 2;
      let best = -1;
      let bestDist = Infinity;
      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActiveIdx(best);
    };
    update();
    container.addEventListener("scroll", update, { passive: true });
    return () => container.removeEventListener("scroll", update);
  }, []);

  const labNav = useComponentLabNav();

  return (
    <div
      ref={containerRef}
      className="h-full min-h-0 overflow-y-auto font-['Plus_Jakarta_Sans',sans-serif]"
      style={{ background: "#f7f7f9" }}
    >
      <div className="max-w-[1080px] mx-auto px-10 pt-14 pb-10 flex flex-col items-center text-center">
        {labNav ? (
          <div className="mb-[18px]">
            <ComponentSwitcher />
          </div>
        ) : (
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#9ca3af] mb-[10px]">
            {monoLabel}
          </p>
        )}
        <h2 className="text-[28px] sm:text-[32px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#0b1228] mb-[14px] max-w-[720px]">
          {title}
        </h2>
        <p className="text-[15px] leading-[24px] text-[#5b6475] max-w-[520px]">
          {subtitle}
        </p>
        {inUse && <div className="w-full text-left mt-2">{inUse}</div>}
      </div>

      <div className="max-w-[1080px] mx-auto px-10 pb-32">
        {sections.map((s, i) => {
          const active = activeIdx === i;
          return (
            <div
              key={s.num}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className="py-24 grid grid-cols-2 gap-20 items-center"
              style={{
                borderTop: "1px solid rgba(0,0,0,0.06)",
                opacity: activeIdx === -1 || active ? 1 : 0.28,
                filter: active ? "none" : "blur(0.3px)",
                transition: "opacity 0.5s ease, filter 0.5s ease",
              }}
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="text-[12px] font-semibold tabular-nums transition-colors duration-400"
                    style={{ color: active ? "#001769" : "#c4c4c8" }}
                  >
                    {s.num}
                  </span>
                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full transition-all duration-400"
                    style={{
                      background: active ? "rgba(0,23,105,0.08)" : "#f0f0f4",
                      color: active ? "#001769" : "#9ca3af",
                      border: `1px solid ${
                        active ? "rgba(0,23,105,0.16)" : "#e4e4ea"
                      }`,
                    }}
                  >
                    {s.tag}
                  </span>
                </div>
                <h3
                  className="text-[22px] font-bold leading-[1.15] tracking-[-0.025em] mb-4 transition-colors duration-400"
                  style={{ color: active ? "#1a1a2e" : "#b0b0b8" }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-[14px] leading-[22px] mb-6 transition-colors duration-400"
                  style={{ color: active ? "#5b6475" : "#c0c0c6" }}
                >
                  {s.desc}
                </p>
                <ul className="flex flex-col gap-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <div
                        className="w-1 h-1 rounded-full flex-shrink-0 mt-[8px] transition-all duration-400"
                        style={{ background: active ? "#001769" : "#d1d5db" }}
                      />
                      <span
                        className="text-[13px] leading-[20px] transition-colors duration-400"
                        style={{ color: active ? "#374151" : "#c0c0c6" }}
                      >
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  transition: "transform 0.55s cubic-bezier(0.34,1.56,0.64,1)",
                  transform: active
                    ? "scale(1) translateY(0)"
                    : "scale(0.97) translateY(6px)",
                }}
              >
                <s.Widget inView={active} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
