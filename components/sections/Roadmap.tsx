"use client";
import { motion } from "framer-motion";
import { profile } from "@/content/profile";

export default function Roadmap() {
  return (
    <section id="building" className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">
            Personal projects
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold max-w-3xl">
            Projects I&apos;m <span className="gradient-text">building</span>.
          </h2>
          <p className="mt-3 text-sm text-white/50 max-w-2xl">
            Personal projects I work on outside of my day job. Follow along on{" "}
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
          {profile.roadmap.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass glass-hover rounded-xl p-5 flex items-start gap-4"
            >
              <span className="text-[hsl(var(--accent))] mt-1 flex-shrink-0 text-sm">▸</span>
              <div className="flex-1 min-w-0">
                <code className="font-mono text-sm font-medium">{p.title}</code>
                <p className="text-sm text-white/60 mt-1.5 leading-relaxed">{p.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
