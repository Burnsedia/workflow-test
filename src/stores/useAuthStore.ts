/**
 * @file Auth store: the single owner of `Session` state (scaffold).
 *
 * Boundary/ownership: `src/stores`. The only place session state mutates.
 * Persistence in `localStorage` is the store's responsibility; network access
 * would flow through the user service's client — never raw `fetch`.
 *
 * Scaffold contract (#16): state, getters, and action signatures are the
 * canonical store pattern; `login`/`logout` are unimplemented stubs. The one
 * exception is `restore()`, which ships real validation (#20): a persisted
 * session is only accepted when it satisfies `SessionSchema`, so corrupt or
 * hostile `localStorage` entries can never enter app state.
 */

import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { SessionSchema } from '@/types'
import type { ApiError, Session } from '@/types'

/** localStorage key under which the session is mirrored across reloads. */
const STORAGE_KEY = 'hermes:session'

/**
 * Auth store — scaffold example of a typed, persisted store.
 *
 * - `isAuthenticated` considers **both** presence and expiry: a persisted
 *   session past `expiresAt` is treated as logged out.
 * - `login`/`logout` are signature-only stubs the consumer implements in a
 *   clone; `restore` rehydrates from storage with Zod shape validation.
 */
export const useAuthStore = defineStore('auth', () => {
  const session = ref<Session | null>(null)
  const loading = ref(false)
  const error = ref<ApiError | null>(null)

  /** True while a live (non-expired) session exists. */
  const isAuthenticated = computed(
    () =>
      session.value !== null &&
      new Date(session.value.expiresAt).getTime() > Date.now(),
  )
  /** The signed-in user's username, or `''` when signed out. */
  const username = computed(() => session.value?.user.username ?? '')

  /**
   * Sign in with credentials via `POST /auth/login` (scaffold stub).
   *
   * Contract: resolves `true` on success (session stored + persisted), `false`
   * on failure with the normalized error in `error`; never throws.
   */
  async function login(_username: string, _password: string): Promise<boolean> {
    throw new Error('NotImplemented')
  }

  /** Sign out: clear in-memory state, error, and persisted session (stub). */
  function logout(): void {
    throw new Error('NotImplemented')
  }

  /**
   * Rehydrate the session from `localStorage` (used at app bootstrap).
   *
   * Only shape-valid sessions are accepted: the parsed JSON must satisfy
   * `SessionSchema` (`token`, `user`, `expiresAt` strings) or the entry is
   * treated as "no session". No-op in environments without `localStorage`.
   */
  function restore(): void {
    if (typeof globalThis.localStorage === 'undefined') {
      return
    }
    const raw = globalThis.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return
    }
    try {
      const parsed: unknown = JSON.parse(raw)
      const result = SessionSchema.safeParse(parsed)
      session.value = result.success ? result.data : null
    } catch {
      session.value = null
    }
  }

  return { session, loading, error, isAuthenticated, username, login, logout, restore }
})
