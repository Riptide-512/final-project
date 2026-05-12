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

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTitle } from '@vueuse/core'
import { apiFetch } from '@/lib/api'

useTitle('Gift Registry · EverAfter')

const gifts = ref([])
const newGift = ref({
  name: '',
  store: '',
  link: '',
  price: null,
  priority: 'Medium',
})
const successMessage = ref('')
const errorMessage = ref('')

const totalValue = computed(() =>
  gifts.value.reduce((sum, gift) => sum + (gift.price || 0), 0),
)
const purchasedCount = computed(() =>
  gifts.value.filter((gift) => gift.purchased).length,
)

async function loadGifts() {
  try {
    gifts.value = await apiFetch('/gift-registry', { auth: true })
  } catch (error) {
    errorMessage.value = error?.message || 'Unable to load gift registry.'
  }
}

async function handleAddGift() {
  if (!newGift.value.name || !newGift.value.link) {
    errorMessage.value = 'Please fill in all required fields.'
    return
  }

  try {
    const created = await apiFetch('/gift-registry', {
      auth: true,
      method: 'POST',
      body: {
        name: newGift.value.name,
        store: newGift.value.store,
        link: newGift.value.link,
        price: newGift.value.price,
        priority: newGift.value.priority,
        purchased: false,
      },
    })

    gifts.value.push(created)
    newGift.value = { name: '', store: '', link: '', price: null, priority: 'Medium' }
    successMessage.value = 'Gift item added successfully!'
    errorMessage.value = ''

    setTimeout(() => {
      successMessage.value = ''
    }, 2000)
  } catch (error) {
    errorMessage.value = error?.message || 'Unable to add gift.'
  }
}

async function deleteGift(id) {
  try {
    await apiFetch(`/gift-registry/${id}`, {
      auth: true,
      method: 'DELETE',
    })
    gifts.value = gifts.value.filter((gift) => gift.id !== id)
  } catch (error) {
    errorMessage.value = error?.message || 'Unable to delete gift.'
  }
}

async function togglePurchased(id) {
  const gift = gifts.value.find((g) => g.id === id)
  if (!gift) return

  try {
    const updated = await apiFetch(`/gift-registry/${id}`, {
      auth: true,
      method: 'PATCH',
      body: { purchased: !gift.purchased },
    })
    Object.assign(gift, updated)
  } catch (error) {
    errorMessage.value = error?.message || 'Unable to update gift status.'
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
  loadGifts()
})
</script>



