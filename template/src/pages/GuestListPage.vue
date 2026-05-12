<template>
  <div class="guest-list-page">
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

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTitle } from '@vueuse/core'
import { apiFetch } from '@/lib/api'

useTitle('Guest List · EverAfter')

const guests = ref([])
const newGuest = ref({ name: '', count: 1, notes: '' })
const successMessage = ref('')
const errorMessage = ref('')

const totalGuests = computed(() =>
  guests.value.reduce((sum, guest) => sum + (guest.count || 0), 0),
)
const confirmedCount = computed(() =>
  guests.value.filter((guest) => guest.rsvpConfirmed).length,
)

async function loadGuests() {
  try {
    guests.value = await apiFetch('/guest-list', { auth: true })
  } catch (error) {
    errorMessage.value = error?.message || 'Unable to load guest list.'
  }
}

async function handleAddGuest() {
  if (!newGuest.value.name || !newGuest.value.count) {
    errorMessage.value = 'Please fill in all required fields.'
    return
  }

  try {
    const created = await apiFetch('/guest-list', {
      auth: true,
      method: 'POST',
      body: {
        name: newGuest.value.name,
        count: newGuest.value.count,
        notes: newGuest.value.notes,
        rsvpConfirmed: false,
      },
    })

    guests.value.push(created)
    newGuest.value = { name: '', count: 1, notes: '' }
    successMessage.value = 'Guest added successfully!'
    errorMessage.value = ''

    setTimeout(() => {
      successMessage.value = ''
    }, 2000)
  } catch (error) {
    errorMessage.value = error?.message || 'Unable to add guest.'
  }
}

async function deleteGuest(id) {
  try {
    await apiFetch(`/guest-list/${id}`, {
      auth: true,
      method: 'DELETE',
    })
    guests.value = guests.value.filter((guest) => guest.id !== id)
  } catch (error) {
    errorMessage.value = error?.message || 'Unable to delete guest.'
  }
}

async function toggleRSVP(id) {
  const guest = guests.value.find((g) => g.id === id)
  if (!guest) return

  try {
    const updated = await apiFetch(`/guest-list/${id}`, {
      auth: true,
      method: 'PATCH',
      body: { rsvpConfirmed: !guest.rsvpConfirmed },
    })
    Object.assign(guest, updated)
  } catch (error) {
    errorMessage.value = error?.message || 'Unable to update guest status.'
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

onMounted(() => {
  loadGuests()
})
</script>


