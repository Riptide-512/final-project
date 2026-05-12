<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTitle } from '@vueuse/core'
import AppButton from '@/components/AppButton.vue'
import FormField from '@/components/FormField.vue'
import { useAuthStore } from '@/stores/auth'
import { useAsync } from '@/composables/useAsync'

useTitle('Sign in · EverAfter')

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const { loading, error, fieldErrors, run } = useAsync()

const form = reactive({ email: '', password: '' })

async function onSubmit() {
  try {
    await run(() => auth.login(form))
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    router.replace(redirect)
  } catch {
    // error captured
  }
}
</script>

<template>
  <main class="flex flex-1 items-center justify-center px-5 py-16 relative overflow-hidden" style="background-color: #fce4ec;">
    <!-- Decorative flowers -->
    <div class="flower flower-1">🌸</div>
    <div class="flower flower-2">🌼</div>
    <div class="flower flower-3">🌺</div>
    <div class="flower flower-4">💐</div>
    <div class="flower flower-5">🌷</div>
    <div class="flower flower-6">🌻</div>
    <div class="flower flower-7">🌹</div>
    <div class="flower flower-8">🌸</div>
    <div class="flower flower-9">🌼</div>
    <div class="flower flower-10">💮</div>

    <div class="rise w-full max-w-sm relative z-10">
      <div class="mb-8 text-center">
        <span class="chip chip-accent mb-4">Welcome back</span>
        <h1 class="mt-3 text-2xl font-semibold tracking-tight text-text">Sign in to EverAfter</h1>
        <p class="mt-1.5 text-sm text-text-2">Your special day is waiting.</p>
      </div>
      <form
        class="card flex flex-col gap-4 p-6"
        @submit.prevent="onSubmit"
      >
        <FormField
          v-model="form.email"
          label="Email"
          type="email"
          autocomplete="email"
          required
          placeholder="you@company.com"
          :error="fieldErrors.email"
        />
        <FormField
          v-model="form.password"
          label="Password"
          type="password"
          autocomplete="current-password"
          required
          :error="fieldErrors.password"
        />

        <p
          v-if="error && Object.keys(fieldErrors).length === 0"
          class="flex items-center gap-2 rounded-md border border-danger/30 bg-danger-soft px-3 py-2 text-xs text-danger"
          role="alert"
          aria-live="polite"
        >
          <span aria-hidden="true">⚠</span>
          {{ error.message }}
        </p>

        <AppButton
          type="submit"
          :loading="loading"
        >
          {{ loading ? 'Signing in…' : 'Sign in' }}
        </AppButton>
      </form>
      <p class="mt-5 text-center text-sm text-text-2">
        New here?
        <RouterLink
          to="/register"
          class="font-medium text-accent underline-offset-4 hover:underline"
        >
          Create an account
        </RouterLink>
      </p>
    </div>
  </main>
</template>

<style scoped>
.flower {
  position: absolute;
  font-size: 2rem;
  opacity: 0.6;
  animation: float 6s ease-in-out infinite;
}

.flower-1 {
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.flower-2 {
  top: 20%;
  right: 15%;
  animation-delay: 1s;
}

.flower-3 {
  bottom: 25%;
  left: 15%;
  animation-delay: 2s;
}

.flower-4 {
  bottom: 15%;
  right: 10%;
  animation-delay: 3s;
}

.flower-5 {
  top: 60%;
  left: 5%;
  animation-delay: 4s;
}

.flower-6 {
  top: 35%;
  left: 20%;
  animation-delay: 0.5s;
  font-size: 1.5rem;
}

.flower-7 {
  top: 45%;
  right: 20%;
  animation-delay: 1.5s;
  font-size: 1.5rem;
}

.flower-8 {
  bottom: 35%;
  left: 25%;
  animation-delay: 2.5s;
  font-size: 1.8rem;
}

.flower-9 {
  top: 15%;
  right: 25%;
  animation-delay: 3.5s;
  font-size: 1.8rem;
}

.flower-10 {
  bottom: 45%;
  right: 5%;
  animation-delay: 4.5s;
  font-size: 1.5rem;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(5deg);
  }
}
</style>