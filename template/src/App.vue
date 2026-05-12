<script setup>
import NavMenu from './components/NavMenu.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <div class="min-h-screen font-sans" style="background-color: #fce4ec;">
    <NavMenu v-if="auth.isAuthenticated" />
    <RouterView />
  </div>
</template>
