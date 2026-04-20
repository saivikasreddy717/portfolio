"use client";
import { motion } from "framer-motion";
import { profile } from "@/content/profile";

export default function Experience() {
  return (
    <section id="experience" className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">
            Production work
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold max-w-3xl">
            Case studies from work I&apos;ve <span className="gradient-text">shipped</span>.
          </h2>
          <p className="mt-3 text-sm text-white/50 max-w-2xl">
            Architecture described at an NDA-safe level of abstraction. Happy to go deeper in an interview.
          </p>
        </div>

        <div className="space-y-4">
          {profile.experience.map((job, i) => (
            <motion.article
              key={`${job.company}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="glass glass-hover rounded-2xl p-6 md:p-8"
            >
              <header className="flex flex-wrap items-start justify-between gap-3 mb-5">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold">{job.role}</h3>
                  <div className="text-sm text-white/60 mt-1">
                    {job.company} · {job.location}
                  </div>
                </div>
                <span className="chip text-white/70">{job.period}</span>
              </header>

              {job.problem && (
                <div className="grid md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-white/40 mb-1">Problem</div>
                    <p className="text-sm text-white/70 leading-relaxed">{job.problem}</p>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-white/40 mb-1">Solution</div>
                    <p className="text-sm text-white/70 leading-relaxed">{job.solution}</p>
                  </div>
                </div>
              )}

              <ul className="space-y-2 mb-5">
                {job.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 text-sm text-white/80 leading-relaxed">
                    <span className="text-[hsl(var(--accent))] mt-1.5">▸</span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: b.replace(
                          /\*\*(.+?)\*\*/g,
                          '<strong class="gradient-text">$1</strong>'
                        ),
                      }}
                    />
                  </li>
                ))}
              </ul>

              {job.impact && (
                <div className="flex flex-wrap gap-6 py-4 border-t border-white/5">
                  {job.impact.map((m) => (
                    <div key={m.metric}>
                      <div className="text-2xl font-semibold gradient-text">{m.value}</div>
                      <div className="text-[10px] uppercase tracking-wider text-white/50 mt-0.5">
                        {m.metric}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {job.stack.map((s) => (
                  <span key={s} className="text-[10px] chip text-white/60">
                    {s}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
