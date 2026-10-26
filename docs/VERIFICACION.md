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
