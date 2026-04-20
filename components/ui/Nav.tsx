"use client";
import { useState } from "react";
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
  // Progressive enhancement: initials render as the background.
  // When /avatar.jpg exists, it covers them. If it 404s, onError hides the
  // broken <img> and the gradient + initials shine through — no flicker.
  const [avatarError, setAvatarError] = useState(false);
  const initials = profile.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 glass border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-3 flex items-center justify-between">
        {/* Left: avatar + name → scrolls to top */}
        <a href="#top" className="flex items-center gap-3 group">
          <div
            className="relative w-9 h-9 rounded-full overflow-hidden ring-1 ring-white/10
                       bg-gradient-to-br from-[hsl(var(--accent))] via-[hsl(var(--accent-3))]
                       to-[hsl(var(--accent-2))] flex items-center justify-center"
          >
            <span className="text-xs font-semibold text-white/95 select-none">
              {initials}
            </span>
            {!avatarError && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/avatar.jpg"
                alt={profile.name}
                onError={() => setAvatarError(true)}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
          <span className="font-semibold text-sm hidden sm:inline group-hover:text-white/80 transition">
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
