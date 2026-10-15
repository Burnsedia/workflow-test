<script setup lang="ts">
/**
 * @file Application shell: navbar + `<RouterView>`.
 *
 * Boundary/ownership: `src/App.vue`, thin by design — layout and navigation
 * only, no state. Nav links cover the locked five-page scaffold; a clone makes
 * them auth-conditional per the router's `requiresAuth`/`requiresGuest` matrix.
 */
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="sticky top-0 z-10 bg-base-100/90 backdrop-blur border-b border-base-300">
      <div class="mx-auto w-full max-w-5xl px-6 py-4 flex items-center justify-between">
        <div class="flex items-baseline gap-2">
          <RouterLink to="/" class="font-display text-2xl tracking-tight">
            Hermes
          </RouterLink>
          <span class="hidden sm:inline text-xs text-secondary">
            local-first template
          </span>
        </div>
        <nav class="flex items-center gap-6 text-sm">
          <RouterLink to="/dashboard" class="link link-hover">Dashboard</RouterLink>
          <RouterLink to="/settings" class="link link-hover">Settings</RouterLink>
          <RouterLink to="/onboarding" class="link link-hover">Onboarding</RouterLink>
          <RouterLink to="/login" class="btn btn-primary btn-sm">Sign in</RouterLink>
        </nav>
      </div>
    </header>

    <main class="flex-1 w-full max-w-5xl mx-auto px-6 py-14">
      <RouterView />
    </main>

    <footer class="w-full max-w-5xl mx-auto px-6 pb-8">
      <div class="border-t border-base-300 pt-6 flex items-center justify-between text-xs text-secondary">
        <p>Hermes Template — local-first, agent-built, human-governed.</p>
        <p class="hidden sm:inline">Type-safe, shell-driven, composable.</p>
      </div>
    </footer>
  </div>
</template>