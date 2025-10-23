import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AuthView from '../views/AuthView.vue'
import PaymentHistoryView from '../views/PaymentHistoryView.vue'
import { isAuthenticated, currentUser } from '../store/auth'

const routes = [
  // Landing page: Auth view
  { path: '/', name: 'Auth', component: AuthView },

  // Protected routes
  { 
    path: '/home', 
    name: 'Home', 
    component: HomeView,
    meta: { requiresRole: 'admin' } // Solo admin puede ver facturas
  },
  { path: '/about', name: 'About', component: AboutView },
  { 
    path: '/payment-history', 
    name: 'PaymentHistory',
    component: () => import('../views/PaymentHistoryView.vue')
  },
  {
    path: '/pending-payments',
    name: 'PendingPayments',
    component: () => import('../views/PendingPaymentsView.vue')
  },
  {
    path: '/process-payment/:id',
    name: 'ProcessPayment',
    component: () => import('../views/ProcessPaymentView.vue')
  }
  ,
  {
    path: '/portal-cliente',
    name: 'PortalCliente',
    component: () => import('../views/PortalClienteView.vue')
  },
  // Rutas de Clientes - Solo para admin
  {
    path: '/clients-list',
    name: 'ClientsList',
    component: () => import('../views/ClientsListView.vue'),
    meta: { requiresRole: 'admin' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Protect routes: redirect to Auth if not logged in
router.beforeEach((to, from, next) => {
  // Allow public routes (like PortalCliente) even if not authenticated
  const isPublic = to.meta && to.meta.public

  if (to.name === 'Auth' && isAuthenticated.value) {
    // Si el usuario está autenticado y trata de ir a Auth, 
    // redirigir según su rol
    if (currentUser.value && currentUser.value.role === 'admin') {
      next({ name: 'Home' })
    } else {
      next({ name: 'PaymentHistory' }) // Usuarios van al historial de pagos
    }
    return
  }

  if (!isPublic && to.name !== 'Auth' && !isAuthenticated.value) {
    next({ name: 'Auth' })
    return
  }

  // Control de roles: verificar si el usuario tiene permiso para acceder
  if (to.meta && to.meta.requiresRole && isAuthenticated.value) {
    const userRole = currentUser.value && currentUser.value.role
    const requiredRole = to.meta.requiresRole
    
    if (userRole !== requiredRole) {
      // Si el usuario no tiene el rol requerido, redirigir a PaymentHistory
      next({ name: 'PaymentHistory' })
      return
    }
  }

  next()
})

export default router
