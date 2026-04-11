<template>
  <div class="services-page">
    <header class="bg-white shadow">
      <nav class="flex items-center justify-between px-8 py-4">
        <h1 class="text-2xl font-bold text-slate-800">Wedding Planner</h1>
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
        <div v-for="service in services" :key="service.id" class="service-card">
          <div class="service-icon">{{ service.icon }}</div>
          <h2>{{ service.title }}</h2>
          <p>{{ service.description }}</p>
        </div>
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

<style scoped>
.services-page {
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.services-container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
}

.intro-text {
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 50px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.service-card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.service-card h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
}

.service-card p {
  color: #666;
  line-height: 1.6;
}
</style>
