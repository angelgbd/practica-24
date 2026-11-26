Preguntas

¿Cuáles son los tres requisitos y qué hace cada uno?

Manifiesto. Le dice al navegador cómo se llama la app, qué íconos y colores usa, en qué ruta inicia y cómo se abre al instalarla.
Service worker. Guarda los archivos de la app e intercepta peticiones para servir contenido guardado cuando no hay conexión. Es lo que permite el uso sin red en esta práctica.
HTTPS. Da a la app un contexto seguro para el service worker y la instalación. localhost también sirve para las pruebas locales. 

¿Qué generó vite-plugin-pwa en dist/?

manifest.webmanifest contiene el nombre, los íconos y los ajustes de instalación.
sw.js es el service worker. Aplica el precaché y las estrategias para clases e imágenes.
workbox-.js contiene el código de Workbox que utiliza el service worker.
registerSW.js registra sw.js en el navegador.
index.html incluye el enlace al manifiesto y el script de registro.

¿Por qué NetworkFirst para clases y CacheFirst para imágenes?
Los horarios y los lugares disponibles pueden cambiar. NetworkFirst consulta el backend primero y usa la copia guardada cuando la red falla o tarda demasiado. Las imágenes cambian poco. CacheFirst reutiliza las que ya guardó y las descarga cuando hacen falta.

¿Por qué en npm run dev no hay service worker?
VitePWA lo deja desactivado por defecto en desarrollo. Así, la caché no interfiere con los cambios mientras programas. npm run build lo genera y npm run preview permite probarlo. 

¿Qué diferencia hay entre una PWA y una app híbrida?

La PWA se abre desde una URL y se instala desde el navegador. Una app híbrida empaqueta una interfaz web en un contenedor nativo que se puede distribuir por tiendas y usar para acceder a funciones del dispositivo mediante plugins.
