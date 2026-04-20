"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { profile } from "@/content/profile";

const FACTS = [
  { label: "Experience", value: "3+ years" },
  { label: "Current role", value: "ML Engineer" },
  { label: "Company", value: "Cardinal Health" },
  { label: "Education", value: "MS CS, NC State" },
  { label: "Location", value: "Raleigh, NC" },
];

export default function Hero() {
  const [avatarError, setAvatarError] = useState(false);
  const initials = profile.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  return (
    <section className="relative min-h-[70vh] flex items-center px-6 md:px-12 pt-12 pb-12">
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 md:gap-16">

        {/* Left: text content */}
        <div className="flex-1 min-w-0">

          {/* Availability pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 chip mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            {profile.availability}
          </motion.div>

          {/* Tagline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]"
          >
            I build <span className="gradient-text">production</span>
            <br />
            GenAI systems.
          </motion.h1>

          {/* At-a-glance facts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-6 flex flex-wrap gap-x-6 gap-y-3"
          >
            {FACTS.map((f) => (
              <div key={f.label}>
                <div className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                  {f.label}
                </div>
                <div className="text-sm font-medium text-white/85 mt-0.5">{f.value}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a
              href="#experience"
              className="group inline-flex items-center gap-2 rounded-lg px-6 py-3 bg-white text-black font-medium hover:bg-white/90 transition"
            >
              See my work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </a>
            <a
              href={profile.resumePdf}
              className="inline-flex items-center gap-2 glass glass-hover rounded-lg px-6 py-3"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
            <span className="hidden md:inline-flex items-center text-xs text-white/40 ml-3 self-center">
              or ask my AI assistant →
            </span>
          </motion.div>
        </div>

        {/* Right: profile photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 flex flex-col items-center gap-4"
        >
          <div
            className="relative w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden
                       ring-2 ring-white/10 ring-offset-4 ring-offset-[hsl(var(--bg))]
                       bg-gradient-to-br from-[hsl(var(--accent))] via-[hsl(var(--accent-3))]
                       to-[hsl(var(--accent-2))] flex items-center justify-center
                       shadow-[0_0_60px_hsl(var(--accent)/0.25)]"
          >
            <span className="text-5xl font-bold text-white/90 select-none">{initials}</span>
            {!avatarError && (
              <Image
                src="/avatar.jpg"
                alt={profile.name}
                fill
                sizes="(max-width: 768px) 208px, 256px"
                className="object-cover"
                onError={() => setAvatarError(true)}
                priority
              />
            )}
          </div>

          {/* Full name + role */}
          <div className="text-center">
            <p className="font-semibold text-white text-base">{profile.name}</p>
            <p className="text-sm text-white/50 mt-0.5">{profile.role}</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
