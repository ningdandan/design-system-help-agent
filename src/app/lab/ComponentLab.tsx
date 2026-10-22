import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Highlighter,
  Layers,
  ListTree,
  MessageSquareMore,
  Search,
  Sparkles,
} from "lucide-react";
import {
  ComponentDetailFooter,
  ComponentLabNavProvider,
  ComponentSwitcher,
} from "./shared/ComponentLabNav";
import { DesignSpec } from "./dynamic-card/DesignSpec";
import { DynamicCardGallery } from "./dynamic-card/DynamicCardGallery";
import SpecSheet from "./in-chat-recommendations/SpecSheet";
import ChatDemo from "./in-chat-recommendations/ChatDemo";
import {
  RecommendationChips,
  type RecommendationChip,
} from "./in-chat-recommendations/RecommendationChips";
import {
  NudgePills,
  SAMPLE_NUDGE_PILLS,
} from "./nudge-ha/NudgePills";
import { NudgeHaPrototype, NudgeHaSpec } from "./nudge-ha/NudgeHaDesignSource";
import {
  DynamicCard,
  CardActions,
  CardPrimaryButton,
  CardSecondaryButton,
} from "./dynamic-card/DynamicCard";
import { PromptBarSpec } from "./prompt-bar/PromptBarSpec";
import { CategoryButtonsSpec } from "./category-buttons/CategoryButtonsSpec";
import { SearchSuggestionsSpec } from "./search-suggestions/SearchSuggestionsSpec";
import { SearchSummarySpec } from "./search-summary/SearchSummarySpec";
import { ComponentLabLanding } from "./ComponentLabLanding";
import { DemoExperience } from "../components/DemoExperience";

type ComponentId =
  | "prompt-bar"
  | "category-buttons"
  | "search-suggestions"
  | "search-summary"
  | "dynamic-card"
  | "in-chat"
  | "nudge-ha";
type DetailTab = "specs" | "demo";

type ComponentEntry = {
  id: ComponentId;
  name: string;
  tag: string;
  summary: string;
  status: "Ready" | "Prep";
  icon: ReactNode;
  tabs: DetailTab[];
};

const COMPONENTS: ComponentEntry[] = [
  {
    id: "prompt-bar",
    name: "Prompt bar",
    tag: "Home · Results",
    summary:
      "The primary ask control — glowing idle pill, expand on focus, submit into results, and follow-up under the summary.",
    status: "Prep",
    icon: <Search className="size-[18px]" />,
    tabs: ["specs"],
  },
  {
    id: "category-buttons",
    name: "Category buttons",
    tag: "Home · Topics",
    summary:
      "Frosted topic pills under the home prompt — open a short menu and hand the chosen intent to search.",
    status: "Prep",
    icon: <Layers className="size-[18px]" />,
    tabs: ["specs"],
  },
  {
    id: "search-suggestions",
    name: "Search bar suggestions",
    tag: "Home · Chat",
    summary:
      "Grouped list inside the expanded prompt — past searches, objects, and FAQs that filter as you type.",
    status: "Prep",
    icon: <ListTree className="size-[18px]" />,
    tabs: ["specs"],
  },
  {
    id: "search-summary",
    name: "Search summary",
    tag: "Results · Answer",
    summary:
      "Smart summary on search results — highlighted direct answer, inline citations, expand/collapse, feedback, and follow-up chips.",
    status: "Prep",
    icon: <Highlighter className="size-[18px]" />,
    tabs: ["specs"],
  },
  {
    id: "dynamic-card",
    name: "Dynamic cards",
    tag: "Chat · Actions",
    summary:
      "Structured action cards for guided tasks, receipts, and urgent insights inside conversation.",
    status: "Ready",
    icon: <CreditCard className="size-[18px]" />,
    tabs: ["specs", "demo"],
  },
  {
    id: "in-chat",
    name: "In-chat recommendations",
    tag: "Chat · Suggestions",
    summary:
      "AI suggestion chips below the composer — ranked, contextual actions the agent can send in one tap.",
    status: "Ready",
    icon: <MessageSquareMore className="size-[18px]" />,
    tabs: ["specs", "demo"],
  },
  {
    id: "nudge-ha",
    name: "Nudge pills",
    tag: "Help · Discovery",
    summary:
      "Blue topic pills with optional dropdowns — home, article, and chat placements for the help agent.",
    status: "Prep",
    icon: <Sparkles className="size-[18px]" />,
    tabs: ["specs", "demo"],
  },
];

