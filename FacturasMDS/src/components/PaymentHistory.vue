<template>
  <div class="bg-white rounded-xl shadow-lg border border-teal-100">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-teal-100 bg-gradient-to-r from-teal-50 to-cyan-50">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-teal-800">Historial de Pagos</h3>
        </div>
        <div class="text-sm text-teal-600 font-medium">
          Total: ${{ totalAmount.toLocaleString() }}
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="px-6 py-4 border-b border-teal-100 bg-teal-25">
      <div class="flex flex-col sm:flex-row sm:items-center gap-4">
        <div class="flex-1 max-w-md">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-4 w-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Buscar por descripción..." 
              class="block w-full pl-10 pr-3 py-2 text-sm border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
            >
          </div>
        </div>
        <div class="flex items-center gap-3">
          <select 
            v-model="statusFilter" 
            class="px-3 py-2 text-sm border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-teal-700 bg-white"
          >
            <option value="">Todos los estados</option>
            <option value="completed">Completados</option>
            <option value="pending">Pendientes</option>
            <option value="failed">Fallidos</option>
          </select>
          <input 
            type="date" 
            v-model="dateFilter"
            class="px-3 py-2 text-sm border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-teal-700 bg-white"
          >
        </div>
      </div>
    </div>

    <!-- Payment History Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-teal-100">
        <thead class="bg-gradient-to-r from-teal-50 to-cyan-50">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
              Fecha
            </th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
              Descripción
            </th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
              Monto
            </th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
              Estado
            </th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
              Método
            </th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-teal-50">
          <tr 
            v-for="payment in filteredPayments" 
            :key="payment.id" 
            class="hover:bg-teal-25 transition-colors duration-200"
          >
            <!-- Date -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-gradient-to-br from-teal-100 to-cyan-200 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-semibold text-teal-800">{{ formatDate(payment.date) }}</div>
                  <div class="text-xs text-teal-600">{{ formatTime(payment.date) }}</div>
                </div>
              </div>
            </td>

            <!-- Description -->
            <td class="px-6 py-4">
              <div>
                <div class="text-sm font-medium text-teal-800">{{ payment.description }}</div>
                <div class="text-xs text-teal-600">{{ payment.reference }}</div>
              </div>
            </td>

            <!-- Amount -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-bold text-teal-800">${{ payment.amount.toLocaleString() }}</div>
            </td>

            <!-- Status -->
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getPaymentStatusClass(payment.status)" class="inline-flex px-3 py-1 text-xs font-semibold rounded-full">
                {{ getPaymentStatusText(payment.status) }}
              </span>
            </td>

            <!-- Payment Method -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div :class="getPaymentMethodIcon(payment.method)" class="w-6 h-6 mr-2">
                  <svg v-if="payment.method === 'credit_card'" class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                  </svg>
                  <svg v-else-if="payment.method === 'bank_transfer'" class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
                  </svg>
                  <svg v-else class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v2a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-medium text-teal-800">{{ getPaymentMethodText(payment.method) }}</div>
                  <div class="text-xs text-teal-600">{{ payment.methodDetails }}</div>
                </div>
              </div>
            </td>

            <!-- Actions -->
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div class="flex items-center space-x-3">
                <button 
                  @click="viewPayment(payment)"
                  class="text-teal-600 hover:text-teal-800 font-medium transition-colors duration-200"
                >
                  Ver
                </button>
                <button 
                  @click="downloadReceipt(payment)"
                  class="text-cyan-600 hover:text-cyan-800 font-medium transition-colors duration-200"
                  :disabled="payment.status !== 'completed'"
                >
                  Recibo
                </button>
                <button 
                  v-if="payment.status === 'pending'"
                  @click="retryPayment(payment)"
                  class="text-amber-600 hover:text-amber-800 font-medium transition-colors duration-200"
                >
                  Reintentar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-if="filteredPayments.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-teal-700">No hay pagos registrados</h3>
      <p class="mt-1 text-sm text-teal-500">Cuando realices pagos, aparecerán aquí.</p>
    </div>

    <!-- Pagination -->
    <div class="bg-gradient-to-r from-teal-50 to-cyan-50 px-6 py-4 border-t border-teal-100">
      <div class="flex items-center justify-between">
        <div class="text-sm text-teal-700 font-medium">
          Mostrando <span class="font-semibold text-teal-800">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> 
          a <span class="font-semibold text-teal-800">{{ Math.min(currentPage * itemsPerPage, filteredPayments.length) }}</span> 
          de <span class="font-semibold text-teal-800">{{ filteredPayments.length }}</span> pagos
        </div>
        <div class="flex items-center space-x-2">
          <button 
            @click="previousPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 text-sm text-teal-600 bg-white border border-teal-200 rounded-lg hover:bg-teal-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <span class="px-4 py-2 text-sm bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg shadow-sm">
            {{ currentPage }}
          </span>
          <button 
            @click="nextPage"
            :disabled="currentPage >= totalPages"
            class="px-4 py-2 text-sm text-teal-600 bg-white border border-teal-200 rounded-lg hover:bg-teal-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  payments: {
    type: Array,
    default: () => []
  }
})

