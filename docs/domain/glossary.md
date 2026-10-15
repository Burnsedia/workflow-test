# Domain Glossary

Shared vocabulary for Hermes. Every term used by docs, `AGENTS.md`, and code
must be traceable here.

| Term | Definition | Aliases | Canonical type |
| --- | --- | --- | --- |
| **Hermes** | The template project: a local-first Vue 3 app and its agent-driven software factory. | the app | — |
| **Session** | An authenticated user session; a token, the owning user, and an expiry timestamp. | login | `Session` in `src/types` |
| **AppUser** | A signed-in actor (alias of `User`). Identity and profile fields: id, username, displayName, email, role. | user, profile | `User` / `AppUser` in `src/types` |
| **ApiEnvelope** | The uniform response wrapper from the generic client: `data` \| `error` + `meta` (alias `ApiResponse`). | envelope | `ApiEnvelope<T>`, `ApiResponse<T>` in `src/types` |
| **ApiError** | Normalized error shape: HTTP status, stable code, message, optional details. | error | `ApiError` in `src/types` |
| **Schema** | A Zod schema in `src/types` that authors a domain type; the TypeScript type is derived via `z.infer`, so the schema is the single source of truth for both compile-time and runtime shape. | zod schema | `UserSchema`, `SessionSchema`, `ApiErrorSchema`, `UserPatchSchema` in `src/types` |
| **Zod** | The runtime validation library that authors the domain schemas and validates API responses / restored sessions. | — | dependency `zod` |
| **Agent** | A scoped autonomous worker in the factory executing tasks within strict `AGENTS.md` boundaries. | worker | `Agent` in `src/types` |
| **Agent status** | Lifecycle of an agent task: idle, running, blocked, done, failed. | state | `AgentStatus` in `src/types` |
| **AgentTask** | A unit of work assigned to an agent with a lifecycle and result. | task, work item | `AgentTask` in `src/types` |
| **Service** | A domain module wrapping the generic client with typed operations (e.g. `userService`); a scaffold stub consumers implement. | domain service | `UserService` in `src/services/userService.ts` |
| **Client** | The scaffold-only typed API client surface in `src/lib/api.ts`; every method throws `NotImplemented` until a consumer implements the transport. | api client, transport | `ApiClient` in `src/lib/api.ts` |
| **Atom** | An immutable, human-authored design-system component in `src/components/ui`. | ui atom | — |
| **Generated component** | An agent-built component in `src/components/generated`. | agent component | — |
| **Page** | A route-level view composed from atoms and generated components. | view | `XView.vue` in `src/pages` |
| **Local-first** | The intended contract of the API client: reads prefer a local cache before the network (implemented by consumers in a clone). | offline-first | — |
| **Scaffold** | The repository structure, contracts, and configuration this template provides — with no shipping behavior. | skeleton | — |