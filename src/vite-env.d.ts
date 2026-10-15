/**
 * @file Ambient type declarations for the Vite environment.
 *
 * Boundary/ownership: `src/vite-env.d.ts`. Brings in the `vite/client` types
 * (asset imports, `import.meta.env` baselines) and narrows `import.meta.env`
 * to the variables this app reads — currently just `VITE_API_BASE_URL`, which
 * the service layer resolves (`src/services`), never `src/lib`.
 */

/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Base URL for the API client, resolved by the service layer
   * (`src/services/userService.ts`). Optional; falls back to `/api` when unset.
   */
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}