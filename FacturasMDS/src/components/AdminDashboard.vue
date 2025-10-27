<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Hola! Admin</h1>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex space-x-8 border-b border-gray-200 mb-8">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'pb-4 px-2 text-sm font-medium transition-colors',
          activeTab === tab.id
            ? 'text-teal-600 border-b-2 border-teal-600'
            : 'text-gray-500 hover:text-gray-700'
        ]"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- Main Content Grid -->
    <div class="space-y-6">
      <!-- First Row: Cuentas por cobrar y Cuentas por pagar -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Card 1: Cuentas por cobrar -->
        <div class="bg-white rounded-lg shadow-md p-6">
        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Total de cuentas por cobrar</h3>
        </div>

        <!-- Subtitle -->
        <p class="text-sm text-gray-600 mb-6">
          Total de facturas sin pagar <span class="font-semibold text-gray-900">USD${{ cuentasPorCobrarTotal.toLocaleString('en-US') }}</span>
        </p>

        <!-- Body -->
        <div class="flex space-x-4">
          <!-- ACTUAL Section -->
          <div class="flex-1 bg-gray-50 rounded-lg p-4">
            <p class="text-xs text-gray-500 uppercase mb-2">Actual</p>
            <p class="text-xl font-bold text-gray-900">USD${{ cuentasPorCobrarActual.toLocaleString('en-US') }}</p>
          </div>

          <!-- VENCIDO Section -->
          <div class="flex-1 bg-red-50 rounded-lg p-4 relative">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-xs text-gray-500 uppercase mb-2">Vencido</p>
                <p class="text-xl font-bold text-red-600">USD${{ cuentasPorCobrarVencido.toLocaleString('en-US') }}</p>
              </div>
              <button class="text-gray-400 hover:text-gray-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Card 2: Cuentas por pagar -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Total de cuentas por pagar</h3>
        </div>

        <!-- Subtitle -->
        <p class="text-sm text-gray-600 mb-6">
          Total de facturas sin pagar <span class="font-semibold text-gray-900">USD${{ cuentasPorPagarTotal.toLocaleString('en-US') }}</span>
        </p>

        <!-- Body -->
        <div class="flex space-x-4">
          <!-- ACTUAL Section -->
          <div class="flex-1 bg-gray-50 rounded-lg p-4">
            <p class="text-xs text-gray-500 uppercase mb-2">Actual</p>
            <p class="text-xl font-bold text-gray-900">USD${{ cuentasPorPagarActual.toLocaleString('en-US') }}</p>
          </div>

          <!-- VENCIDO Section -->
          <div class="flex-1 bg-gray-50 rounded-lg p-4 relative">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-xs text-gray-500 uppercase mb-2">Vencido</p>
                <p class="text-xl font-bold text-gray-900">USD${{ cuentasPorPagarVencido.toLocaleString('en-US') }}</p>
              </div>
              <button class="text-gray-400 hover:text-gray-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

      <!-- Card 3: Flujo de efectivo - Full Width -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Flujo de efectivo</h3>
          <select 
            v-model="selectedPeriod"
            class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
          >
            <option value="current-year">Este año fiscal</option>
            <option value="previous-year">Año anterior</option>
            <option value="last-6-months">Últimos 6 meses</option>
            <option value="last-quarter">Último trimestre</option>
            <option value="all-time">Todo el tiempo</option>
          </select>
        </div>

        <!-- Chart and Summary Container -->
        <div class="space-y-4">
          <!-- Chart Placeholder -->
          <div class="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <Line v-if="chartData" :data="chartData" :options="chartOptions" />
          </div>

          <!-- Summary -->
          <div class="space-y-3 pt-4 border-t border-gray-200">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Efectivo a {{ periodStartLabel }}</span>
              <span class="text-sm font-medium text-gray-900">USD$0.00</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Entrante</span>
              <span class="text-sm font-semibold text-green-600">USD${{ totalIncoming.toLocaleString('en-US') }} +</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Saliente</span>
              <span class="text-sm font-semibold text-red-600">USD${{ totalOutgoing.toLocaleString('en-US') }} -</span>
            </div>
            <div class="flex justify-between items-center pt-3 border-t border-gray-200">
              <span class="text-sm font-medium text-gray-900">Efectivo a {{ periodEndLabel }}</span>
              <span class="text-lg font-bold text-gray-900">USD${{ finalBalance.toLocaleString('en-US') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { invoices, getInvoiceStats, getMonthlyCashFlow } from '../store/invoices'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// Tabs
const tabs = [
  { id: 'panel', name: 'Panel de Información' },
  // { id: 'inicio', name: 'Inicio' },
  // { id: 'actualizaciones', name: 'Actualizaciones Recientes' }
]

const activeTab = ref('panel')

// Selected period for cash flow chart
const selectedPeriod = ref('current-year')

// Get invoice statistics
const stats = computed(() => getInvoiceStats())

// Cuentas por cobrar calculations
const cuentasPorCobrarTotal = computed(() => {
  return stats.value.pending.total + stats.value.overdue.total
})

const cuentasPorCobrarActual = computed(() => {
  return stats.value.pending.total
})

const cuentasPorCobrarVencido = computed(() => {
  return stats.value.overdue.total
})

const cuentasPorCobrarCount = computed(() => {
  return stats.value.pending.count + stats.value.overdue.count
})

// Cuentas por pagar (currently showing 0 as there's no accounts payable data)
const cuentasPorPagarTotal = ref(0)
const cuentasPorPagarActual = ref(0)
const cuentasPorPagarVencido = ref(0)

// Period configuration
const periodConfig = computed(() => {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()
  
  switch (selectedPeriod.value) {
    case 'current-year':
      return {
        startDate: new Date(currentYear, 0, 1),
        endDate: new Date(currentYear, 11, 31),
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        startLabel: `01 ene ${currentYear}`,
        endLabel: `31 dic ${currentYear}`,
        monthCount: 12,
        year: currentYear
      }
    case 'previous-year':
      return {
        startDate: new Date(currentYear - 1, 0, 1),
        endDate: new Date(currentYear - 1, 11, 31),
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        startLabel: `01 ene ${currentYear - 1}`,
        endLabel: `31 dic ${currentYear - 1}`,
        monthCount: 12,
        year: currentYear - 1
      }
    case 'last-6-months':
      const sixMonthsAgo = new Date(currentYear, currentMonth - 5, 1)
      const monthLabels = []
      for (let i = 0; i < 6; i++) {
        const date = new Date(currentYear, currentMonth - 5 + i, 1)
        monthLabels.push(date.toLocaleDateString('es-ES', { month: 'short' }).charAt(0).toUpperCase() + date.toLocaleDateString('es-ES', { month: 'short' }).slice(1))
      }
      return {
        startDate: sixMonthsAgo,
        endDate: new Date(currentYear, currentMonth, new Date(currentYear, currentMonth + 1, 0).getDate()),
        labels: monthLabels,
        startLabel: sixMonthsAgo.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
        endLabel: now.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
        monthCount: 6,
        startMonth: currentMonth - 5,
        year: currentYear
      }
    case 'last-quarter':
      const quarterStartMonth = Math.floor(currentMonth / 3) * 3
      const quarterStart = new Date(currentYear, quarterStartMonth, 1)
      const quarterLabels = []
      for (let i = 0; i < 3; i++) {
        const date = new Date(currentYear, quarterStartMonth + i, 1)
        quarterLabels.push(date.toLocaleDateString('es-ES', { month: 'short' }).charAt(0).toUpperCase() + date.toLocaleDateString('es-ES', { month: 'short' }).slice(1))
      }
      return {
        startDate: quarterStart,
        endDate: new Date(currentYear, quarterStartMonth + 3, 0),
        labels: quarterLabels,
        startLabel: quarterStart.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
        endLabel: new Date(currentYear, quarterStartMonth + 3, 0).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
        monthCount: 3,
        startMonth: quarterStartMonth,
        year: currentYear
      }
    case 'all-time':
      // Get all years with invoices
      const years = [...new Set(invoices.value.map(inv => new Date(inv.date).getFullYear()))].sort()
      const allTimeLabels = years.map(y => y.toString())
      return {
        startDate: new Date(Math.min(...years), 0, 1),
        endDate: new Date(Math.max(...years), 11, 31),
        labels: allTimeLabels,
        startLabel: `01 ene ${Math.min(...years)}`,
        endLabel: `31 dic ${Math.max(...years)}`,
        monthCount: 12,
        years: years,
        isYearly: true
      }
    default:
      return {
        startDate: new Date(currentYear, 0, 1),
        endDate: new Date(currentYear, 11, 31),
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        startLabel: `01 ene ${currentYear}`,
        endLabel: `31 dic ${currentYear}`,
        monthCount: 12,
        year: currentYear
      }
  }
})

const periodStartLabel = computed(() => periodConfig.value.startLabel)
const periodEndLabel = computed(() => periodConfig.value.endLabel)

// Filter invoices by selected period
const filteredInvoicesByPeriod = computed(() => {
  const config = periodConfig.value
  return invoices.value.filter(inv => {
    const invDate = new Date(inv.date)
    return invDate >= config.startDate && invDate <= config.endDate && inv.status === 'paid'
  })
})

// Cash flow calculations based on period
const cashFlowData = computed(() => {
  const config = periodConfig.value
  const data = []
  
  if (config.isYearly) {
    // For "all-time", group by year
    config.years.forEach(year => {
      const yearInvoices = filteredInvoicesByPeriod.value.filter(inv => new Date(inv.date).getFullYear() === year)
      const total = yearInvoices.reduce((sum, inv) => sum + inv.amount, 0)
      data.push(total)
    })
  } else {
    // For monthly periods
    let cumulative = 0
    for (let i = 0; i < config.monthCount; i++) {
      let monthIndex
      if (selectedPeriod.value === 'last-6-months' || selectedPeriod.value === 'last-quarter') {
        monthIndex = (config.startMonth + i + 12) % 12
      } else {
        monthIndex = i
      }
      
      const monthInvoices = filteredInvoicesByPeriod.value.filter(inv => {
        const invDate = new Date(inv.date)
        return invDate.getMonth() === monthIndex
      })
      
      const monthTotal = monthInvoices.reduce((sum, inv) => sum + inv.amount, 0)
      cumulative += monthTotal
      data.push(cumulative)
    }
  }
  
  return data
})

const totalIncoming = computed(() => {
  return filteredInvoicesByPeriod.value.reduce((sum, inv) => sum + inv.amount, 0)
})

const totalOutgoing = computed(() => {
  // Calculate proportional outgoing based on the period
  const totalPaid = stats.value.paid.total
  if (totalPaid === 0) return 0
  
  const ratio = totalIncoming.value / totalPaid
  return Math.round(600000 * ratio) // Proportional to the period
})

const finalBalance = computed(() => {
  return totalIncoming.value - totalOutgoing.value
})

// Chart Data
const chartData = computed(() => ({
  labels: periodConfig.value.labels,
  datasets: [
    {
      label: 'Flujo de efectivo',
      data: cashFlowData.value,
      borderColor: '#14b8a6',
      backgroundColor: 'rgba(20, 184, 166, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: '#14b8a6',
      pointBorderColor: '#fff',
      pointBorderWidth: 2
    }
  ]
}))

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      displayColors: false,
      callbacks: {
        label: function(context) {
          return 'USD$' + context.parsed.y.toLocaleString('en-US')
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(value) {
          return 'USD$' + (value / 1000).toFixed(0) + 'K'
        }
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.05)'
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
})
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
