"use client";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { profile } from "@/content/profile";

// Anchor targets — the IDs these point to already exist on each section
const LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Building", href: "#building" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 glass border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-3 flex items-center justify-between">
        {/* Left: name → scrolls to top */}
        <a href="#top" className="group">
          <span className="font-semibold text-sm group-hover:text-white/80 transition">
            {profile.shortName}
          </span>
        </a>

        {/* Right: nav links + resume CTA */}
        <div className="flex items-center gap-4 md:gap-6 text-sm text-white/70">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden md:inline hover:text-white transition"
            >
              {l.label}
            </a>
          ))}
          <a
            href={profile.resumePdf}
            className="chip gap-1.5 hover:bg-white/10 transition"
          >
            <Download className="w-3 h-3" />
            Resume
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
