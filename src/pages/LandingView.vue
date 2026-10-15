<script setup lang="ts">
/**
 * @file Landing page: product pitch + sign-in/tour entry points.
 *
 * Boundary/ownership: `src/pages`. Layout-only scaffold — presentational, no
 * state, only route links. The pitch copy mirrors the template's three pillars
 * (types first, typed data layer, human-governed UI).
 */
</script>

<template>
  <section class="text-center max-w-3xl mx-auto mt-8">
    <div class="badge badge-soft badge-primary badge-sm mb-7">v0.0.0 — template scaffold</div>
    <h1 class="font-display text-6xl leading-tight tracking-tight mb-5">Hermes</h1>
    <p class="text-lg leading-relaxed text-base-content/70 max-w-2xl mx-auto">
      A local-first, platform-agnostic Vue 3 application template built for an
      agent-driven software factory. Typed API contract, typed services, typed
      stores, and an immutable UI atom set.
    </p>
    <div class="flex gap-3 justify-center mt-8">
      <RouterLink to="/login" class="btn btn-primary">Sign in</RouterLink>
      <RouterLink to="/onboarding" class="btn btn-outline">Take the tour</RouterLink>
    </div>
  </section>

  <section class="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto mt-20">
    <article class="card bg-base-100 border border-base-300">
      <div class="card-body">
        <h2 class="font-display text-xl mb-2">Types first</h2>
        <p class="text-sm leading-relaxed text-base-content/70">
          Every public contract lives in
          <code class="text-primary">src/types</code>, authored by Zod schemas,
          and flows down through services and stores without <code>any</code>.
        </p>
      </div>
    </article>
    <article class="card bg-base-100 border border-base-300">
      <div class="card-body">
        <h2 class="font-display text-xl mb-2">Typed data layer</h2>
        <p class="text-sm leading-relaxed text-base-content/70">
          <code class="text-primary">src/lib/api.ts</code> ships the typed client
          surface; services wrap it and stores consume the services.
        </p>
      </div>
    </article>
    <article class="card bg-base-100 border border-base-300">
      <div class="card-body">
        <h2 class="font-display text-xl mb-2">Human-governed UI</h2>
        <p class="text-sm leading-relaxed text-base-content/70">
          <code class="text-primary">src/components/ui</code> is an immutable,
          human-authored design system; agents compose atoms, never rewrite them.
        </p>
      </div>
    </article>
  </section>
</template>