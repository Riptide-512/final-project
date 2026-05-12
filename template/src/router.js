import {createRouter, createWebHistory} from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('./pages/LoginPage.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./pages/RegisterPage.vue'),
  },
  {
    path: '/',
    name:'home',
    component: () => import('./pages/HomePage.vue'),
  },
  {
    path: '/about',
    name:'about',
    component: () => import('./pages/AboutPage.vue'),
  },
  {
    path: '/services',
    name:'services',
    component: () => import('./pages/ServicesPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/planning-dashboard',
    name:'planningDashboard',
    component: () => import('./pages/PlanningDashboardPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/reviews',
    name:'reviews',
    component: () => import('./pages/ReviewsPage.vue'),
  },
  {
    path: '/guest-list',
    name:'guestList',
    component: () => import('./pages/GuestListPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/gift-registry',
    name:'giftRegistry',
    component: () => import('./pages/GiftRegistryPage.vue'),
    meta: { requiresAuth: true },
  }
]

const router = createRouter({
history: createWebHistory(),
routes,

})

router.beforeEach(async (to) => {
  const auth = useAuthStore()

  if (auth.isAuthenticated && !auth.accessToken) {
    await auth.refresh()
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { name: 'services' }
  }
})

export default router