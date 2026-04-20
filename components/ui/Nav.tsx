"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { profile } from "@/content/profile";

const LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Building", href: "#building" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-40 glass border-b border-white/5"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-3 flex items-center justify-between">
          {/* Left: name */}
          <a href="#top" className="group">
            <span className="font-semibold text-sm group-hover:text-white/80 transition">
              {profile.name}
            </span>
          </a>

          {/* Desktop: nav links + resume */}
          <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-white transition">
                {l.label}
              </a>
            ))}
            <a href={profile.resumePdf} className="chip gap-1.5 hover:bg-white/10 transition">
              <Download className="w-3 h-3" />
              Resume
            </a>
          </div>

          {/* Mobile: hamburger + resume */}
          <div className="flex md:hidden items-center gap-3">
            <a href={profile.resumePdf} className="chip gap-1.5 hover:bg-white/10 transition">
              <Download className="w-3 h-3" />
              Resume
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 text-white/70 hover:text-white transition"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-white/5 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm text-white/70 hover:text-white transition py-1"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
