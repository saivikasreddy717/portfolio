"use client";
import { motion } from "framer-motion";

/**
 * Epoch: section shell for the training-run narrative. Each section is one
 * epoch; the TrainingHUD reads data-epoch / data-name to track progress.
 */
export default function Epoch({
  n,
  name,
  id,
  title,
  sub,
  children,
  className,
}: {
  n: number;
  name: string;
  id: string;
  title: React.ReactNode;
  sub?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      data-epoch={n}
      data-name={name}
      className={`relative px-6 md:px-12 py-20 md:py-28 ${className ?? ""}`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em]">
            <span className="text-[hsl(var(--accent))]">
              epoch {String(n).padStart(2, "0")}
            </span>
            <span className="text-white/25">//</span>
            <span className="text-white/45">{name}</span>
            <span className="ml-2 h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
          </div>
          <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
            {title}
          </h2>
          {sub && (
            <p className="mt-4 text-sm md:text-base text-[hsl(var(--muted))] max-w-2xl leading-relaxed">
              {sub}
            </p>
          )}
        </motion.header>
        {children}
      </div>
    </section>
  );
}
