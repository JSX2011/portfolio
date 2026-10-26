# Juan Duque · Portafolio

Portafolio en español construido con **Astro 5**, salida estática y JavaScript mínimo. Incluye seis proyectos públicos y privados, capturas reales de sus interfaces, funciones, tecnologías y estado de desarrollo.

**Estado: revisión privada. GitHub Pages no está activado y no hay ningún workflow de publicación activo.**

![Vista de escritorio](docs/preview-desktop.png)

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
- `src/pages/proyectos/[id].astro`: fichas individuales con ampliación accesible.
- `src/styles.css`: diseño adaptable y respeto a movimiento reducido.
- `public/screenshots/`: seis capturas de interfaz.
- `docs/FUENTES.md`: procedencia, revisión y límites de la evidencia.
- `docs/preview-desktop.png` y `docs/preview-mobile.png`: vistas de esta versión.

## GitHub Pages, después de la revisión

El archivo `docs/github-pages.yml.example` prepara el despliegue, pero está inactivo. Solo después de aprobar la publicación:

1. Definir la visibilidad del repositorio y revisar las capturas y el contacto.
2. Retirar el aviso de revisión y decidir si conservar `noindex` en ambas plantillas.
3. Activar Pages con origen GitHub Actions.
4. Copiar el ejemplo a `.github/workflows/pages.yml` y ejecutarlo manualmente.

El ejemplo usa `/portfolio/` y `https://jsx2011.github.io`. Para un repositorio de usuario llamado `JSX2011.github.io`, usar `/` como base. Pages en repositorios privados depende del plan de GitHub; la privacidad del repositorio por sí sola no asegura que el sitio publicado sea privado.

## Validación

Compilación estática de siete páginas. Verificados filtros, imágenes, navegación, apertura/cierre de seis diálogos, Escape y devolución del foco. Revisado el desbordamiento horizontal a 360, 390, 768 y 1440 px. Los detalles de los proyectos se fundamentan en sus fuentes; no constituyen una nueva validación de sus motores, integraciones o hardware.

No se ha publicado el sitio, habilitado Pages ni modificado la visibilidad de los proyectos originales.
