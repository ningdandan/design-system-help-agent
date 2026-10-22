import { Building2, MessageSquare, Search } from "lucide-react";

export type MaturityMode = "current" | "search-enhanced" | "conversational";

const MODE_ORDER: MaturityMode[] = ["current", "search-enhanced", "conversational"];

interface MaturityToggleProps {
  mode: MaturityMode;
  onChange: (mode: MaturityMode) => void;
  /** Vertical rail on the left of the stage. */
  orientation?: "horizontal" | "vertical";
  /** Optional label overrides (e.g. Components homepage slider). */
  labels?: Partial<Record<MaturityMode, string>>;
  /**
   * Sequential evolution graphic (1 → 2 → 3) instead of parallel tabs.
   * Intended for the Components live-experience strip.
   */
  sequential?: boolean;
}

/** Top-level maturity spectrum tabs. */
export function MaturityToggle({
  mode,
  onChange,
  orientation = "horizontal",
  labels,
  sequential = false,
}: MaturityToggleProps) {
  const options: {
    id: MaturityMode;
    label: string;
    icon: typeof Building2;
  }[] = [
    {
      id: "current",
      label: labels?.current ?? "Current contact center",
      icon: Building2,
    },
    {
      id: "search-enhanced",
      label: labels?.["search-enhanced"] ?? "Search enhanced",
      icon: Search,
    },
    {
      id: "conversational",
      label: labels?.conversational ?? "Fully conversational",
      icon: MessageSquare,
    },
  ];

  const vertical = orientation === "vertical";
  const activeIdx = MODE_ORDER.indexOf(mode);

  if (sequential && !vertical) {
    return (
      <div
        role="tablist"
        aria-label="Experience maturity path"
        className="flex items-center justify-center w-full max-w-[640px]"
      >
        {options.map(({ id, label }, i) => {
          const active = mode === id;
          const passed = i < activeIdx;
          return (
            <div key={id} className="contents">
              {i > 0 && (
                <div
                  className="mx-[6px] sm:mx-[10px] h-px w-[16px] sm:w-[28px] shrink-0 self-center transition-colors duration-300"
                  style={{
                    background:
                      passed || active
                        ? "rgba(255,255,255,0.35)"
                        : "rgba(255,255,255,0.12)",
                  }}
                  aria-hidden
                />
              )}
              <button
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onChange(id)}
                className="group flex flex-col items-center gap-[8px] px-[10px] sm:px-[14px] py-[6px] transition-opacity duration-300"
                style={{ opacity: active ? 1 : passed ? 0.72 : 0.42 }}
              >
                <span
                  className="font-['Plus_Jakarta_Sans',sans-serif] text-[10px] font-medium tracking-[0.14em] uppercase tabular-nums transition-colors"
                  style={{
                    color: active ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.35)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-['Plus_Jakarta_Sans',sans-serif] text-[13px] sm:text-[14px] tracking-[-0.02em] whitespace-nowrap transition-colors ${
                    active
                      ? "font-semibold text-white"
                      : "font-medium text-white/70 group-hover:text-white/90"
                  }`}
                >
                  {label}
                </span>
                <span
                  className="h-[2px] w-full max-w-[72px] rounded-full transition-all duration-300"
                  style={{
                    background: active ? "#fff" : "transparent",
                    opacity: active ? 1 : 0,
                  }}
                />
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      role="tablist"
      aria-label="Experience maturity"
      className={`flex rounded-[14px] bg-[#e8e8ed] border border-[#d8d8e0] shrink-0 ${
        vertical
          ? "flex-col items-stretch gap-[4px] p-[5px] w-full"
          : "flex-row items-center gap-[4px] p-[5px] sm:gap-[6px] w-full max-w-[720px]"
      }`}
    >
      {options.map(({ id, label, icon: Icon }) => {
        const active = mode === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(id)}
            className={`flex items-center gap-[8px] rounded-[10px] transition-all text-left ${
              vertical
                ? "w-full px-[12px] py-[10px]"
                : "flex-1 justify-center px-[12px] sm:px-[16px] py-[10px]"
            } ${
              active
                ? "bg-white text-[#1a1a2e] shadow-[0px_1px_3px_rgba(0,0,0,0.08)]"
                : "text-[#6b7280] hover:text-[#374151]"
            }`}
          >
            <Icon className="size-[14px] shrink-0" strokeWidth={2.2} />
            <span
              className={`font-['Plus_Jakarta_Sans',sans-serif] font-semibold ${
                vertical
                  ? "text-[12px] leading-[16px] whitespace-normal"
                  : "text-[12px] sm:text-[13px] whitespace-nowrap"
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
