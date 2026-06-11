"use client";
import { motion } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";
import { profile } from "@/content/profile";
import Epoch from "@/components/fx/Epoch";

/**
 * Currently training: personal projects as live training runs that have not
 * converged yet, indeterminate progress bars included.
 */
export default function Roadmap() {
  return (
    <Epoch
      n={7}
      name="active runs"
      id="building"
      title={
        <>
          Runs still <span className="gradient-text">in progress</span>.
        </>
      }
      sub="Side projects currently training on nights and weekends. Loss is decreasing; PRs welcome."
    >
      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {profile.roadmap.map((proj, i) => (
          <motion.a
            key={proj.title}
            href={proj.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.55 }}
            className="group panel panel-hover rounded-md p-6 block"
          >
            <div className="flex items-center justify-between hud-label">
              <span className="flex items-center gap-2">
                <GitBranch className="w-3.5 h-3.5 text-[hsl(var(--accent))]" />
                run/{proj.title}
              </span>
              <span className="flex items-center gap-1.5 text-[hsl(var(--accent-2))]">
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent-2))] animate-pulse" />
                training
              </span>
            </div>

            <h3 className="mt-4 text-lg font-semibold font-mono group-hover:text-[hsl(var(--accent))] transition-colors">
              {proj.title}
              <ExternalLink className="inline w-3.5 h-3.5 ml-2 opacity-0 group-hover:opacity-60 transition-opacity" />
            </h3>
            <p className="mt-2 text-sm text-[hsl(var(--muted))] leading-relaxed">
              {proj.description}
            </p>

            {/* indeterminate progress */}
            <div className="mt-5 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="training-bar h-full w-full" />
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10px] text-white/35">
              <span>eta: shipping soon</span>
              <span>github.com ↗</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {proj.tags.map((t) => (
                <span key={t} className="chip text-[10px] text-white/60">
                  {t}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </Epoch>
  );
}
