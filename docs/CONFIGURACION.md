# Configurar el portafolio

El contenido y la clasificación se editan sin modificar las plantillas de página.

## Datos y categorías

- `src/data/catalog.ts`: datos de contacto, categorías, orden, nombres ES/EN, visibilidad y asignaciones de productos.
- `src/data/projects.ts`: proyectos originales y textos en español.
- `src/data/projects-en.ts`: traducciones de cada proyecto al inglés, usando el mismo ID.
- `src/data/client-details.ts`: público objetivo, utilidad, arquitectura, instalación y consideraciones comerciales en los dos idiomas.
- `src/i18n.ts`: textos de navegación e interfaz.
- `src/data/brand-tokens.json`: referencia de la identidad oficial.

Para agregar una categoría, añade una entrada con ID único y nombres `es`/`en` a `categories`. Después añade ese ID al array del producto en `assignments`. Un producto puede pertenecer a varias categorías. Cambia `visible` a `false` para ocultar un filtro sin borrar productos. El número de productos se calcula automáticamente; una categoría vacía muestra un mensaje de contacto y no inventa ejemplos.

Para añadir un producto, usa un ID único en `projects.ts`, añade su traducción, sus detalles comerciales en los dos idiomas, su captura en `public/screenshots/` y sus categorías en `assignments`. `private: true` oculta el enlace al repositorio original: no cambia su visibilidad en GitHub. Describe lo implementado y lo pendiente por separado; no presentes prototipos como servicios en producción.

## Idiomas y enlaces

`/es/` y `/en/` contienen las portadas. Las fichas se generan bajo `/{idioma}/proyectos/{id}/`. El selector conserva el producto al cambiar de idioma. `/` y las rutas originales `/proyectos/{id}/` conservan la versión española por compatibilidad; sus enlaces canónicos apuntan a `/es/`.

Las capturas representan la interfaz original del producto: traducir el portafolio no implica que cada producto tenga los dos idiomas. La disponibilidad lingüística del producto se describe en su ficha.

## Accesibilidad y movimiento

`Accessibility.astro` contiene el panel traducido: tamaño de texto, contraste, espaciado, subrayado de enlaces, reducción de movimiento y restablecimiento. Las preferencias se guardan en localStorage y se aplican en ambas versiones. No se envían a un servicio externo.

`Motion.astro` añade apariciones discretas al entrar en pantalla. El CSS aplica la extracción y enderezado de la captura tanto al pasar el puntero como al enfocar con teclado. La preferencia de movimiento reducido del dispositivo y el panel desactivan los efectos. No se ofrece una certificación de accesibilidad.

## GitHub Pages

El destino previsto es `https://jsx2011.github.io/portfolio/`. La compilación para este destino necesita `PAGES_BASE=/portfolio/`; para revisar en localhost se puede omitir. El origen canónico se configura en `astro.config.mjs`. No añadas claves o servicios privados al código estático.

## Privacidad de las demostraciones

La ficha de boda debe usar únicamente nombres, fechas, horarios, lugares, contactos y datos de pago ficticios. La captura pública se construye con una demostración independiente; no cargues el HTML, las fotos, los formularios ni los calendarios de un evento real para regenerarla. No incluyas el nombre del repositorio privado del evento ni enlaces a sus servicios. Regenera también las capturas de presentación y el ZIP cuando cambies esta ficha. El contacto profesional del portafolio se conserva por indicación expresa del propietario.

## Formulario de boda: demostración sin envío

`src/components/RsvpDemo.astro` permite añadir/quitar personas, validar campos y probar la confirmación en ambos idiomas. No contiene URL de destino, iframe, llamadas de red ni almacenamiento de respuestas. La confirmación es explícitamente una simulación y los datos se borran al reiniciar o recargar. Sin JavaScript, el botón de confirmación permanece deshabilitado.

`SiteLayout.astro` bloquea formularios e iframes mediante Content Security Policy (`form-action 'none'`, `frame-src 'none'`). En producción también bloquea conexiones iniciadas por scripts (`connect-src 'none'`). No conviertas esta demostración en un formulario operativo ni añadas servicios de invitados reales al portafolio.

## Redacción pública

Los textos renderizados deben dirigirse a clientes, posibles aliados e inversionistas: problema, utilidad, público objetivo, arquitectura, entrega y alcance. Las notas de revisión, procedimientos de prueba, manifest de capturas y seguimiento interno permanecen en la documentación técnica, no en las fichas ni en el pie del sitio. Mantén visibles los estados reales de desarrollo y las limitaciones que afectan la contratación. No añadas métricas de negocio, clientes, certificaciones, rentabilidades o funciones sin evidencia. La demo de asistencia debe conservar el aviso de que no registra respuestas.
