/**
 * @file Scaffold-only generic HTTP + persistence client.
 *
 * Boundary/ownership: `src/lib`, platform-agnostic infrastructure. This module
 * must never import UI, Pinia stores, domain services, or domain types — it
 * only knows transport. Services wrap it (`src/services`) and stores consume
 * the services.
 *
 * Scaffold contract (#14): this file ships the **typed surface** of the client
 * and **zero implementation**. Every method throws `NotImplemented`; the
 * transport (fetching, local caching, error normalization) is left to the
 * consumer's clone, so no scaffold behavior can leak into a produced app.
 * The optional `schema` arguments (#20) document the intended validation
 * contract: a real client validates `envelope.data` against the schema before
 * resolving. `src/lib` stays Vite-free — base URL resolution lives in the
 * services layer (#10).
 */

import type { ApiEnvelope } from '@/types'
import type { ZodType } from 'zod'

/** Query-string parameters; `undefined` values are skipped when serializing. */
export type QueryParams = Record<string, string | number | boolean | undefined>

/** HTTP methods the client supports; mutations invalidate the read cache. */
export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

/** Raw request description consumed by {@link ApiClient.request}. */
export interface RequestConfig<TBody = never> {
  /** HTTP method to execute. */
  method: ApiMethod
  /** Path resolved against the client base URL (may be an absolute URL). */
  path: string
  /** JSON-serializable body; implies `Content-Type: application/json`. */
  body?: TBody
  /** Per-request headers, merged over the client-level defaults. */
  headers?: Record<string, string>
  /** Query-string parameters appended to the request URL. */
  query?: QueryParams
}

/**
 * Minimal storage contract so the cache works in the browser (`localStorage`),
 * Node, and tests (in-memory Map). Mirrors the Web Storage API surface.
 */
export interface StorageLike {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

/** Per-call overrides carried by the typed convenience methods. */
export interface RequestContextOptions {
  /** Per-request headers merged over client defaults. */
  headers?: Record<string, string>
  /** Query-string parameters appended to the request URL. */
  query?: QueryParams
}

/** Options accepted by {@link createApiClient}. */
export interface ApiClientOptions {
  /**
   * Base URL for relative paths; falls back to `DEFAULT_BASE_URL`.
   * Absolute `http(s)://` paths bypass joining entirely.
   */
  baseUrl?: string
  /** Default headers applied to every request (merged under per-request ones). */
  headers?: Record<string, string>
  /** Fetch implementation for tests/SSR; defaults to `globalThis.fetch`. */
  fetchImpl?: typeof fetch
  /**
   * Cache configuration. When omitted the client is purely network-bound.
   * - `storage`: where entries live (browser/localStorage, memory, ...).
   * - `keyPrefix`: namespace so multiple clients / aggregates don't collide.
   * - `ttlMs`: how long a fresh GET entry is trusted before refetching.
   */
  cache?: {
    storage: StorageLike
    keyPrefix: string
    ttlMs: number
  }
}

/**
 * Typed surface of the client. Every method returns an envelope, never throws
 * in the real implementation.
 *
 * Each method accepts an optional `schema` (#20): a real client validates
 * `envelope.data` against it before resolving, so corrupt payloads cannot
 * silently enter app state. The scaffold keeps the argument as contract-only.
 */
export interface ApiClient {
  /** Issue a GET; a fresh cache hit short-circuits before the network. */
  get<T>(path: string, opts?: RequestContextOptions, schema?: ZodType<T>): Promise<ApiEnvelope<T>>
  /** Issue a POST with an optional JSON body. */
  post<TBody, TRes>(
    path: string,
    body?: TBody,
    opts?: RequestContextOptions,
    schema?: ZodType<TRes>,
  ): Promise<ApiEnvelope<TRes>>
  /** Issue a PUT with an optional JSON body. */
  put<TBody, TRes>(
    path: string,
    body?: TBody,
    opts?: RequestContextOptions,
    schema?: ZodType<TRes>,
  ): Promise<ApiEnvelope<TRes>>
  /** Issue a PATCH with an optional JSON body. */
  patch<TBody, TRes>(
    path: string,
    body?: TBody,
    opts?: RequestContextOptions,
    schema?: ZodType<TRes>,
  ): Promise<ApiEnvelope<TRes>>
  /** Issue a DELETE; takes no body by design. */
  delete<TRes>(path: string, opts?: RequestContextOptions, schema?: ZodType<TRes>): Promise<ApiEnvelope<TRes>>
  /** Low-level escape hatch with full control over method, body, and query. */
  request<TReq, TRes>(config: RequestConfig<TReq>, schema?: ZodType<TRes>): Promise<ApiEnvelope<TRes>>
}

/** Default base URL for relative requests: the app-origin `/api` proxy. */
export const DEFAULT_BASE_URL = '/api'

/**
 * Create a configured, typed API client.
 *
 * Scaffold stub (#14): returns the full typed surface with every method body
 * throwing `NotImplemented`. A consumer's clone re-implements the transport —
 * request dispatch, local-first caching, error normalization — against the
 * same signatures, so the contract stays stable while the behavior is theirs.
 */
export function createApiClient(options: ApiClientOptions): ApiClient {
  void options
  const notImplemented = (): never => {
    throw new Error('NotImplemented')
  }

  return {
    get: () => notImplemented(),
    post: () => notImplemented(),
    put: () => notImplemented(),
    patch: () => notImplemented(),
    delete: () => notImplemented(),
    request: () => notImplemented(),
  }
}