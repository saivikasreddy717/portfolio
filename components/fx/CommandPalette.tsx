"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/content/profile";
import { EV, emit, toast } from "@/lib/bus";

/**
 * CommandPalette: navigate the site like a CLI. Ctrl/Cmd+K or "/" opens it.
 * Ships a few commands that are pure easter eggs, because recruiters who find
 * them deserve a smile. Also hosts the global toast renderer.
 */

type Command = {
  id: string;
  label: string;
  hint: string;
  group: "navigate" | "actions" | "fun";
  keywords: string;
  run: () => void;
};

function goto(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const commands: Command[] = useMemo(
    () => [
      { id: "nav-top", label: "goto /init", hint: "hero", group: "navigate", keywords: "home top hero start", run: () => goto("top") },
      { id: "nav-telemetry", label: "goto /telemetry", hint: "production metrics", group: "navigate", keywords: "metrics numbers impact telemetry", run: () => goto("telemetry") },
      { id: "nav-heads", label: "goto /attention-heads", hint: "why hire me", group: "navigate", keywords: "why hire pillars capabilities attention", run: () => goto("capabilities") },
      { id: "nav-traces", label: "goto /inference-traces", hint: "work experience", group: "navigate", keywords: "experience work jobs cardinal tcs traces", run: () => goto("experience") },
      { id: "nav-arch", label: "goto /architecture", hint: "skills + stack", group: "navigate", keywords: "skills stack architecture tools", run: () => goto("skills") },
      { id: "nav-card", label: "goto /model-card", hint: "spec sheet", group: "navigate", keywords: "model card spec evals", run: () => goto("model-card") },
      { id: "nav-pretrain", label: "goto /pretraining", hint: "education + certs", group: "navigate", keywords: "education school degree certifications aws azure", run: () => goto("pretraining") },
      { id: "nav-building", label: "goto /currently-training", hint: "side projects", group: "navigate", keywords: "projects building roadmap github", run: () => goto("building") },
      { id: "nav-deploy", label: "goto /deploy", hint: "contact", group: "navigate", keywords: "contact email hire deploy reach", run: () => goto("contact") },
      {
        id: "act-chat",
        label: "run inference --live",
        hint: "ask the RAG assistant",
        group: "actions",
        keywords: "chat ask ai assistant question rag bot",
        run: () => emit(EV.chatbot),
      },
      {
        id: "act-resume",
        label: "download weights.pdf",
        hint: "resume",
        group: "actions",
        keywords: "resume cv download pdf weights",
        run: () => window.open(profile.resumePdf, "_blank"),
      },
      {
        id: "act-github",
        label: "open github/saivikasreddy717",
        hint: "code",
        group: "actions",
        keywords: "github code repos",
        run: () => window.open(profile.github, "_blank"),
      },
      {
        id: "act-linkedin",
        label: "open linkedin/saivikasy",
        hint: "profile",
        group: "actions",
        keywords: "linkedin connect social",
        run: () => window.open(profile.linkedin, "_blank"),
      },
      {
        id: "act-email",
        label: "send packet --to sai",
        hint: profile.email,
        group: "actions",
        keywords: "email mail contact message",
        run: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      },
      {
        id: "fun-hire",
        label: "sudo hire sai-vikas",
        hint: "requires no password",
        group: "fun",
        keywords: "sudo hire job offer",
        run: () => {
          toast("ACCESS GRANTED · onboarding sequence initiated");
          setTimeout(() => goto("contact"), 350);
        },
      },
      {
        id: "fun-whoami",
        label: "whoami",
        hint: "identity check",
        group: "fun",
        keywords: "whoami who about",
        run: () => toast(`${profile.shortName} · ${profile.role} · ${profile.location}`),
      },
      {
        id: "fun-smi",
        label: "nvidia-smi",
        hint: "gpu status",
        group: "fun",
        keywords: "gpu nvidia smi cuda",
        run: () => toast("GPU 0: ambition · 99% util · temp: chill · no OOM since 2022"),
      },
      {
        id: "fun-doubt",
        label: "rm -rf doubts/",
        hint: "frees up headspace",
        group: "fun",
        keywords: "rm doubts delete",
        run: () => toast("removed 'doubts/' · confidence at 100% · hire accordingly"),
      },
      {
        id: "fun-overfit",
        label: "toggle --overfit-mode",
        hint: "destabilize the palette",
        group: "fun",
        keywords: "overfit party konami colors mode",
        run: () => {
          const on = document.documentElement.classList.toggle("overfit");
          toast(on ? "OVERFIT MODE ON · loss: NaN · vibes: maximal" : "overfit mode off · model regularized");
        },
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands
      .map((c) => {
        const hay = `${c.label} ${c.hint} ${c.keywords}`.toLowerCase();
        let score = 0;
        if (c.label.toLowerCase().startsWith(q)) score = 3;
        else if (hay.includes(q)) score = 2;
        else {
          // subsequence match
          let i = 0;
          for (const ch of hay) if (ch === q[i]) i++;
          if (i >= q.length) score = 1;
        }
        return { c, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.c);
  }, [commands, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelected(0);
  }, []);

  const execute = useCallback(
    (cmd: Command) => {
      close();
      // Let the palette unmount before scrolling so the page does not jump.
      setTimeout(() => cmd.run(), 60);
    },
    [close]
  );

  // Global hotkeys + open events.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "/" && !typing && !open) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape" && open) {
        close();
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(EV.palette, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(EV.palette, onOpen);
    };
  }, [open, close]);

  // Focus + scroll lock while open. Restore to "" (not the captured prior
  // value) so a lock inherited from another overlay can never stick.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [open]);

  useEffect(() => setSelected(0), [query]);

  // Keep selection visible.
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-idx="${selected}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && filtered[selected]) {
      e.preventDefault();
      execute(filtered[selected]);
    }
  };

  const groups: Array<{ key: Command["group"]; label: string }> = [
    { key: "navigate", label: "navigate" },
    { key: "actions", label: "actions" },
    { key: "fun", label: "hidden ops" },
  ];

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-start justify-center px-4 pt-[14vh]"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="panel w-full max-w-xl overflow-hidden rounded-lg"
              onKeyDown={onListKey}
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 font-mono text-sm">
                <span className="text-[hsl(var(--accent))] select-none">❯</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="type a command or search..."
                  className="flex-1 bg-transparent outline-none placeholder:text-white/25 text-white/90"
                  spellCheck={false}
                />
                <kbd className="hud-label border border-white/10 rounded px-1.5 py-0.5">esc</kbd>
              </div>

              <div ref={listRef} className="max-h-[46vh] overflow-y-auto py-2">
                {filtered.length === 0 && (
                  <div className="px-4 py-6 font-mono text-xs text-white/40">
                    command not found: {query}
                    <span className="caret" />
                  </div>
                )}
                {groups.map(({ key, label }) => {
                  const items = filtered.filter((c) => c.group === key);
                  if (items.length === 0) return null;
                  return (
                    <div key={key} className="mb-1">
                      <div className="hud-label px-4 pt-2 pb-1.5">{label}</div>
                      {items.map((cmd) => {
                        const idx = filtered.indexOf(cmd);
                        const active = idx === selected;
                        return (
                          <button
                            key={cmd.id}
                            data-idx={idx}
                            onClick={() => execute(cmd)}
                            onMouseMove={() => setSelected(idx)}
                            className={`flex w-full items-center justify-between gap-4 px-4 py-2 font-mono text-[13px] text-left transition-colors ${
                              active
                                ? "bg-[hsl(var(--accent))]/10 text-white"
                                : "text-white/65"
                            }`}
                          >
                            <span className="flex items-center gap-2.5 min-w-0">
                              <span
                                className={`select-none ${
                                  active ? "text-[hsl(var(--accent))]" : "text-white/20"
                                }`}
                              >
                                {active ? "▸" : "·"}
                              </span>
                              <span className="truncate">{cmd.label}</span>
                            </span>
                            <span className="hud-label shrink-0 normal-case tracking-normal">
                              {cmd.hint}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 hud-label">
                <span>↑↓ navigate · ↵ run · esc close</span>
                <span className="text-[hsl(var(--accent))]/70">neural-os</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster />
    </>
  );
}

/** Global toast line, terminal style, bottom center. */
function Toaster() {
  const [msg, setMsg] = useState<{ text: string; key: number } | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onToast = (e: Event) => {
      const text = String((e as CustomEvent).detail ?? "");
      setMsg({ text, key: Date.now() });
      clearTimeout(timer);
      timer = setTimeout(() => setMsg(null), 3000);
    };
    window.addEventListener(EV.toast, onToast);
    return () => {
      window.removeEventListener(EV.toast, onToast);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[90] -translate-x-1/2">
      <AnimatePresence>
        {msg && (
          <motion.div
            key={msg.key}
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="panel rounded-md px-4 py-2.5 font-mono text-xs text-white/85 whitespace-nowrap max-w-[92vw] overflow-hidden text-ellipsis"
          >
            <span className="text-[hsl(var(--accent))] mr-2 select-none">❯</span>
            {msg.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
