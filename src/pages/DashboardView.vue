<script setup lang="ts">
/**
 * @file Dashboard: post-login workbench shell.
 *
 * Boundary/ownership: `src/pages`. Layout-only scaffold — headline + empty
 * placeholder panels with no data, handlers, or store wiring. A clone fills
 * each panel with real domain content.
 */
</script>

<template>
  <div class="space-y-10">
    <div>
      <p class="text-xs text-secondary mb-1">Dashboard</p>
      <h1 class="font-display text-4xl tracking-tight">Welcome</h1>
      <p class="text-sm text-secondary mt-1">
        Layout-only shell — wire your domain content here.
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-5">
      <div class="card bg-base-100 border border-base-200 border-dashed">
        <div class="card-body">
          <p class="text-sm text-secondary">Stat panel</p>
          <p class="text-xs text-base-content/50">Placeholder</p>
        </div>
      </div>
      <div class="card bg-base-100 border border-base-200 border-dashed">
        <div class="card-body">
          <p class="text-sm text-secondary">Stat panel</p>
          <p class="text-xs text-base-content/50">Placeholder</p>
        </div>
      </div>
      <div class="card bg-base-100 border border-base-200 border-dashed">
        <div class="card-body">
          <p class="text-sm text-secondary">Stat panel</p>
          <p class="text-xs text-base-content/50">Placeholder</p>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-200 border-dashed">
      <div class="card-body">
        <h2 class="font-display text-xl mb-1">Content panel</h2>
        <p class="text-xs text-base-content/50">Placeholder</p>
      </div>
    </div>
  </div>
</template>