import { motion } from "motion/react";
import { ArrowDown, CheckCircle2 } from "lucide-react";
import frameHome from "../../imports/lab-hero/frame-home.png";
import frameResults from "../../imports/lab-hero/frame-results.png";
import { AiAssistCard } from "../components/AiAssistCard";

/** Browser chrome sized to the screenshot — image fits fully, no crop. */
function BrowserFrame({
  src,
  alt,
  label,
  className = "",
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[18px] overflow-hidden border border-white/80 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.18)] ${className}`}
    >
      <div className="h-[28px] bg-[#f3f4f8] border-b border-[#e8e8ed] flex items-center gap-[6px] px-[12px]">
        <span className="size-[7px] rounded-full bg-[#ff5f57]" />
        <span className="size-[7px] rounded-full bg-[#febc2e]" />
        <span className="size-[7px] rounded-full bg-[#28c840]" />
        <span className="ml-[10px] flex-1 text-center font-['Plus_Jakarta_Sans',sans-serif] text-[10px] text-[#9ca3af] truncate pr-[40px]">
          {label}
        </span>
      </div>
      <img
        src={src}
        alt={alt}
        className="block w-full h-auto"
        draggable={false}
      />
    </div>
  );
}

/**
 * Centered design-system landing — product browsers above title, copy below.
 */
export function ComponentLabLanding({
  onBrowse,
  componentCount,
}: {
  onBrowse: () => void;
  componentCount: number;
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(214,239,252,0.95) 0%, transparent 55%), radial-gradient(ellipse 60% 45% at 20% 90%, rgba(232,245,240,0.8) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 85% 85%, rgba(237,232,247,0.65) 0%, transparent 45%), linear-gradient(180deg, #f7f8fc 0%, #eef1f8 45%, #f7f7f9 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.3]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,26,46,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,46,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(180deg, black 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-[1100px] mx-auto px-[24px] pt-[56px] sm:pt-[72px] pb-[48px] sm:pb-[64px] flex flex-col items-center">
        {/* Browser stage — height follows the main screenshot */}
        <div className="relative w-full max-w-[680px] mb-[72px] sm:mb-[88px]">
          {/* Back frame — results, peeking behind */}
          <motion.div
            initial={{ opacity: 0, y: 28, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -2.5 }}
            transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.08 }}
            className="absolute left-[-6%] top-[18%] w-[58%] z-[1] opacity-95"
          >
            <BrowserFrame
              src={frameResults}
              alt="Search results with smart summary"
              label="Search results · Smart summary"
            />
          </motion.div>

          {/* Front frame — home prompt, sized to fit the full screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 36, rotate: 1.5 }}
            animate={{ opacity: 1, y: 0, rotate: 1.5 }}
            transition={{ type: "spring", stiffness: 130, damping: 18, delay: 0.18 }}
            className="relative z-[2] w-full max-w-[560px] mx-auto"
          >
            <BrowserFrame
              src={frameHome}
              alt="Self-service home with prompt bar"
              label="Home · Prompt bar"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
            className="absolute left-[-4%] bottom-[4%] w-[min(168px,30%)] z-[3] origin-bottom-left pointer-events-none drop-shadow-[0_12px_24px_rgba(15,23,42,0.12)]"
          >
            <div className="rounded-[10px] bg-white border border-green-200 overflow-hidden">
              <div className="flex items-center justify-between gap-[4px] px-[8px] py-[6px] border-b border-[#eef0f4]">
                <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[9px] font-semibold text-[#1a1a2e] truncate">
                  Evidence submitted
                </p>
                <span className="shrink-0 rounded-full bg-green-100 px-[5px] py-[1px] font-['Plus_Jakarta_Sans',sans-serif] text-[7px] font-semibold uppercase tracking-wider text-[#096]">
                  Done
                </span>
              </div>
              <div className="px-[8px] py-[6px]">
                <div className="flex items-start gap-[5px] rounded-[6px] bg-green-50 border border-green-100 px-[6px] py-[5px]">
                  <CheckCircle2 className="size-[9px] text-[#096] shrink-0 mt-[1px]" />
                  <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[8px] leading-[11px] text-[#096]">
                    Tracking + delivery proof uploaded
                  </p>
                </div>
              </div>
              <div className="px-[8px] pb-[6px] flex gap-[4px]">
                <span className="flex-1 text-center rounded-[6px] border border-[#e8e8ed] py-[4px] font-['Plus_Jakarta_Sans',sans-serif] text-[8px] text-[#6b7280]">
                  Undo
                </span>
                <span
                  className="flex-1 text-center rounded-[6px] py-[4px] font-['Plus_Jakarta_Sans',sans-serif] text-[8px] font-semibold text-white"
                  style={{ backgroundImage: "linear-gradient(142.634deg, #101C86 0%, #020642 100%)" }}
                >
                  View
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12, y: 8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.45, delay: 0.5 }}
            className="absolute right-[-8%] bottom-[2%] w-[min(300px,48%)] z-[4] scale-[0.92] origin-bottom-right pointer-events-none drop-shadow-[0_16px_40px_rgba(15,23,42,0.14)]"
          >
            <AiAssistCard
              title="Smart summary"
              info="Based on 2 knowledge articles"
              showAskInput={false}
              showSuggestions={false}
              showFeedback={false}
              className="!rounded-[14px]"
            >
              <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[12px] leading-[18px] text-[#364153]">
                You typically have{" "}
                <mark className="bg-[#dce8ff] text-[#001769] font-semibold px-[2px] rounded-[2px]">
                  7–21 days to submit a response
                </mark>
                , depending on the card network. The deadline on the dispute
                detail page is authoritative.
              </p>
            </AiAssistCard>
          </motion.div>

          <div
            className="absolute left-[18%] right-[18%] bottom-[-20px] h-[70px] rounded-full blur-3xl opacity-55 pointer-events-none z-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(214,239,252,0.9), rgba(216,228,255,0.85), rgba(214,243,253,0.9))",
            }}
          />
        </div>

        {/* Centered copy */}
        <div className="w-full max-w-[640px] text-center flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="font-['Plus_Jakarta_Sans',sans-serif] text-[clamp(30px,4.2vw,48px)] font-bold leading-[1.08] tracking-[-0.035em] text-[#0b1228] mb-[20px]"
          >
            Self-service portal
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #001769 0%, #101C86 45%, #312e81 100%)",
              }}
            >
              design system
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28 }}
            className="font-['Plus_Jakarta_Sans',sans-serif] text-[15px] sm:text-[16px] leading-[26px] text-[#5b6475] max-w-[440px] mb-[32px]"
          >
            Specs, patterns, and interactive building blocks for search-enhanced
            and conversational help experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.34 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-[14px]"
          >
            <button
              type="button"
              onClick={onBrowse}
              className="inline-flex items-center gap-[8px] rounded-[12px] px-[20px] py-[13px] font-['Plus_Jakarta_Sans',sans-serif] text-[13px] font-semibold text-white shadow-[0_8px_24px_rgba(16,28,134,0.22)] hover:opacity-95 transition-opacity"
              style={{
                backgroundImage: "linear-gradient(142.634deg, #101C86 0%, #020642 100%)",
              }}
            >
              Browse components
              <ArrowDown className="size-[14px] opacity-80" />
            </button>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[13px] tracking-[-0.01em] text-[#8b93a3]">
              {componentCount} components · specs & demos
            </span>
          </motion.div>
        </div>
      </div>

      <div className="relative h-[56px] bg-gradient-to-b from-transparent to-[#f7f7f9]" />
    </section>
  );
}
