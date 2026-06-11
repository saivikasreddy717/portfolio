"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { profile } from "@/content/profile";
import Epoch from "@/components/fx/Epoch";
import Counter from "@/components/fx/Counter";

/**
 * Inference traces: each role rendered as a terminal trace window. The
 * problem is the input, the solution is the reasoning, the bullets are the
 * output log, and the impact metrics are the eval results.
 */

const VISIBLE_LINES = 5;

function bold(text: string) {
  return text.replace(
    /\*\*(.+?)\*\*/g,
    '<strong class="text-[hsl(var(--accent))] font-semibold">$1</strong>'
  );
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};
const lineVariants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
};

function TraceWindow({
  job,
  index,
}: {
  job: (typeof profile.experience)[number];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const bullets = expanded ? job.bullets : job.bullets.slice(0, VISIBLE_LINES);
  const hidden = job.bullets.length - VISIBLE_LINES;
  const slug = slugify(job.company);

  return (
    <div className="relative md:pl-14">
      {/* timeline node */}
      <div className="hidden md:flex absolute left-0 top-7 h-4 w-4 items-center justify-center">
        <span className="absolute h-4 w-4 rounded-full bg-[hsl(var(--accent))]/15" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />
      </div>

      <motion.article
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="panel rounded-lg overflow-hidden"
      >
        {/* window chrome */}
        <header className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/10 bg-[hsl(var(--surface))] px-4 md:px-6 py-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--bad))]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--accent-2))]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--good))]/70" />
          </span>
          <span className="font-mono text-xs text-white/65 truncate">
            trace/{slug}_{String(index).padStart(2, "0")}
          </span>
          <span className="font-mono text-[10px] text-[hsl(var(--good))] border border-[hsl(var(--good))]/30 rounded px-1.5 py-0.5">
            200 OK
          </span>
          <span className="ml-auto font-mono text-xs text-white/45">{job.period}</span>
        </header>

        <div className="p-4 md:p-6">
          {/* identity + evals */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold">{job.role}</h3>
              <div className="mt-1 text-sm text-[hsl(var(--muted))]">
                {job.company} · {job.location}
              </div>
            </div>
            <div className="flex gap-6">
              {job.impact?.map((m) => (
                <div key={m.metric} className="text-right">
                  <div className="text-2xl md:text-3xl font-semibold text-[hsl(var(--accent))]">
                    <Counter value={m.value} />
                  </div>
                  <div className="hud-label mt-1">{m.metric}</div>
                </div>
              ))}
            </div>
          </div>

          {/* input / reasoning */}
          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-6 space-y-4 font-mono text-[13px] leading-relaxed"
          >
            <motion.div variants={lineVariants} className="flex gap-3">
              <span className="hud-label mt-1 w-20 shrink-0 text-[hsl(var(--accent-2))]">
                input
              </span>
              <p className="text-white/70 font-sans text-sm">{job.problem}</p>
            </motion.div>
            <motion.div variants={lineVariants} className="flex gap-3">
              <span className="hud-label mt-1 w-20 shrink-0 text-[hsl(var(--accent-3))]">
                reasoning
              </span>
              <p className="text-white/70 font-sans text-sm">{job.solution}</p>
            </motion.div>

            {/* output log */}
            <motion.div variants={lineVariants} className="hud-label pt-2 text-[hsl(var(--accent))]">
              output log · {job.bullets.length} entries
            </motion.div>
            <motion.ul variants={listVariants} className="space-y-2.5">
              {bullets.map((b, j) => (
                <motion.li
                  key={j}
                  variants={lineVariants}
                  className="flex gap-3 text-sm leading-relaxed"
                >
                  <span className="select-none font-mono text-[hsl(var(--accent))]/60 shrink-0">
                    ▸
                  </span>
                  <span
                    className="text-white/80 font-sans"
                    dangerouslySetInnerHTML={{ __html: bold(b) }}
                  />
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {hidden > 0 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-[hsl(var(--accent))] hover:text-white transition"
            >
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
              />
              {expanded ? "collapse trace" : `expand full trace (+${hidden} entries)`}
            </button>
          )}

          {/* stack */}
          <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/5 pt-4">
            {job.stack.map((s) => (
              <span key={s} className="chip text-[10px] text-white/60">
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Experience() {
  return (
    <Epoch
      n={3}
      name="inference traces"
      id="experience"
      title={
        <>
          Work, replayed as <span className="gradient-text">inference traces</span>.
        </>
      }
      sub="Input, reasoning, output log, eval results. Architecture described at an NDA-safe level; happy to go deeper in an interview."
    >
      <div className="relative space-y-8">
        {/* timeline rail */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute left-[7px] top-8 bottom-8 w-px bg-gradient-to-b from-[hsl(var(--accent))]/50 via-white/10 to-transparent"
        />
        {profile.experience.map((job, i) => (
          <TraceWindow key={`${job.company}-${i}`} job={job} index={i} />
        ))}
      </div>
    </Epoch>
  );
}
