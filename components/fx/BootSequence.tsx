"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * BootSequence: a 2-second terminal boot overlay shown once per session.
 * Any key or click skips it. Reduced-motion users never see it.
 */

const BOOT_LINES = [
  { text: "$ ssh visitor@saivikas.dev", tone: "cmd" },
  { text: "secure channel established", tone: "ok" },
  { text: "loading sai-vikas-reddy/ai-ml-engineer:v3.0", tone: "dim" },
  { text: "mounting weights: 3+ yrs production GenAI .......... ok", tone: "dim" },
  { text: "attaching tools: [langgraph, vllm, triton, mlflow] .. ok", tone: "dim" },
  { text: "attention heads: 32/32 online", tone: "ok" },
  { text: "inference session ready. handing off to visitor.", tone: "accent" },
] as const;

const STEP_MS = 195;
const SEEN_KEY = "sv-boot-seen";

export default function BootSequence() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  // Decide once on mount; sessionStorage keeps reloads quiet.
  useEffect(() => {
    if (reduced) return;
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Storage unavailable: still boot, it only costs 2 seconds once.
    }
    setShow(true);
  }, [reduced]);

  // Advance the log lines, then hand off.
  useEffect(() => {
    if (!show) return;
    if (step > BOOT_LINES.length) return;
    const t = setTimeout(
      () => setStep((s) => s + 1),
      step === BOOT_LINES.length ? 480 : STEP_MS
    );
    return () => clearTimeout(t);
  }, [show, step]);

  // Lock scroll while booting; any input skips.
  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const skip = () => setStep(BOOT_LINES.length + 1);
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [show]);

  const done = step > BOOT_LINES.length;

  return (
    <AnimatePresence>
      {show && !done && (
        <motion.div
          key="boot"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.55, ease: [0.83, 0, 0.17, 1] }}
          className="fixed inset-0 z-[100] bg-[hsl(var(--bg))] flex flex-col"
          aria-hidden="true"
        >
          <div className="flex items-center justify-between px-5 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
            <span>neural-os v3.0 · boot loader</span>
            <span className="text-[hsl(var(--accent))]">[ sys ]</span>
          </div>

          <div className="flex-1 flex items-center justify-center px-6">
            <div className="w-full max-w-md font-mono text-[12px] md:text-[13px] leading-7">
              {BOOT_LINES.slice(0, step).map((line, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-white/25 select-none w-7 text-right shrink-0">
                    {String(i).padStart(2, "0")}
                  </span>
                  <span
                    className={
                      line.tone === "cmd"
                        ? "text-white/90"
                        : line.tone === "ok"
                          ? "text-[hsl(var(--good))]"
                          : line.tone === "accent"
                            ? "text-[hsl(var(--accent))]"
                            : "text-white/55"
                    }
                  >
                    {line.text}
                  </span>
                </div>
              ))}
              {step <= BOOT_LINES.length && (
                <div className="flex gap-3">
                  <span className="text-white/25 w-7 shrink-0" />
                  <span className="caret" />
                </div>
              )}
            </div>
          </div>

          <div className="px-6 pb-6 max-w-md w-full mx-auto">
            <div className="h-px bg-white/10 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-[hsl(var(--accent))] transition-all duration-200"
                style={{ width: `${Math.min((step / BOOT_LINES.length) * 100, 100)}%` }}
              />
            </div>
            <div className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
              press any key to skip
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
