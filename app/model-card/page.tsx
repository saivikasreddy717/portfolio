import { profile } from "@/content/profile";
import PrintTrigger from "./PrintTrigger";
import PrintButton from "./PrintButton";

export const metadata = { title: "Model Card | Sai Vikas Reddy Yeddulamala" };

export default function ModelCardPrintPage() {
  const card = profile.modelCard;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Injects @page rule and forces print-safe colors */}
      <style>{`
        @page { size: A4; margin: 1.2cm 1.4cm; }
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
        }
      `}</style>

      <PrintTrigger />

      {/* Screen-only toolbar */}
      <div className="no-print flex items-center justify-between px-10 py-3 border-b border-gray-200 bg-gray-50 text-sm">
        <a href="/" className="text-gray-500 hover:text-gray-900 transition">
          ← Back to portfolio
        </a>
        <PrintButton />
      </div>

      <div className="max-w-4xl mx-auto px-10 py-10">

        {/* Header */}
        <div className="flex items-start justify-between mb-6 pb-6 border-b-2 border-gray-900">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1">Model Card</p>
            <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
            <code className="text-sm text-purple-700 font-mono mt-1 block">{card.modelId}</code>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              Available for deployment
            </span>
            <p className="text-xs text-gray-400 mt-2">v{card.version}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <Label>Description</Label>
          <p className="text-sm text-gray-700 leading-relaxed mt-1.5">{card.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-10 mb-6">

          {/* Left column */}
          <div className="space-y-6">

            {/* Training data */}
            <div>
              <Label>Training Data</Label>
              <table className="w-full mt-1.5 text-sm">
                <tbody>
                  {profile.experience.map((job, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-1.5 font-medium text-gray-800">{job.company}</td>
                      <td className="py-1.5 text-right text-gray-500 font-mono text-xs whitespace-nowrap">{job.period}</td>
                    </tr>
                  ))}
                  {profile.education.map((e, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0">
                      <td className="py-1.5 font-medium text-gray-800">{e.school}</td>
                      <td className="py-1.5 text-right text-gray-500 font-mono text-xs whitespace-nowrap">{e.period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Capabilities */}
            <div>
              <Label>Capabilities</Label>
              <div className="mt-1.5 space-y-2.5">
                {card.capabilities.map((c) => (
                  <div key={c.title}>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 text-sm font-bold">✓</span>
                      <span className="text-sm font-semibold text-gray-800">{c.title}</span>
                    </div>
                    <p className="text-xs text-gray-500 ml-5 font-mono mt-0.5">{c.detail}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right column */}
          <div className="space-y-6">

            {/* Evaluation results */}
            <div>
              <Label>Evaluation Results</Label>
              <table className="w-full mt-1.5 text-sm">
                <tbody>
                  {card.evaluationResults.map((r, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0">
                      <td className="py-1.5 text-gray-600">{r.metric}</td>
                      <td className="py-1.5 text-right font-bold text-purple-700 font-mono">{r.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Intended use */}
            <div>
              <Label>Intended Use</Label>
              <div className="mt-1.5 space-y-1.5">
                {card.suitedFor.map((s, i) => (
                  <div key={i} className="flex gap-2 text-sm text-gray-700">
                    <span className="text-green-600 flex-shrink-0 font-bold">✓</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2.5 space-y-1.5">
                {card.knownConstraints.map((c, i) => (
                  <div key={i} className="flex gap-2 text-sm text-gray-500">
                    <span className="text-yellow-600 flex-shrink-0">⚠</span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Technical specs */}
        <div className="mb-6 pt-5 border-t border-gray-200">
          <Label>Technical Specs</Label>
          <table className="w-full mt-1.5 text-sm">
            <tbody>
              {card.technicalSpecs.map((s) => (
                <tr key={s.label} className="border-b border-gray-100 last:border-0">
                  <td className="py-1.5 font-mono text-xs text-gray-400 w-36">{s.label}</td>
                  <td className="py-1.5 text-gray-700">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="pt-5 border-t border-gray-200 flex justify-between items-center text-xs text-gray-400">
          <span className="font-mono">{card.modelId} · v{card.version}</span>
          <span>{profile.email} · {profile.linkedin}</span>
        </div>

      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1">
      {children}
    </div>
  );
}
