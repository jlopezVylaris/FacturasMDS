<template>
  <header class="w-full shadow-lg border-b" style="background-color: #022031; border-bottom-color: #003049;">
    <div class="max-w-full px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Left side: Menu Button and Logo -->
        <div class="flex items-center space-x-4">
          <!-- Mobile menu button -->
          <button
            @click="$emit('toggle-sidebar')"
            class="lg:hidden p-2 rounded-lg transition-colors duration-200"
            style="color: #FFFFFF;"
            onmouseover="this.style.backgroundColor='rgba(0,166,76,0.2)'"
            onmouseout="this.style.backgroundColor='transparent'"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          <!-- Logo -->
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background-color: #00A64C;">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold" style="color: #FFFFFF;">FacturasTap</h1>
              <p class="text-xs" style="color: #B0B9C7;">Sistema de Facturación Médica</p>
            </div>
          </div>

          <!-- Page Title -->
          <div class="hidden md:block border-l pl-4 ml-4" style="border-left-color: rgba(255,255,255,0.2);">
            <h2 class="text-lg font-semibold" style="color: #FFFFFF;">Mis Facturas</h2>
            <p class="text-xs" style="color: #B0B9C7;">Gestiona tus facturas médicas</p>
          </div>
        </div>

        <!-- Right side: Actions and User Menu -->
        <div class="flex items-center space-x-4">
          <!-- Quick Actions -->
          <router-link 
            to="/payment-history" 
            class="hidden sm:block px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm border backdrop-blur-sm"
            style="background-color: rgba(255,255,255,0.1); color: #FFFFFF; border-color: rgba(255,255,255,0.2);"
            onmouseover="this.style.backgroundColor='rgba(255,255,255,0.2)'"
            onmouseout="this.style.backgroundColor='rgba(255,255,255,0.1)'"
          >
            Ver Pagos
          </router-link>
          
          <button 
            class="hidden sm:block px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm shadow-lg"
            style="background-color: #00A64C; color: #FFFFFF;"
            onmouseover="this.style.backgroundColor='#008A40'"
            onmouseout="this.style.backgroundColor='#00A64C'"
          >
            + Nueva Factura
          </button>
          <!-- User Profile with Dropdown -->
          <div class="relative">
            <button 
              @click="toggleUserMenu"
              class="flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200"
              onmouseover="this.style.backgroundColor='rgba(255,255,255,0.1)'"
              onmouseout="this.style.backgroundColor='transparent'"
            >
              <div class="w-8 h-8 rounded-full flex items-center justify-center border" style="background-color: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.2);">
                <span class="text-sm font-medium" style="color: #FFFFFF;">MG</span>
              </div>
              <div class="hidden sm:block text-left">
                <p class="text-sm font-medium" style="color: #FFFFFF;">Dr. María González</p>
                <p class="text-xs" style="color: #B0B9C7;">Administrador</p>
              </div>
            </button>

            <!-- User Menu Dropdown -->
            <div 
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 rounded-xl shadow-lg border py-2 z-50"
              style="background-color: #FFFFFF; border-color: #E5E7EB;"
            >
              <a href="#" class="flex items-center px-4 py-2 text-sm transition-colors duration-200" style="color: #022031;" onmouseover="this.style.backgroundColor='#F0F9F5'" onmouseout="this.style.backgroundColor='transparent'">
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #00A64C;">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Mi Perfil
              </a>
              <a href="#" class="flex items-center px-4 py-2 text-sm transition-colors duration-200" style="color: #022031;" onmouseover="this.style.backgroundColor='#F0F9F5'" onmouseout="this.style.backgroundColor='transparent'">
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #00A64C;">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Configuración
              </a>
              <div class="border-t mt-2 pt-2" style="border-top-color: #E5E7EB;">
                <a href="#" class="flex items-center px-4 py-2 text-sm transition-colors duration-200" style="color: #DC2626;" onmouseover="this.style.backgroundColor='#FEF2F2'" onmouseout="this.style.backgroundColor='transparent'">
                  <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #DC2626;">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  Cerrar Sesión
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

// Props
defineProps({
  isSidebarOpen: {
    type: Boolean,
    default: false
  }
})

// Emits
defineEmits(['toggle-sidebar'])

// Reactive data
const $route = useRoute()
const searchQuery = ref('')
const showQuickActions = ref(false)
const showUserMenu = ref(false)

const currentUser = ref({
  name: 'Dr. María González',
  role: 'Administrador',
  email: 'maria.gonzalez@tapmedicina.com'
})

// Computed
const userInitials = computed(() => {
  return currentUser.value.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
})

const pageTitle = computed(() => {
  const routeMap = {
    'Home': 'Mis Facturas',
    'PaymentHistory': 'Historial de Pagos',
    'About': 'Ayuda y Soporte',
    'Login': 'Iniciar Sesión',
    'Register': 'Registro'
  }
  return routeMap[$route.name] || 'Dashboard'
})

const pageDescription = computed(() => {
  const descriptionMap = {
    'Home': 'Gestiona y controla todas tus facturas médicas',
    'PaymentHistory': 'Revisa todos tus pagos y transacciones médicas',
    'About': 'Centro de ayuda y documentación',
    'Login': 'Accede a tu cuenta',
    'Register': 'Crea tu cuenta nueva'
  }
  return descriptionMap[$route.name] || ''
})

const pageActions = computed(() => {
  const actionsMap = {
    'Home': [
      {
        label: 'Ver Pagos',
        component: 'router-link',
        to: { name: 'PaymentHistory' },
        class: 'bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl text-sm'
      },
      {
        label: '+ Nueva Factura',
        class: 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl text-sm',
        onClick: () => console.log('Nueva factura')
      }
    ],
    'PaymentHistory': [
      {
        label: 'Exportar Reporte',
        class: 'bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl text-sm',
        onClick: () => console.log('Exportar reporte')
      },
      {
        label: '+ Nuevo Pago',
        class: 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl text-sm',
        onClick: () => console.log('Nuevo pago')
      }
    ]
  }
  return actionsMap[$route.name] || []
})

// Methods
const toggleQuickActions = () => {
  showQuickActions.value = !showQuickActions.value
  showUserMenu.value = false
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  showQuickActions.value = false
}

const closeMenus = () => {
  showQuickActions.value = false
  showUserMenu.value = false
}

// Close menus when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    closeMenus()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Estilos específicos del header si son necesarios */
</style>
