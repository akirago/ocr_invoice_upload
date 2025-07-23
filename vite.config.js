import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/ocr_invoice_upload/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png'],
      manifest: {
        name: 'Drive OCR Share',
        short_name: 'OCR Share',
        description: 'Capture photos, OCR text, and share to Google Drive',
        theme_color: '#4285f4',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/ocr_invoice_upload/',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'tesseract-cdn',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  server: {
    host: true,
    port: 5173,
    allowedHosts: ['519870cf565b.ngrok-free.app']
  }
})