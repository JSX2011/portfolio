# Invitación interactiva anónima

La muestra completa se publica en `/es/demos/invitacion/` y `/en/demos/invitacion/`. Se abre desde la imagen o los botones de la portada y la ficha del proyecto. Es una página independiente con el diseño de la invitación, no un iframe ni un formulario añadido al portafolio.

## Configuración

- `src/data/catalog.ts`: `interactiveDemos` asigna la ruta a cada producto. Las fichas sin demo conservan la ampliación de captura.
- `src/data/wedding-demo.ts`: nombres, fecha, horarios, lugares y textos ficticios, en español e inglés. Mantén sincronizados los datos de calendario/cuenta regresiva y los textos visibles.
- `src/components/WeddingDemoPage.astro`: composición completa de la invitación.
- `src/styles/wedding-demo.css`: estilo de la invitación adaptado a la muestra. Las fuentes Cormorant se alojan localmente y conservan su licencia en `public/fonts/OFL-Cormorant.txt`.
- `src/scripts/wedding-demo.ts` y `wedding-motion.ts`: interacciones locales y animación del recorrido.

## Privacidad y funcionamiento

No importar el HTML, los datos, los enlaces, las fotografías ni los servicios de un evento real. Las imágenes genéricas están en `src/assets/wedding/`; Astro genera versiones WebP adaptadas a cada pantalla. La demo contiene solo a Alex y Sam como nombres ficticios y lugares explícitamente de ejemplo.

Los mapas son esquemas locales, sin iframes ni servicios externos. El calendario se descarga como un archivo ICS creado en el navegador con los datos ficticios; no abre cuentas de calendarios externas. La confirmación permite explorar asistencia, número de personas y menús, pero intercepta el envío y borra los campos al completar o reiniciar. No utiliza endpoints, fetch, beacons ni almacenamiento de respuestas. Solo se guardan preferencias de lectura, en una clave independiente.

La política de contenido bloquea envíos de formularios, iframes y conexiones de scripts en producción. El envío permanece deshabilitado si JavaScript no está disponible. La muestra no tiene acceso al registro de invitados ni a los servicios del producto original.

## Comportamiento esperado

Mantener la navegación, el diseño y la identidad del proyecto entregado. El estado comercial sigue siendo Finalizado/Completed; la etiqueta de muestra corresponde únicamente al contenido público anonimizado. La página mantiene una salida al portafolio y permite cambiar de idioma. Los efectos respetan la preferencia de reducir movimiento y los controles de accesibilidad.
