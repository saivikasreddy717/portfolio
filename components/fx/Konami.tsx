"use client";
import { useEffect } from "react";
import { toast } from "@/lib/bus";

const SEQUENCE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

/** Konami code: the model overfits and the palette destabilizes. */
export default function Konami() {
  useEffect(() => {
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      pos = key === SEQUENCE[pos] ? pos + 1 : key === SEQUENCE[0] ? 1 : 0;
      if (pos === SEQUENCE.length) {
        pos = 0;
        const on = document.documentElement.classList.toggle("overfit");
        toast(
          on
            ? "KONAMI ACCEPTED · model overfit · loss: NaN · vibes: maximal"
            : "regularization applied · model stabilized"
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return null;
}
