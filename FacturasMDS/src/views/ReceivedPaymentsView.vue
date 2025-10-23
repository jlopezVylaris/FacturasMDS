<template>
  <MainLayout>
    <!-- Page Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Pagos Recibidos</h1>
          <p class="mt-2 text-gray-600">Revisa todos los pagos recibidos de tus clientes</p>
        </div>
        <div class="flex items-center space-x-4">
          <!-- Date Filter -->
          <div class="relative">
            <select 
              v-model="selectedPeriod" 
              class="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm cursor-pointer"
            >
              <option value="today">Hoy</option>
              <option value="week">Esta semana</option>
              <option value="month">Este mes</option>
              <option value="quarter">Este trimestre</option>
              <option value="year">Este año</option>
              <option value="all">Todos los pagos</option>
            </select>
          </div>
          <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium shadow-sm cursor-pointer">
            Exportar Reporte
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg border border-green-100 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Recibido</p>
              <p class="text-2xl font-bold text-gray-900">USD{{ totalReceivedFormatted }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Número de Pagos</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalPayments }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg border border-purple-100 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Promedio por Pago</p>
              <p class="text-2xl font-bold text-gray-900">USD{{ averagePaymentFormatted }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg border border-yellow-100 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">{{ periodLabel }}</p>
              <p class="text-2xl font-bold text-gray-900">{{ paymentsInSelectedPeriod }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="bg-white rounded-xl shadow-lg border p-6 mb-8">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-2">Buscar pagos</label>
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Buscar por cliente, factura o método de pago..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          <div class="sm:w-48">
            <label class="block text-sm font-medium text-gray-700 mb-2">Método de pago</label>
            <select 
              v-model="selectedPaymentMethod" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
            >
              <option value="">Todos los métodos</option>
              <option value="credit_card">Tarjeta de Crédito</option>
              <option value="debit_card">Tarjeta de Débito</option>
              <option value="bank_transfer">Transferencia Bancaria</option>
              <option value="cash">Efectivo</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Payments Table -->
      <div class="bg-white rounded-xl shadow-lg border overflow-hidden">
        <!-- Table Header -->
        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Pagos Recibidos</h3>
            <span class="text-sm text-gray-500">{{ filteredPayments.length }} pagos encontrados</span>
          </div>
        </div>

        <!-- Table Content -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha / Hora
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Factura
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Método
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
                </th>
                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="payment in paginatedPayments" :key="payment.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>
                    <div class="font-medium">{{ formatDate(payment.date) }}</div>
                    <div class="text-gray-500">{{ formatTime(payment.date) }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span class="text-sm font-medium text-blue-600">{{ getInitials(payment.clientName) }}</span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ payment.clientName }}</div>
                      <div class="text-sm text-gray-500">{{ payment.clientEmail }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span class="font-mono bg-gray-100 px-2 py-1 rounded text-xs">{{ payment.invoiceNumber }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div class="flex items-center">
                    <component :is="getPaymentIcon(payment.paymentMethod)" class="w-4 h-4 mr-2" />
                    {{ getPaymentMethodName(payment.paymentMethod) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <span class="text-gray-900">USD{{ payment.amount.toLocaleString('en-US') }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <span :class="getStatusBadgeClass(payment.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                    {{ getStatusText(payment.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <div class="flex items-center justify-center space-x-2">
                    <button class="text-blue-600 hover:text-blue-800 p-1 cursor-pointer" title="Ver detalles">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </button>
                    <button class="text-green-600 hover:text-green-800 p-1 cursor-pointer" title="Descargar recibo">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </button>
                    <button class="text-purple-600 hover:text-purple-800 p-1 cursor-pointer" title="Enviar comprobante">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button 
              @click="previousPage" 
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
            >
              Anterior
            </button>
            <button 
              @click="nextPage" 
              :disabled="currentPage === totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
            >
              Siguiente
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Mostrando
                <span class="font-medium">{{ startItem }}</span>
                a
                <span class="font-medium">{{ endItem }}</span>
                de
                <span class="font-medium">{{ filteredPayments.length }}</span>
                pagos
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button 
                  @click="previousPage" 
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                >
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
                <template v-for="page in visiblePages" :key="page">
                  <button 
                    @click="goToPage(page)" 
                    :class="[
                      'relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer',
                      page === currentPage 
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' 
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    ]"
                  >
                    {{ page }}
                  </button>
                </template>
                <button 
                  @click="nextPage" 
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                >
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import MainLayout from '../components/Layout/MainLayout.vue'

// Reactive data
const searchQuery = ref('')
const selectedPeriod = ref('month')
const selectedPaymentMethod = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Sample data
const payments = ref([
  {
    id: 1,
    date: new Date('2025-10-23T14:30:00'),
    clientName: 'María González',
    clientEmail: 'maria.gonzalez@email.com',
    invoiceNumber: 'INV-2025-001',
    paymentMethod: 'credit_card',
    amount: 1250.00,
    status: 'completed'
  },
  {
    id: 2,
    date: new Date('2025-10-23T11:15:00'),
    clientName: 'Carlos Rodríguez',
    clientEmail: 'carlos.rodriguez@email.com',
    invoiceNumber: 'INV-2025-002',
    paymentMethod: 'bank_transfer',
    amount: 850.50,
    status: 'completed'
  },
  {
    id: 3,
    date: new Date('2025-10-22T16:45:00'),
    clientName: 'Ana Martínez',
    clientEmail: 'ana.martinez@email.com',
    invoiceNumber: 'INV-2025-003',
    paymentMethod: 'debit_card',
    amount: 2100.00,
    status: 'completed'
  },
  {
    id: 4,
    date: new Date('2025-10-22T09:20:00'),
    clientName: 'Luis Fernández',
    clientEmail: 'luis.fernandez@email.com',
    invoiceNumber: 'INV-2025-004',
    paymentMethod: 'credit_card',
    amount: 675.25,
    status: 'pending'
  },
  {
    id: 5,
    date: new Date('2025-10-21T13:10:00'),
    clientName: 'Carmen López',
    clientEmail: 'carmen.lopez@email.com',
    invoiceNumber: 'INV-2025-005',
    paymentMethod: 'cash',
    amount: 1500.00,
    status: 'completed'
  },
  {
    id: 6,
    date: new Date('2025-10-21T10:30:00'),
    clientName: 'Roberto Sánchez',
    clientEmail: 'roberto.sanchez@email.com',
    invoiceNumber: 'INV-2025-006',
    paymentMethod: 'bank_transfer',
    amount: 950.75,
    status: 'completed'
  },
  {
    id: 7,
    date: new Date('2025-10-20T15:45:00'),
    clientName: 'Elena Torres',
    clientEmail: 'elena.torres@email.com',
    invoiceNumber: 'INV-2025-007',
    paymentMethod: 'credit_card',
    amount: 1800.00,
    status: 'completed'
  },
  {
    id: 8,
    date: new Date('2025-10-20T12:20:00'),
    clientName: 'Diego Morales',
    clientEmail: 'diego.morales@email.com',
    invoiceNumber: 'INV-2025-008',
    paymentMethod: 'debit_card',
    amount: 725.50,
    status: 'failed'
  },
  {
    id: 9,
    date: new Date('2025-10-19T17:00:00'),
    clientName: 'Patricia Jiménez',
    clientEmail: 'patricia.jimenez@email.com',
    invoiceNumber: 'INV-2025-009',
    paymentMethod: 'credit_card',
    amount: 1350.75,
    status: 'completed'
  },
  {
    id: 10,
    date: new Date('2025-10-18T14:35:00'),
    clientName: 'Fernando Castro',
    clientEmail: 'fernando.castro@email.com',
    invoiceNumber: 'INV-2025-010',
    paymentMethod: 'bank_transfer',
    amount: 2250.00,
    status: 'completed'
  },
  {
    id: 11,
    date: new Date('2025-10-17T09:45:00'),
    clientName: 'Isabel Herrera',
    clientEmail: 'isabel.herrera@email.com',
    invoiceNumber: 'INV-2025-011',
    paymentMethod: 'debit_card',
    amount: 890.25,
    status: 'completed'
  },
  {
    id: 12,
    date: new Date('2025-10-16T16:20:00'),
    clientName: 'Alejandro Ruiz',
    clientEmail: 'alejandro.ruiz@email.com',
    invoiceNumber: 'INV-2025-012',
    paymentMethod: 'credit_card',
    amount: 1575.50,
    status: 'completed'
  },
  {
    id: 13,
    date: new Date('2025-10-15T11:30:00'),
    clientName: 'Mónica Vargas',
    clientEmail: 'monica.vargas@email.com',
    invoiceNumber: 'INV-2025-013',
    paymentMethod: 'cash',
    amount: 750.00,
    status: 'completed'
  },
  {
    id: 14,
    date: new Date('2025-10-14T13:15:00'),
    clientName: 'Raúl Mendoza',
    clientEmail: 'raul.mendoza@email.com',
    invoiceNumber: 'INV-2025-014',
    paymentMethod: 'bank_transfer',
    amount: 1920.75,
    status: 'completed'
  },
  {
    id: 15,
    date: new Date('2025-10-13T10:00:00'),
    clientName: 'Gabriela Ortiz',
    clientEmail: 'gabriela.ortiz@email.com',
    invoiceNumber: 'INV-2025-015',
    paymentMethod: 'credit_card',
    amount: 1125.25,
    status: 'pending'
  },
  {
    id: 16,
    date: new Date('2025-10-12T15:40:00'),
    clientName: 'Sergio Delgado',
    clientEmail: 'sergio.delgado@email.com',
    invoiceNumber: 'INV-2025-016',
    paymentMethod: 'debit_card',
    amount: 680.50,
    status: 'completed'
  },
  {
    id: 17,
    date: new Date('2025-10-11T12:25:00'),
    clientName: 'Claudia Ramos',
    clientEmail: 'claudia.ramos@email.com',
    invoiceNumber: 'INV-2025-017',
    paymentMethod: 'bank_transfer',
    amount: 1450.00,
    status: 'completed'
  },
  {
    id: 18,
    date: new Date('2025-10-10T08:50:00'),
    clientName: 'Andrés Moreno',
    clientEmail: 'andres.moreno@email.com',
    invoiceNumber: 'INV-2025-018',
    paymentMethod: 'credit_card',
    amount: 2080.75,
    status: 'completed'
  },
  {
    id: 19,
    date: new Date('2025-10-09T14:10:00'),
    clientName: 'Valeria Peña',
    clientEmail: 'valeria.pena@email.com',
    invoiceNumber: 'INV-2025-019',
    paymentMethod: 'cash',
    amount: 825.00,
    status: 'completed'
  },
  {
    id: 20,
    date: new Date('2025-10-08T16:35:00'),
    clientName: 'Miguel Aguilar',
    clientEmail: 'miguel.aguilar@email.com',
    invoiceNumber: 'INV-2025-020',
    paymentMethod: 'debit_card',
    amount: 1685.25,
    status: 'failed'
  },
  {
    id: 21,
    date: new Date('2025-09-28T09:15:00'),
    clientName: 'Beatriz Silva',
    clientEmail: 'beatriz.silva@email.com',
    invoiceNumber: 'INV-2025-021',
    paymentMethod: 'bank_transfer',
    amount: 1375.50,
    status: 'completed'
  },
  {
    id: 22,
    date: new Date('2025-09-25T11:40:00'),
    clientName: 'Ricardo Vega',
    clientEmail: 'ricardo.vega@email.com',
    invoiceNumber: 'INV-2025-022',
    paymentMethod: 'credit_card',
    amount: 950.00,
    status: 'completed'
  },
  {
    id: 23,
    date: new Date('2025-09-20T15:20:00'),
    clientName: 'Natalia Cruz',
    clientEmail: 'natalia.cruz@email.com',
    invoiceNumber: 'INV-2025-023',
    paymentMethod: 'debit_card',
    amount: 1225.75,
    status: 'completed'
  },
  {
    id: 24,
    date: new Date('2025-09-15T13:05:00'),
    clientName: 'Javier Romero',
    clientEmail: 'javier.romero@email.com',
    invoiceNumber: 'INV-2025-024',
    paymentMethod: 'cash',
    amount: 775.25,
    status: 'completed'
  },
  {
    id: 25,
    date: new Date('2025-08-30T10:30:00'),
    clientName: 'Carolina Medina',
    clientEmail: 'carolina.medina@email.com',
    invoiceNumber: 'INV-2025-025',
    paymentMethod: 'bank_transfer',
    amount: 1850.00,
    status: 'completed'
  },
  {
    id: 26,
    date: new Date('2025-08-22T14:45:00'),
    clientName: 'Gustavo Paredes',
    clientEmail: 'gustavo.paredes@email.com',
    invoiceNumber: 'INV-2025-026',
    paymentMethod: 'credit_card',
    amount: 1150.50,
    status: 'pending'
  },
  {
    id: 27,
    date: new Date('2025-08-10T12:15:00'),
    clientName: 'Adriana Flores',
    clientEmail: 'adriana.flores@email.com',
    invoiceNumber: 'INV-2025-027',
    paymentMethod: 'debit_card',
    amount: 925.75,
    status: 'completed'
  },
  {
    id: 28,
    date: new Date('2025-07-18T16:00:00'),
    clientName: 'Emilio Guerrero',
    clientEmail: 'emilio.guerrero@email.com',
    invoiceNumber: 'INV-2025-028',
    paymentMethod: 'bank_transfer',
    amount: 2150.25,
    status: 'completed'
  },
  {
    id: 29,
    date: new Date('2025-06-25T11:20:00'),
    clientName: 'Silvia Navarro',
    clientEmail: 'silvia.navarro@email.com',
    invoiceNumber: 'INV-2025-029',
    paymentMethod: 'cash',
    amount: 1025.00,
    status: 'completed'
  },
  {
    id: 30,
    date: new Date('2025-05-12T13:50:00'),
    clientName: 'Arturo Campos',
    clientEmail: 'arturo.campos@email.com',
    invoiceNumber: 'INV-2025-030',
    paymentMethod: 'credit_card',
    amount: 1750.50,
    status: 'completed'
  }
])

// Computed properties
const filteredPayments = computed(() => {
  let filtered = payments.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(payment => 
      payment.clientName.toLowerCase().includes(query) ||
      payment.clientEmail.toLowerCase().includes(query) ||
      payment.invoiceNumber.toLowerCase().includes(query) ||
      getPaymentMethodName(payment.paymentMethod).toLowerCase().includes(query)
    )
  }

  // Filter by payment method
  if (selectedPaymentMethod.value) {
    filtered = filtered.filter(payment => payment.paymentMethod === selectedPaymentMethod.value)
  }

  // Filter by period
  if (selectedPeriod.value !== 'all') {
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    filtered = filtered.filter(payment => {
      const paymentDate = new Date(payment.date)
      
      switch (selectedPeriod.value) {
        case 'today':
          return paymentDate >= startOfDay
        case 'week':
          const weekAgo = new Date(startOfDay.getTime() - 7 * 24 * 60 * 60 * 1000)
          return paymentDate >= weekAgo
        case 'month':
          const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
          return paymentDate >= monthStart
        case 'quarter':
          const quarterMonth = Math.floor(now.getMonth() / 3) * 3
          const quarterStart = new Date(now.getFullYear(), quarterMonth, 1)
          return paymentDate >= quarterStart
        case 'year':
          const yearStart = new Date(now.getFullYear(), 0, 1)
          return paymentDate >= yearStart
        default:
          return true
      }
    })
  }

  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
})

const totalPages = computed(() => Math.ceil(filteredPayments.value.length / itemsPerPage.value))

const paginatedPayments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredPayments.value.slice(start, end)
})

const startItem = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1)
const endItem = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredPayments.value.length))

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Stats computed properties
const totalReceived = computed(() => {
  return filteredPayments.value
    .filter(payment => payment.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0)
})

