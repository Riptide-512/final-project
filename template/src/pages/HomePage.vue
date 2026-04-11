
<template>
  <div class="home-page">
    <!-- Header Navigation -->
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

    <!-- Main Content -->
    <div class="home-container">
      <h1>Welcome to EverAfter our Wedding Planning Service</h1>
      <p class="intro-text">Keep track of your perfect wedding day with our comprehensive planning tools.</p>
      
      <div class="features-grid">
        <router-link to="/services" class="feature-card">
          <div class="feature-icon">✨</div>
          <h2>Services</h2>
          <p>Explore our comprehensive range of professional wedding planning services tailored to meet your needs. From guest list management to digital invitations and more.</p>
        </router-link>
        <router-link to="/about" class="feature-card">
          <div class="feature-icon">👥</div>
          <h2>About</h2>
          <p>Learn more about our team and our passion for creating unforgettable wedding experiences. Discover our story and what makes us unique.</p>
        </router-link>
        <router-link to="/reviews" class="feature-card">
          <div class="feature-icon">⭐</div>
          <h2>Reviews</h2>
          <p>See what our happy clients have to say about their wedding planning experience with us. Read testimonials and success stories.</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
};
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.home-container {
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

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.feature-card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  text-decoration: none;
  color: inherit;
  display: block;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.feature-card h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}
</style>