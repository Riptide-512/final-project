<template>
  <div class="reviews-page">
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


