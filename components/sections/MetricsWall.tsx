"use client";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { profile } from "@/content/profile";

type ParsedMetric = {
  prefix: string;
  target: number;
  suffix: string;
  isRange: boolean;
  original: string;
};

function parseValue(value: string): ParsedMetric {
  if (value.startsWith("<")) {
    const num = parseInt(value.replace(/[^0-9]/g, ""));
    return { prefix: "<", target: num, suffix: "ms", isRange: false, original: value };
  }
  if (value.includes("–")) {
    const max = parseInt(value.split("–")[1].replace(/[^0-9]/g, ""));
    return { prefix: "", target: max, suffix: "", isRange: true, original: value };
  }
  const num = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9]/g, "");
  return { prefix: "", target: num, suffix, isRange: false, original: value };
}

function formatDisplay(n: number, parsed: ParsedMetric, done: boolean): string {
  if (parsed.isRange && done) return parsed.original;
  if (parsed.isRange) return `${n}%`;
  return `${parsed.prefix}${n}${parsed.suffix}`;
}

function MetricCard({
  metric,
  index,
}: {
  metric: (typeof profile.headlineMetrics)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const parsed = parseValue(metric.value);
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(formatDisplay(0, parsed, false));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, parsed.target, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsubscribe = count.onChange((v) => {
      const rounded = Math.round(v);
      setDisplay(formatDisplay(rounded, parsed, rounded >= parsed.target));
    });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.06 }}
      className="glass glass-hover rounded-2xl p-6"
    >
      <div className="text-3xl md:text-5xl font-semibold gradient-text break-words">
        {display}
      </div>
      <div className="mt-2 text-xs uppercase tracking-wider text-white/50">{metric.label}</div>
    </motion.div>
  );
}

export default function MetricsWall() {
  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">
            Shipped in production
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold">
            Metrics that <span className="gradient-text">matter</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {profile.headlineMetrics.map((m, i) => (
            <MetricCard key={m.label} metric={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
