# Verificación de la versión bilingüe

Comprobado en Chromium local con Playwright:

- Portadas en español e inglés con atributo `lang` correcto y etiquetas de idioma.
- Siete filtros (incluido Todos), conteos derivados del catálogo y mensaje para una categoría vacía.
- Doce fichas localizadas, contenido de cliente, imágenes y apertura/cierre del diálogo de captura.
- Cambio de idioma manteniendo el producto actual.
- Panel de accesibilidad traducido: tamaño, contraste, espaciado, enlaces, reducción de movimiento y restablecimiento.
- Persistencia de preferencias entre navegación e idiomas; Escape y restauración del foco.
- Texto ampliado al 150 % con todas las preferencias activas a 360, 390, 768 y 1440 px sin desbordamiento horizontal de la portada.
- Fichas a 360 px sin desbordamiento; una ficha adicional con los ajustes ampliados activos.
- Extracción y enderezado de la captura al pasar el puntero; movimiento desactivado con la preferencia del dispositivo.
- Sin errores JavaScript de página durante estos recorridos.

Compilación Astro: 22 páginas HTML, incluyendo compatibilidad con rutas originales y 404; además robots y sitemap bilingüe. Los enlaces y activos locales se revisan en la salida estática.

Las pruebas no certifican accesibilidad universal ni el funcionamiento del backend, hardware o integraciones de los productos mostrados. El estado de publicación se comprueba por separado en GitHub Pages/Actions y con una petición al sitio desplegado.

## Revisión de privacidad del evento

- Captura de la invitación reconstruida desde HTML independiente con contenido ficticio e ilustración sin personas.
- Nombre público y referencia del producto genéricos en español e inglés.
- Vistas de presentación y ZIP regenerados con la misma captura anónima.
- Historial Git local reescrito para sustituir las antiguas imágenes y archivos descargables y retirar los identificadores del evento de los textos.
- Escaneo de todos los blobs de texto alcanzables del historial y comprobación de los binarios sustituidos.
- El contacto profesional se conserva por petición del propietario.

La retirada de artefactos y despliegues antiguos y la disponibilidad de objetos sin referencia en GitHub se verifican por separado. Una limpieza de Git no acredita la eliminación de cachés, copias externas o retenciones internas del proveedor.

## Formulario local de demostración

Pruebas sobre la compilación de producción, en español e inglés: campos obligatorios, altas/bajas de personas, simulación de confirmación, borrado y recarga. Durante estas interacciones no hubo solicitudes de red ni cambios en localStorage/sessionStorage. Verificado que no hay iframes ni atributo action, que la política bloquea envíos y que el botón de confirmación permanece deshabilitado sin JavaScript. El aviso de simulación permanece visible y no confirma una asistencia real.

## Revisión editorial comercial

Texto de interfaz y fichas revisado en español e inglés para visitantes externos. Retiradas las notas de revisión documental, narración de pruebas y aprobación interna. Mantenidos los estados de producto, las funciones pendientes, créditos y el aviso de la demo sin envío. Compilación y recorrido bilingüe comprobados, incluyendo filtros, fichas, cambio de idioma, texto al 150 %, accesibilidad y movimiento reducido. La invitación a clientes, aliados e inversionistas no incorpora métricas comerciales ni promesas de retorno.

## Invitación como proyecto entregado

Estado y versión actualizados a Finalizado/Proyecto entregado y Completed/Delivered project según la confirmación del propietario. Comprobadas tarjeta, ficha, texto de aprobación y llamada comercial en ambos idiomas. Comparados los datos de los demás productos para confirmar que sus estados no cambian. Se mantienen los contenidos anónimos y las pruebas de ausencia de solicitudes de red o almacenamiento de respuestas en la muestra de asistencia.

## Demo de invitación como página completa

La ficha ya no contiene el formulario aislado. En portada, la imagen y el enlace abren la demo; en la ficha funcionan la imagen y «Ver sitio interactivo». Verificadas las versiones española e inglesa: secciones completas, historia animada, cuenta regresiva, galería con navegación y ampliación, mapas locales ilustrativos con zoom, descarga ICS con fecha y lugares ficticios, preferencias de accesibilidad y navegación de retorno/cambio de idioma.

Probadas confirmación familiar y declinación, validación, selección de personas y menús, reinicio y ausencia de peticiones de red o almacenamiento de respuestas. Envío deshabilitado sin JavaScript. Revisión a 360, 390, 768 y 1440 px con ajustes de lectura ampliados. Sin errores JavaScript ni recursos externos durante el recorrido. Las fotos de la muestra son ilustraciones/imágenes genéricas generadas, sin personas.

## Cinco demos de software — 26 de octubre de 2026

- Se añadieron diez rutas de software (cinco productos, ES/EN) a las dos rutas existentes de invitación. Compilación Astro: **34 páginas HTML**, más robots y sitemap.
- `npm run test:demos`: **PASS** con preview temporal iniciado por el propio test. Recorre caja/cesta/descuento/cobro/recibo, inventario e informes; chat/modelos/bóveda/estudio; catálogo/fichas/temporadas/controles de reproducción simulada; roles/encargos/revisión/aprobación/comentarios y audio de muestra.
- El recorrido comprueba reinicio, datos en memoria, texto de entrada tratado sin ejecutar HTML, ausencia de solicitudes API, conexiones externas, envíos, service workers e información persistida; formularios deshabilitados sin JavaScript.
- Axe-core WCAG 2 A/AA y 2.1 AA: sin infracciones detectadas en todas las pantallas españolas y las pantallas iniciales inglesas. Reflow con texto al 150 %, contraste/espaciado/subrayado/reducción de movimiento activados en 360, 390, 768 y 1440 px: **PASS** en los diez recorridos.
- Revisión visual de escritorio y móvil: identidades distintas de cada producto, capturas generadas desde las propias demos y recursos locales. Se corrigieron el ancho del estudio de Vault, el contraste del indicador de EasyDrink, el ajuste de los títulos en carteles y el desglose de ventas compartidas por negocio.
- TypeScript estricto de los cinco scripts y su núcleo compartido: **PASS**. Destinos locales de imágenes/enlaces de todos los HTML compilados: **PASS**.
- Regresión del portafolio bilingüe: **PASS** en filtros, doce fichas, idiomas, texto ampliado y efectos. Regresión completa de la boda: **PASS**, sin cambios en su código, anonimización ni confirmación local.
- Vista descargable regenerada con módulos de cada página agrupados e incluidos en sus HTML, conservando fuentes, imágenes y audio locales. Las diez rutas de software empaquetadas se probaron con servidor estático, sus interacciones y audio: **PASS**, sin recursos externos ni solicitudes fallidas. La comprobación no certifica el comportamiento del protocolo `file:` en todos los navegadores.
- El workflow de Pages ejecuta el build y `npm run test:demos` antes de publicar. Las pruebas verifican las muestras; no validan ni ejecutan los backends, IA, proveedores, pagos, hardware o funciones pendientes de los productos originales.
