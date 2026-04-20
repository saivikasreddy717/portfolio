"use client";
import { motion } from "framer-motion";
import { profile } from "@/content/profile";

export default function Summary() {
  return (
    <section className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-8 md:p-10"
        >
          <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-start">

            {/* Left: profile text */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">
                Profile
              </div>
              <p className="text-lg md:text-xl text-white/85 leading-relaxed font-light">
                {profile.summary}
              </p>

              {/* Core stack row */}
              <div className="mt-6">
                <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-3">
                  Core stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.coreStack.map((tech) => (
                    <span
                      key={tech}
                      className="chip text-white/80 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: quick facts */}
            <div className="flex flex-col gap-4 min-w-[200px]">
              <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-1">
                At a glance
              </div>

              <Fact label="Experience" value="3+ years" />
              <Fact label="Current role" value="ML Engineer" />
              <Fact label="Company" value="Cardinal Health" />
              <Fact label="Education" value="MS CS, NC State" />
              <Fact label="Location" value={profile.location} />

              {/* Availability pill */}
              <div className="mt-2 inline-flex items-center gap-2 chip self-start">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="text-white/80">Available now</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-wider text-white/40">{label}</div>
      <div className="text-sm font-medium text-white/90 mt-0.5">{value}</div>
    </div>
  );
}