// Reactive data
const searchQuery = ref('')
const statusFilter = ref('')
const dateFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Sample payment data (if no props provided)
const defaultPayments = ref([
  {
    id: 1,
    date: new Date('2024-01-15'),
    description: 'Consulta Médica General',
    reference: 'REF-001-2024',
    amount: 150.00,
    status: 'completed',
    method: 'credit_card',
    methodDetails: '**** 4532'
  },
  {
    id: 2,
    date: new Date('2024-01-10'),
    description: 'Análisis de Laboratorio',
    reference: 'REF-002-2024',
    amount: 85.00,
    status: 'completed',
    method: 'bank_transfer',
    methodDetails: 'Banco Santander'
  },
  {
    id: 3,
    date: new Date('2024-01-05'),
    description: 'Radiografía de Tórax',
    reference: 'REF-003-2024',
    amount: 120.00,
    status: 'completed',
    method: 'digital_wallet',
    methodDetails: 'MercadoPago'
  },
  {
    id: 4,
    date: new Date('2024-01-03'),
    description: 'Consulta de Especialidad',
    reference: 'REF-004-2024',
    amount: 200.00,
    status: 'pending',
    method: 'credit_card',
    methodDetails: '**** 1234'
  },
  {
    id: 5,
    date: new Date('2023-12-28'),
    description: 'Ecografía Abdominal',
    reference: 'REF-005-2023',
    amount: 180.00,
    status: 'completed',
    method: 'bank_transfer',
    methodDetails: 'Banco Galicia'
  },
  {
    id: 6,
    date: new Date('2023-12-20'),
    description: 'Consulta Cardiológica',
    reference: 'REF-006-2023',
    amount: 250.00,
    status: 'failed',
    method: 'credit_card',
    methodDetails: '**** 5678'
  }
])

// Computed properties
const payments = computed(() => props.payments.length > 0 ? props.payments : defaultPayments.value)

const filteredPayments = computed(() => {
  let filtered = payments.value

  if (searchQuery.value) {
    filtered = filtered.filter(payment => 
      payment.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(payment => payment.status === statusFilter.value)
  }

  if (dateFilter.value) {
    const filterDate = new Date(dateFilter.value)
    filtered = filtered.filter(payment => {
      const paymentDate = new Date(payment.date)
      return paymentDate.toDateString() === filterDate.toDateString()
    })
  }

  return filtered
})

const totalAmount = computed(() => {
  return payments.value
    .filter(payment => payment.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0)
})

const totalPages = computed(() => {
  return Math.ceil(filteredPayments.value.length / itemsPerPage.value)
})

// Methods
const formatDate = (date) => {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

const formatTime = (date) => {
  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date)
}

const getPaymentStatusClass = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-emerald-100 text-emerald-800 border border-emerald-200'
    case 'pending':
      return 'bg-amber-100 text-amber-800 border border-amber-200'
    case 'failed':
      return 'bg-rose-100 text-rose-800 border border-rose-200'
    default:
      return 'bg-teal-100 text-teal-800 border border-teal-200'
  }
}

const getPaymentStatusText = (status) => {
  switch (status) {
    case 'completed':
      return 'Completado'
    case 'pending':
      return 'Pendiente'
    case 'failed':
      return 'Fallido'
    default:
      return 'Desconocido'
  }
}

const getPaymentMethodIcon = (method) => {
  return 'flex items-center justify-center'
}

const getPaymentMethodText = (method) => {
  switch (method) {
    case 'credit_card':
      return 'Tarjeta de Crédito'
    case 'bank_transfer':
      return 'Transferencia'
    case 'digital_wallet':
      return 'Billetera Digital'
    default:
      return 'Otro'
  }
}

// Actions
const viewPayment = (payment) => {
  console.log('Ver pago:', payment)
  // Implementar lógica para ver detalles del pago
}

const downloadReceipt = (payment) => {
  console.log('Descargar recibo:', payment)
  // Implementar lógica para descargar recibo
}

const retryPayment = (payment) => {
  console.log('Reintentar pago:', payment)
  // Implementar lógica para reintentar pago
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>

<style scoped>
/* Clases personalizadas si son necesarias */
.bg-teal-25 {
  background-color: rgba(20, 184, 166, 0.05);
}

button {
  cursor: pointer;
}
</style>
