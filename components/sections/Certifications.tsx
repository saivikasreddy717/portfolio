"use client";
import { motion } from "framer-motion";
import { BadgeCheck, GraduationCap } from "lucide-react";
import { profile } from "@/content/profile";

export default function Certifications() {
  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">
            Credentials
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold">
            Certified &amp; <span className="gradient-text">schooled</span>.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {profile.certifications.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass glass-hover rounded-2xl p-5 flex items-start gap-4"
            >
              <BadgeCheck className="w-6 h-6 text-[hsl(var(--accent-2))] flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-xs font-mono text-white/50 mt-1">
                  {c.issuer} · {c.id}
                </div>
              </div>
            </motion.div>
          ))}

          {profile.education.map((e, i) => (
            <motion.div
              key={e.school}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 2) * 0.06 }}
              className="glass glass-hover rounded-2xl p-5 flex items-start gap-4"
            >
              <GraduationCap className="w-6 h-6 text-[hsl(var(--accent))] flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium">{e.degree}</div>
                <div className="text-xs font-mono text-white/50 mt-1">
                  {e.school} · {e.period}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
