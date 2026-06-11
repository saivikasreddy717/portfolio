import Nav from "@/components/ui/Nav";
import BootSequence from "@/components/fx/BootSequence";
import CommandPalette from "@/components/fx/CommandPalette";
import CustomCursor from "@/components/fx/CustomCursor";
import Konami from "@/components/fx/Konami";
import TrainingHUD from "@/components/fx/TrainingHUD";
import Hero from "@/components/sections/Hero";
import MetricsWall from "@/components/sections/MetricsWall";
import WhyHireMe from "@/components/sections/WhyHireMe";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import ModelCard from "@/components/sections/ModelCard";
import Education from "@/components/sections/Education";
import Roadmap from "@/components/sections/Roadmap";
import Contact from "@/components/sections/Contact";
import Chatbot from "@/components/ui/Chatbot";

export default function Home() {
  return (
    <main id="top" className="relative overflow-hidden">
      {/* Backdrop: blueprint grid, drifting scan band, film grain */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-x-0 top-0 scanband" />
        <div className="absolute inset-0 noise" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[720px] rounded-full bg-[hsl(var(--accent))]/[0.05] blur-3xl" />
      </div>

      <BootSequence />
      <CustomCursor />
      <CommandPalette />
      <Konami />
      <TrainingHUD />

      <Nav />
      <Hero />
      <MetricsWall />
      <WhyHireMe />
      <Experience />
      <Skills />
      <ModelCard />
      <Education />
      <Roadmap />
      <Contact />

      <Chatbot />

      <footer className="border-t border-white/5 px-6 py-8 text-center font-mono text-[11px] text-white/35">
        <span className="text-[hsl(var(--good))]">✓</span> process exited with code 0 · built with
        Next.js · RAG chatbot: GPT-4o-mini + Upstash Vector ·{" "}
        <span className="text-white/50">no recruiters were harmed during this training run</span>
      </footer>
    </main>
  );
}
