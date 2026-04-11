<template>
  <div class="reviews-page">
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
    <div class="reviews-container">
      <h1>Our Reviews</h1>
      <p class="intro-text">See what our happy clients have to say about their wedding planning experience with us.</p>
      <p class="intro-text">Please feel free to share your own experience with our services.</p>

      <!-- Add Review Form -->
      <div class="add-review-card">
        <h2>Share Your Experience</h2>
        <form @submit.prevent="handleAddReview">
          <div class="form-group">
            <label for="reviewName">Your Name (or Couple Name)</label>
            <input
              id="reviewName"
              v-model="newReview.name"
              type="text"
              placeholder="e.g., Sarah & John"
              required
            />
          </div>

          <div class="form-group">
            <label for="reviewRating">Rating</label>
            <div class="rating-selector">
              <button
                v-for="star in 5"
                :key="star"
                type="button"
                :class="['star-btn', { active: newReview.rating >= star }]"
                @click="newReview.rating = star"
              >
                ⭐
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="reviewText">Your Review</label>
            <textarea
              id="reviewText"
              v-model="newReview.text"
              placeholder="Share your experience with EverAfter..."
              rows="4"
              required
            ></textarea>
          </div>

          <button type="submit" class="submit-btn">Submit Review</button>
          <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        </form>
      </div>

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
      newReview: {
        name: '',
        rating: 5,
        text: ''
      },
      successMessage: '',
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
  },
  methods: {
    handleAddReview() {
      if (!this.newReview.name || !this.newReview.text) {
        // Use global alert function for validation
        // eslint-disable-next-line no-undef
        alert('Please fill in all fields');
        return;
      }

      // Get current date
      const today = new Date();
      const month = today.toLocaleDateString('en-US', { month: 'long' });
      const year = today.getFullYear();
      const date = `${month} ${year}`;

      // Create stars string based on rating
      const starsString = '⭐'.repeat(this.newReview.rating);

      // Add new review to the beginning of the array
      const newReviewObj = {
        id: Date.now(),
        name: this.newReview.name,
        stars: starsString,
        date: date,
        text: this.newReview.text
      };

      this.reviews.unshift(newReviewObj);

      // Clear form
      this.newReview = {
        name: '',
        rating: 5,
        text: ''
      };

      // Show success message
      this.successMessage = 'Thank you for your review!';
      // eslint-disable-next-line no-undef
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }
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

.add-review-card {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 50px;
}

.add-review-card h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.rating-selector {
  display: flex;
  gap: 10px;
}

.star-btn {
  background: none;
  border: 2px solid #ddd;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.star-btn:hover {
  border-color: #667eea;
  transform: scale(1.1);
}

.star-btn.active {
  border-color: #ffc107;
  background-color: #ffc10720;
}

.submit-btn {
  padding: 12px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-top: 10px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(102, 126, 234, 0.4);
}

.success-message {
  color: #388e3c;
  text-align: center;
  margin-top: 15px;
  font-weight: 600;
}
</style>
