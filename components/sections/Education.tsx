"use client";
import { motion } from "framer-motion";
import { BadgeCheck, GraduationCap } from "lucide-react";
import { profile } from "@/content/profile";
import Epoch from "@/components/fx/Epoch";

/**
 * Pretraining: education as the base training corpus, certifications as
 * alignment checks that passed.
 */
export default function Education() {
  return (
    <Epoch
      n={6}
      name="pretraining"
      id="pretraining"
      title={
        <>
          Pretraining corpus and <span className="gradient-text">alignment checks</span>.
        </>
      }
      sub="The base model was trained at two universities, then aligned against AWS and Azure eval suites."
    >
      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {/* corpus: education */}
        <div className="space-y-4">
          <div className="hud-label flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5 text-[hsl(var(--accent))]" />
            base training data
          </div>
          {profile.education.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="panel panel-hover rounded-md p-5"
            >
              <div className="flex items-center justify-between hud-label">
                <span className="text-[hsl(var(--accent))]">corpus/{String(i).padStart(2, "0")}</span>
                <span>{edu.period}</span>
              </div>
              <h3 className="mt-3 font-semibold">{edu.school}</h3>
              <p className="mt-1 text-sm text-[hsl(var(--muted))]">{edu.degree}</p>
            </motion.div>
          ))}
        </div>

        {/* alignment: certifications */}
        <div className="space-y-4">
          <div className="hud-label flex items-center gap-2">
            <BadgeCheck className="w-3.5 h-3.5 text-[hsl(var(--accent-2))]" />
            alignment evals passed
          </div>
          {profile.certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="panel panel-hover rounded-md p-5 relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="absolute -right-5 top-4 rotate-[18deg] border border-[hsl(var(--good))]/40 text-[hsl(var(--good))]/70 font-mono text-[9px] uppercase tracking-[0.3em] px-5 py-0.5 select-none"
              >
                passed
              </div>
              <div className="hud-label text-[hsl(var(--accent-2))]">
                eval/{cert.id.toLowerCase()}
              </div>
              <h3 className="mt-3 font-semibold pr-20">{cert.name}</h3>
              <p className="mt-1 text-sm text-[hsl(var(--muted))]">{cert.issuer}</p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="font-mono text-[11px] text-white/35 leading-relaxed px-1"
          >
            $ verify --all
            <br />
            <span className="text-[hsl(var(--good))]">2/2 checks passed</span> · no hallucinated
            credentials detected
          </motion.div>
        </div>
      </div>
    </Epoch>
  );
}
