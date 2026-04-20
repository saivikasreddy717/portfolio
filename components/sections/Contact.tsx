"use client";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Phone, MapPin } from "lucide-react";
import { profile } from "@/content/profile";

export default function Contact() {
  const links: { Icon: typeof Mail; label: string; href: string | null }[] = [
    { Icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    { Icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { Icon: Github, label: "GitHub", href: profile.github },
    { Icon: Linkedin, label: "LinkedIn", href: profile.linkedin },
    { Icon: MapPin, label: profile.location, href: null },
  ];

  return (
    <section id="contact" className="px-6 md:px-12 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-3">
            Contact
          </div>
          <h2 className="text-4xl md:text-6xl font-semibold mb-6">
            Let&apos;s <span className="gradient-text">build something</span>.
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
            Open to senior AI/ML roles starting May 2025. Fastest path: email — I reply within 24h.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {links.map(({ Icon, label, href }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  className="inline-flex items-center gap-2 glass glass-hover rounded-lg px-5 py-3 text-sm"
                >
                  <Icon className="w-4 h-4" /> {label}
                </a>
              ) : (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 chip text-sm"
                >
                  <Icon className="w-4 h-4" /> {label}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
