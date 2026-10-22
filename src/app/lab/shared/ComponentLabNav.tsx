import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Check, ChevronDown, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";

export type LabNavComponent = {
  id: string;
  name: string;
  tag: string;
};

type LabNavValue = {
  components: LabNavComponent[];
  activeId: string;
  onSelect: (id: string) => void;
  onLibrary: () => void;
  prev: LabNavComponent | null;
  next: LabNavComponent | null;
};

const LabNavContext = createContext<LabNavValue | null>(null);

export function ComponentLabNavProvider({
  value,
  children,
}: {
  value: LabNavValue;
  children: ReactNode;
}) {
  return <LabNavContext.Provider value={value}>{children}</LabNavContext.Provider>;
}

export function useComponentLabNav() {
  return useContext(LabNavContext);
}

/** Centered component picker — replaces breadcrumb navigation. */
export function ComponentSwitcher({ className = "" }: { className?: string }) {
  const nav = useComponentLabNav();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!nav) return null;
  const current = nav.components.find((c) => c.id === nav.activeId);
  if (!current) return null;

  return (
    <div ref={rootRef} className={`relative inline-flex justify-center ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-[8px] rounded-full border border-[#e4e4ea] bg-white/90 px-[14px] py-[7px] shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:border-[#d0d0d8] hover:shadow-[0_4px_16px_rgba(15,23,42,0.06)] transition-all"
      >
        <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[12px] font-semibold tracking-[-0.01em] text-[#1a1a2e]">
          {current.name}
        </span>
        <ChevronDown
          className={`size-[13px] text-[#9ca3af] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 z-40 w-[min(320px,78vw)] rounded-[16px] border border-[#e8e8ed] bg-white/95 backdrop-blur-md p-[6px] shadow-[0_20px_50px_rgba(15,23,42,0.14)]"
        >
          <p className="px-[12px] pt-[8px] pb-[6px] font-['Plus_Jakarta_Sans',sans-serif] text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9ca3af]">
            Components
          </p>
          <ul className="max-h-[280px] overflow-y-auto">
            {nav.components.map((c) => {
              const on = c.id === nav.activeId;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={on}
                    onClick={() => {
                      nav.onSelect(c.id);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-[10px] rounded-[10px] px-[12px] py-[10px] text-left transition-colors ${
                      on ? "bg-[#f4f5f8]" : "hover:bg-[#f7f7f9]"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <p
                        className={`font-['Plus_Jakarta_Sans',sans-serif] text-[13px] tracking-[-0.01em] truncate ${
                          on ? "font-semibold text-[#0b1228]" : "font-medium text-[#374151]"
                        }`}
                      >
                        {c.name}
                      </p>
                      <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] text-[#9ca3af] truncate">
                        {c.tag}
                      </p>
                    </div>
                    {on && <Check className="size-[14px] text-[#001769] shrink-0" strokeWidth={2.4} />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

/** Prev / library / next — sits at the foot of a detail view. */
export function ComponentDetailFooter() {
  const nav = useComponentLabNav();
  if (!nav) return null;

  return (
    <div className="shrink-0 border-t border-[#ececf1] bg-[#f7f7f9]/92 backdrop-blur-sm">
      <div className="max-w-[1080px] mx-auto px-[20px] sm:px-[32px] h-[56px] flex items-center justify-between gap-[12px]">
        <button
          type="button"
          disabled={!nav.prev}
          onClick={() => nav.prev && nav.onSelect(nav.prev.id)}
          className="min-w-0 flex-1 inline-flex items-center gap-[8px] text-left disabled:opacity-30 disabled:pointer-events-none group"
        >
          <ChevronLeft className="size-[16px] text-[#9ca3af] group-hover:text-[#1a1a2e] transition-colors shrink-0" />
          <span className="min-w-0">
            <span className="block font-['Plus_Jakarta_Sans',sans-serif] text-[10px] uppercase tracking-[0.08em] text-[#9ca3af]">
              Previous
            </span>
            <span className="block font-['Plus_Jakarta_Sans',sans-serif] text-[13px] font-semibold tracking-[-0.01em] text-[#1a1a2e] truncate group-hover:text-[#001769] transition-colors">
              {nav.prev?.name ?? "—"}
            </span>
          </span>
        </button>

        <button
          type="button"
          onClick={nav.onLibrary}
          title="Back to library"
          className="shrink-0 size-[36px] rounded-full border border-[#e4e4ea] bg-white text-[#6b7280] hover:text-[#1a1a2e] hover:border-[#c8c8d0] hover:shadow-sm inline-flex items-center justify-center transition-all"
        >
          <LayoutGrid className="size-[15px]" />
        </button>

        <button
          type="button"
          disabled={!nav.next}
          onClick={() => nav.next && nav.onSelect(nav.next.id)}
          className="min-w-0 flex-1 inline-flex items-center justify-end gap-[8px] text-right disabled:opacity-30 disabled:pointer-events-none group"
        >
          <span className="min-w-0">
            <span className="block font-['Plus_Jakarta_Sans',sans-serif] text-[10px] uppercase tracking-[0.08em] text-[#9ca3af]">
              Next
            </span>
            <span className="block font-['Plus_Jakarta_Sans',sans-serif] text-[13px] font-semibold tracking-[-0.01em] text-[#1a1a2e] truncate group-hover:text-[#001769] transition-colors">
              {nav.next?.name ?? "—"}
            </span>
          </span>
          <ChevronRight className="size-[16px] text-[#9ca3af] group-hover:text-[#1a1a2e] transition-colors shrink-0" />
        </button>
      </div>
    </div>
  );
}
