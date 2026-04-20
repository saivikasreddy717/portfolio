"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { profile } from "@/content/profile";

function JobCard({ job, index }: { job: (typeof profile.experience)[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  // First bullet gets headline treatment; rest are supporting detail
  const headline = job.bullets[0];
  const supporting = job.bullets.slice(1);
  const visibleBullets = expanded ? supporting : supporting.slice(0, 2);
  const hasMore = supporting.length > 2;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      className="glass glass-hover rounded-2xl p-6 md:p-8"
    >
      {/* Header: role + company + period */}
      <header className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold">{job.role}</h3>
          <div className="text-sm text-white/60 mt-1">
            {job.company} · {job.location}
          </div>
        </div>
        <span className="chip text-white/70">{job.period}</span>
      </header>

      {/* Impact metrics — first thing recruiter sees after the header */}
      {job.impact && (
        <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-white/5">
          {job.impact.map((m) => (
            <div key={m.metric}>
              <div className="text-3xl font-bold gradient-text">{m.value}</div>
              <div className="text-[10px] uppercase tracking-wider text-white/50 mt-0.5">
                {m.metric}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Headline bullet — promoted, narrative treatment */}
      <div className="mb-4 text-sm md:text-base text-white/90 leading-relaxed font-medium"
        dangerouslySetInnerHTML={{
          __html: headline.replace(
            /\*\*(.+?)\*\*/g,
            '<strong class="gradient-text">$1</strong>'
          ),
        }}
      />

      {/* Supporting bullets */}
      <div className="space-y-2 mb-4">
        {visibleBullets.map((b, j) => (
          <div
            key={j}
            className="flex gap-3 text-sm text-white/65 leading-relaxed"
          >
            <span className="text-[hsl(var(--accent))] mt-0.5 flex-shrink-0 text-xs">▸</span>
            <span
              dangerouslySetInnerHTML={{
                __html: b.replace(
                  /\*\*(.+?)\*\*/g,
                  '<strong class="gradient-text">$1</strong>'
                ),
              }}
            />
          </div>
        ))}
      </div>

      {/* Show more / less toggle */}
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition mb-5"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" /> Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" /> Show {supporting.length - 2} more
            </>
          )}
        </button>
      )}

      {/* Stack chips */}
      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
        {job.stack.map((s) => (
          <span key={s} className="text-[10px] chip text-white/60">
            {s}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">
            Production work
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold max-w-3xl">
            Work I&apos;ve <span className="gradient-text">shipped</span>.
          </h2>
          <p className="mt-3 text-sm text-white/50 max-w-2xl">
            Architecture described at an NDA-safe level of abstraction. Happy to go deeper in an interview.
          </p>
        </div>

        <div className="space-y-6">
          {profile.experience.map((job, i) => (
            <JobCard key={`${job.company}-${i}`} job={job} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
