"use client";
import { useChat } from "ai/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Loader2 } from "lucide-react";

// Seed questions — job-aware, tuned to what recruiters actually ask
const SUGGESTIONS = [
  "What's his RAG experience?",
  "Has he used LangGraph in production?",
  "Walk me through his LoRA fine-tuning work",
  "What are his strongest metrics?",
  "Is he available for hire?",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: "/api/chat",
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <>
      {/* Floating trigger — pulses subtly to invite clicks */}
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: open ? 0 : 1, opacity: open ? 0 : 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 glass rounded-full pl-4 pr-5 py-3
                   flex items-center gap-2 shadow-2xl hover:bg-white/10 transition"
        aria-label="Open AI assistant"
      >
        <Sparkles className="w-4 h-4 text-[hsl(var(--accent))]" />
        <span className="text-sm font-medium">Ask my AI</span>
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[min(400px,calc(100vw-2rem))]
                       h-[min(600px,calc(100vh-3rem))] glass rounded-2xl flex flex-col overflow-hidden"
          >
            <header className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <Sparkles className="w-5 h-5 text-[hsl(var(--accent))]" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full ring-2 ring-[hsl(var(--bg))]" />
                </div>
                <div>
                  <div className="text-sm font-medium">Portfolio Assistant</div>
                  <div className="text-[10px] text-white/50">
                    RAG · GPT-4o-mini · grounded in my resume
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/50 hover:text-white p-1"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </header>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <>
                  <div className="text-sm text-white/70 leading-relaxed">
                    Hi — I&apos;m trained on Sai Vikas&apos;s resume and production work. Ask me
                    anything.
                  </div>
                  <div className="flex flex-col gap-1.5 pt-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => append({ role: "user", content: s })}
                        className="text-xs text-left glass rounded-lg px-3 py-2 hover:bg-white/10 transition"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === "user" ? "bg-white text-black" : "glass text-white/90"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex items-center gap-2 text-white/50 text-xs pl-2">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  retrieving context…
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-3 border-t border-white/10">
              <div className="flex gap-2 glass rounded-xl p-1 focus-within:ring-1 ring-white/20">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask anything…"
                  className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-white/30"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-2 rounded-lg bg-white text-black disabled:opacity-30 hover:bg-white/90 transition"
                  aria-label="Send"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
