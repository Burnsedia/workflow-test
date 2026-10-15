/**
 * @file Shared public type contracts for the Hermes template.
 *
 * Boundary/ownership: the single home for every public TypeScript type used
 * across `src/`. Since #20 the domain types are **authored by Zod schemas**:
 * the schema is the single source of truth, and the TypeScript type is derived
 * from it via `z.infer` — one place defines both the compile-time shape and the
 * runtime validator. The file depends only on `zod` (external) so every layer
 * can import from `@/types` without creating cycles.
 *
 * `Agent`/`AgentTask`/`AgentActivity` remain hand-typed: they are future-facing
 * aggregates with no runtime entry point in the scaffold.
 */

import { z } from 'zod'

/** Any unique identifier used across the app (opaque string, never numeric). */
export type ID = string

/** Zod schema authoring the {@link UserRole} union. */
const UserRoleSchema = z.enum(['user', 'admin'])

/**
 * Authorization level of a user.
 * - `'user'`  — standard, read-mostly actor.
 * - `'admin'` — elevated rights (member management, configuration).
 */
export type UserRole = z.infer<typeof UserRoleSchema>

/**
 * Zod schema authoring the {@link User} shape.
 *
 * Dates (`createdAt`/`updatedAt`) are ISO-8601 strings, not timestamps; the
 * runtime validator accepts any string and type safety is the caller's
 * guarantee.
 */
export const UserSchema = z.object({
  /** Primary key; used by the API paths (`/users/:id`). */
  id: z.string(),
  /** Login handle; identity key for the user aggregate. */
  username: z.string(),
  /** Human-friendly name shown in the UI header and avatars. */
  displayName: z.string(),
  /** Contact email. */
  email: z.string(),
  /** Authorization level of the user. */
  role: UserRoleSchema,
  /** ISO-8601 timestamp of account creation. */
  createdAt: z.string(),
  /** ISO-8601 timestamp of the last update. */
  updatedAt: z.string(),
})

/**
 * A registered user in the system.
 * Dates are ISO-8601 strings, not timestamps.
 */
export type User = z.infer<typeof UserSchema>

/** Zod schema alias authoring the {@link AppUser} shape (same as `UserSchema`). */
export const AppUserSchema = UserSchema

/**
 * Alias kept for domain naming: a signed-in actor is an `AppUser`.
 * Identity of `User`; kept nominal so glossary terms map to one type.
 */
export type AppUser = z.infer<typeof AppUserSchema>

/**
 * Zod schema authoring the {@link Session} shape.
 *
 * `expiresAt` is ISO-8601; a session is live only while
 * `new Date(expiresAt).getTime() > Date.now()`.
 */
export const SessionSchema = z.object({
  /** Opaque bearer token the consumer presents on authenticated requests. */
  token: z.string(),
  /** The user this session was minted for. */
  user: UserSchema,
  /** ISO-8601 expiry; past this instant the session must be treated as dead. */
  expiresAt: z.string(),
})

/**
 * An authenticated session: the bearer token, the owning user, and the expiry
 * cutoff. `expiresAt` is ISO-8601.
 */
export type Session = z.infer<typeof SessionSchema>

/**
 * Zod schema authoring the {@link UserPatch} shape.
 *
 * All fields optional so an empty patch is valid; identity fields (`id`,
 * timestamps) are immutable server-side and deliberately absent.
 */
export const UserPatchSchema = z.object({
  /** New human-friendly display name. */
  displayName: z.string().optional(),
  /** New contact email. */
  email: z.string().optional(),
  /** New authorization level. */
  role: UserRoleSchema.optional(),
})

/**
 * Fields a consumer may patch on a user. Deliberately a subset of `User`.
 */
export type UserPatch = z.infer<typeof UserPatchSchema>

/**
 * Zod schema authoring the {@link ApiError} shape.
 *
 * `code` is a stable, machine-readable string (e.g. `NETWORK_ERROR`);
 * `message` is human-readable; `details` carries optional structured context.
 */
export const ApiErrorSchema = z.object({
  /** HTTP status, or `0` for network-level failures. */
  status: z.number(),
  /** Stable error code; consumers switch on this, not on `status`. */
  code: z.string(),
  /** Human-readable description safe to surface to users. */
  message: z.string(),
  /** Optional structured payload attached by the backend. */
  details: z.record(z.string(), z.unknown()).optional(),
})

/**
 * Normalized error shape returned by the generic client.
 */
export type ApiError = z.infer<typeof ApiErrorSchema>

/**
 * Transport metadata attached to every response; grows without breaking
 * consumers thanks to the open `[key: string]: unknown` index.
 */
export interface ApiMeta {
  /** HTTP status of the response, or `0` on network failure. */
  status: number
  /** `true` when the response was served from the local cache, not network. */
  cached?: boolean
  [key: string]: unknown
}

/**
 * Uniform response wrapper from the generic client: exactly one of `data` or
 * `error` is non-null; `meta` always describes the transport outcome.
 */
export interface ApiEnvelope<T> {
  /** Payload on success; `null` when `error` is set. */
  data: T | null
  /** Normalized error on failure; `null` on success. */
  error: ApiError | null
  /** Transport metadata (status, cache hit, ...). */
  meta: ApiMeta
}

/** Alias kept for reader familiarity; identical to `ApiEnvelope<T>`. */
export type ApiResponse<T> = ApiEnvelope<T>

/**
 * Build a Zod validator for a full {@link ApiEnvelope} around a data schema.
 *
 * The scaffold exposes this so consumers can validate an entire envelope (data
 * + error + meta) with a single `.parse`/`.safeParse` call — the template's
 * answer to corrupt or hostile payloads entering app state.
 */
export function apiEnvelopeSchema<T>(dataSchema: z.ZodType<T>): z.ZodType<ApiEnvelope<T>> {
  return z.object({
    data: dataSchema.nullable(),
    error: ApiErrorSchema.nullable(),
    meta: z
      .object({
        status: z.number(),
        cached: z.boolean().optional(),
      })
      .passthrough(),
  })
}

/**
 * Lifecycle of an agent task.
 * - `idle`     — created, not yet scheduled.
 * - `running`  — executing.
 * - `blocked`  — waiting on a dependency.
 * - `done`     — finished successfully.
 * - `failed`   — finished with an error.
 */
export type AgentStatus = 'idle' | 'running' | 'blocked' | 'done' | 'failed'

/** A scoped autonomous worker in the factory, as tracked by the dashboard. */
export interface Agent {
  id: ID
  name: string
  description: string
  status: AgentStatus
  /** ISO-8601 of the most recent run, or `null` if never run. */
  lastRunAt: string | null
}

/** A unit of work assigned to an agent, with a lifecycle and a result. */
export interface AgentTask {
  id: ID
  title: string
  description: string
  status: AgentStatus
  /** Output of the task on success, `null` until finished. */
  result: string | null
  /** ISO-8601 creation timestamp. */
  createdAt: string
  /** ISO-8601 when execution began, `null` while idle/blocked. */
  startedAt: string | null
  /** ISO-8601 when execution ended, `null` while running/queued. */
  finishedAt: string | null
}

/** A single recorded action performed by an agent (audit trail entry). */
export interface AgentActivity {
  agentId: ID
  /** Short verb describing the action (e.g. `plan`, `write`, `report`). */
  action: string
  status: AgentStatus
  /** ISO-8601 timestamp of the activity. */
  happenedAt: string
}

/**
 * Success payload of `POST /auth/login`.
 * The endpoint responds with a fresh `Session`; the auth store persists it.
 */
export interface AuthLoginResponse {
  session: Session
}