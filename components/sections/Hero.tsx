"use client";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { profile } from "@/content/profile";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center px-6 md:px-12 pt-20">
      <div className="max-w-6xl mx-auto w-full">
        {/* Status pill — signals availability to recruiters in 2 seconds */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 chip"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          {profile.availability}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]"
        >
          I build <span className="gradient-text">production</span>
          <br />
          GenAI systems.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed"
        >
          {profile.oneLiner}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
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

        {/* Keyword-rich tech chips — recruiters scan for these */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-10 flex flex-wrap gap-2 max-w-2xl"
        >
          {["LangGraph", "RAG", "LoRA", "vLLM", "MCP", "AWS", "PyTorch", "MLflow"].map((t) => (
            <span key={t} className="chip text-white/70">
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
