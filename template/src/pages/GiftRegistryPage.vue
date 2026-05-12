<template>
  <div class="gift-registry-page">
    <!-- Main Content -->
    <div class="gift-registry-container">
      <h1>Gift Registry Management</h1>
      <p class="intro-text">Create and manage your gift registry. Add links to items you would like to receive as gifts.</p>

      <!-- Add Gift Item Form -->
      <div class="form-card">
        <h2>Add New Gift Item</h2>
        <form @submit.prevent="handleAddGift">
          <div class="form-row">
            <div class="form-group">
              <label for="giftName">Item Name</label>
              <input
                id="giftName"
                v-model="newGift.name"
                type="text"
                placeholder="e.g., Coffee Maker, Bedding Set..."
                required
              />
            </div>

            <div class="form-group">
              <label for="giftStore">Store/Brand</label>
              <input
                id="giftStore"
                v-model="newGift.store"
                type="text"
                placeholder="e.g., Macy's, Bed Bath & Beyond..."
              />
            </div>
          </div>

          <div class="form-group">
            <label for="giftLink">Product Link</label>
            <input
              id="giftLink"
              v-model="newGift.link"
              type="url"
              placeholder="https://example.com/product"
              required
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="giftPrice">Price (Optional)</label>
              <input
                id="giftPrice"
                v-model.number="newGift.price"
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g., 49.99"
              />
            </div>

            <div class="form-group">
              <label for="giftPriority">Priority</label>
              <select id="giftPriority" v-model="newGift.priority" class="select-input">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <button type="submit" class="add-btn">Add Gift Item</button>
          <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        </form>
      </div>

      <!-- Gift Registry Statistics -->
      <div class="stats-card">
        <div class="stat">
          <span class="stat-label">Total Items</span>
          <span class="stat-value">{{ gifts.length }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Total Value</span>
          <span class="stat-value">${{ totalValue.toFixed(2) }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Purchased</span>
          <span class="stat-value">{{ purchasedCount }}</span>
        </div>
      </div>

      <!-- Gift Registry List -->
      <div class="gifts-card">
        <h2>Gift Registry ({{ gifts.length }})</h2>
        
        <div v-if="gifts.length === 0" class="empty-state">
          <p>No gift items added yet. Start building your registry above!</p>
        </div>

        <div v-else class="gifts-list">
          <div v-for="gift in gifts" :key="gift.id" class="gift-item">
            <div class="gift-info">
              <h3>{{ gift.name }}</h3>
              <div class="gift-details">
                <span v-if="gift.store" class="gift-store">🏪 {{ gift.store }}</span>
                <span v-if="gift.price" class="gift-price">💰 ${{ gift.price.toFixed(2) }}</span>
                <span :class="['gift-priority', gift.priority.toLowerCase()]">📌 {{ gift.priority }} Priority</span>
              </div>
              <a v-if="gift.link" :href="gift.link" target="_blank" class="gift-link">
                View Product →
              </a>
              <p class="gift-date">Added: {{ formatDate(gift.addedDate) }}</p>
            </div>

            <div class="gift-actions">
              <button
                :class="['purchase-btn', { purchased: gift.purchased }]"
                @click="togglePurchased(gift.id)"
              >
                {{ gift.purchased ? '✓ Purchased' : 'Mark Purchased' }}
              </button>
              <button class="delete-btn" @click="deleteGift(gift.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GiftRegistryPage',
  data() {
    return {
      newGift: {
        name: '',
        store: '',
        link: '',
        price: null,
        priority: 'Medium'
      },
      successMessage: '',
      gifts: []
    };
  },
  computed: {
    totalValue() {
      return this.gifts.reduce((sum, gift) => sum + (gift.price || 0), 0);
    },
    purchasedCount() {
      return this.gifts.filter(gift => gift.purchased).length;
    }
  },
  mounted() {
    this.loadGifts();
  },
  methods: {
    handleAddGift() {
      if (!this.newGift.name || !this.newGift.link) {
        // eslint-disable-next-line no-undef
        alert('Please fill in all required fields');
        return;
      }

      const newGiftObj = {
        id: Date.now(),
        name: this.newGift.name,
        store: this.newGift.store,
        link: this.newGift.link,
        price: this.newGift.price,
        priority: this.newGift.priority,
        purchased: false,
        addedDate: new Date().toISOString()
      };

      this.gifts.push(newGiftObj);
      this.saveGifts();

      // Clear form
      this.newGift = {
        name: '',
        store: '',
        link: '',
        price: null,
        priority: 'Medium'
      };

      this.successMessage = 'Gift item added successfully!';
      // eslint-disable-next-line no-undef
      setTimeout(() => {
        this.successMessage = '';
      }, 2000);
    },

    deleteGift(id) {
      this.gifts = this.gifts.filter(gift => gift.id !== id);
      this.saveGifts();
    },

    togglePurchased(id) {
      const gift = this.gifts.find(g => g.id === id);
      if (gift) {
        gift.purchased = !gift.purchased;
        this.saveGifts();
      }
    },

    saveGifts() {
      // eslint-disable-next-line no-undef
      localStorage.setItem('weddingGiftRegistry', JSON.stringify(this.gifts));
    },

    loadGifts() {
      // eslint-disable-next-line no-undef
      const savedGifts = localStorage.getItem('weddingGiftRegistry');
      if (savedGifts) {
        this.gifts = JSON.parse(savedGifts);
      }
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  }
};
</script>



