# SD Tech Systems · Portafolio

Portafolio bilingüe (español e inglés) de Juan Duque bajo la identidad SD Tech Systems, construido con **Astro 5**, salida estática y JavaScript por página. Incluye seis proyectos públicos y privados, capturas, demos interactivas, funciones, tecnologías y estado de desarrollo.

**Publicación autorizada por el propietario. Destino: https://jsx2011.github.io/portfolio/. El estado efectivo del despliegue se comprueba en GitHub Pages/Actions.**

![Vista de escritorio](docs/preview-desktop.png)

Puedes revisar también la [captura móvil](docs/preview-mobile.png) o descargar [la vista previa completa](docs/vista-previa.zip): descomprime el ZIP y abre `index.html`. Incluye las páginas bilingües, filtros y las seis demos con recursos locales, sin instalar Astro.

## Revisar localmente

Requiere Node.js 22.12+ y npm.

```sh
npm ci
npm run dev
```

Abrir la URL local que imprime Astro (normalmente `http://localhost:4321`).

```sh
npm run build
npm run preview
```

La salida lista para hosting estático se genera en `dist/`. Para usar la ruta de un repositorio de proyecto:

```sh
PAGES_BASE=/portfolio/ npm run build
```

En PowerShell: `$env:PAGES_BASE='/portfolio/'; npm run build`.

## Contenido

- `src/data/projects.ts`: textos, estados, tecnologías y referencias a capturas.
- `src/pages/index.astro`: portada, selección con filtros, presentación y contacto.
- `src/pages/proyectos/[id].astro`: fichas individuales con acceso a las demos.
- `src/styles.css`: diseño adaptable y respeto a movimiento reducido.
- `public/screenshots/`: seis capturas de interfaz.
- `docs/FUENTES.md`: procedencia, revisión y límites de la evidencia.
- `docs/preview-desktop.png` y `docs/preview-mobile.png`: vistas de esta versión.

## Idiomas, categorías y publicación

- Español: `/es/`; inglés: `/en/`. El selector mantiene el proyecto abierto.
- Las categorías y asignaciones se editan en `src/data/catalog.ts`, sin tocar las plantillas.
- Las fichas incluyen público objetivo, uso, construcción, arquitectura, plataforma, funciones, estado y consideraciones para contratar.
- Todos los productos tienen un botón «Explorar demo» y una imagen enlazada a su muestra, en `/{idioma}/demos/{id}/`. Los cinco programas tienen recorridos con estado en memoria: caja/inventario, asistentes locales, catálogo de TV y encargos de audio. Sin API, pagos, autenticación, IA real ni proveedores. Documentación: [docs/DEMOS_SOFTWARE.md](docs/DEMOS_SOFTWARE.md).
- La foto y el botón de la invitación abren una web completa e interactiva: `/es/demos/invitacion/` y `/en/demos/invitacion/`. La ficha no contiene un formulario aislado. Todo el contenido de la demo es ficticio; la confirmación no envía ni guarda respuestas.
- Guía de edición: [docs/CONFIGURACION.md](docs/CONFIGURACION.md).
- El panel de accesibilidad permite texto de hasta 150 %, contraste, espaciado, subrayado de enlaces y reducción de movimiento. Respeta la preferencia del sistema y guarda ajustes solo en el navegador.
- Las capturas se enderezan y se elevan como una hoja al pasar el puntero o enfocar con teclado. El movimiento se desactiva cuando se solicita reducirlo.

GitHub Pages utiliza una compilación estática con `PAGES_BASE=/portfolio/`. No se publican fuentes privadas ni claves de los productos originales.

## Validación

Para verificar las demos: instala Chromium con `npx playwright install chromium`, compila con `PAGES_BASE=/portfolio/ npm run build` y ejecuta `npm run test:demos`. Las pruebas inician un preview temporal y comprueban interacciones, idiomas, aislamiento, reinicio, accesibilidad con axe-core y reflow hasta texto al 150 %. El flujo de GitHub Pages ejecuta estas pruebas antes del despliegue.

Compilación estática de portadas y fichas bilingües, más rutas españolas de compatibilidad, sitemap y 404. Las comprobaciones de la versión actual se registran en `docs/VERIFICACION.md`. Los detalles de los proyectos se fundamentan en sus fuentes; no constituyen una nueva validación de sus motores, integraciones o hardware.

La publicación de la web fue autorizada por el propietario. No se modifica la visibilidad de los proyectos originales.

## Identidad visual

Identidad oficial SD Tech Systems v1.1, proporcionada en `SD_Tech_Systems_Branding.zip`. Se utilizan sus PNG maestros sin alterar, la paleta navy/cian/ink/azul/blanco/gris, las fuentes DejaVu Sans y Mono alojadas localmente y los iconos oficiales. El logo horizontal conserva al menos 220 px en escritorio; en móvil se muestra el símbolo de 64 px. El lema es «Software claro. Confianza real.» y la firma «Desarrollado por SD Tech Systems · Parte de SD Tech».

`src/components/Brand.astro` centraliza el logo adaptable. Los tokens originales están en `src/data/brand-tokens.json` y las decisiones de aplicación en [docs/IDENTIDAD.md](docs/IDENTIDAD.md). Los nombres, capturas, créditos y licencias de los productos conservan su identidad propia.
