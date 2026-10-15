<script setup lang="ts">
/**
 * @file Login page: credential form shell.
 *
 * Boundary/ownership: `src/pages`. Layout-only scaffold — the form is markup
 * only, with no handlers or store wiring. A clone binds it to
 * `useAuthStore.login()` and navigates to the dashboard on success.
 */
</script>

<template>
  <div class="max-w-md mx-auto mt-10">
    <p class="text-xs text-secondary text-center mb-2">Welcome back</p>
    <h1 class="font-display text-4xl tracking-tight text-center mb-8">Sign in</h1>

    <form class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body gap-4">
        <label class="form-control w-full">
          <span class="label-text mb-1">Username</span>
          <input
            class="input input-bordered w-full"
            type="text"
            autocomplete="username"
            placeholder="user"
          />
        </label>

        <label class="form-control w-full">
          <span class="label-text mb-1">Password</span>
          <input
            class="input input-bordered w-full"
            type="password"
            autocomplete="current-password"
            placeholder="password"
          />
        </label>

        <button class="btn btn-primary w-full" type="submit" disabled>Sign in</button>

        <p class="text-xs text-secondary text-center leading-relaxed">
          Layout-only scaffold — bind this form to <code>useAuthStore.login()</code>
          in your clone.
        </p>
      </div>
    </form>
  </div>
</template>