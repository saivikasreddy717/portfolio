"use client";
import { motion } from "framer-motion";
import { profile } from "@/content/profile";

export default function Skills() {
  return (
    <section id="skills" className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Stack</div>
          <h2 className="text-3xl md:text-4xl font-semibold">
            Tools I reach for <span className="gradient-text">daily</span>.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(profile.skills).map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-2xl p-5"
            >
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-3">
                {category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {items.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/5 text-white/80
                               hover:bg-white/[0.08] hover:border-white/15 transition"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
