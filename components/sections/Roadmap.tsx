"use client";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
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
                <div className="flex items-center justify-between gap-3 flex-wrap mb-1.5">
                  <code className="font-mono text-sm font-medium">{p.title}</code>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] chip ${
                        p.status === "in-progress" ? "text-green-400/80" : "text-white/40"
                      }`}
                    >
                      {p.status === "in-progress" ? "in progress" : "planned"}
                    </span>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-white transition"
                      aria-label={`${p.title} on GitHub`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-[10px] chip text-white/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
