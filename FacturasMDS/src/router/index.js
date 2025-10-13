import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import PaymentHistoryView from '../views/PaymentHistoryView.vue'

const routes = [
  // Landing page: redirect to login
  { path: '/', redirect: '/login' },

  // Home moved to /home
  { path: '/home', name: 'Home', component: HomeView },
  { path: '/payments', name: 'PaymentHistory', component: PaymentHistoryView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
