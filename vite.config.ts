import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset paths so the build works at /kepler-designs-3/ on GitHub Pages
  base: './',
  plugins: [react(), tailwindcss()],
  // Pages: home, /services/, /work/, /clients/, /faq/, /privacy/ and /terms/
  build: {
    // One stylesheet for every page, at a fixed name.
    cssCodeSplit: false,
    rollupOptions: {
      // Fixed file names instead of content hashes. GitHub Pages only lets
      // browsers keep files for ~10 minutes, so hashes buy nothing, and with
      // them a page saved before an update asks for files the update deleted
      // (unstyled or blank page). With fixed names it always finds them.
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: (info) =>
          info.names?.some((n) => n.endsWith('.css')) ? 'assets/site.css' : 'assets/[name][extname]',
      },
      input: {
        main: path.resolve(import.meta.dirname, 'index.html'),
        services: path.resolve(import.meta.dirname, 'services/index.html'),
        privacy: path.resolve(import.meta.dirname, 'privacy/index.html'),
        terms: path.resolve(import.meta.dirname, 'terms/index.html'),
        work: path.resolve(import.meta.dirname, 'work/index.html'),
        clients: path.resolve(import.meta.dirname, 'clients/index.html'),
        faq: path.resolve(import.meta.dirname, 'faq/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
