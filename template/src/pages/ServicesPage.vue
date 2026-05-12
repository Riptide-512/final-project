<template>
  <div class="services-page">
    <div class="services-container">
      <header class="page-header">
        <h1>Tools</h1>
        <p class="intro-text">
          Your central hub for EverAfter planning features. Open the guest list, gift registry, or planning dashboard below.
        </p>
      </header>

      <div class="features-grid">
        <router-link to="/guest-list" class="feature-card">
          <div class="feature-icon">👥</div>
          <h2>Guest List</h2>
          <p>Manage invitations, RSVPs, and guest details.</p>
        </router-link>

        <router-link to="/gift-registry" class="feature-card">
          <div class="feature-icon">🎁</div>
          <h2>Gift Registry</h2>
          <p>Create and share your event gift registry with guests.</p>
        </router-link>

        <router-link to="/planning-dashboard" class="feature-card">
          <div class="feature-icon">📋</div>
          <h2>Planning Dashboard</h2>
          <p>Track tasks, progress, and milestones across your planning workflow.</p>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTitle } from '@vueuse/core'
import { apiFetch } from '@/lib/api'

useTitle('Tools · EverAfter')

const services = ref([])
const feedback = ref('')

const loadServices = async () => {
  try {
    services.value = await apiFetch('/services', { auth: true })
  } catch {
    services.value = []
    feedback.value = 'Unable to load services. Please try again later.'
  }
}

onMounted(() => {
  loadServices()
})
</script>


