"use client";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { profile } from "@/content/profile";

export default function Education() {
  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">
            Education
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold">
            Where I <span className="gradient-text">studied</span>.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {profile.education.map((e, i) => (
            <motion.div
              key={e.school}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass glass-hover rounded-2xl p-6 flex items-start gap-4"
            >
              <GraduationCap className="w-6 h-6 text-[hsl(var(--accent))] flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold">{e.school}</div>
                <div className="text-sm text-white/70 mt-1">{e.degree}</div>
                <div className="text-xs font-mono text-white/40 mt-2">{e.period}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
