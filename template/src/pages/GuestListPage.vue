<template>
  <div class="guest-list-page">
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
    <div class="guest-list-container">
      <h1>Guest List Management</h1>
      <p class="intro-text">Manage your wedding guest list. Add guests and track how many people will be attending.</p>

      <!-- Add Guest Form -->
      <div class="form-card">
        <h2>Add New Guest</h2>
        <form @submit.prevent="handleAddGuest">
          <div class="form-row">
            <div class="form-group">
              <label for="guestName">Guest Name</label>
              <input
                id="guestName"
                v-model="newGuest.name"
                type="text"
                placeholder="e.g., Sarah & John Smith"
                required
              />
            </div>

            <div class="form-group">
              <label for="guestCount">Number of Guests</label>
              <input
                id="guestCount"
                v-model.number="newGuest.count"
                type="number"
                min="1"
                max="10"
                placeholder="1"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="guestNotes">Notes (Optional)</label>
            <input
              id="guestNotes"
              v-model="newGuest.notes"
              type="text"
              placeholder="e.g., Dietary restrictions, seating preferences..."
            />
          </div>

          <button type="submit" class="add-btn">Add Guest</button>
          <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        </form>
      </div>

      <!-- Guest Statistics -->
      <div class="stats-card">
        <div class="stat">
          <span class="stat-label">Total Guests</span>
          <span class="stat-value">{{ totalGuests }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Total Invites</span>
          <span class="stat-value">{{ guests.length }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Confirmed</span>
          <span class="stat-value">{{ confirmedCount }}</span>
        </div>
      </div>

      <!-- Guest List -->
      <div class="guests-card">
        <h2>Guest List ({{ guests.length }})</h2>
        
        <div v-if="guests.length === 0" class="empty-state">
          <p>No guests added yet. Start building your guest list above!</p>
        </div>

        <div v-else class="guest-list">
          <div v-for="guest in guests" :key="guest.id" class="guest-item">
            <div class="guest-info">
              <h3>{{ guest.name }}</h3>
              <div class="guest-details">
                <span class="guest-count">👥 {{ guest.count }} {{ guest.count === 1 ? 'guest' : 'guests' }}</span>
                <span v-if="guest.notes" class="guest-notes">📝 {{ guest.notes }}</span>
              </div>
              <p class="guest-date">Added: {{ formatDate(guest.addedDate) }}</p>
            </div>

            <div class="guest-actions">
              <button
                :class="['rsvp-btn', { confirmed: guest.rsvpConfirmed }]"
                @click="toggleRSVP(guest.id)"
              >
                {{ guest.rsvpConfirmed ? '✓ Confirmed' : 'Pending' }}
              </button>
              <button class="delete-btn" @click="deleteGuest(guest.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuestListPage',
  data() {
    return {
      newGuest: {
        name: '',
        count: 1,
        notes: ''
      },
      successMessage: '',
      guests: []
    };
  },
  computed: {
    totalGuests() {
      return this.guests.reduce((sum, guest) => sum + guest.count, 0);
    },
    confirmedCount() {
      return this.guests.filter(guest => guest.rsvpConfirmed).length;
    }
  },
  mounted() {
    this.loadGuests();
  },
  methods: {
    handleAddGuest() {
      if (!this.newGuest.name || !this.newGuest.count) {
        // eslint-disable-next-line no-undef
        alert('Please fill in all required fields');
        return;
      }

      const newGuestObj = {
        id: Date.now(),
        name: this.newGuest.name,
        count: this.newGuest.count,
        notes: this.newGuest.notes,
        rsvpConfirmed: false,
        addedDate: new Date().toISOString()
      };

      this.guests.push(newGuestObj);
      this.saveGuests();

      // Clear form
      this.newGuest = {
        name: '',
        count: 1,
        notes: ''
      };

      this.successMessage = 'Guest added successfully!';
      // eslint-disable-next-line no-undef
      setTimeout(() => {
        this.successMessage = '';
      }, 2000);
    },

    deleteGuest(id) {
      this.guests = this.guests.filter(guest => guest.id !== id);
      this.saveGuests();
    },

    toggleRSVP(id) {
      const guest = this.guests.find(g => g.id === id);
      if (guest) {
        guest.rsvpConfirmed = !guest.rsvpConfirmed;
        this.saveGuests();
      }
    },

    saveGuests() {
      // eslint-disable-next-line no-undef
      localStorage.setItem('weddingGuests', JSON.stringify(this.guests));
    },

    loadGuests() {
      // eslint-disable-next-line no-undef
      const savedGuests = localStorage.getItem('weddingGuests');
      if (savedGuests) {
        this.guests = JSON.parse(savedGuests);
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
.guest-list-page {
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.guest-list-container {
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
.guests-card,
.stats-card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.form-card h2,
.guests-card h2 {
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

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

input:focus {
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
  color: #388e3c;
  margin-top: 15px;
  font-weight: 600;
}

.stats-card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  text-align: center;
}

.stat {
  padding: 20px;
}

.stat-label {
  display: block;
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 10px;
}

.stat-value {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 1.1rem;
}

.guest-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.guest-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  border-left: 4px solid #667eea;
  transition: all 0.3s ease;
}

.guest-item:hover {
  background: #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.guest-info h3 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 8px;
}

.guest-details {
  display: flex;
  gap: 20px;
  margin-bottom: 8px;
}

.guest-count,
.guest-notes {
  font-size: 0.9rem;
  color: #666;
}

.guest-date {
  font-size: 0.85rem;
  color: #999;
  margin: 0;
}

.guest-actions {
  display: flex;
  gap: 10px;
}

.rsvp-btn,
.delete-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.rsvp-btn {
  background-color: #f0f0f0;
  color: #666;
  border: 1px solid #ddd;
}

.rsvp-btn:hover {
  background-color: #e0e0e0;
}

.rsvp-btn.confirmed {
  background-color: #388e3c;
  color: white;
  border-color: #388e3c;
}

.delete-btn {
  background-color: #ffebee;
  color: #d32f2f;
  border: 1px solid #d32f2f;
}

.delete-btn:hover {
  background-color: #ffcdd2;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .guest-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .guest-actions {
    width: 100%;
    margin-top: 15px;
  }

  .guest-actions button {
    flex: 1;
  }

  .stats-card {
    grid-template-columns: 1fr;
  }
}
</style>