function MiniPromptPreview() {
  return (
    <div className="pt-[36px] px-[8px] pointer-events-none">
      <div
        className="rounded-full px-[4px] py-[4px]"
        style={{
          backgroundImage: "linear-gradient(135deg, #c7d2fe 0%, #ddd6fe 45%, #fbcfe8 100%)",
          boxShadow: "0 8px 24px rgba(6,106,254,0.12)",
        }}
      >
        <div className="rounded-full bg-white h-[40px] px-[14px] flex items-center gap-[8px]">
          <Search className="size-[14px] text-[#9ca3af]" />
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[12px] text-[#9ca3af]">
            Ask anything…
          </span>
        </div>
      </div>
    </div>
  );
}

function MiniSummaryPreview() {
  return (
    <div className="pointer-events-none rounded-[12px] bg-white border border-[#e8e8ed] p-[12px] shadow-sm">
      <div className="flex items-center gap-[6px] mb-[8px]">
        <Sparkles className="size-[11px] text-[#001769]" />
        <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[10px] font-semibold text-[#6b7280]">
          Smart summary
        </span>
      </div>
      <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[12px] leading-[17px] text-[#1a1a2e]">
        Most holds are caused by{" "}
        <mark className="bg-[#dce8ff] text-[#001769] font-semibold px-[2px] rounded-[2px]">
          incomplete verification
        </mark>
        .
      </p>
    </div>
  );
}

function MiniDynamicPreview() {
  return (
    <div className="scale-[0.72] origin-top-left w-[138%] pointer-events-none">
      <DynamicCard
        accent="success"
        title="Password reset complete"
        badge={{ label: "Complete", tone: "success" }}
        footer={
          <CardActions
            secondary={<CardSecondaryButton>Undo</CardSecondaryButton>}
            primary={<CardPrimaryButton>View audit log</CardPrimaryButton>}
          />
        }
      >
        <div className="flex items-center gap-[8px] rounded-[10px] bg-green-50 border border-green-100 px-[12px] py-[8px]">
          <CheckCircle2 className="size-[14px] text-[#096] shrink-0" />
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[13px] text-[#096]">
            Password reset successfully
          </span>
        </div>
      </DynamicCard>
    </div>
  );
}

function MiniChipsPreview() {
  const chips: RecommendationChip[] = [
    { id: "1", label: "Release hold" },
    { id: "2", label: "Goodwill credit" },
    { id: "3", label: "Schedule callback" },
  ];
  return (
    <div className="pointer-events-none pt-[8px]">
      <RecommendationChips chips={chips} />
    </div>
  );
}

function MiniNudgePreview() {
  return (
    <div className="pointer-events-none pt-[4px]">
      <NudgePills pills={SAMPLE_NUDGE_PILLS.slice(0, 3)} onSelect={() => {}} compact />
    </div>
  );
}

function MiniSuggestionsPreview() {
  return (
    <div className="pointer-events-none rounded-[14px] bg-white border border-[#e8e8ed] overflow-hidden shadow-sm">
      <div className="h-[36px] px-[12px] flex items-center gap-[8px] border-b border-[#f3f4f6]">
        <Search className="size-[12px] text-[#9ca3af]" />
        <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] text-[#9ca3af]">
          Ask anything…
        </span>
      </div>
      <div className="px-[12px] py-[8px] space-y-[6px]">
        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[9px] font-semibold uppercase tracking-[0.06em] text-[#9ca3af]">
          Past searches
        </p>
        <div className="flex items-center gap-[8px]">
          <span className="size-[22px] rounded-[6px] bg-[#F3F4F6]" />
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] text-[#374151]">
            Login issues
          </span>
        </div>
        <div className="flex items-center gap-[8px]">
          <span className="size-[22px] rounded-[6px] bg-[#F3F4F6]" />
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] text-[#374151]">
            Update payment
          </span>
        </div>
      </div>
    </div>
  );
}

function MiniCategoryPreview() {
  return (
    <div className="pt-[48px] px-[8px] pointer-events-none flex flex-wrap gap-[8px] justify-center">
      {["Getting Started", "Billing & Subscriptions"].map((label) => (
        <span
          key={label}
          className="bg-white/80 border border-gray-200 shadow-sm rounded-full px-[12px] py-[7px] font-['Plus_Jakarta_Sans',sans-serif] text-[11px] text-[#364153]"
        >
          {label}
        </span>
      ))}
    </div>
  );
}

function ComponentPreviewThumb({ id }: { id: ComponentId }) {
  if (id === "prompt-bar") return <MiniPromptPreview />;
  if (id === "category-buttons") return <MiniCategoryPreview />;
  if (id === "search-suggestions") return <MiniSuggestionsPreview />;
  if (id === "search-summary") return <MiniSummaryPreview />;
  if (id === "dynamic-card") return <MiniDynamicPreview />;
  if (id === "in-chat") return <MiniChipsPreview />;
  return <MiniNudgePreview />;
}

/**
 * Components library body — global Demo/Components nav lives in App.
 */
export function ComponentLab() {
  const [active, setActive] = useState<ComponentId | null>(null);
  const [tab, setTab] = useState<DetailTab>("specs");

  const entry = COMPONENTS.find((c) => c.id === active) ?? null;
  const activeIndex = entry ? COMPONENTS.findIndex((c) => c.id === entry.id) : -1;

  const openComponent = (id: ComponentId) => {
    setActive(id);
    setTab("specs");
  };

  const labNavValue = useMemo(() => {
    if (!entry || activeIndex < 0) return null;
    return {
      components: COMPONENTS.map((c) => ({ id: c.id, name: c.name, tag: c.tag })),
      activeId: entry.id,
      onSelect: (id: string) => openComponent(id as ComponentId),
      onLibrary: () => setActive(null),
      prev: activeIndex > 0 ? COMPONENTS[activeIndex - 1] : null,
      next:
        activeIndex < COMPONENTS.length - 1 ? COMPONENTS[activeIndex + 1] : null,
    };
  }, [entry, activeIndex]);

  return (
    <div className="h-full min-h-0 w-full overflow-hidden flex flex-col bg-[#f7f7f9]">
      <style>{`@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`}</style>

      {!entry && (
        <main className="flex-1 min-h-0 overflow-y-auto">
          <ComponentLabLanding
            componentCount={COMPONENTS.length}
            onBrowse={() => {
              document
                .getElementById("component-library-grid")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />

          <section
            className="relative w-full py-[96px] sm:py-[120px]"
            style={{
              background:
                "linear-gradient(180deg, #12121f 0%, #16162a 48%, #12121f 100%)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 55% 45% at 50% 18%, rgba(37,56,140,0.28) 0%, transparent 70%)",
              }}
            />
            <div className="relative max-w-[1080px] w-full mx-auto px-[24px]">
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[26px] sm:text-[30px] font-semibold leading-[1.15] tracking-[-0.03em] text-white/95 text-center mb-[40px] sm:mb-[48px]">
                Live experience
              </h2>
              <DemoExperience variant="embed" />
            </div>
          </section>

          <section id="component-library-grid" className="relative w-full overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 50% at 50% -5%, rgba(214,239,252,0.9) 0%, transparent 55%), radial-gradient(ellipse 45% 40% at 8% 70%, rgba(232,245,240,0.75) 0%, transparent 50%), radial-gradient(ellipse 50% 45% at 92% 55%, rgba(216,228,255,0.7) 0%, transparent 52%), linear-gradient(180deg, #f4f6fb 0%, #eef1f8 40%, #f7f7f9 100%)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.22]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(26,26,46,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,46,0.035) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
                maskImage: "linear-gradient(180deg, black 0%, transparent 78%)",
              }}
            />

            <div className="relative max-w-[1080px] w-full mx-auto px-[24px] pt-[96px] sm:pt-[120px] pb-[100px] sm:pb-[120px]">
              <div className="mb-[40px] sm:mb-[48px] text-center">
                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[26px] sm:text-[30px] font-semibold leading-[1.15] tracking-[-0.03em] text-[#0b1228]">
                  Component library
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[24px] sm:gap-[28px]">
                {COMPONENTS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => openComponent(c.id)}
                    className="group text-left rounded-[22px] border border-white/80 bg-white/80 backdrop-blur-[8px] overflow-hidden shadow-[0_8px_32px_rgba(15,23,42,0.05)] hover:bg-white hover:border-white hover:shadow-[0_20px_50px_rgba(15,23,42,0.09)] transition-all duration-300"
                  >
                    <div className="h-[176px] border-b border-[#eef0f5] px-[20px] pt-[22px] overflow-hidden relative"
                      style={{
                        background:
                          "linear-gradient(165deg, #f8f9fc 0%, #eef2f9 55%, #f5f7fb 100%)",
                      }}
                    >
                      <ComponentPreviewThumb id={c.id} />
                      <div className="absolute inset-x-0 bottom-0 h-[52px] bg-gradient-to-t from-[#f5f7fb] to-transparent pointer-events-none" />
                    </div>
                    <div className="p-[22px]">
                      <div className="flex items-center justify-between gap-[8px] mb-[12px]">
                        <span className="inline-flex items-center gap-[6px] font-['Plus_Jakarta_Sans',sans-serif] text-[11px] font-medium uppercase tracking-[0.08em] text-[#9ca3af]">
                          <span className="text-[#1a1a2e]/70">{c.icon}</span>
                          {c.tag}
                        </span>
                        <span className="rounded-full bg-[#f0f2f7]/90 px-[9px] py-[3px] font-['Plus_Jakarta_Sans',sans-serif] text-[10px] font-medium text-[#7b8494]">
                          {c.status}
                        </span>
                      </div>
                      <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-[17px] font-semibold tracking-[-0.02em] text-[#0b1228] mb-[8px] group-hover:text-[#001769] transition-colors">
                        {c.name}
                      </h3>
                      <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[13px] leading-[20px] text-[#6b7280] mb-[18px]">
                        {c.summary}
                      </p>
                      <span className="inline-flex items-center gap-[6px] font-['Plus_Jakarta_Sans',sans-serif] text-[12px] font-medium text-[#1a1a2e]/75 group-hover:text-[#001769] transition-colors">
                        View specs
                        <ArrowRight className="size-[12px] transition-transform group-hover:translate-x-[2px]" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {entry && labNavValue && (
        <ComponentLabNavProvider value={labNavValue}>
          <main className="flex-1 min-h-0 flex flex-col bg-[#f7f7f9]">
            {entry.tabs.length > 1 && (
              <div className="shrink-0 flex justify-center pt-[14px] pb-[2px]">
                <div className="flex items-center gap-[3px] rounded-full p-[3px] bg-[#ececf1]/90 border border-[#e4e4ea]">
                  {entry.tabs.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTab(t)}
                      className={`rounded-full px-[14px] py-[6px] font-['Plus_Jakarta_Sans',sans-serif] text-[11px] font-semibold transition-colors ${
                        tab === t
                          ? "bg-[#1a1a2e] text-white shadow-sm"
                          : "text-[#6b7280] hover:text-[#1a1a2e]"
                      }`}
                    >
                      {t === "specs" ? "Specs" : "Demo"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
              {tab === "demo" ? (
                <>
                  <div className="shrink-0 flex justify-center pt-[18px] pb-[8px]">
                    <ComponentSwitcher />
                  </div>
                  <div className="flex-1 min-h-0 overflow-hidden">
                    {entry.id === "dynamic-card" && <DynamicCardGallery />}
                    {entry.id === "in-chat" && (
                      <ChatDemo onBack={() => setTab("specs")} />
                    )}
                    {entry.id === "nudge-ha" && <NudgeHaPrototype />}
                  </div>
                </>
              ) : (
                <div className="flex-1 min-h-0 overflow-hidden">
                  {entry.id === "prompt-bar" && <PromptBarSpec />}
                  {entry.id === "category-buttons" && <CategoryButtonsSpec />}
                  {entry.id === "search-suggestions" && <SearchSuggestionsSpec />}
                  {entry.id === "search-summary" && <SearchSummarySpec />}
                  {entry.id === "dynamic-card" && <DesignSpec />}
                  {entry.id === "in-chat" && (
                    <SpecSheet onViewDemo={() => setTab("demo")} />
                  )}
                  {entry.id === "nudge-ha" && <NudgeHaSpec />}
                </div>
              )}
            </div>

            <ComponentDetailFooter />
          </main>
        </ComponentLabNavProvider>
      )}
    </div>
  );
}
