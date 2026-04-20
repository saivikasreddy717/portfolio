import Hero from "@/components/sections/Hero";
import MetricsWall from "@/components/sections/MetricsWall";
import WhyHireMe from "@/components/sections/WhyHireMe";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Certifications from "@/components/sections/Certifications";
import Roadmap from "@/components/sections/Roadmap";
import Contact from "@/components/sections/Contact";
import Chatbot from "@/components/ui/Chatbot";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Ambient gradient orbs, fixed, non-interactive */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-[hsl(var(--accent))]/15 blur-3xl" />
        <div className="absolute top-[60%] -right-40 h-[500px] w-[500px] rounded-full bg-[hsl(var(--accent-2))]/10 blur-3xl" />
        <div className="absolute top-[120%] left-[20%] h-[400px] w-[400px] rounded-full bg-[hsl(var(--accent-3))]/10 blur-3xl" />
      </div>

      <Hero />
      <MetricsWall />
      <WhyHireMe />
      <Experience />
      <Skills />
      <Certifications />
      <Roadmap />
      <Contact />

      <Chatbot />

      <footer className="text-center py-8 text-xs text-white/40 border-t border-white/5">
        Built with Next.js · Streaming RAG chatbot powered by GPT-4o-mini + Upstash Vector
      </footer>
    </main>
  );
}
