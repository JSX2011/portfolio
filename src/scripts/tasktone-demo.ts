import {
  $,
  $$,
  l,
  node,
  button,
  money,
  notice,
  initDialogs,
  initScreens,
} from "./demo-core";
type Stage = "quote" | "progress" | "review" | "done";
type Order = {
  id: string;
  title: string;
  stage: Stage;
  service: string;
  description: string;
  price: number;
  comments: { author: string; text: string }[];
};
const services: Record<string, string> = {
  cleanup: l("Limpieza de audio", "Audio cleanup"),
  mix: l("Mezcla", "Mixing"),
  edit: l("Edición", "Editing"),
};
const stages: Stage[] = ["quote", "progress", "review", "done"];
const labels: Record<Stage, string> = {
  quote: l("Por confirmar", "Awaiting confirmation"),
  progress: l("En proceso", "In progress"),
  review: l("En revisión", "In review"),
  done: l("Completado", "Completed"),
};
const orders: Order[] = [
  {
    id: "TT-DEMO-001",
    title: l("Un podcast para descubrir", "A podcast to discover"),
    stage: "review",
    service: "cleanup",
    description: l(
      "Mejorar la claridad de una conversación de ejemplo y equilibrar el volumen entre participantes.",
      "Improve the clarity of a sample conversation and balance participant volumes.",
    ),
    price: 45000,
    comments: [
      {
        author: l("Estudio Tono", "Tone Studio"),
        text: l(
          "La muestra está lista para que explores la revisión.",
          "The sample is ready for you to explore the review.",
        ),
      },
    ],
  },
  {
    id: "TT-DEMO-002",
    title: l("La voz de una nueva idea", "The voice of a new idea"),
    stage: "progress",
    service: "edit",
    description: l(
      "Preparar una narración ficticia para una presentación de marca.",
      "Prepare a fictional narration for a brand presentation.",
    ),
    price: 30000,
    comments: [
      {
        author: l("Cliente de ejemplo", "Sample client"),
        text: l(
          "Busco una voz clara y cercana. Este es un comentario ficticio.",
          "I am looking for a clear, friendly voice. This is a fictional comment.",
        ),
      },
    ],
  },
  {
    id: "TT-DEMO-003",
    title: l("Una melodía en construcción", "A melody in the making"),
    stage: "quote",
    service: "mix",
    description: l(
      "Explorar una propuesta de mezcla con un archivo de ejemplo.",
      "Explore a mixing proposal using a sample file.",
    ),
    price: 60000,
    comments: [],
  },
];
let role = "creator";
let current = orders[0];
initDialogs();
const show = initScreens((name) => {
  if (name !== "order") $<HTMLAudioElement>("#sample-audio").pause();
});
function setRole(value: string) {
  role = value;
  $$("[data-role]").forEach((b) =>
    b.setAttribute("aria-pressed", String(b.dataset.role === role)),
  );
  $("#tt-workspace-title").textContent =
    role === "creator"
      ? l("Hola, creador.", "Hello, creator.")
      : l("Tu próximo proyecto te espera.", "Your next project awaits.");
  $("#tt-orders-title").textContent =
    role === "creator"
      ? l("Tus encargos", "Your orders")
      : l("Tu mesa de trabajo", "Your workbench");
  renderOrders();
  renderOrder();
}
$$("[data-enter-role]").forEach((b) =>
  b.addEventListener("click", () => {
    setRole(b.dataset.enterRole!);
    show("workspace");
  }),
);
$$("[data-role]").forEach((b) =>
  b.addEventListener("click", () => setRole(b.dataset.role!)),
);
function renderOrders() {
  const q = $<HTMLInputElement>("#tt-search").value.toLocaleLowerCase();
  const stage = $<HTMLSelectElement>("#tt-filter").value;
  const filtered = orders.filter(
    (o) =>
      (stage === "all" || stage === o.stage) &&
      o.title.toLocaleLowerCase().includes(q),
  );
  const list = $("#tt-orders");
  list.replaceChildren();
  filtered.forEach((o) => {
    const article = node("article", "", "surface tt-order-card");
    const icon = node("span", "", "tt-order-icon");
    icon.append(node("span", "♫"));
    const info = node("div", "", "tt-order-summary");
    info.append(
      node("small", o.id, "muted"),
      node("h3", o.title),
      node(
        "p",
        services[o.service] +
          (role === "professional"
            ? l(" · Cliente de ejemplo", " · Sample client")
            : l(" · Estudio Tono", " · Tone Studio")),
        "muted",
      ),
    );
    const status = node("span", labels[o.stage], "pill stage-" + o.stage);
    const open = button(
      l("Ver encargo", "View order") + " →",
      () => {
        current = o;
        renderOrder();
        show("order");
      },
      "secondary",
    );
    article.append(icon, info, status, open);
    list.append(article);
  });
  $("#tt-empty").hidden = filtered.length > 0;
  $("#tt-stat-count").textContent = String(orders.length);
  $("#tt-stat-active").textContent = String(
    orders.filter((o) => o.stage === "progress").length,
  );
  $("#tt-stat-review").textContent = String(
    orders.filter((o) => o.stage === "review").length,
  );
}
function advance(stage: Stage) {
  current.stage = stage;
  current.comments.push({
    author: l("Recorrido de muestra", "Sample walkthrough"),
    text:
      l(
        "Estado actualizado en la simulación: ",
        "Status updated in the simulation: ",
      ) + labels[stage],
  });
  renderOrder();
  renderOrders();
  notice(
    l(
      "Paso simulado. No se han realizado pagos ni entregas reales.",
      "Simulated step. No real payments or deliveries have taken place.",
    ),
  );
}
function renderOrder() {
  $("#tt-order-id").textContent = current.id;
  $("#tt-order-title").textContent = current.title;
  $("#tt-order-status").textContent = labels[current.stage];
  $("#tt-order-status").className = "pill stage-" + current.stage;
  $("#tt-order-description").textContent = current.description;
  $("#tt-order-service").textContent = services[current.service];
  $("#tt-order-price").textContent = money(current.price);
  const timeline = $("#tt-timeline");
  timeline.replaceChildren();
  stages.forEach((stage, i) => {
    const li = node("li", "", "timeline-step");
    li.classList.toggle("reached", i <= stages.indexOf(current.stage));
    if (stage === current.stage) li.setAttribute("aria-current", "step");
    li.append(
      node("span", i < stages.indexOf(current.stage) ? "✓" : String(i + 1)),
      node("strong", labels[stage]),
    );
    timeline.append(li);
  });
  const actions = $("#tt-order-actions");
  actions.replaceChildren();
  const s = current.stage;
  let label = "",
    next: Stage = "progress";
  if (s === "quote") {
    label =
      role === "professional"
        ? l("Simular inicio del trabajo", "Simulate starting work")
        : l("Aceptar propuesta de ejemplo", "Accept sample proposal");
    next = "progress";
  } else if (s === "progress") {
    label = l("Mostrar entrega de muestra", "Show sample delivery");
    next = "review";
  } else if (s === "review") {
    label = l("Aprobar muestra", "Approve sample");
    next = "done";
  }
  if (label)
    actions.append(button(label + " →", () => advance(next), "primary"));
  if (s === "review")
    actions.append(
      button(
        l("Solicitar ajuste de ejemplo", "Request sample revision"),
        () => advance("progress"),
        "secondary",
      ),
    );
  if (s === "done")
    actions.append(
      node(
        "p",
        "✓ " +
          l(
            "Entrega aprobada en esta simulación.",
            "Delivery approved in this simulation.",
          ),
        "success-note",
      ),
    );
  const comments = $("#tt-comments");
  comments.replaceChildren();
  current.comments.forEach((c) => {
    const item = node("article", "", "tt-comment");
    item.append(node("strong", c.author), node("p", c.text));
    comments.append(item);
  });
  if (!current.comments.length)
    comments.append(
      node(
        "p",
        l(
          "Inicia una conversación de ejemplo.",
          "Start a sample conversation.",
        ),
        "muted",
      ),
    );
}
$("#tt-search").addEventListener("input", renderOrders);
$("#tt-filter").addEventListener("change", renderOrders);
function newOrder() {
  $<HTMLDialogElement>("#tt-new-dialog").showModal();
}
$("#new-order").addEventListener("click", newOrder);
$("#view-professional").addEventListener("click", () =>
  $<HTMLDialogElement>("#tt-profile-dialog").showModal(),
);
$("#tt-profile-create").addEventListener("click", () => {
  $<HTMLDialogElement>("#tt-profile-dialog").close();
  newOrder();
});
$<HTMLButtonElement>("#tt-new-form button[type=submit]").disabled = false;
$<HTMLButtonElement>("#tt-message-form button[type=submit]").disabled = false;
$("#tt-new-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const service = $<HTMLSelectElement>("#tt-new-service").value;
  const price = service === "mix" ? 60000 : service === "edit" ? 30000 : 45000;
  const file = $<HTMLSelectElement>("#tt-new-file");
  const description =
    $<HTMLTextAreaElement>("#tt-new-notes").value.trim() ||
    l(
      "Encargo de ejemplo con un archivo preparado para la demostración.",
      "Sample order using a file prepared for the demonstration.",
    );
  current = {
    id: `TT-DEMO-${String(orders.length + 1).padStart(3, "0")}`,
    title:
      $<HTMLInputElement>("#tt-new-name").value.trim() ||
      l("Proyecto de ejemplo", "Sample project"),
    stage: "quote",
    service,
    description:
      description +
      "\n" +
      l("Archivo ilustrativo: ", "Illustrative file: ") +
      file.selectedOptions[0].textContent,
    price,
    comments: [],
  };
  orders.unshift(current);
  renderOrders();
  renderOrder();
  $<HTMLDialogElement>("#tt-new-dialog").close();
  $<HTMLFormElement>("#tt-new-form").reset();
  show("order");
  notice(
    l(
      "Encargo de ejemplo creado en esta pestaña. No se ha subido ningún archivo.",
      "Sample order created in this tab. No file was uploaded.",
    ),
  );
});
$("#tt-message-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const field = $<HTMLTextAreaElement>("#tt-message");
  const text = field.value.trim();
  if (!text) return;
  current.comments.push({
    author:
      role === "creator"
        ? l("Cliente de ejemplo", "Sample client")
        : l("Estudio Tono", "Tone Studio"),
    text,
  });
  field.value = "";
  renderOrder();
  notice(
    l(
      "Comentario de prueba añadido solo a esta vista.",
      "Sample comment added only to this view.",
    ),
  );
});
renderOrders();
renderOrder();
