<template>
  <div class="services-page">
    <header class="bg-white shadow">
      <nav class="flex items-center justify-between px-8 py-4">
        <h1 class="text-2xl font-bold text-slate-800">EverAfter</h1>
        <ul class="flex gap-8">
          <li><router-link to="/" class="text-slate-700 hover:text-slate-900">Home</router-link></li>
          <li><router-link to="/services" class="text-slate-700 hover:text-slate-900">Services</router-link></li>
          <li><router-link to="/about" class="text-slate-700 hover:text-slate-900">About</router-link></li>
          <li><router-link to="/reviews" class="text-slate-700 hover:text-slate-900">Reviews</router-link></li>
        </ul>
      </nav>
    </header>
    <div class="services-container">
      <h1>Our Services</h1>
      <p class="intro-text">We offer a comprehensive range of professional services tailored to meet your needs.</p>
      
      <div class="services-grid">
        <template v-for="service in services" :key="service.id">
          <router-link 
            v-if="service.id === 1" 
            to="/guest-list" 
            class="service-card"
          >
            <div class="service-icon">{{ service.icon }}</div>
            <h2>{{ service.title }}</h2>
            <p>{{ service.description }}</p>
          </router-link>
          <router-link 
            v-else-if="service.id === 4" 
            to="/gift-registry" 
            class="service-card"
          >
            <div class="service-icon">{{ service.icon }}</div>
            <h2>{{ service.title }}</h2>
            <p>{{ service.description }}</p>
          </router-link>
          <div v-else class="service-card">
            <div class="service-icon">{{ service.icon }}</div>
            <h2>{{ service.title }}</h2>
            <p>{{ service.description }}</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServicesPage',
  data() {
    return {
      services: [
        {
          id: 1,
          icon: '👥',
          title: 'Guest List Management',
          description: 'Easily manage and organize your guest list with intuitive tools and features.'
        },
        {
          id: 2,
          icon: '✉️',
          title: 'Digital Invitations',
          description: 'Create and send beautiful digital invitations to your guests instantly.'
        },
        {
          id: 3,
          icon: '✅',
          title: 'RSVP Collection',
          description: 'Collect and track RSVPs efficiently to plan better for your event.'
        },
        {
          id: 4,
          icon: '🎁',
          title: 'Gift Registry',
          description: 'Create and manage gift registries to help guests choose the perfect presents.'
        },
        {
          id: 5,
          icon: '📋',
          title: 'Planning Dashboard',
          description: 'Comprehensive dashboard to manage all aspects of your event planning.'
        }
      ]
    };
  }
};
</script>


