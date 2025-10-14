import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AuthView from '../views/AuthView.vue'
import PaymentHistoryView from '../views/PaymentHistoryView.vue'
import { isAuthenticated } from '../store/auth'

const routes = [
  // Landing page: Auth view
  { path: '/', name: 'Auth', component: AuthView },

  // Protected routes
  { path: '/home', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/payment-history', name: 'PaymentHistory', component: PaymentHistoryView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Protect routes: redirect to Auth if not logged in
router.beforeEach((to, from, next) => {
  if (to.name !== 'Auth' && !isAuthenticated.value) {
    next({ name: 'Auth' })
  } else if (to.name === 'Auth' && isAuthenticated.value) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
