/**
 * @file vue-router table and navigation guards (scaffold).
 *
 * Boundary/ownership: `src/router`. Route components load lazily via dynamic
 * `import()`.
 *
 * Scaffold contract (#17): this file ships the **route table** for the locked
 * five-page set and the `RouteMeta` contract, with the navigation guard reduced
 * to a documented permissive scaffold. The guard returns `true` for every
 * navigation — it documents the intended auth/guest redirect matrix instead of
 * enforcing it. Consumers implement the matrix in their clone.
 */

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

/**
 * Route metadata contract for the template.
 * - `requiresAuth`:  signed-out visitors are redirected to `/login`.
 * - `requiresGuest`: signed-in visitors are redirected to `/dashboard`.
 *
 * The scaffold guard is permissive (see below); a clone reads these flags and
 * implements the redirects.
 */
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresGuest?: boolean
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'landing',
    component: () => import('@/pages/LandingView.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/LoginView.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/onboarding',
    name: 'onboarding',
    component: () => import('@/pages/OnboardingView.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/DashboardView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/pages/SettingsView.vue'),
    meta: { requiresAuth: true },
  },
  {
    // Catch-all: unknown paths land on the landing view.
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/LandingView.vue'),
  },
]

/** Application router using HTML5 history and the Vite base URL. */
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

/**
 * Navigation guard — documented scaffold (#17).
 *
 * Permissive by design: every navigation passes through. A clone implements
 * the intended matrix here:
 * - `meta.requiresAuth && !store.isAuthenticated` → redirect `{ name: 'login' }`
 * - `meta.requiresGuest && store.isAuthenticated` → redirect `{ name: 'dashboard' }`
 * Decisions should be delegated to the auth store, never computed here.
 */
router.beforeEach(() => {
  return true
})