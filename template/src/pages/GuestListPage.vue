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


