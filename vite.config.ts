import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset paths so the build works at /kepler-designs-3/ on GitHub Pages
  base: './',
  plugins: [react(), tailwindcss()],
  // Pages: home, /services/, /work/, /privacy/ and /terms/
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, 'index.html'),
        services: path.resolve(import.meta.dirname, 'services/index.html'),
        privacy: path.resolve(import.meta.dirname, 'privacy/index.html'),
        terms: path.resolve(import.meta.dirname, 'terms/index.html'),
        work: path.resolve(import.meta.dirname, 'work/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
