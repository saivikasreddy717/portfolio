"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Command, Download } from "lucide-react";
import { profile } from "@/content/profile";
import { EV, emit } from "@/lib/bus";

const LINKS = [
  { label: "traces", href: "#experience", n: "03" },
  { label: "architecture", href: "#skills", n: "04" },
  { label: "model card", href: "#model-card", n: "05" },
  { label: "deploy", href: "#contact", n: "08" },
];

export default function Nav() {
  const [isMac, setIsMac] = useState(true);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMac(/mac/i.test(navigator.platform));
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        if (barRef.current) barRef.current.style.width = `${p * 100}%`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-white/5 bg-[hsl(var(--bg))]/75 backdrop-blur-md"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-3 flex items-center justify-between gap-4">
        <a href="#top" className="font-mono text-sm text-white/85 hover:text-white transition">
          <span className="text-[hsl(var(--accent))]">~</span>/sai-vikas
          <span className="caret" />
        </a>

        <div className="hidden md:flex items-center gap-6 font-mono text-xs text-white/55">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="group hover:text-white transition">
              <span className="text-[hsl(var(--accent))]/50 group-hover:text-[hsl(var(--accent))] transition mr-1">
                {l.n}
              </span>
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => emit(EV.palette)}
            className="inline-flex items-center gap-1.5 chip text-white/70 hover:bg-white/10 hover:text-white transition"
            aria-label="Open command deck"
          >
            <Command className="w-3 h-3" />
            {isMac ? "⌘K" : "ctrl K"}
          </button>
          <a
            href={profile.resumePdf}
            className="hidden sm:inline-flex items-center gap-1.5 chip text-white/70 hover:bg-white/10 hover:text-white transition"
          >
            <Download className="w-3 h-3" />
            weights.pdf
          </a>
        </div>
      </div>
      {/* scroll progress hairline */}
      <div
        ref={barRef}
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--accent-3))]"
        style={{ width: "0%" }}
        aria-hidden="true"
      />
    </motion.nav>
  );
}
