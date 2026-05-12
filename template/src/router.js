import {createRouter, createWebHistory} from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import HomePage from './pages/HomePage.vue'

const routes = [
  {
    path: '/',
    name:'home',
    component: HomePage,
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
  },
  {
    path: '/reviews',
    name:'reviews',
    component: () => import('./pages/ReviewsPage.vue'),
  },
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
    path: '/guest-list',
    name:'guestList',
    component: () => import('./pages/GuestListPage.vue'),
  },
  {
    path: '/gift-registry',
    name:'giftRegistry',
    component: () => import('./pages/GiftRegistryPage.vue'),
  }
]

const router = createRouter({
history: createWebHistory(),
routes,

})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { name: 'projects' }
  }
})

export default router