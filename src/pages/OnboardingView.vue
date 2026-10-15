<script setup lang="ts">
/**
 * @file Onboarding tour: step-through explanation of the template architecture.
 *
 * Boundary/ownership: `src/pages`. Layout-only scaffold — the four layers are
 * static content; a clone adds interactive step state if the tour needs it.
 */
</script>

<template>
  <div class="max-w-2xl mx-auto mt-8">
    <p class="text-xs text-secondary mb-2">Onboarding</p>
    <h1 class="font-display text-4xl tracking-tight mb-8">How the template works</h1>

    <div class="space-y-4">
      <article class="card bg-base-100 border border-base-300">
        <div class="card-body">
          <h2 class="font-display text-xl mb-2">Types</h2>
          <p class="text-sm text-base-content/70 leading-relaxed">
            Public contracts live in <code>src/types</code>, authored by Zod
            schemas, and flow down through services and stores.
          </p>
        </div>
      </article>
      <article class="card bg-base-100 border border-base-300">
        <div class="card-body">
          <h2 class="font-display text-xl mb-2">Data layer</h2>
          <p class="text-sm text-base-content/70 leading-relaxed">
            <code>src/lib/api.ts</code> defines the typed client surface.
            Services wrap it; stores consume the services.
          </p>
        </div>
      </article>
      <article class="card bg-base-100 border border-base-300">
        <div class="card-body">
          <h2 class="font-display text-xl mb-2">UI atoms</h2>
          <p class="text-sm text-base-content/70 leading-relaxed">
            Pages compose immutable atoms from <code>src/components/ui</code>.
          </p>
        </div>
      </article>
      <article class="card bg-base-100 border border-base-300">
        <div class="card-body">
          <h2 class="font-display text-xl mb-2">Governance</h2>
          <p class="text-sm text-base-content/70 leading-relaxed">
            <code>AGENTS.md</code> files set recursive context boundaries; the
            verification gate is <code>npm run typecheck</code> +
            <code>npm run build</code>.
          </p>
        </div>
      </article>
    </div>
  </div>
</template>