import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const { VITE_API_URL } = loadEnv(mode, process.cwd());
  const api = VITE_API_URL ?? 'http://localhost:3000';
  const prefijo = api.replace(/\/+$/, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'Gimnasio Titanes',
          short_name: 'Titanes',
          lang: 'es',
          start_url: '/',
          display: 'standalone',
          theme_color: '#0f2233',
          background_color: '#f4f7fa',
          icons: [
            { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
            { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png}'],
          navigateFallback: '/index.html',
          runtimeCaching: [
            {
              urlPattern: new RegExp(`^${prefijo}/clases(?:[/?]|$)`),
              handler: 'NetworkFirst',
              options: { cacheName: 'api-clases', networkTimeoutSeconds: 4 },
            },
            {
              urlPattern: new RegExp(`^${prefijo}/img/`),
              handler: 'CacheFirst',
              options: {
                cacheName: 'api-imagenes',
                // Las imágenes del backend en otro origen pueden ser respuestas opacas.
                cacheableResponse: { statuses: [0, 200] },
              },
            },
          ],
        },
      }),
    ],
  };
});
