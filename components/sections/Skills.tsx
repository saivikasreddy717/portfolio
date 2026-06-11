"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/content/profile";
import Epoch from "@/components/fx/Epoch";

/**
 * Architecture: skills rendered as the layers of one end-to-end system.
 * Hovering a layer card lights up the pipeline stage that layer feeds.
 */

const STAGES = ["data", "retrieval", "model", "serving", "eval", "product"] as const;
type Stage = (typeof STAGES)[number];

const STAGE_OF: Record<string, Stage> = {
  "GenAI & LLM Systems": "retrieval",
  "Inference & Serving": "serving",
  "ML / Deep Learning": "model",
  "Evaluation & Experimentation": "eval",
  "MLOps & Cloud": "serving",
  "Data & Platform": "data",
  "Full-Stack & Integration": "product",
  "Delivery & Collaboration": "product",
};

function Pipeline({ active }: { active: Stage | null }) {
  const W = 760;
  const Y = 34;
  const step = (W - 120) / (STAGES.length - 1);
  return (
    <svg
      viewBox={`0 0 ${W} 78`}
      className="hidden md:block w-full max-w-3xl mx-auto"
      aria-hidden="true"
    >
      {STAGES.slice(0, -1).map((_, i) => {
        const x1 = 60 + i * step + 16;
        const x2 = 60 + (i + 1) * step - 16;
        return (
          <line
            key={i}
            x1={x1}
            y1={Y}
            x2={x2}
            y2={Y}
            stroke="hsl(var(--accent) / 0.35)"
            strokeWidth="1"
            className="flow-dash"
          />
        );
      })}
      {STAGES.map((stage, i) => {
        const x = 60 + i * step;
        const isActive = active === stage;
        return (
          <g key={stage}>
            <circle
              cx={x}
              cy={Y}
              r={13}
              fill={isActive ? "hsl(var(--accent-2) / 0.12)" : "transparent"}
              stroke={isActive ? "hsl(var(--accent-2))" : "hsl(var(--accent) / 0.45)"}
              strokeWidth="1"
              className="transition-all duration-300"
            />
            <circle
              cx={x}
              cy={Y}
              r={3.5}
              fill={isActive ? "hsl(var(--accent-2))" : "hsl(var(--accent))"}
              className="transition-all duration-300"
            >
              {isActive && (
                <animate attributeName="r" values="3.5;5;3.5" dur="1s" repeatCount="indefinite" />
              )}
            </circle>
            <text
              x={x}
              y={Y + 34}
              textAnchor="middle"
              className="font-mono uppercase"
              style={{
                fontSize: "9px",
                letterSpacing: "0.18em",
                fill: isActive ? "hsl(var(--accent-2))" : "hsl(var(--muted))",
                transition: "fill 0.3s",
              }}
            >
              {stage}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function Skills() {
  const [active, setActive] = useState<Stage | null>(null);
  const categories = Object.entries(profile.skills);

  return (
    <Epoch
      n={4}
      name="architecture"
      id="skills"
      title={
        <>
          One system, <span className="gradient-text">eight layers deep</span>.
        </>
      }
      sub="Hover a layer to see which stage of the pipeline it powers. Everything here has been used in anger, not just in tutorials."
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="panel rounded-lg px-4 py-5 mb-8 sticky top-14 z-20 hidden md:block bg-[hsl(var(--bg))]/85 backdrop-blur-md"
      >
        <Pipeline active={active} />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4" onMouseLeave={() => setActive(null)}>
        {categories.map(([category, skills], i) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: (i % 2) * 0.06, duration: 0.5 }}
            onMouseEnter={() => setActive(STAGE_OF[category] ?? null)}
            className="layer-card panel panel-hover rounded-md p-5"
          >
            <div className="flex items-center justify-between hud-label">
              <span>
                <span className="text-[hsl(var(--accent))]">
                  layer/{String(i).padStart(2, "0")}
                </span>{" "}
                → {STAGE_OF[category]}
              </span>
              <span>{skills.length} modules</span>
            </div>
            <h3 className="mt-3 text-base font-semibold">{category}</h3>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {skills.map((s, j) => (
                <span
                  key={s}
                  className="skill-chip chip text-[10px] text-white/60"
                  style={{ "--i": j } as React.CSSProperties}
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Epoch>
  );
}
