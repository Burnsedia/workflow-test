/**
 * @file Vite configuration.
 *
 * Boundary/ownership: repo root infrastructure (owns no runtime code).
 * Registers the Vue + Tailwind CSS v4 plugins and maps the `@/*` alias to
 * `src/*`, which every internal import relies on.
 *
 * Dev-proxy escape hatch (#12): without a proxy, `npm run dev` requests to
 * `/api/...` hit the Vite dev server and return `index.html` with HTTP 200.
 * Uncomment `server.proxy` below to forward `/api` to a local backend.
 */

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // `vue()` compiles SFCs; `tailwindcss()` wires the CSS-first Tailwind v4
  // pipeline (no `tailwind.config.js` — see `src/style.css`).
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Dev proxy (#12) — uncomment to forward `/api` to a local backend during
  // development instead of letting the Vite dev server answer with index.html:
  // server: {
  //   proxy: {
  //     '/api': { target: 'http://localhost:3000', changeOrigin: true },
  //   },
  // },
})