import { $, $$, l, node, button, notice, initScreens } from "./demo-core";
type Message = { role: "user" | "assistant"; text: string };
let messages: Message[] = [];
let mode = "general";
let selected = "balanced";
let locked = false;
const samples = {
  ideas: {
    prompt: l(
      "Ayúdame a organizar un nuevo proyecto.",
      "Help me plan a new project.",
    ),
    answer: l(
      "Podemos darle forma en tres pasos:\n\n1. Define a quién ayudará y qué problema resolverá.\n2. Elige el recorrido más importante para una primera versión.\n3. Convierte ese recorrido en una lista de pantallas y entregables.\n\nEsta respuesta está preparada para mostrar la experiencia de conversación. En el producto completo, un modelo local responde a tus mensajes.",
      "We can shape it in three steps:\n\n1. Define who it will help and which problem it will solve.\n2. Choose the most important workflow for a first version.\n3. Turn that workflow into screens and deliverables.\n\nThis response is prepared to showcase the conversation experience. In the full product, a local model responds to your messages.",
    ),
  },
  code: {
    prompt: l(
      "Muéstrame una función sencilla de JavaScript.",
      "Show me a simple JavaScript function.",
    ),
    answer: l(
      "Aquí tienes un ejemplo para calcular el total de una cesta:\n\nfunction total(items) {\n  return items.reduce((sum, item) => {\n    return sum + item.price * item.quantity;\n  }, 0);\n}\n\nRecorre cada producto y suma su precio por la cantidad. Este código es una respuesta de ejemplo, no se ejecuta en la demo.",
      "Here is an example for calculating a basket total:\n\nfunction total(items) {\n  return items.reduce((sum, item) => {\n    return sum + item.price * item.quantity;\n  }, 0);\n}\n\nIt goes through each product and adds its price times quantity. This code is a sample response and is not executed in the demo.",
    ),
  },
  writing: {
    prompt: l(
      "Ayúdame con la presentación de una marca.",
      "Help me introduce a brand.",
    ),
    answer: l(
      "Una presentación clara puede comenzar con una promesa concreta:\n\n“Creamos herramientas digitales que simplifican el trabajo de cada día.”\n\nDespués puedes explicar para quién trabajas, qué necesidad resuelves y cómo acompañas al cliente.\n\nEste borrador es un ejemplo preparado para explorar el modo de escritura.",
      "A clear introduction can start with a concrete promise:\n\n“We build digital tools that make everyday work simpler.”\n\nThen explain who you work for, which need you solve, and how you support the customer.\n\nThis draft is a prepared example for exploring writing mode.",
    ),
  },
};
let records = [
  {
    title: l("Ideas para un nuevo proyecto", "Ideas for a new project"),
    messages: [
      { role: "user" as const, text: samples.ideas.prompt },
      { role: "assistant" as const, text: samples.ideas.answer },
    ],
  },
  {
    title: l("Una función, paso a paso", "A function, step by step"),
    messages: [
      { role: "user" as const, text: samples.code.prompt },
      { role: "assistant" as const, text: samples.code.answer },
    ],
  },
];
const show = initScreens();
function renderChat() {
  const container = $("#chat-messages");
  $$(".message", container).forEach((e) => e.remove());
  $("#vault-welcome").hidden = messages.length > 0;
  messages.forEach((m) => {
    const row = node("article", "", "message " + m.role);
    const avatar = node(
      "span",
      m.role === "assistant" ? "✧" : l("Tú", "You"),
      "message-avatar",
    );
    const content = node("div");
    content.append(
      node("strong", m.role === "assistant" ? "Akashic Vault" : l("Tú", "You")),
      node("p", m.text),
    );
    row.append(avatar, content);
    container.append(row);
  });
}
function chooseMode(value: string) {
  mode = value;
  $$("[data-mode]").forEach((b) =>
    b.setAttribute("aria-pressed", String(b.dataset.mode === mode)),
  );
}
function answerFor(text: string) {
  const value = text.toLowerCase();
  if (mode === "code" || /javascript|código|code|función|function/.test(value))
    return samples.code.answer;
  if (mode === "writing" || /texto|marca|escrib|writ|brand/.test(value))
    return samples.writing.answer;
  return samples.ideas.answer;
}
function send(text: string) {
  if (!text.trim()) return;
  messages.push(
    { role: "user", text: text.trim().slice(0, 1200) },
    { role: "assistant", text: answerFor(text) },
  );
  renderChat();
  $<HTMLTextAreaElement>("#chat-input").value = "";
  $("#chat-messages").lastElementChild?.scrollIntoView({
    block: "nearest",
    behavior:
      document.documentElement.hasAttribute("data-motion") ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
  });
}
$<HTMLButtonElement>("#chat-form button[type=submit]").disabled = false;
$("#chat-form").addEventListener("submit", (e) => {
  e.preventDefault();
  send($<HTMLTextAreaElement>("#chat-input").value);
});
$$("[data-prompt]").forEach((b) =>
  b.addEventListener("click", () => {
    const key = b.dataset.prompt as keyof typeof samples;
    chooseMode(
      key === "code" ? "code" : key === "writing" ? "writing" : "general",
    );
    send(samples[key].prompt);
  }),
);
$$("[data-mode]").forEach((b) =>
  b.addEventListener("click", () => chooseMode(b.dataset.mode!)),
);
$("#new-chat").addEventListener("click", () => {
  messages = [];
  renderChat();
  show("chat");
  $("#chat-input").focus();
  notice(l("Nueva conversación de prueba.", "New sample conversation."));
});
function openRecord(index: number) {
  messages = records[index].messages.map((m) => ({ ...m }));
  renderChat();
  show("chat");
}
$$("[data-history]").forEach((b) =>
  b.addEventListener("click", () =>
    openRecord(b.dataset.history === "ideas" ? 0 : 1),
  ),
);
function renderRecords() {
  const box = $("#vault-records");
  box.replaceChildren();
  records.forEach((r, i) => {
    const card = node("article", "", "surface vault-record");
    const icon = node("span", "▤", "soft-icon");
    const info = node("div");
    info.append(
      node("h2", r.title),
      node(
        "p",
        r.messages.length +
          l(
            " mensajes de ejemplo · Solo en memoria",
            " sample messages · Memory only",
          ),
        "muted",
      ),
    );
    card.append(
      icon,
      info,
      button(l("Abrir", "Open"), () => openRecord(i)),
    );
    box.append(card);
  });
}
$("#save-chat").addEventListener("click", () => {
  if (!messages.length)
    return notice(
      l(
        "Prueba una conversación antes de guardar el ejemplo.",
        "Try a conversation before saving the example.",
      ),
    );
  records.push({
    title: messages[0].text.slice(0, 65),
    messages: messages.map((m) => ({ ...m })),
  });
  renderRecords();
  notice(
    l(
      "Ejemplo añadido a la bóveda de esta pestaña. No se ha guardado en el dispositivo.",
      "Example added to this tab’s vault. It has not been saved to your device.",
    ),
  );
});
$("#toggle-vault").addEventListener("click", () => {
  locked = !locked;
  $("#vault-records").hidden = locked;
  $("#vault-locked").hidden = !locked;
  $("#toggle-vault").textContent = locked
    ? l("Desbloquear muestra", "Unlock showcase")
    : l("Bloquear muestra", "Lock showcase");
});
$$("[data-model]").forEach((b) =>
  b.addEventListener("click", () => {
    selected = b.dataset.model!;
    $$("[data-model]").forEach((other) => {
      const active = other.dataset.model === selected;
      other.setAttribute("aria-pressed", String(active));
      other.textContent = active
        ? l("Seleccionado", "Selected")
        : l("Seleccionar perfil", "Select profile");
    });
    const label = {
      balanced: l("Equilibrado", "Balanced"),
      coder: l("Programación", "Coding"),
      creative: l("Creativo", "Creative"),
    }[selected];
    $("#vault-engine").textContent =
      l("Perfil de ejemplo · ", "Sample profile · ") + label;
    chooseMode(
      selected === "coder"
        ? "code"
        : selected === "creative"
          ? "writing"
          : "general",
    );
    notice(
      l(
        "Perfil de muestra seleccionado. No se ha descargado ningún modelo.",
        "Sample profile selected. No model has been downloaded.",
      ),
    );
  }),
);
function theme(value: string) {
  document.body.classList.toggle("vault-light", value === "light");
  $<HTMLSelectElement>("#vault-appearance").value = value;
  $("#vault-theme").setAttribute("aria-pressed", String(value === "light"));
}
$("#vault-theme").addEventListener("click", () =>
  theme(document.body.classList.contains("vault-light") ? "dark" : "light"),
);
$("#vault-appearance").addEventListener("change", (e) =>
  theme((e.target as HTMLSelectElement).value),
);
$<HTMLButtonElement>("#studio-form button[type=submit]").disabled = false;
$("#studio-form").addEventListener("submit", (e) => {
  e.preventDefault();
  $("#studio-placeholder").hidden = true;
  $("#studio-result").hidden = false;
  const type = $<HTMLSelectElement>("#studio-type").value;
  const style = $<HTMLSelectElement>("#studio-style").value;
  $(".generated-landscape").dataset.style = style;
  $(".generated-landscape").classList.toggle(
    "moving-preview",
    type === "video",
  );
  $("#studio-caption").textContent =
    (type === "video"
      ? l("Vista de video simulada para: ", "Simulated video preview for: ")
      : l("Imagen de muestra para: ", "Sample image for: ")) +
    $<HTMLTextAreaElement>("#studio-prompt").value;
  notice(
    l(
      "Vista de ejemplo preparada. No se ha ejecutado ningún motor.",
      "Sample preview prepared. No engine was executed.",
    ),
  );
});
renderRecords();