const totalReceivedFormatted = computed(() => totalReceived.value.toLocaleString('en-US'))

const totalPayments = computed(() => filteredPayments.value.length)

const completedPayments = computed(() => {
  return filteredPayments.value.filter(payment => payment.status === 'completed')
})

const averagePayment = computed(() => {
  const completed = completedPayments.value.length
  return completed > 0 ? totalReceived.value / completed : 0
})

const averagePaymentFormatted = computed(() => averagePayment.value.toLocaleString('en-US'))

const paymentsToday = computed(() => {
  const today = new Date()
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  
  return filteredPayments.value.filter(payment => 
    new Date(payment.date) >= startOfDay && payment.status === 'completed'
  ).length
})

// Computed para el período seleccionado
const periodLabel = computed(() => {
  const labels = {
    'today': 'Pagos Hoy',
    'week': 'Pagos Esta Semana',
    'month': 'Pagos Este Mes', 
    'quarter': 'Pagos Este Trimestre',
    'year': 'Pagos Este Año',
    'all': 'Total de Pagos'
  }
  return labels[selectedPeriod.value] || 'Pagos'
})

const paymentsInSelectedPeriod = computed(() => {
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  let periodStart = startOfDay
  
  switch (selectedPeriod.value) {
    case 'today':
      periodStart = startOfDay
      break
    case 'week':
      periodStart = new Date(startOfDay.getTime() - 7 * 24 * 60 * 60 * 1000)
      break
    case 'month':
      periodStart = new Date(now.getFullYear(), now.getMonth(), 1)
      break
    case 'quarter':
      const quarterMonth = Math.floor(now.getMonth() / 3) * 3
      periodStart = new Date(now.getFullYear(), quarterMonth, 1)
      break
    case 'year':
      periodStart = new Date(now.getFullYear(), 0, 1)
      break
    case 'all':
      return filteredPayments.value.filter(payment => payment.status === 'completed').length
  }
  
  return filteredPayments.value.filter(payment => {
    const paymentDate = new Date(payment.date)
    return paymentDate >= periodStart && payment.status === 'completed'
  }).length
})

// Methods
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getInitials = (name) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

const getPaymentMethodName = (method) => {
  const methods = {
    'credit_card': 'Tarjeta de Crédito',
    'debit_card': 'Tarjeta de Débito',
    'bank_transfer': 'Transferencia Bancaria',
    'cash': 'Efectivo'
  }
  return methods[method] || method
}

const getPaymentIcon = (method) => {
  // Return the appropriate icon component based on payment method
  return 'div' // Placeholder - you would return actual icon components
}

const getStatusText = (status) => {
  const statuses = {
    'completed': 'Completado',
    'pending': 'Pendiente',
    'failed': 'Fallido'
  }
  return statuses[status] || status
}

const getStatusBadgeClass = (status) => {
  const classes = {
    'completed': 'bg-green-100 text-green-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'failed': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

// Pagination methods
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

const goToPage = (page) => {
  currentPage.value = page
}

onMounted(() => {
  // Initialize component
})
</script>

<style scoped>
/* Add any custom styles here */
</style>