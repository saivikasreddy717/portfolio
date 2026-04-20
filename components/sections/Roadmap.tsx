"use client";
import { motion } from "framer-motion";
import { Hammer, CircleDashed } from "lucide-react";
import { profile } from "@/content/profile";

export default function Roadmap() {
  return (
    <section id="building" className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">
            Currently building
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold max-w-3xl">
            Open-source projects <span className="gradient-text">shipping soon</span>.
          </h2>
          <p className="mt-3 text-sm text-white/50 max-w-2xl">
            Full case studies, demos, and repos land here as each one ships. Follow along on{" "}
            <a
              href={profile.github}
              className="text-white/80 underline underline-offset-4 hover:text-white"
            >
              GitHub
            </a>
            .
          </p>
        </div>

        <div className="space-y-3">
          {profile.roadmap.map((p, i) => {
            const Icon = p.status === "in-progress" ? Hammer : CircleDashed;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-xl p-5 flex items-start gap-4"
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                    p.status === "in-progress"
                      ? "text-[hsl(var(--accent-3))]"
                      : "text-white/40"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <code className="font-mono text-sm font-medium">{p.title}</code>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                        p.status === "in-progress"
                          ? "bg-[hsl(var(--accent-3))]/10 text-[hsl(var(--accent-3))]"
                          : "bg-white/5 text-white/50"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <p className="text-sm text-white/60 mt-1.5 leading-relaxed">{p.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
