# Práctica 24 · Gimnasio Titanes

El catálogo del gimnasio es una PWA. Una vez visitados con conexión, el catálogo, los detalles de las clases y sus imágenes se pueden volver a abrir sin red.

## Cómo probarla

1. Inicia `gimnasio-backend` en `http://localhost:3000`. Debe permitir peticiones desde `http://localhost:4173`.
2. En este proyecto, ejecuta:

   ```bash
   npm ci
   npm run build
   npm run preview
   ```

3. Abre `http://localhost:4173` en Chrome o Edge. En DevTools → Application comprueba **Manifest** y **Service workers**. Cuando el service worker esté activo, recarga y abre una clase con conexión para llenar `api-clases` y `api-imagenes`. Revisa ambas en **Cache Storage**.
4. Pulsa **Instalar app** cuando aparezca. En Chrome, si falta el acceso directo, abre `chrome://apps`, haz clic derecho en **Gimnasio Titanes** y elige **Crear accesos directos**.
5. En DevTools → Network, selecciona **Offline** y recarga. Deben aparecer el aviso **Sin conexión** y las clases guardadas. Visita la clase de nuevo y pulsa **Compartir** para abrir la hoja nativa o copiar su enlace. Al inscribirte con conexión, el teléfono vibra durante 80 ms si admite la API de vibración.

Para instalarla en un celular, sirve el frontend por HTTPS y configura `VITE_API_URL` con la URL HTTPS del backend antes de compilar. En Android se puede usar **Instalar app** o el menú de Chrome. En iPhone, abre Safari y elige **Compartir → Agregar a pantalla de inicio**.

## Preguntas

### 1. ¿Cuáles son los tres requisitos y qué hace cada uno?

- **Manifiesto.** Le dice al navegador cómo se llama la app, qué íconos y colores usa, en qué ruta inicia y cómo se abre al instalarla.
- **Service worker.** Guarda los archivos de la app e intercepta peticiones para servir contenido guardado cuando no hay conexión. Es lo que permite el uso sin red en esta práctica.
- **HTTPS.** Da a la app un contexto seguro para el service worker y la instalación. `localhost` también sirve para las pruebas locales. [Instalación de una PWA en MDN](https://developer.mozilla.org/es/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)

### 2. ¿Qué generó vite-plugin-pwa en `dist/`?

- `manifest.webmanifest` contiene el nombre, los íconos y los ajustes de instalación.
- `sw.js` es el service worker. Aplica el precaché y las estrategias para clases e imágenes.
- `workbox-*.js` contiene el código de Workbox que utiliza el service worker.
- `registerSW.js` registra `sw.js` en el navegador.
- `index.html` incluye el enlace al manifiesto y el script de registro.

### 3. ¿Por qué `NetworkFirst` para clases y `CacheFirst` para imágenes?

Los horarios y los lugares disponibles pueden cambiar. `NetworkFirst` consulta el backend primero y usa la copia guardada cuando la red falla o tarda demasiado. Las imágenes cambian poco. `CacheFirst` reutiliza las que ya guardó y las descarga cuando hacen falta. [Estrategias de Workbox](https://developer.chrome.com/docs/workbox/caching-strategies-overview)

### 4. ¿Por qué en `npm run dev` no hay service worker?

VitePWA lo deja desactivado por defecto en desarrollo. Así, la caché no interfiere con los cambios mientras programas. `npm run build` lo genera y `npm run preview` permite probarlo. [Guía de VitePWA](https://vite-pwa-org.netlify.app/guide/development.html)

### 5. ¿Qué diferencia hay entre una PWA y una app híbrida?

La PWA se abre desde una URL y se instala desde el navegador. Una app híbrida empaqueta una interfaz web en un contenedor nativo que se puede distribuir por tiendas y usar para acceder a funciones del dispositivo mediante plugins. [Documentación de Capacitor](https://capacitorjs.com/docs)
