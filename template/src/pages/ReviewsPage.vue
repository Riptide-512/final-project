<template>
  <div class="reviews-page">
    <!-- Header Navigation -->
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

    <!-- Main Content -->
    <div class="reviews-container">
      <h1>Our Reviews</h1>
      <p class="intro-text">See what our happy clients have to say about their wedding planning experience with us.</p>
      
      <div class="reviews-grid">
        <div v-for="review in reviews" :key="review.id" class="review-card">
          <div class="stars">{{ review.stars }}</div>
          <h3>{{ review.name }}</h3>
          <p class="review-date">{{ review.date }}</p>
          <p class="review-text">{{ review.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewsPage',
  data() {
    return {
      reviews: [
        {
          id: 1,
          name: 'Sarah & John',
          stars: '⭐⭐⭐⭐⭐',
          date: 'June 2025',
          text: 'This wedding planner app made our entire planning process so smooth and organized. We couldn\'t have done it without their amazing tools and support!'
        },
        {
          id: 2,
          name: 'Emily & Michael',
          stars: '⭐⭐⭐⭐⭐',
          date: 'May 2025',
          text: 'Absolutely amazing! The guest list management feature saved us so much time. Our guests loved the digital invitations and the whole experience was flawless.'
        },
        {
          id: 3,
          name: 'Jessica & David',
          stars: '⭐⭐⭐⭐⭐',
          date: 'April 2025',
          text: 'Best investment for our wedding! The planning dashboard kept everything in one place and made decision-making so much easier. Highly recommend!'
        },
        {
          id: 4,
          name: 'Amanda & Chris',
          stars: '⭐⭐⭐⭐⭐',
          date: 'March 2025',
          text: 'The RSVP collection was incredibly efficient. We had all our guest confirmations organized before we even realized it. The team was always there to help!'
        },
        {
          id: 5,
          name: 'Lauren & Robert',
          stars: '⭐⭐⭐⭐⭐',
          date: 'February 2025',
          text: 'From start to finish, this app and team exceeded our expectations. The gift registry feature was perfect and our families loved the simplicity.'
        },
        {
          id: 6,
          name: 'Nicole & James',
          stars: '⭐⭐⭐⭐⭐',
          date: 'January 2025',
          text: 'We planned our entire wedding using this platform. Every feature was intuitive and helpful. Our wedding day was perfect, and it\'s thanks to the great organization!'
        }
      ]
    };
  }
};
</script>

<style scoped>
.reviews-page {
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.reviews-container {
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

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.review-card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.review-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.stars {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.review-card h3 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 8px;
}

.review-date {
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.review-text {
  color: #666;
  line-height: 1.6;
  font-style: italic;
}
</style>
