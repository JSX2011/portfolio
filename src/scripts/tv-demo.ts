import { sampleTitles } from "../data/tv-demo";
import {
  $,
  $$,
  es,
  l,
  button,
  node,
  notice,
  initScreens,
  initDialogs,
} from "./demo-core";
const titles = sampleTitles(es ? "es" : "en");
let kind = "movie",
  active = titles[0];
let playing = false;
let position = 0;
let returnCard: HTMLElement | null = null;
let fromDetails = false;
const detail = $<HTMLDialogElement>("#tv-details");
initDialogs();
const show = initScreens((name) => {
  if (name !== "player") {
    playing = false;
    updatePlayer();
  }
});
function filter() {
  const search = $<HTMLInputElement>("#tv-search").value.toLocaleLowerCase();
  const genre = $<HTMLSelectElement>("#tv-genre").value;
  const year = $<HTMLSelectElement>("#tv-year").value;
  let count = 0;
  $$<HTMLButtonElement>("#tv-grid [data-title]").forEach((card) => {
    const t = titles.find((t) => t.id === card.dataset.title)!;
    card.hidden = !(
      t.kind === kind &&
      t.title.toLocaleLowerCase().includes(search) &&
      (genre === "all" || genre === t.genre) &&
      (year === "all" || year === String(t.year))
    );
    if (!card.hidden) count++;
  });
  $("#tv-empty").hidden = count > 0;
  $("#tv-count").textContent =
    count + l(" títulos de ejemplo", " sample titles");
  $("#catalog-name").textContent =
    kind === "movie"
      ? l("Películas para explorar", "Movies to explore")
      : l("Series para descubrir", "Series to discover");
}
$$<HTMLButtonElement>(".tv-header [data-kind]").forEach((b) =>
  b.addEventListener("click", () => {
    kind = b.dataset.kind!;
    $$(".tv-header [data-kind]").forEach((x) =>
      x.setAttribute("aria-pressed", String(x === b)),
    );
    show("catalog");
    filter();
  }),
);
["#tv-search", "#tv-genre", "#tv-year"].forEach((id) =>
  $(id).addEventListener(id === "#tv-search" ? "input" : "change", filter),
);
$("#tv-clear").addEventListener("click", () => {
  $<HTMLInputElement>("#tv-search").value = "";
  $<HTMLSelectElement>("#tv-genre").value = "all";
  $<HTMLSelectElement>("#tv-year").value = "all";
  filter();
  $("#tv-search").focus();
});
function episodes() {
  const list = $("#episode-list");
  list.replaceChildren();
  const season = $<HTMLSelectElement>("#tv-season").value;
  for (let i = 1; i <= 3; i++) {
    const b = button(
      "",
      () => startPlayer(`${active.title} · T${season} E${i}`),
      "episode-button",
    );
    b.append(
      node("span", String(i).padStart(2, "0"), "episode-number"),
      node("strong", l("Un nuevo camino", "A New Path") + ` · ${i}`),
      node("span", "42 min", "muted"),
      node("span", "▶"),
    );
    list.append(b);
  }
}
function openTitle(id: string, card: HTMLElement) {
  active = titles.find((t) => t.id === id)!;
  returnCard = card;
  $("#tv-detail-title").textContent = active.title;
  $("#detail-poster-title").textContent = active.title;
  $("#detail-art").className = "poster-art scene-" + active.scene;
  $("#detail-art").style.setProperty("--poster-color", active.color);
  $("#tv-detail-meta").textContent =
    `${active.year} · ${active.runtime} min · ` +
    (active.kind === "movie"
      ? l("Película de ejemplo", "Sample movie")
      : l("Serie de ejemplo", "Sample series"));
  $("#tv-detail-description").textContent = active.description;
  $("#tv-episodes").hidden = active.kind !== "series";
  $<HTMLSelectElement>("#tv-season").value = "1";
  episodes();
  detail.showModal();
}
$$<HTMLButtonElement>("#tv-grid [data-title]").forEach((b) =>
  b.addEventListener("click", () => openTitle(b.dataset.title!, b)),
);
$("#tv-season").addEventListener("change", episodes);
detail.addEventListener("close", () => {
  if (!fromDetails) returnCard?.focus();
  fromDetails = false;
});
function startPlayer(title: string) {
  fromDetails = true;
  detail.close();
  playing = false;
  position = 0;
  $("#player-title").textContent = title;
  updatePlayer();
  show("player");
}
$("#play-title").addEventListener("click", () => startPlayer(active.title));
function back() {
  playing = false;
  show("catalog");
  updatePlayer();
  setTimeout(() => returnCard?.focus(), 30);
}
$("#player-back").addEventListener("click", back);
function updatePlayer() {
  const label = playing
    ? l("Pausar vista", "Pause preview")
    : l("Iniciar vista", "Start preview");
  $("#player-toggle").textContent = (playing ? "Ⅱ " : "▶ ") + label;
  $("#player-toggle").setAttribute("aria-pressed", String(playing));
  $<HTMLInputElement>("#player-progress").value = String(position);
  $("#player-time").textContent =
    `${Math.floor(position / 60)}:${String(position % 60).padStart(2, "0")} / 2:00`;
  $(".tv-player-scenery").classList.toggle("is-playing", playing);
}
$("#player-toggle").addEventListener("click", () => {
  if (position >= 120) position = 0;
  playing = !playing;
  updatePlayer();
});
$("#player-progress").addEventListener("input", (e) => {
  position = Number((e.target as HTMLInputElement).value);
  updatePlayer();
});
let timer = 0;
function startTimer() {
  if (!timer)
    timer = window.setInterval(() => {
      if (!playing || document.hidden) return;
      position = Math.min(120, position + 1);
      if (position === 120) playing = false;
      updatePlayer();
    }, 1000);
}
startTimer();
window.addEventListener("pagehide", () => {
  playing = false;
  clearInterval(timer);
  timer = 0;
  updatePlayer();
});
window.addEventListener("pageshow", startTimer);
$("#player-subtitles").addEventListener("change", (e) => {
  const language = (e.target as HTMLSelectElement).value;
  const preview = $("#player-subtitle-preview");
  preview.hidden = language === "off";
  preview.textContent =
    language === "es"
      ? "Una nueva historia está por comenzar. · Subtítulo de ejemplo"
      : "A new story is about to begin. · Sample subtitle";
});
["#player-audio", "#player-provider"].forEach((id) =>
  $(id).addEventListener("change", () =>
    notice(
      l(
        "Opción aplicada a la vista simulada. No hay conexión externa.",
        "Option applied to the simulated view. There is no external connection.",
      ),
    ),
  ),
);
$("#tv-grid").addEventListener("keydown", (e) => {
  const event = e as KeyboardEvent;
  if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key))
    return;
  const cards = $$<HTMLButtonElement>("#tv-grid [data-title]").filter(
    (c) => !c.hidden,
  );
  const index = cards.indexOf(document.activeElement as HTMLButtonElement);
  if (index < 0) return;
  event.preventDefault();
  const width = cards[0].getBoundingClientRect().width;
  const cols = Math.max(
    1,
    Math.round($("#tv-grid").getBoundingClientRect().width / (width + 20)),
  );
  const step =
    event.key === "ArrowLeft"
      ? -1
      : event.key === "ArrowRight"
        ? 1
        : event.key === "ArrowUp"
          ? -cols
          : cols;
  cards[Math.min(cards.length - 1, Math.max(0, index + step))]?.focus();
});
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    !$("[data-screen=player]").hidden &&
    !document.querySelector("dialog[open]")
  ) {
    e.preventDefault();
    back();
  }
});
if (location.hash === "#player") $("#player-title").textContent = active.title;
filter();
