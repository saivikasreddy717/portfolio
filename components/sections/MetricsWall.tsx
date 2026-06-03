"use client";
import { motion, useInView } from "framer-motion";
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

function useCountUp(target: number, inView: boolean, duration = 1400) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const rafRef = useRef<ReturnType<typeof requestAnimationFrame>>(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;

    function step(ts: number) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setCount(target);
        setDone(true);
      }
    }

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, target, duration]);

  return { count, done };
}

function MetricCard({
  metric,
  index,
}: {
  metric: (typeof profile.headlineMetrics)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const parsed = parseValue(metric.value);
  const { count, done } = useCountUp(parsed.target, inView);

  const display =
    parsed.isRange && done
      ? parsed.original
      : parsed.isRange
      ? `${count}%`
      : `${parsed.prefix}${count}${parsed.suffix}`;

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
