"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Command, Download, Zap } from "lucide-react";
import { profile } from "@/content/profile";
import NeuralField from "@/components/fx/NeuralField";
import Magnetic from "@/components/fx/Magnetic";
import { EV, emit } from "@/lib/bus";

const SPECIALTIES = [
  "agentic RAG pipelines",
  "LoRA-tuned 7B SLMs",
  "sub-150ms LLM serving",
  "production MLOps on EKS",
  "evaluation-driven GenAI",
];

/** Looping typewriter for the specialty line. */
function TypeCycle() {
  const reduced = useReducedMotion();
  const [text, setText] = useState(SPECIALTIES[0]);

  useEffect(() => {
    if (reduced) return;
    let word = 0;
    let len = SPECIALTIES[0].length;
    let dir: 1 | -1 = -1;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const current = SPECIALTIES[word];
      len += dir;
      if (len <= 0) {
        dir = 1;
        word = (word + 1) % SPECIALTIES.length;
      } else if (len >= SPECIALTIES[word].length) {
        dir = -1;
        setText(current.slice(0, len));
        timer = setTimeout(tick, 2100);
        return;
      }
      setText(SPECIALTIES[word].slice(0, Math.max(len, 0)));
      timer = setTimeout(tick, dir === 1 ? 45 : 22);
    };
    timer = setTimeout(tick, 2100);
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <span className="text-[hsl(var(--accent))] caret font-mono">{text}</span>
  );
}

export default function Hero() {
  const [avatarError, setAvatarError] = useState(false);
  const initials = profile.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  return (
    <section
      data-epoch={0}
      data-name="init"
      className="relative min-h-[100svh] flex flex-col"
    >
      {/* The particle field assembles the name; DOM keeps it accessible. */}
      <NeuralField text="SAI VIKAS" centerY={0.42} className="absolute inset-0 h-full w-full" />
      <h1 className="sr-only">
        {profile.name}, {profile.role}
      </h1>

      {/* Status line, top of the field */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 mx-auto mt-24 md:mt-28 flex items-center gap-2 chip text-white/70"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--good))] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--good))]" />
        </span>
        model loaded · accepting requests
      </motion.div>

      {/* Bottom console cluster */}
      <div className="relative z-10 mt-auto px-6 md:px-12 pb-16 md:pb-14">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 min-w-0"
          >
            <div className="hud-label mb-3">{profile.name} · {profile.location}</div>
            <p className="text-2xl md:text-4xl font-semibold tracking-tight leading-snug">
              {profile.role}, shipping
              <br />
              <TypeCycle />
            </p>
            <p className="mt-4 max-w-xl text-sm text-[hsl(var(--muted))] leading-relaxed">
              3+ years building production GenAI across healthcare and banking.
              Currently ML Engineer at Cardinal Health. MS CS, NC State.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href="#experience"
                  className="group inline-flex items-center gap-2 bg-[hsl(var(--accent-2))] text-black font-medium text-sm px-5 py-3 rounded-md hover:brightness-110 transition"
                >
                  view inference traces
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition" />
                </a>
              </Magnetic>
              <button
                onClick={() => emit(EV.chatbot)}
                className="inline-flex items-center gap-2 panel panel-hover rounded-md px-5 py-3 text-sm font-mono text-[hsl(var(--accent))]"
              >
                <Zap className="w-4 h-4" />
                run live inference
              </button>
              <a
                href={profile.resumePdf}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-mono text-white/55 hover:text-white transition"
              >
                <Download className="w-4 h-4" />
                weights.pdf
              </a>
            </div>
          </motion.div>

          {/* Operator card: the human behind the weights */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 md:flex-col md:items-end md:text-right"
          >
            <div className="relative h-20 w-20 md:h-28 md:w-28 shrink-0">
              <div className="absolute inset-0 rounded-full border border-[hsl(var(--accent))]/30 animate-[spin_14s_linear_infinite]">
                <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[hsl(var(--accent))]" />
              </div>
              <div className="absolute inset-2 rounded-full overflow-hidden bg-gradient-to-br from-[hsl(var(--accent))]/40 to-[hsl(var(--accent-3))]/40 flex items-center justify-center">
                {!avatarError ? (
                  <Image
                    src="/avatar.jpg"
                    alt={profile.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                    onError={() => setAvatarError(true)}
                    priority
                  />
                ) : (
                  <span className="text-xl font-bold text-white/90">{initials}</span>
                )}
              </div>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 leading-relaxed">
              operator: human
              <br />
              <span className="text-white/65 normal-case tracking-normal text-[11px]">
                {profile.availability.replace("Open to: ", "open to ").split(" · ").slice(0, 3).join(" · ")}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue + hotkey hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="max-w-6xl mx-auto mt-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-white/35"
        >
          <span className="flex items-center gap-3">
            <span className="relative h-8 w-px bg-white/15 overflow-hidden">
              <span className="absolute inset-x-0 top-0 h-3 bg-[hsl(var(--accent))] animate-[drip_1.8s_ease-in-out_infinite]" />
            </span>
            scroll to start the training run
          </span>
          <button
            onClick={() => emit(EV.palette)}
            className="hidden md:inline-flex items-center gap-1.5 hover:text-white/70 transition uppercase tracking-[0.25em]"
          >
            <Command className="w-3 h-3" /> k for command deck
          </button>
        </motion.div>
      </div>
    </section>
  );
}
