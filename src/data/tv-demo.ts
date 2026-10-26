import type { Locale } from "./catalog";
export function sampleTitles(locale: Locale) {
  const es = locale === "es";
  return [
    {
      id: "horizons",
      title: es ? "Horizontes" : "Horizons",
      kind: "movie",
      genre: "scifi",
      year: 2030,
      color: "#2e6673",
      scene: "orbit",
      runtime: 108,
      description: es
        ? "Una cartógrafa sigue una señal hasta un mundo que aún no aparece en sus mapas. Un viaje ficticio sobre el descubrimiento y las segundas oportunidades."
        : "A cartographer follows a signal to a world that does not yet appear on her maps. A fictional journey about discovery and second chances.",
    },
    {
      id: "station",
      title: es ? "La última estación" : "The Last Station",
      kind: "movie",
      genre: "drama",
      year: 2029,
      color: "#765644",
      scene: "city",
      runtime: 96,
      description: es
        ? "Dos desconocidos coinciden en una estación y descubren que sus caminos tienen más en común de lo que imaginaban. Historia de ejemplo."
        : "Two strangers meet at a station and discover that their paths have more in common than they imagined. A sample story.",
    },
    {
      id: "rain",
      title: es ? "Después de la lluvia" : "After the Rain",
      kind: "movie",
      genre: "drama",
      year: 2030,
      color: "#456f68",
      scene: "forest",
      runtime: 102,
      description: es
        ? "Una pequeña comunidad transforma un jardín olvidado en un punto de encuentro. Una historia ficticia de nuevos comienzos."
        : "A small community turns a forgotten garden into a meeting place. A fictional story of new beginnings.",
    },
    {
      id: "orbit",
      title: es ? "Órbita" : "Orbit",
      kind: "series",
      genre: "scifi",
      year: 2030,
      color: "#4c426f",
      scene: "orbit",
      runtime: 42,
      description: es
        ? "La tripulación de una estación descubre una anomalía que cambia sus planes. Serie ficticia creada para esta demostración."
        : "A station crew discovers an anomaly that changes their plans. A fictional series created for this demonstration.",
    },
    {
      id: "garden",
      title: es ? "El jardín de las horas" : "The Garden of Hours",
      kind: "series",
      genre: "adventure",
      year: 2029,
      color: "#675a3e",
      scene: "forest",
      runtime: 38,
      description: es
        ? "Un cuaderno revela un sendero distinto cada mañana. Sus protagonistas exploran un mundo imaginario, una página a la vez."
        : "A notebook reveals a different path each morning. Its characters explore an imaginary world, one page at a time.",
    },
    {
      id: "summer",
      title: es ? "Días de verano" : "Summer Days",
      kind: "movie",
      genre: "adventure",
      year: 2028,
      color: "#987055",
      scene: "sun",
      runtime: 94,
      description: es
        ? "Un grupo de amigos emprende un viaje para recuperar una antigua colección de postales. Una aventura de ejemplo."
        : "A group of friends sets out to recover an old postcard collection. A sample adventure.",
    },
    {
      id: "lights",
      title: es ? "Luces de papel" : "Paper Lights",
      kind: "movie",
      genre: "drama",
      year: 2029,
      color: "#8c4c60",
      scene: "city",
      runtime: 112,
      description: es
        ? "Una ilustradora encuentra inspiración en las pequeñas historias de su barrio. Película ficticia sin proveedores de reproducción."
        : "An illustrator finds inspiration in the small stories of her neighborhood. A fictional film without playback providers.",
    },
    {
      id: "north",
      title: es ? "Rumbo al norte" : "Northbound",
      kind: "series",
      genre: "adventure",
      year: 2028,
      color: "#3c627a",
      scene: "forest",
      runtime: 44,
      description: es
        ? "Tres exploradores documentan paisajes imaginarios y las leyendas que los conectan. Catálogo de muestra."
        : "Three explorers document imaginary landscapes and the legends connecting them. Sample catalog.",
    },
  ];
}
