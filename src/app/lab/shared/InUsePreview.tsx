import type { ReactNode } from "react";
import { SpecCanvas, SpecChrome } from "./SpecPage";

/**
 * Browser-framed “component in use” hero for Spec pages.
 *
 * CSS filters cascade and cannot be undone on descendants, so keep page
 * chrome/context inside {@link InUseScene} and the featured component in
 * {@link InUseSpotlight} as a sibling — never nest spotlight under scene.
 */
export function InUsePreview({
  url,
  label = "In use",
  children,
  minH = 300,
  bg = "#F5F5F3",
}: {
  url: string;
  /** Small caption above the browser frame */
  label?: string;
  children: ReactNode;
  minH?: number;
  bg?: string;
}) {
  return (
    <div className="mt-12 w-full">
      <div className="flex items-center justify-center gap-[10px] mb-4">
        <span className="relative flex size-[7px]">
          <span className="absolute inset-0 rounded-full bg-emerald-400/70 animate-ping" />
          <span className="relative size-[7px] rounded-full bg-emerald-500" />
        </span>
        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[12px] font-semibold uppercase tracking-[0.1em] text-[#9ca3af]">
          {label}
        </p>
      </div>

      <div className="relative">
        <div
          className="absolute -inset-[1px] rounded-[22px] opacity-70 blur-[18px] pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(214,239,252,0.85), rgba(216,228,255,0.55), rgba(251,207,232,0.35))",
          }}
        />
        <div
          className="relative rounded-[20px] overflow-hidden w-full bg-white"
          style={{
            border: "1px solid rgba(228,228,234,0.95)",
            boxShadow:
              "0 24px 60px rgba(15,23,42,0.10), 0 2px 8px rgba(15,23,42,0.04)",
          }}
        >
          <SpecChrome url={url} />
          <SpecCanvas minH={minH} bg={bg}>
            {children}
          </SpecCanvas>
        </div>
      </div>
    </div>
  );
}

/** Surrounding page UI — forced grayscale so the spotlight reads first. */
export function InUseScene({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{ filter: "grayscale(1)", WebkitFilter: "grayscale(1)" }}
    >
      {children}
    </div>
  );
}

/** Featured component — full color; must be a sibling of {@link InUseScene}. */
export function InUseSpotlight({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
