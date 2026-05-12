<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useTitle } from '@vueuse/core'
import AppButton from '@/components/AppButton.vue'
import FormField from '@/components/FormField.vue'
import { useAuthStore } from '@/stores/auth'
import { useAsync } from '@/composables/useAsync'

useTitle('Create account · EverAfter')

const router = useRouter()
const auth = useAuthStore()
const { loading, error, fieldErrors, run } = useAsync()

const form = reactive({ email: '', password: '' })

async function onSubmit() {
  try {
    await run(() => auth.register(form))
    router.replace('/')
  } catch {
    // shown via error state
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

    <div class="rise w-full max-w-sm relative z-10">
      <div class="mb-8 text-center">
        <span class="chip chip-accent">New account</span>
        <h1 class="mt-3 text-2xl font-semibold tracking-tight text-text">Start planning today</h1>
        <p class="mt-1.5 text-sm text-text-2">Create your free EverAfter account.</p>
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
          autocomplete="new-password"
          placeholder="At least 8 characters…"
          hint="Min 8"
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
          {{ loading ? 'Creating account…' : 'Create account' }}
        </AppButton>
      </form>

      <p class="mt-5 text-center text-sm text-text-2">
        Already have an account?
        <RouterLink
          to="/login"
          class="font-medium text-accent underline-offset-4 hover:underline"
          >Sign in</RouterLink
        >
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
  top: 15%;
  right: 12%;
  animation-delay: 0.5s;
}

.flower-2 {
  top: 25%;
  left: 8%;
  animation-delay: 1.5s;
}

.flower-3 {
  bottom: 20%;
  right: 8%;
  animation-delay: 2.5s;
}

.flower-4 {
  bottom: 10%;
  left: 12%;
  animation-delay: 3.5s;
}

.flower-5 {
  top: 55%;
  right: 5%;
  animation-delay: 4.5s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(-5deg);
  }
}
</style>