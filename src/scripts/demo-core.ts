export const es = document.documentElement.lang === "es";
export const l = (spanish: string, english: string) => (es ? spanish : english);
export const $ = <T extends HTMLElement = HTMLElement>(
  selector: string,
  root: ParentNode = document,
) => root.querySelector<T>(selector)!;
export const $$ = <T extends HTMLElement = HTMLElement>(
  selector: string,
  root: ParentNode = document,
) => Array.from(root.querySelectorAll<T>(selector));
let noticeTimer = 0;
export function notice(message: string) {
  $("#demo-notice").textContent = message;
  clearTimeout(noticeTimer);
  noticeTimer = window.setTimeout(
    () => ($("#demo-notice").textContent = ""),
    6500,
  );
}
export function node<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  text = "",
  className = "",
) {
  const e = document.createElement(tag);
  e.textContent = text;
  if (className) e.className = className;
  return e;
}
export function button(
  text: string,
  action: () => void,
  className = "secondary",
) {
  const b = node("button", text, className);
  b.type = "button";
  b.addEventListener("click", action);
  return b;
}
export const money = (amount: number) =>
  new Intl.NumberFormat(es ? "es-CO" : "en-US", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(amount);
export function initDialogs() {
  $$<HTMLDialogElement>("dialog[data-demo-dialog]").forEach((d) => {
    d.querySelector("[data-close]")?.addEventListener("click", () => d.close());
    d.addEventListener("click", (e) => {
      if (e.target !== d) return;
      const r = d.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        d.close();
    });
  });
}
export function initScreens(onChange?: (name: string) => void) {
  const sections = $$("[data-screen]");
  let current = "";
  function show(name: string, focus = false) {
    if (!sections.some((s) => s.dataset.screen === name))
      name = sections[0]?.dataset.screen || "";
    current = name;
    sections.forEach((s) => (s.hidden = s.dataset.screen !== name));
    $$<HTMLAnchorElement>("[data-nav]").forEach((a) => {
      if (a.dataset.nav === name) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    onChange?.(name);
    if (focus) {
      const section = $<HTMLElement>(`[data-screen="${name}"]`);
      const heading =
        $$<HTMLElement>("h1,h2", section).find(
          (h) => h.getClientRects().length > 0,
        ) || section;
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
      $("#demo-main").scrollIntoView({ block: "start" });
    }
  }
  window.addEventListener("hashchange", () =>
    show(location.hash.slice(1), true),
  );
  show(location.hash.slice(1));
  return (name: string) => {
    if (current === name) show(name, true);
    else location.hash = name;
  };
}
