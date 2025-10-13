<template>
  <MainLayout>
    <!-- Page Content -->

    <!-- Stats Cards -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg border border-teal-100 p-6 hover:shadow-xl transition-all duration-300">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-teal-600">Pagos Completados</p>
              <p class="text-2xl font-bold text-teal-800">${{ completedPaymentsTotal.toLocaleString() }}</p>
              <p class="text-sm text-teal-500">{{ completedPaymentsCount }} transacciones</p>
            </div>
          </div>
        </div>

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
              <p class="text-sm font-medium text-teal-600">Pagos Pendientes</p>
              <p class="text-2xl font-bold text-teal-800">${{ pendingPaymentsTotal.toLocaleString() }}</p>
              <p class="text-sm text-teal-500">{{ pendingPaymentsCount }} transacciones</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg border border-teal-100 p-6 hover:shadow-xl transition-all duration-300">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-teal-600">Este Mes</p>
              <p class="text-2xl font-bold text-teal-800">${{ thisMonthTotal.toLocaleString() }}</p>
              <p class="text-sm text-teal-500">{{ thisMonthCount }} transacciones</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg border border-teal-100 p-6 hover:shadow-xl transition-all duration-300">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-teal-600">Promedio Mensual</p>
              <p class="text-2xl font-bold text-teal-800">${{ monthlyAverage.toLocaleString() }}</p>
              <p class="text-sm text-teal-500">Últimos 6 meses</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment History Component -->
      <PaymentHistory :payments="samplePayments" />
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import MainLayout from '../components/Layout/MainLayout.vue'
import PaymentHistory from '../components/PaymentHistory.vue'

// Sample payment data
const samplePayments = ref([
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
  },
  {
    id: 7,
    date: new Date('2023-11-15'),
    description: 'Hemograma Completo',
    reference: 'REF-007-2023',
    amount: 95.00,
    status: 'completed',
    method: 'digital_wallet',
    methodDetails: 'MercadoPago'
  },
  {
    id: 8,
    date: new Date('2023-11-08'),
    description: 'Consulta Dermatológica',
    reference: 'REF-008-2023',
    amount: 180.00,
    status: 'completed',
    method: 'credit_card',
    methodDetails: '**** 9876'
  },
  {
    id: 9,
    date: new Date('2023-10-25'),
    description: 'Mamografía',
    reference: 'REF-009-2023',
    amount: 220.00,
    status: 'completed',
    method: 'bank_transfer',
    methodDetails: 'Banco Nación'
  },
  {
    id: 10,
    date: new Date('2023-10-12'),
    description: 'Consulta Ginecológica',
    reference: 'REF-010-2023',
    amount: 170.00,
    status: 'completed',
    method: 'credit_card',
    methodDetails: '**** 5432'
  }
])

// Computed properties for stats
const completedPayments = computed(() => 
  samplePayments.value.filter(payment => payment.status === 'completed')
)

const pendingPayments = computed(() => 
  samplePayments.value.filter(payment => payment.status === 'pending')
)

const completedPaymentsTotal = computed(() => 
  completedPayments.value.reduce((sum, payment) => sum + payment.amount, 0)
)

const pendingPaymentsTotal = computed(() => 
  pendingPayments.value.reduce((sum, payment) => sum + payment.amount, 0)
)

const completedPaymentsCount = computed(() => completedPayments.value.length)
const pendingPaymentsCount = computed(() => pendingPayments.value.length)

const thisMonthPayments = computed(() => {
  const now = new Date()
  const thisMonth = now.getMonth()
  const thisYear = now.getFullYear()
  
  return samplePayments.value.filter(payment => {
    const paymentDate = new Date(payment.date)
    return paymentDate.getMonth() === thisMonth && 
           paymentDate.getFullYear() === thisYear &&
           payment.status === 'completed'
  })
})

const thisMonthTotal = computed(() => 
  thisMonthPayments.value.reduce((sum, payment) => sum + payment.amount, 0)
)

const thisMonthCount = computed(() => thisMonthPayments.value.length)

const monthlyAverage = computed(() => {
  const completedTotal = completedPaymentsTotal.value
  const monthsWithPayments = 6 // Assuming 6 months of data
  return Math.round(completedTotal / monthsWithPayments)
})
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
