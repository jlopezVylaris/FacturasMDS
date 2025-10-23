<template>
  <!-- Backdrop for mobile -->
  <div 
    v-if="isOpen" 
    @click="$emit('close')"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity lg:hidden z-40"
  ></div>

  <!-- Sidebar -->
  <div 
    :class="sidebarClasses"
    class="fixed inset-y-0 left-0 z-50 w-64 min-w-64 shadow-xl border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:flex lg:flex-col flex-shrink-0"
    style="background-color: #022031; border-right-color: #003049;"
  >
    <!-- Sidebar Header -->
    <!-- Logo -->
          <div class="flex items-center space-x-3 mt-4 px-4">
            <img src="/src/assets/logo.svg" alt="Logo" class="w-10 h-10" />
            <div>
              <h1 class="text-xl font-bold" style="color: #FFFFFF;">FacturasTap</h1>
              <p class="text-xs" style="color: #B0B9C7;">Sistema de Facturación Médica</p>
            </div>
          </div>

    <!-- Navigation Menu -->
    <nav class="mt-6 px-3">
      <!-- Dashboard Section -->
      <!-- <div class="space-y-1">
        <SidebarItem 
          :to="{ name: 'Home' }"
          icon="dashboard"
          label="Dashboard"
          :is-active="$route.name === 'Home'"
        />
      </div> -->
      <!-- Pagos Section - Solo visible para usuario -->
      <div v-if="canViewPayments" class="mt-8">
        <h3 class="px-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap" style="color: #7A7A7A;">
           Gestion de pagos
        </h3>
        <div class="mt-2 space-y-1">
          <SidebarItem 
            :to="{ name: 'PortalCliente' }"
            icon="plus-payment"
            label="Pagar"
            :is-active="$route.name === 'PortalCliente'"
          />
          <SidebarItem 
            :to="{ name: 'PaymentHistory' }"
            icon="payment"
            label="Historial de Pagos"
            :is-active="$route.name === 'PaymentHistory'"
          />
          <SidebarItem 
            :to="{ name: 'PendingPayments' }"
            icon="pending"
            label="Pagos Pendientes"
            :badge="pendingPaymentsCount"
            :is-active="$route.name === 'PendingPayments'"
          />
        </div>
      </div>

      <!-- Clientes Section - Solo visible para admin -->
      <div v-if="canViewInvoices" class="mt-8">
        <h3 class="px-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap" style="color: #7A7A7A;">
          Ventas
        </h3>
        <div class="mt-2 space-y-1">
          <SidebarItem 
            :to="{ name: 'Home' }"
            icon="invoice"
            label="Mis Facturas"
            :is-active="$route.name === 'Home'"
          />
        </div>
        <div class="mt-2 space-y-1">
          <SidebarItem 
            :to="{ name: 'ClientsList' }"
            icon="client"
            label="Clientes"
            :is-active="$route.name === 'ClientsList'"
          />
        </div>
      </div>

      

      <!-- Configuración Section -->
      <div class="mt-8">
        <h3 class="px-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap" style="color: #7A7A7A;">
          Configuración
        </h3>
        <div class="mt-2 space-y-1">
          <SidebarItem 
            :to="{ name: 'About' }"
            icon="help"
            label="Ayuda"
            :is-active="$route.name === 'About'"
          />
        </div>
      </div>
    </nav>

    <!-- Sidebar Footer -->
    <div class="absolute bottom-0 w-full p-4 border-t" style="border-top-color: #003049;">
      <div class="backdrop-blur-sm rounded-lg p-4 border" style="background-color: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.1);">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-full flex items-center justify-center" style="background-color: #00A64C;">
            <svg class="w-5 h-5" style="color: #FFFFFF;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium whitespace-nowrap overflow-hidden" style="color: #FFFFFF;">
              Plan Professional
            </p>
            <p class="text-xs whitespace-nowrap" style="color: #B0B9C7;">
              Facturas ilimitadas
            </p>
          </div>
        </div>
        <button 
          class="mt-3 w-full text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-lg cursor-pointer"
          style="background-color: #00A64C; color: #FFFFFF;"
          onmouseover="this.style.backgroundColor='#008A40'"
          onmouseout="this.style.backgroundColor='#00A64C'"
        >
          Actualizar Plan
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import SidebarItem from './SidebarItem.vue'
import { currentUser } from '../../store/auth'

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

// Emits
defineEmits(['toggle', 'close'])

// Reactive data
const pendingPaymentsCount = ref(5)

// Computed
const sidebarClasses = computed(() => {
  return props.isOpen ? 'translate-x-0' : '-translate-x-full'
})

// Control de roles - Solo admin puede ver facturas
const canViewInvoices = computed(() => {
  if (!currentUser.value || !currentUser.value.role) {
    return false // Si no hay usuario o rol, no mostrar
  }
  return currentUser.value.role === 'admin'
})

// Control de roles - Solo usuario puede ver pagos
const canViewPayments = computed(() => {
  if (!currentUser.value || !currentUser.value.role) {
    return false // Si no hay usuario o rol, no mostrar
  }
  return currentUser.value.role === 'user'
})
</script>

<style scoped>
/* Estilos específicos del sidebar si son necesarios */
</style>
