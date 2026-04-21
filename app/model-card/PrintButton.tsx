"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-1.5 rounded-lg text-xs font-mono hover:bg-gray-700 transition"
    >
      Print / Save as PDF
    </button>
  );
}
