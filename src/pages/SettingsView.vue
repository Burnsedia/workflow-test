<script setup lang="ts">
/**
 * @file Settings: profile + session management shell.
 *
 * Boundary/ownership: `src/pages`. Layout-only scaffold — read-only profile and
 * session placeholders with no handlers. A clone binds the profile to the
 * signed-in user and wires sign-out to `useAuthStore.logout()`.
 */
</script>

<template>
  <div class="max-w-2xl space-y-8">
    <h1 class="font-display text-4xl tracking-tight">Settings</h1>

    <div class="card bg-base-100 border border-base-300">
      <div class="card-body">
        <h2 class="font-display text-xl mb-4">Profile</h2>
        <dl class="grid sm:grid-cols-2 gap-3 text-sm">
          <div class="bg-base-200 rounded-lg p-4">
            <dt class="text-xs text-secondary mb-1">Username</dt>
            <dd class="font-medium text-base-content/40">—</dd>
          </div>
          <div class="bg-base-200 rounded-lg p-4">
            <dt class="text-xs text-secondary mb-1">Display name</dt>
            <dd class="font-medium text-base-content/40">—</dd>
          </div>
          <div class="bg-base-200 rounded-lg p-4">
            <dt class="text-xs text-secondary mb-1">Email</dt>
            <dd class="font-medium text-base-content/40">—</dd>
          </div>
          <div class="bg-base-200 rounded-lg p-4">
            <dt class="text-xs text-secondary mb-1">Role</dt>
            <dd class="font-medium text-base-content/40">—</dd>
          </div>
        </dl>
      </div>
    </div>

    <div class="card bg-base-100 border border-base-300">
      <div class="card-body">
        <h2 class="font-display text-xl mb-2">Session</h2>
        <p class="text-sm text-secondary">Expires —</p>
        <div class="card-actions mt-4">
          <button class="btn btn-error btn-sm" disabled>Sign out</button>
        </div>
      </div>
    </div>
  </div>
</template>