<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const isToolsOpen = ref(false)

function toggleTools() {
  isToolsOpen.value = !isToolsOpen.value
}

function closeTools() {
  isToolsOpen.value = false
}

function onToolsFocusOut(event) {
  if (!event.currentTarget.contains(event.relatedTarget)) {
    closeTools()
  }
}

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

        <div class="relative" @focusout="onToolsFocusOut">
          <button
            type="button"
            class="flex items-center gap-1 hover:text-slate-900"
            aria-haspopup="true"
            :aria-expanded="isToolsOpen.toString()"
            @click="toggleTools"
            @keydown.escape.prevent="closeTools"
          >
            Tools
            <span class="text-slate-400">▾</span>
          </button>

          <div
            v-show="isToolsOpen"
            class="absolute left-0 z-20 mt-2 min-w-[14rem] overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-lg"
            role="menu"
          >
            <RouterLink
              to="/planning-dashboard"
              class="block px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              role="menuitem"
            >
              Planning Dashboard
            </RouterLink>
            <RouterLink
              to="/guest-list"
              class="block px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              role="menuitem"
            >
              Guest List
            </RouterLink>
            <RouterLink
              to="/gift-registry"
              class="block px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              role="menuitem"
            >
              Gift Registry
            </RouterLink>
          </div>
        </div>

        <RouterLink to="/about" class="hover:text-slate-900">About</RouterLink>
        <RouterLink to="/reviews" class="hover:text-slate-900">Reviews</RouterLink>
      </nav>

      <div class="flex flex-wrap items-center gap-3">
        <template v-if="auth.isAuthenticated">
          <span class="text-sm text-slate-500">Signed in as <strong class="text-slate-900">{{ auth.email }}</strong></span>
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