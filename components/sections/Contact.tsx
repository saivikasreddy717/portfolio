"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { profile } from "@/content/profile";
import Epoch from "@/components/fx/Epoch";
import Magnetic from "@/components/fx/Magnetic";

/**
 * Deploy: the contact section as a deployment request. The curl call returns
 * 200 with his coordinates; the buttons execute it for real.
 */

function RaleighClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "America/New_York",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{time || "--:--:--"}</span>;
}

const lineStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};
const line = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function Contact() {
  return (
    <Epoch
      n={8}
      name="deploy"
      id="contact"
      title={
        <>
          Run converged. <span className="gradient-text">Deploy the engineer</span>.
        </>
      }
      sub="Open to AI/ML Engineer, LLM Engineer, and Data Science roles. Email gets the fastest inference."
    >
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 items-start">
        {/* the deployment request */}
        <motion.div
          variants={lineStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="panel rounded-lg overflow-hidden"
        >
          <div className="flex items-center gap-2 border-b border-white/10 bg-[hsl(var(--surface))] px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--bad))]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--accent-2))]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--good))]/70" />
            </span>
            <span className="font-mono text-xs text-white/50">deploy.sh</span>
          </div>
          <div className="p-5 font-mono text-[12px] md:text-[13px] leading-relaxed overflow-x-auto">
            <motion.div variants={line} className="text-white/80">
              <span className="text-[hsl(var(--accent))]">$</span> curl -X POST
              https://saivikas.dev/v1/deploy \
            </motion.div>
            <motion.div variants={line} className="text-white/80 pl-6">
              -d {`'{"role": "AI/ML Engineer", "team": "yours"}'`}
            </motion.div>
            <motion.div variants={line} className="mt-4 text-[hsl(var(--good))]">
              HTTP/2 200 · model available
            </motion.div>
            <motion.div variants={line} className="text-white/60">{"{"}</motion.div>
            <motion.div variants={line} className="pl-6">
              <span className="text-[hsl(var(--accent-3))]">&quot;status&quot;</span>:{" "}
              <span className="text-[hsl(var(--good))]">&quot;available_now&quot;</span>,
            </motion.div>
            <motion.div variants={line} className="pl-6">
              <span className="text-[hsl(var(--accent-3))]">&quot;email&quot;</span>:{" "}
              <a
                href={`mailto:${profile.email}`}
                className="text-[hsl(var(--accent))] underline decoration-dotted underline-offset-4 hover:text-white transition"
              >
                &quot;{profile.email}&quot;
              </a>
              ,
            </motion.div>
            <motion.div variants={line} className="pl-6">
              <span className="text-[hsl(var(--accent-3))]">&quot;phone&quot;</span>:{" "}
              <span className="text-white/80">&quot;{profile.phone}&quot;</span>,
            </motion.div>
            <motion.div variants={line} className="pl-6">
              <span className="text-[hsl(var(--accent-3))]">&quot;location&quot;</span>:{" "}
              <span className="text-white/80">&quot;{profile.location}&quot;</span>,
            </motion.div>
            <motion.div variants={line} className="pl-6">
              <span className="text-[hsl(var(--accent-3))]">&quot;local_time&quot;</span>:{" "}
              <span className="text-white/80">
                &quot;<RaleighClock /> ET&quot;
              </span>
              ,
            </motion.div>
            <motion.div variants={line} className="pl-6">
              <span className="text-[hsl(var(--accent-3))]">&quot;cold_start&quot;</span>:{" "}
              <span className="text-white/80">&quot;none, already warm&quot;</span>
            </motion.div>
            <motion.div variants={line} className="text-white/60">{"}"}</motion.div>
          </div>
        </motion.div>

        {/* execute for real */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="space-y-3"
        >
          <div className="hud-label mb-4">execute</div>
          <Magnetic className="w-full">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center justify-between w-full bg-[hsl(var(--accent-2))] text-black font-medium px-5 py-4 rounded-md hover:brightness-110 transition"
            >
              <span className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                {profile.email}
              </span>
              <span className="font-mono text-xs opacity-60">&lt; 24h</span>
            </a>
          </Magnetic>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 panel panel-hover rounded-md px-5 py-3.5 text-sm"
          >
            <Linkedin className="w-4 h-4 text-[hsl(var(--accent))]" /> LinkedIn · saivikasy
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 panel panel-hover rounded-md px-5 py-3.5 text-sm"
          >
            <Github className="w-4 h-4 text-[hsl(var(--accent))]" /> GitHub · saivikasreddy717
          </a>
          <a
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-3 panel panel-hover rounded-md px-5 py-3.5 text-sm"
          >
            <Phone className="w-4 h-4 text-[hsl(var(--accent))]" /> {profile.phone}
          </a>
          <div className="pt-2 font-mono text-[11px] text-white/35 leading-relaxed">
            {profile.availability}
          </div>
        </motion.div>
      </div>
    </Epoch>
  );
}
