
<template>
  <div class="home-page">
    <!-- Main Content -->
    <div class="home-container">
      <h1>Welcome to EverAfter our Wedding Planning Service</h1>
      <p class="intro-text">Keep track of your perfect wedding day with our comprehensive planning tools.</p>
      
      <div class="features-grid">
        <router-link to="/services" class="feature-card">
          <div class="feature-icon">✨</div>
          <h2>Tools</h2>
          <p>Open EverAfter’s primary planning tools: Guest List, Gift Registry, and Planning Dashboard.</p>
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

