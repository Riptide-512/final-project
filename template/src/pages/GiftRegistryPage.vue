<template>
  <div class="gift-registry-page">
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

<style scoped>
.gift-registry-page {
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.gift-registry-container {
  max-width: 1000px;
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
  margin-bottom: 40px;
}

.form-card,
.gifts-card,
.stats-card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.form-card h2,
.gifts-card h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

input,
.select-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
  font-family: inherit;
}

input:focus,
.select-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.add-btn {
  padding: 12px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(102, 126, 234, 0.4);
}

.success-message {
  color: #27ae60;
  margin-top: 10px;
  font-weight: 500;
}

.stats-card {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 1.1rem;
}

.gifts-list {
  display: grid;
  gap: 20px;
}

.gift-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #667eea;
  transition: background-color 0.3s ease;
}

.gift-item:hover {
  background: #f3f4f6;
}

.gift-info h3 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 10px;
}

.gift-details {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.gift-store,
.gift-price,
.gift-priority {
  font-size: 0.9rem;
  color: #666;
  padding: 4px 8px;
  background: white;
  border-radius: 4px;
}

.gift-priority {
  font-weight: 500;
}

.gift-priority.high {
  background: #fee2e2;
  color: #991b1b;
}

.gift-priority.medium {
  background: #fef3c7;
  color: #92400e;
}

.gift-priority.low {
  background: #dbeafe;
  color: #0c4a6e;
}

.gift-link {
  display: inline-block;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.gift-link:hover {
  color: #764ba2;
  text-decoration: underline;
}

.gift-date {
  font-size: 0.85rem;
  color: #999;
  margin-top: 10px;
}

.gift-actions {
  display: flex;
  gap: 10px;
  flex-direction: column;
  min-width: 120px;
}

.purchase-btn,
.delete-btn {
  padding: 10px 16px;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.purchase-btn {
  background: #e5e7eb;
  color: #333;
  border: 1px solid #d1d5db;
}

.purchase-btn:hover {
  background: #d1d5db;
}

.purchase-btn.purchased {
  background: #27ae60;
  color: white;
  border-color: #27ae60;
}

.delete-btn {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

.delete-btn:hover {
  background: #fecaca;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .stats-card {
    grid-template-columns: 1fr;
  }

  .gift-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .gift-actions {
    width: 100%;
    margin-top: 15px;
    flex-direction: row;
  }

  .gift-actions button {
    flex: 1;
  }
}
</style>

