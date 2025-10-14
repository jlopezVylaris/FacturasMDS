<template>
  <MainLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header Section -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Pagos Pendientes</h1>
        <p class="mt-2 text-sm text-gray-600">Gestiona y realiza tus pagos pendientes de manera rápida y segura</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg border border-teal-100 p-6 hover:shadow-xl transition-all duration-300">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-teal-600">Total Pendiente</p>
              <p class="text-2xl font-bold text-teal-800">${{ totalPending.toLocaleString() }}</p>
              <p class="text-sm text-teal-500">{{ pendingPayments.length }} pagos</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg border border-teal-100 p-6 hover:shadow-xl transition-all duration-300">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-rose-100 to-rose-200 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-teal-600">Próximo Vencimiento</p>
              <p class="text-2xl font-bold text-teal-800">${{ nextDueAmount.toLocaleString() }}</p>
              <p class="text-sm text-teal-500">{{ formatDate(nextDueDate) }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg border border-teal-100 p-6 hover:shadow-xl transition-all duration-300">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-teal-600">Pagos Este Mes</p>
              <p class="text-2xl font-bold text-teal-800">{{ pendingThisMonth }}</p>
              <p class="text-sm text-teal-500">Por procesar</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Pending Payments List -->
      <div class="bg-white rounded-xl shadow-lg border border-teal-100">
        <div class="px-6 py-4 border-b border-teal-100 bg-gradient-to-r from-teal-50 to-cyan-50">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 class="text-lg font-semibold text-teal-800">Lista de Pagos Pendientes</h2>
            <div class="flex items-center gap-3">
              <div class="relative">
                <input 
                  type="text" 
                  v-model="searchQuery" 
                  placeholder="Buscar pago..." 
                  class="w-full pl-10 pr-4 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-teal-100">
            <thead class="bg-gradient-to-r from-teal-50 to-cyan-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">Concepto</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">Fecha Vencimiento</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">Monto</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">Estado</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-teal-50">
              <tr v-for="payment in filteredPayments" :key="payment.id" class="hover:bg-teal-25 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-teal-100 to-cyan-200 flex items-center justify-center">
                        <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-teal-800">{{ payment.concept }}</div>
                      <div class="text-sm text-teal-600">#{{ payment.reference }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-teal-800">{{ formatDate(payment.dueDate) }}</div>
                  <div class="text-xs text-teal-600">
                    {{ getDaysUntilDue(payment.dueDate) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-semibold text-teal-800">${{ payment.amount.toLocaleString() }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(payment)">
                    {{ getStatusText(payment) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <router-link 
                    :to="{ name: 'ProcessPayment', params: { id: payment.id }}"
                    class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors duration-200"
                    style="background-color: #00A64C;"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v2a2 2 0 002 2z"></path>
                    </svg>
                    Pagar Ahora
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredPayments.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-teal-700">No hay pagos pendientes</h3>
          <p class="mt-1 text-sm text-teal-500">¡Estás al día con todos tus pagos!</p>
        </div>

        <!-- Pagination -->
        <div class="bg-gradient-to-r from-teal-50 to-cyan-50 px-6 py-4 border-t border-teal-100">
          <div class="flex items-center justify-between">
            <div class="text-sm text-teal-700">
              Mostrando <span class="font-semibold text-teal-800">{{ filteredPayments.length }}</span> pagos pendientes
            </div>
            <div class="flex items-center space-x-2">
              <button class="px-4 py-2 text-sm text-teal-600 bg-white border border-teal-200 rounded-lg hover:bg-teal-50 transition-all duration-200">
                Exportar Lista
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import MainLayout from '../components/Layout/MainLayout.vue'

// Datos de ejemplo
const pendingPayments = ref([
  {
    id: 1,
    concept: 'Consulta Cardiología',
    reference: 'PAY-2024-001',
    dueDate: new Date('2024-01-20'),
    amount: 180.00,
    status: 'pending',
  },
  {
    id: 2,
    concept: 'Resonancia Magnética',
    reference: 'PAY-2024-002',
    dueDate: new Date('2024-01-18'),
    amount: 450.00,
    status: 'pending',
  },
  {
    id: 3,
    concept: 'Análisis de Laboratorio',
    reference: 'PAY-2024-003',
    dueDate: new Date('2024-01-25'),
    amount: 95.00,
    status: 'pending',
  },
  {
    id: 4,
    concept: 'Consulta Traumatología',
    reference: 'PAY-2024-004',
    dueDate: new Date('2024-01-22'),
    amount: 150.00,
    status: 'pending',
  },
  {
    id: 5,
    concept: 'Radiografía Dental',
    reference: 'PAY-2024-005',
    dueDate: new Date('2024-01-30'),
    amount: 75.00,
    status: 'pending',
  }
])

const searchQuery = ref('')

// Computed Properties
const filteredPayments = computed(() => {
  if (!searchQuery.value) return pendingPayments.value
  
  const query = searchQuery.value.toLowerCase()
  return pendingPayments.value.filter(payment => 
    payment.concept.toLowerCase().includes(query) ||
    payment.reference.toLowerCase().includes(query)
  )
})

const totalPending = computed(() => {
  return pendingPayments.value.reduce((sum, payment) => sum + payment.amount, 0)
})

const nextDueDate = computed(() => {
  return new Date(Math.min(...pendingPayments.value.map(p => new Date(p.dueDate))))
})

const nextDueAmount = computed(() => {
  const nextDate = nextDueDate.value
  return pendingPayments.value.find(p => new Date(p.dueDate).getTime() === nextDate.getTime())?.amount || 0
})

const pendingThisMonth = computed(() => {
  const now = new Date()
  return pendingPayments.value.filter(payment => {
    const dueDate = new Date(payment.dueDate)
    return dueDate.getMonth() === now.getMonth() && 
           dueDate.getFullYear() === now.getFullYear()
  }).length
})

// Helper Functions
const formatDate = (date) => {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(date))
}

const getDaysUntilDue = (dueDate) => {
  const today = new Date()
  const due = new Date(dueDate)
  const diffTime = due - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return 'Vencido'
  if (diffDays === 0) return 'Vence hoy'
  if (diffDays === 1) return 'Vence mañana'
  return `Vence en ${diffDays} días`
}

const getStatusClass = (payment) => {
  const daysUntilDue = Math.ceil((new Date(payment.dueDate) - new Date()) / (1000 * 60 * 60 * 24))
  
  if (daysUntilDue < 0) {
    return 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200'
  } else if (daysUntilDue <= 3) {
    return 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200'
  } else {
    return 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200'
  }
}

const getStatusText = (payment) => {
  const daysUntilDue = Math.ceil((new Date(payment.dueDate) - new Date()) / (1000 * 60 * 60 * 24))
  
  if (daysUntilDue < 0) {
    return 'Vencido'
  } else if (daysUntilDue <= 3) {
    return 'Próximo a vencer'
  } else {
    return 'En término'
  }
}
</script>

<style scoped>
.bg-teal-25 {
  background-color: rgba(20, 184, 166, 0.05);
}
</style>