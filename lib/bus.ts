// Tiny window event bus so islands can talk without shared state.
export const EV = {
  toast: "hud:toast",
  palette: "palette:open",
  chatbot: "chatbot:open",
} as const;

export function emit(name: string, detail?: unknown) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

export function toast(message: string) {
  emit(EV.toast, message);
}
