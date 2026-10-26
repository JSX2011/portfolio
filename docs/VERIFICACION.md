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
