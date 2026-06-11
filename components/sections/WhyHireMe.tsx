"use client";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { profile } from "@/content/profile";
import Epoch from "@/components/fx/Epoch";

/**
 * Attention heads: the four hiring pillars rendered as transformer heads.
 * Cards tilt in 3D toward the cursor and report a rising attention weight
 * while you focus on them.
 */

const BASE_WEIGHTS = [0.97, 0.94, 0.91, 0.89];

function HeadCard({ index, title, body }: { index: number; title: string; body: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 180, damping: 18 });
  const glow = useTransform([mx, my], ([x, y]: number[]) => {
    return `radial-gradient(280px circle at ${x * 100}% ${y * 100}%, hsl(var(--accent) / 0.10), transparent 70%)`;
  });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const weight = hover
    ? Math.min(BASE_WEIGHTS[index % 4] + 0.02, 0.99)
    : BASE_WEIGHTS[index % 4];

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.07, duration: 0.55 }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          setHover(false);
          mx.set(0.5);
          my.set(0.5);
        }}
        style={reduced ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="panel panel-hover rounded-md p-6 h-full relative overflow-hidden"
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{ background: glow, opacity: hover ? 1 : 0 }}
        />
        <div className="relative flex items-center justify-between hud-label">
          <span className="text-[hsl(var(--accent))]">attn.head[{index}]</span>
          <span>
            w ={" "}
            <span className={hover ? "text-[hsl(var(--accent-2))]" : ""}>
              {weight.toFixed(2)}
            </span>
          </span>
        </div>
        <h3 className="relative mt-4 text-lg md:text-xl font-semibold">{title}</h3>
        <p className="relative mt-3 text-sm text-[hsl(var(--muted))] leading-relaxed">{body}</p>
        <div className="relative mt-5 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--accent-3))] transition-all duration-500"
            style={{ width: `${weight * 100}%` }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WhyHireMe() {
  return (
    <Epoch
      n={2}
      name="attention heads"
      id="capabilities"
      title={
        <>
          Four heads, <span className="gradient-text">all attending to shipping</span>.
        </>
      }
      sub="What I actually get hired for. Hover a head and watch where the attention goes."
    >
      <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
        {profile.pillars.map((p, i) => (
          <HeadCard key={p.title} index={i} title={p.title} body={p.body} />
        ))}
      </div>
    </Epoch>
  );
}
