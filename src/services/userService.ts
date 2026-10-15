/**
 * @file Scaffold-only domain service for the `User` aggregate.
 *
 * Boundary/ownership: `src/services`. Wraps the generic client from `@/lib`
 * and exposes typed, named operations. May only import from `@/lib` and
 * `@/types`. It is thin by design — orchestration lives in stores, transport
 * details in the client.
 *
 * Scaffold contract (#15): this file ships the **factory pattern** (interface +
 * `createXService` + singleton) with **zero behavior** — every method body
 * throws `NotImplemented`. Consumers clone the wiring shape and implement the
 * real calls. Base URL resolution lives here, not in `@/lib` (#10): the env var
 * `VITE_API_BASE_URL` is honored at the service layer.
 */

import { createApiClient, DEFAULT_BASE_URL } from '@/lib/api'
import type { ApiClient } from '@/lib/api'
import type { ApiEnvelope, User, UserPatch } from '@/types'

/** Typed operations exposed for the user aggregate. */
export interface UserService {
  /**
   * The underlying generic client. Exposed for callers (e.g. a future auth
   * store) that need raw transport access. Constructed by the factory with
   * the env-resolved base URL.
   */
  client: ApiClient
  /** Fetch all users (served from cache while fresh in a real implementation). */
  listUsers(): Promise<ApiEnvelope<User[]>>
  /** Fetch a single user by id (served from cache while fresh). */
  getUser(id: string): Promise<ApiEnvelope<User>>
  /** Patch editable fields of a user; invalidates the user + collection caches. */
  updateUser(id: string, patch: UserPatch): Promise<ApiEnvelope<User>>
}

/**
 * Create a standalone user service.
 *
 * Scaffold stub (#15): returns the typed surface; method bodies throw
 * `NotImplemented`. The factory exists for testability and multi-backend use —
 * callers can inject a base URL (or rely on `VITE_API_BASE_URL`) and receive an
 * isolated client. The app ships with the {@link userService} singleton below.
 */
export function createUserService(baseUrl?: string): UserService {
  const client = createApiClient({
    baseUrl: baseUrl ?? import.meta.env.VITE_API_BASE_URL ?? DEFAULT_BASE_URL,
  })

  return {
    client,
    listUsers(): Promise<ApiEnvelope<User[]>> {
      throw new Error('NotImplemented')
    },
    getUser(_id: string): Promise<ApiEnvelope<User>> {
      throw new Error('NotImplemented')
    },
    updateUser(_id: string, _patch: UserPatch): Promise<ApiEnvelope<User>> {
      throw new Error('NotImplemented')
    },
  }
}

/** App-wide default user service (one client, one namespace). */
export const userService = createUserService()
