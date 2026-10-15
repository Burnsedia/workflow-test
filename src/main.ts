/**
 * @file Application bootstrap: install Pinia + router, hydrate the auth store,
 * then mount the shell.
 *
 * Boundary/ownership: `src/` root, thin by design. Session hydration happens
 * exactly once here (the router guard reads in-memory state afterwards), so a
 * persisted session survives reloads without per-navigation storage I/O.
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import { router } from './router'
import { useAuthStore } from '@/stores/useAuthStore'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)

// Rehydrate any persisted session at bootstrap (the scaffold store's one real
// behavior). The explicit `pinia` argument keeps the lookup correct outside a
// component; the navigation guard is scaffold-permissive and reads no state.
useAuthStore(pinia).restore()

app.mount('#app')