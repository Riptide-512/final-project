<script setup>
import NavMenu from './components/NavMenu.vue'
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 font-sans">
    <NavMenu />
    <RouterView />
  </div>
</template>
