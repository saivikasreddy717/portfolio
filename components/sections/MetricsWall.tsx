"use client";
import { motion } from "framer-motion";
import { profile } from "@/content/profile";

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
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.06 }}
              className="glass glass-hover rounded-2xl p-6"
            >
              <div className="text-4xl md:text-5xl font-semibold gradient-text">{m.value}</div>
              <div className="mt-2 text-xs uppercase tracking-wider text-white/50">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
