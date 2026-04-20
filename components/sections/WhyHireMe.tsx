"use client";
import { motion } from "framer-motion";
import { Brain, Cpu, LineChart } from "lucide-react";
import { profile } from "@/content/profile";

const ICONS = [Brain, Cpu, LineChart];

export default function WhyHireMe() {
  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">
            Why hire me
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold max-w-2xl">
            Three things I do at a <span className="gradient-text">senior level</span>.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {profile.pillars.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08 }}
                className="glass glass-hover rounded-2xl p-6"
              >
                <Icon className="w-6 h-6 text-[hsl(var(--accent))] mb-4" />
                <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{p.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
