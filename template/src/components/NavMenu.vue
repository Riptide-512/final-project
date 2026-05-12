<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

async function signOut() {
  await auth.logout()
  router.replace('/login')
}
</script>

<template>
  <header class="sticky top-0 z-40 bg-white/95 shadow backdrop-blur-sm">
    <div class="mx-auto flex flex-wrap items-center justify-between gap-4 px-8 py-4 max-w-6xl">
      <RouterLink to="/" class="text-2xl font-bold tracking-tight text-slate-800">
        EverAfter
      </RouterLink>

      <nav class="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-700">
        <RouterLink to="/" class="hover:text-slate-900">Home</RouterLink>
        <RouterLink to="/services" class="hover:text-slate-900">Services</RouterLink>
        <RouterLink to="/about" class="hover:text-slate-900">About</RouterLink>
        <RouterLink to="/reviews" class="hover:text-slate-900">Reviews</RouterLink>
        <RouterLink to="/guest-list" class="hover:text-slate-900">Guest List</RouterLink>
        <RouterLink to="/gift-registry" class="hover:text-slate-900">Gift Registry</RouterLink>
      </nav>

      <div class="flex flex-wrap items-center gap-3">
        <template v-if="auth.isAuthenticated">
          <button
            class="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            @click="signOut"
          >
            Sign Out
          </button>
        </template>
        <template v-else>
          <RouterLink
            to="/login"
            class="rounded-md px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/register"
            class="rounded-full bg-slate-800 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
          >
            Get Started
          </RouterLink>
        </template>
      </div>
    </div>
  </header>
</template>