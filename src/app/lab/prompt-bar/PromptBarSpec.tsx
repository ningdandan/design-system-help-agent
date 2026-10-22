import { AnimatePresence, motion } from "motion/react";
import { Mic, Phone, PhoneIncoming, PhoneOutgoing, Search, Send, Sparkles } from "lucide-react";
import {
  SpecCanvas,
  SpecPage,
  SpecShell,
  SpecStencil,
  useAnimLoop,
  type SpecSection,
} from "../shared/SpecPage";
import {
  InUsePreview,
  InUseScene,
  InUseSpotlight,
} from "../shared/InUsePreview";

const GRADIENT =
  "linear-gradient(135deg, #c7d2fe 0%, #ddd6fe 45%, #fbcfe8 100%)";

/**
 * Matches the live demo chrome:
 * gradient (or white when focused) is the parent — white input field and
 * round action sit side-by-side as children inside that border.
 * Action = Send when no phone channel · Phone when multi-channel escalation is on.
 */
function PromptChrome({
  focused,
  typed,
  maxW = 360,
  large = false,
  action = "send",
  actionHot = false,
  showAction = true,
}: {
  focused: boolean;
  typed: string;
  maxW?: number;
  large?: boolean;
  /** Round action button mode (sibling of the input, inside the gradient) */
  action?: "send" | "phone";
  actionHot?: boolean;
  showAction?: boolean;
}) {
  const icon = large ? 15 : 13;
  const text = large ? 14 : 12;
  const actionSize = large ? 48 : 40;
  const ActionIcon = action === "phone" ? Phone : Send;

  return (
    <div
      className="mx-auto w-full transition-all duration-300"
      style={{
        maxWidth: maxW,
        borderRadius: focused ? 20 : 999,
        padding: focused ? "4px 4px 4px 4px" : "4px 8px 4px 4px",
        backgroundImage: focused ? "none" : GRADIENT,
        backgroundColor: focused ? "#fff" : "transparent",
        boxShadow: focused
          ? "0 8px 28px rgba(0,23,105,0.10)"
          : "0 10px 32px rgba(6,106,254,0.14)",
      }}
    >
      <div className="flex items-center gap-1.5 min-w-0">
        <div
          className="flex-1 min-w-0 flex items-center gap-2 px-3"
          style={{
            background: "#fff",
            borderRadius: focused ? 14 : 999,
            minHeight: large ? 48 : 40,
          }}
        >
          <Search size={icon} style={{ color: "#9CA3AF", flexShrink: 0 }} />
          <span
            className="flex-1 truncate"
            style={{ color: typed ? "#111827" : "#9CA3AF", fontSize: text }}
          >
            {typed || "Ask anything about your account…"}
          </span>
          <Mic size={icon} style={{ color: "#9CA3AF", flexShrink: 0 }} />
        </div>

        {showAction && (
          <motion.div
            animate={{
              scale: actionHot ? 1.05 : 1,
              background: actionHot ? "#001769" : "#ffffff",
            }}
            className="shrink-0 rounded-full flex items-center justify-center"
            style={{
              width: actionSize,
              height: actionSize,
            }}
          >
            <ActionIcon
              size={large ? 16 : 14}
              color={actionHot ? "#fff" : "#4A5565"}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function CallChoiceWidget({ highlight }: { highlight: number }) {
  const options = [
    {
      icon: PhoneOutgoing,
      title: "Call us",
      desc: "Connect to an agent right now",
    },
    {
      icon: PhoneIncoming,
      title: "Have us call you",
      desc: "We’ll ring you back in a few minutes",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.98 }}
      className="mx-auto w-full max-w-[300px] mt-3 rounded-2xl bg-white overflow-hidden"
      style={{
        border: "1px solid #E8E8ED",
        boxShadow: "0 16px 40px rgba(15,23,42,0.12)",
      }}
    >
      <div className="px-3.5 pt-3 pb-2">
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.08em]"
          style={{ color: "#9CA3AF" }}
        >
          Start a call
        </p>
        <p className="text-[12px] mt-0.5" style={{ color: "#374151" }}>
          Choose how you’d like to connect
        </p>
      </div>
      <div className="px-2 pb-2 space-y-1">
        {options.map((o, i) => {
          const Icon = o.icon;
          const on = highlight === i;
          return (
            <div
              key={o.title}
              className="flex items-start gap-2.5 rounded-xl px-2.5 py-2.5 transition-colors"
              style={{
                background: on ? "#EEF2FF" : "transparent",
              }}
            >
              <div
                className="size-8 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: on ? "#001769" : "#F3F4F6",
                }}
              >
                <Icon size={14} color={on ? "#fff" : "#4A5565"} />
              </div>
              <div className="min-w-0">
                <p
                  className="text-[12px] font-semibold"
                  style={{ color: on ? "#001769" : "#111827" }}
                >
                  {o.title}
                </p>
                <p className="text-[10px]" style={{ color: "#6B7280" }}>
                  {o.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function SuggestionPanel({ highlight }: { highlight: number }) {
  const groups = [
    {
      label: "Topics",
      items: ["Reset password", "Update payment method", "Cancel plan"],
    },
    {
      label: "Objects",
      items: ["Account · Alex Rivera", "Device · Living room TV"],
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: -6, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: -4, height: 0 }}
      className="mx-auto w-full max-w-[300px] mt-2 overflow-hidden"
    >
      <div
        className="rounded-2xl bg-white px-3 py-3 space-y-3"
        style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
      >
        {groups.map((g) => (
          <div key={g.label}>
            <p
              className="text-[9px] font-semibold uppercase tracking-[0.08em] mb-1.5 px-1"
              style={{ color: "#9CA3AF" }}
            >
              {g.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {g.items.map((item, i) => {
                const idx = g.label === "Topics" ? i : i + 3;
                const on = highlight === idx;
                return (
                  <div
                    key={item}
                    className="rounded-lg px-2 py-1.5 text-[11px] transition-colors"
                    style={{
                      background: on ? "#EEF2FF" : "transparent",
                      color: on ? "#001769" : "#374151",
                      fontWeight: on ? 600 : 400,
                    }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/** 01 — Resting glow pill + outer action */
function WIdle({ inView }: { inView: boolean }) {
  const step = useAnimLoop(inView, 5200, [0, 1800, 3600]);
  const pulse = step === 1;
  return (
    <SpecShell url="help.acme.com">
      <SpecCanvas minH={220}>
        <div className="px-5 pt-8 pb-6 flex flex-col items-center gap-4">
          <SpecStencil w={120} h={10} opacity={0.22} />
          <SpecStencil w={180} h={7} opacity={0.12} />
          <motion.div
            animate={{ scale: pulse ? 1.02 : 1, y: pulse ? -2 : 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <PromptChrome focused={false} typed="" action="send" />
          </motion.div>
        </div>
      </SpecCanvas>
    </SpecShell>
  );
}

/** 02 — Focus expands into grouped suggestions */
function WExpand({ inView }: { inView: boolean }) {
  const step = useAnimLoop(inView, 7000, [0, 900, 2600, 4800]);
  const focused = step >= 1;
  return (
    <SpecShell url="help.acme.com">
      <SpecCanvas minH={280}>
        <div className="px-5 pt-6 pb-5">
          <PromptChrome focused={focused} typed="" action="send" />
          <AnimatePresence>
            {focused && <SuggestionPanel highlight={step === 2 ? 1 : -1} />}
          </AnimatePresence>
        </div>
      </SpecCanvas>
    </SpecShell>
  );
}

/** 03 — Type → outer send → results (no phone channel) */
function WSubmit({ inView }: { inView: boolean }) {
  const step = useAnimLoop(inView, 7800, [0, 900, 2800, 3600, 6800]);
  const typed =
    step === 0 ? "" : step === 1 ? "payout on hold" : "Why is my payout on hold?";
  const showResults = step >= 3;
  const sendHot = step === 2;
  return (
    <SpecShell url={showResults ? "help.acme.com/search" : "help.acme.com"}>
      <SpecCanvas minH={260} bg={showResults ? "#F8F8FA" : "#F5F5F3"}>
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="compose"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              className="px-5 pt-10 pb-8"
            >
              <PromptChrome
                focused
                typed={typed}
                action="send"
                actionHot={sendHot || !!typed}
              />
              {step === 2 && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-center text-[10px] font-semibold"
                  style={{ color: "#001769" }}
                >
                  In-shell send commits the ask
                </motion.p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 pt-4 pb-5 space-y-3"
            >
              <div className="flex items-center gap-2">
                <div
                  className="flex-1 h-8 rounded-full bg-white px-3 flex items-center gap-2"
                  style={{ border: "1px solid #E5E7EB" }}
                >
                  <Search size={11} color="#9CA3AF" />
                  <span className="text-[10px]" style={{ color: "#111827" }}>
                    Why is my payout on hold?
                  </span>
                </div>
                <div
                  className="size-8 rounded-full bg-white flex items-center justify-center"
                  style={{ border: "1px solid #E8E8ED" }}
                >
                  <Send size={11} color="#4A5565" />
                </div>
              </div>
              <div
                className="rounded-xl bg-white p-3 space-y-2"
                style={{ border: "1px solid #E8E8ED" }}
              >
                <div className="flex items-center gap-1.5">
                  <Sparkles size={10} color="#001769" />
                  <span className="text-[9px] font-semibold" style={{ color: "#6B7280" }}>
                    Smart summary
                  </span>
                </div>
                <SpecStencil w="92%" h={8} opacity={0.28} />
                <SpecStencil w="70%" h={8} opacity={0.16} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SpecCanvas>
    </SpecShell>
  );
}

/** 04 — Phone channel: outer button becomes Phone → call-choice widget */
function WPhone({ inView }: { inView: boolean }) {
  // 0 rest phone  1 tap hot  2 widget  3 highlight call us  4 highlight callback
  const step = useAnimLoop(inView, 8000, [0, 1200, 2200, 4000, 5800]);
  const open = step >= 2;
  const highlight = step === 3 ? 0 : step === 4 ? 1 : -1;

  return (
    <SpecShell url="help.acme.com">
      <SpecCanvas minH={300}>
        <div className="px-5 pt-8 pb-6 flex flex-col items-center">
          <SpecStencil w={140} h={9} opacity={0.2} />
          <div className="mt-2 mb-5">
            <SpecStencil w={200} h={6} opacity={0.12} />
          </div>
          <PromptChrome
            focused={false}
            typed=""
            action="phone"
            actionHot={step === 1 || open}
          />
          <AnimatePresence>
            {open && <CallChoiceWidget highlight={highlight} />}
          </AnimatePresence>
          {!open && (
            <p
              className="mt-4 text-center text-[10px] max-w-[260px]"
              style={{ color: "#6B7280" }}
            >
              With a phone channel on, the in-shell disc is a phone — not send
            </p>
          )}
        </div>
      </SpecCanvas>
    </SpecShell>
  );
}

/** Auto-playing hero: same ask control across home → chat → article. */
function PromptBarInUse() {
  // 0–1 home  2–3 chat  4–5 article
  const step = useAnimLoop(true, 10500, [0, 2800, 3500, 6300, 7000, 9800]);
  const screen = step <= 1 ? "home" : step <= 3 ? "chat" : "article";
  const pulseHome = step === 0;
  const chatTyped = step === 3 ? "Can you walk me through it?" : "";
  const articlePulse = step === 4;

  const urls = {
    home: "help.acme.com",
    chat: "help.acme.com/chat",
    article: "help.acme.com/articles/password-reset",
  } as const;
  const labels = {
    home: "Live showcase · Help home",
    chat: "Live showcase · Conversation",
    article: "Live showcase · Knowledge article",
  } as const;

  return (
    <InUsePreview url={urls[screen]} label={labels[screen]} minH={380}>
      <div className="relative px-8 pt-10 pb-10 min-h-[380px]">
        <AnimatePresence mode="wait">
          {screen === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center gap-6 pt-4"
            >
              <InUseScene className="w-full flex flex-col items-center gap-3 pointer-events-none">
                <SpecStencil w={180} h={12} opacity={0.28} />
                <SpecStencil w={260} h={8} opacity={0.14} />
              </InUseScene>
              <InUseSpotlight className="w-full max-w-[560px]">
                <motion.div
                  animate={{
                    scale: pulseHome ? [1, 1.015, 1] : 1,
                    y: pulseHome ? [0, -2, 0] : 0,
                  }}
                  transition={
                    pulseHome
                      ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                      : { duration: 0.3 }
                  }
                >
                  <PromptChrome
                    focused={false}
                    typed=""
                    maxW={480}
                    large
                    action="send"
                  />
                </motion.div>
              </InUseSpotlight>
              <InUseScene className="w-full flex flex-wrap gap-2.5 justify-center pointer-events-none">
                {["Getting Started", "Billing", "Devices"].map((label) => (
                  <span
                    key={label}
                    className="rounded-full px-3.5 py-2 text-[11px]"
                    style={{
                      background: "rgba(255,255,255,0.85)",
                      border: "1px solid #E5E7EB",
                      color: "#364153",
                    }}
                  >
                    {label}
                  </span>
                ))}
              </InUseScene>
            </motion.div>
          )}

          {screen === "chat" && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col h-full min-h-[340px]"
            >
              <InUseScene className="flex-1 w-full space-y-3 pointer-events-none px-2 pt-1 pb-4">
                <div className="flex justify-end">
                  <div
                    className="px-3.5 py-2 rounded-2xl rounded-tr-sm text-[12px]"
                    style={{ background: "#1D4ED8", color: "#fff", maxWidth: "70%" }}
                  >
                    How do I reset my password?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div
                    className="px-3.5 py-2 rounded-2xl rounded-tl-sm text-[12px]"
                    style={{
                      background: "#fff",
                      border: "1px solid #E5E7EB",
                      color: "#374151",
                      maxWidth: "78%",
                    }}
                  >
                    Open Account settings → Security, then choose Reset password.
                  </div>
                </div>
              </InUseScene>
              <InUseSpotlight className="w-full max-w-[560px] mx-auto">
                <PromptChrome
                  focused={!!chatTyped}
                  typed={chatTyped}
                  maxW={480}
                  large
                  action="phone"
                  actionHot={!!chatTyped}
                />
              </InUseSpotlight>
            </motion.div>
          )}

          {screen === "article" && (
            <motion.div
              key="article"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="relative min-h-[340px]"
            >
              <InUseScene className="pointer-events-none px-2 pt-1 max-w-[420px]">
                <div className="flex items-center gap-1.5 mb-3">
                  <SpecStencil w={52} h={6} opacity={0.16} />
                  <SpecStencil w={10} h={6} opacity={0.1} />
                  <SpecStencil w={72} h={6} opacity={0.2} />
                </div>
                <SpecStencil w={240} h={14} opacity={0.28} />
                <div className="mt-2 mb-4">
                  <SpecStencil w={140} h={6} opacity={0.12} />
                </div>
                <div className="space-y-2">
                  <SpecStencil w="100%" h={7} opacity={0.16} />
                  <SpecStencil w="94%" h={7} opacity={0.14} />
                  <SpecStencil w="88%" h={7} opacity={0.12} />
                  <SpecStencil w="72%" h={7} opacity={0.1} />
                </div>
              </InUseScene>

              <InUseSpotlight className="absolute top-2 right-2 w-[min(300px,52%)]">
                <motion.div
                  animate={{
                    scale: articlePulse ? [1, 1.02, 1] : 1,
                    y: articlePulse ? [0, -2, 0] : 0,
                  }}
                  transition={
                    articlePulse
                      ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
                      : { duration: 0.3 }
                  }
                >
                  <PromptChrome
                    focused={false}
                    typed=""
                    maxW={220}
                    action="send"
                  />
                </motion.div>
              </InUseSpotlight>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </InUsePreview>
  );
}

const SECTIONS: SpecSection[] = [
  {
    num: "01",
    tag: "Idle",
    title: "Gradient shell holds the field and the action",
    desc: "On help home, a gradient border is the parent. Inside it, the white input and a round action button sit side by side. Mic lives in the field; the disc is reserved for commit or call.",
    bullets: [
      "Gradient (or white when focused) wraps both children",
      "Input and round action are siblings — never stacked outside the shell",
      "Same silhouette scales across home, chat, and article placements",
    ],
    Widget: WIdle,
  },
  {
    num: "02",
    tag: "Expand",
    title: "Focus opens grouped suggestions under the pill",
    desc: "Focus expands the pill into a card shell. Suggestions arrive in topic and object groups so people can refine by intent or by the thing they care about — account, device, order.",
    bullets: [
      "Shell morphs into a rounded card; action disc stays beside the field",
      "Groups stay scannable: Topics, Objects, recent asks",
      "Keyboard / hover highlight prepares the next submit",
    ],
    Widget: WExpand,
  },
  {
    num: "03",
    tag: "Send",
    title: "Without a phone channel, the disc sends",
    desc: "When multi-channel escalation is off, the round button inside the gradient is a send control. Typing activates it; enter or the disc commits the query into search-enhanced results.",
    bullets: [
      "Empty asks are blocked — send only activates with text",
      "Paper plane sits beside the input inside the shell — mic stays in-field",
      "Query carries into results chrome with the same action pattern",
    ],
    Widget: WSubmit,
  },
  {
    num: "04",
    tag: "Phone",
    title: "With a phone channel, the disc becomes a call entry",
    desc: "Turn on multi-channel escalation and the same in-shell disc swaps to a phone. Tap opens a small widget — Call us now, or Have us call you — so people can start a voice path without leaving the page.",
    bullets: [
      "Phone replaces send only when a phone channel is available",
      "Widget offers outbound call vs scheduled callback in one step",
      "Call starts in-page — no bounce to a separate phone app first",
    ],
    Widget: WPhone,
  },
];

export function PromptBarSpec() {
  return (
    <SpecPage
      monoLabel="Design Specs · Prompt bar"
      title="Prompt bar interaction system"
      subtitle="How the ask control works across surfaces — gradient shell, field + action side by side, send vs phone, and starting a call without leaving the page."
      inUse={<PromptBarInUse />}
      sections={SECTIONS}
    />
  );
}
