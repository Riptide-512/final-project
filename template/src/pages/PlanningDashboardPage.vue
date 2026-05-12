<template>
  <div class="planning-dashboard-page services-page">
    <div class="dashboard-container services-container">
      <header class="page-header dashboard-header">
        <h1>Planning Dashboard</h1>
        <p class="intro-text">
          Track planning tasks across your services and manage them with one backend-backed dashboard.
        </p>
      </header>

      <section class="dashboard-actions">
        <div class="form-card">
          <h2>Add Task</h2>
          <form @submit.prevent="createTask">
            <div class="form-group">
              <label for="taskTitle">Task Title</label>
              <input id="taskTitle" v-model="newTask.title" type="text" placeholder="Task title" required />
            </div>

            <div class="form-group">
              <label for="taskDescription">Description</label>
              <textarea id="taskDescription" v-model="newTask.description" rows="3" placeholder="Task details" />
            </div>

            <div class="form-group">
              <label for="taskStatus">Status</label>
              <select id="taskStatus" v-model="newTask.status" required>
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div class="form-group">
              <label for="taskPriority">Priority</label>
              <select id="taskPriority" v-model="newTask.priority" required>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <button class="primary-btn" type="submit">Create Task</button>
          </form>
          <p v-if="feedback" class="feedback-message">{{ feedback }}</p>
        </div>
      </section>

      <section class="tasks-list">
        <h2>My Tasks</h2>
        <div v-if="tasks.length === 0" class="empty-state">
          <p>No tasks found yet. Add a task to get started.</p>
        </div>

        <div v-else class="tasks-grid">
          <div v-for="task in tasks" :key="task.id" class="task-card">
            <div class="task-card-header">
              <div>
                <h3>{{ task.title }}</h3>
                <span :class="['task-priority', task.priority?.toLowerCase()]">
                  {{ task.priority || 'Medium' }}
                </span>
              </div>
              <div class="task-status" :class="task.status">{{ statusLabel(task.status) }}</div>
            </div>

            <p class="task-description">{{ task.description || 'No details added yet.' }}</p>

            <div class="task-card-actions">
              <button class="link-btn" @click="startEdit(task)">Edit</button>
              <button class="link-btn danger" @click="deleteTask(task)">Delete</button>
            </div>

            <div v-if="editingTask && editingTask.id === task.id" class="edit-task-panel">
              <form @submit.prevent="saveTaskEdit()">
                <div class="form-group">
                  <label>Update title</label>
                  <input v-model="editingTask.title" type="text" required />
                </div>
                <div class="form-group">
                  <label>Update description</label>
                  <textarea v-model="editingTask.description" rows="2" />
                </div>
                <div class="form-group">
                  <label>Update status</label>
                  <select v-model="editingTask.status" required>
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Update priority</label>
                  <select v-model="editingTask.priority" required>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div class="form-actions">
                  <button class="primary-btn" type="submit">Save</button>
                  <button class="secondary-btn" type="button" @click="cancelEdit()">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTitle } from '@vueuse/core'
import { apiFetch, ApiError } from '@/lib/api'

useTitle('Planning Dashboard · EverAfter')

const tasks = ref([])
const feedback = ref('')
const editingTask = ref(null)
const newTask = ref({ title: '', description: '', status: 'todo', priority: 'Medium' })

const normalizePriority = (priority) => {
  const value = String(priority || 'Medium').trim().toLowerCase()
  if (value === 'high') return 'High'
  if (value === 'low') return 'Low'
  return 'Medium'
}

const loadTasks = async () => {
  try {
    tasks.value = await apiFetch('/tasks', { auth: true })
  } catch {
    tasks.value = []
  }
}

const createTask = async () => {
  if (!newTask.value.title.trim()) {
    feedback.value = 'Task title is required.'
    return
  }

  try {
    const created = await apiFetch('/tasks', {
      auth: true,
      method: 'POST',
      body: {
        title: newTask.value.title.trim(),
        description: newTask.value.description.trim(),
        status: newTask.value.status,
        priority: normalizePriority(newTask.value.priority),
      },
    })

    tasks.value.unshift(created)
    feedback.value = 'Task added successfully.'
    newTask.value = { title: '', description: '', status: 'todo', priority: 'Medium' }
  } catch (error) {
    if (error instanceof ApiError) {
      const details = error.details.length ? ` ${error.details.map((detail) => detail.issue ?? detail).join(' ')}` : ''
      feedback.value = `${error.message}${details}`
    } else {
      feedback.value = error?.message || 'Unable to create task. Please try again.'
    }
  }
}

const startEdit = (task) => {
  editingTask.value = { ...task }
  feedback.value = ''
}

const cancelEdit = () => {
  editingTask.value = null
}

const saveTaskEdit = async () => {
  if (!editingTask.value) return

  try {
    const updated = await apiFetch(`/tasks/${editingTask.value.id}`, {
      auth: true,
      method: 'PATCH',
      body: {
        title: editingTask.value.title.trim(),
        description: editingTask.value.description.trim(),
        status: editingTask.value.status,
        priority: normalizePriority(editingTask.value.priority),
      },
    })

    const index = tasks.value.findIndex((item) => item.id === updated.id)
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updated }
    }

    feedback.value = 'Task updated successfully.'
    editingTask.value = null
  } catch {
    feedback.value = 'Unable to update task. Please try again.'
  }
}

const deleteTask = async (task) => {
  if (!confirm(`Delete task "${task.title}"?`)) return

  try {
    await apiFetch(`/tasks/${task.id}`, {
      auth: true,
      method: 'DELETE',
    })

    tasks.value = tasks.value.filter((item) => item.id !== task.id)
    feedback.value = 'Task deleted successfully.'
    if (editingTask.value && editingTask.value.id === task.id) {
      editingTask.value = null
    }
  } catch {
    feedback.value = 'Unable to delete task. Please try again.'
  }
}

const statusLabel = (status) => {
  return status === 'done' ? 'Done' : status === 'in_progress' ? 'In Progress' : 'To Do'
}

onMounted(async () => {
  await loadTasks()
})
</script>
