"use client";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Download, FileDown } from "lucide-react";
import { profile } from "@/content/profile";

export default function ModelCard() {
  const card = profile.modelCard;

  return (
    <section id="model-card" className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">
            Model card
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold">
            The <span className="gradient-text">technical spec</span> sheet.
          </h2>
          <p className="mt-3 text-sm text-white/50 max-w-2xl">
            Inspired by Hugging Face model cards: training data, capabilities, evaluation results, and known constraints.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl overflow-hidden"
        >
          {/* Card header */}
          <div className="border-b border-white/5 px-6 md:px-8 py-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <code className="text-sm font-mono text-[hsl(var(--accent-2))]">{card.modelId}</code>
              <span className="ml-3 text-xs font-mono text-white/40">v{card.version}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-green-400">Available for deployment</span>
            </div>
          </div>

          <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">

            {/* Left column */}
            <div className="space-y-8">

              {/* Description */}
              <div>
                <Label>Description</Label>
                <p className="text-sm text-white/70 leading-relaxed mt-2">{card.description}</p>
              </div>

              {/* Training */}
              <div>
                <Label>Training data</Label>
                <div className="mt-2 rounded-xl overflow-hidden border border-white/5">
                  {profile.experience.map((job, i) => (
                    <div
                      key={i}
                      className="flex justify-between gap-4 px-4 py-2.5 text-sm border-b border-white/5 last:border-0"
                    >
                      <span className="text-white/80 font-medium">{job.company}</span>
                      <span className="text-white/40 font-mono text-xs shrink-0 self-center">{job.period}</span>
                    </div>
                  ))}
                  {profile.education.map((e, i) => (
                    <div
                      key={i}
                      className="flex justify-between gap-4 px-4 py-2.5 text-sm border-b border-white/5 last:border-0"
                    >
                      <span className="text-white/80 font-medium">{e.school}</span>
                      <span className="text-white/40 font-mono text-xs shrink-0 self-center">{e.period}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capabilities */}
              <div>
                <Label>Capabilities</Label>
                <div className="mt-2 space-y-2.5">
                  {card.capabilities.map((c) => (
                    <div key={c.title} className="flex gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[hsl(var(--accent-2))] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm font-medium text-white/90">{c.title}</span>
                        <p className="text-xs text-white/50 mt-0.5 font-mono">{c.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right column */}
            <div className="space-y-8">

              {/* Evaluation results */}
              <div>
                <Label>Evaluation results</Label>
                <div className="mt-2 rounded-xl overflow-hidden border border-white/5">
                  {card.evaluationResults.map((r, i) => (
                    <div
                      key={i}
                      className="flex justify-between gap-4 px-4 py-2.5 text-sm border-b border-white/5 last:border-0"
                    >
                      <span className="text-white/60">{r.metric}</span>
                      <span className="font-mono font-semibold gradient-text shrink-0">{r.result}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Intended use */}
              <div>
                <Label>Intended use</Label>
                <div className="mt-2 space-y-1.5">
                  {card.suitedFor.map((s, i) => (
                    <div key={i} className="flex gap-2.5 text-sm text-white/70">
                      <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                      {s}
                    </div>
                  ))}
                </div>
                <div className="mt-3 space-y-1.5">
                  {card.knownConstraints.map((c, i) => (
                    <div key={i} className="flex gap-2.5 text-sm text-white/50">
                      <AlertCircle className="w-3.5 h-3.5 text-yellow-500/70 flex-shrink-0 mt-0.5" />
                      {c}
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical specs */}
              <div>
                <Label>Technical specs</Label>
                <div className="mt-2 space-y-2">
                  {card.technicalSpecs.map((s) => (
                    <div key={s.label} className="flex gap-3 text-sm">
                      <span className="text-white/40 font-mono text-xs w-28 flex-shrink-0 pt-0.5">{s.label}</span>
                      <span className="text-white/75">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Footer CTA */}
          <div className="border-t border-white/5 px-6 md:px-8 py-5 flex flex-wrap items-center justify-end gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 glass glass-hover rounded-lg px-4 py-2 text-sm print:hidden"
            >
              Contact
            </a>
            <a
              href={profile.resumePdf}
              className="inline-flex items-center gap-2 glass glass-hover rounded-lg px-4 py-2 text-sm print:hidden"
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </a>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 glass glass-hover rounded-lg px-4 py-2 text-sm print:hidden"
            >
              <FileDown className="w-3.5 h-3.5" />
              Download Model Card
            </button>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-mono uppercase tracking-widest text-white/40">{children}</div>
  );
}
