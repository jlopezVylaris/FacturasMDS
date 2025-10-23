<template>
  <MainLayout>
    <!-- Page Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Clientes</h1>
          <p class="mt-2 text-gray-600">Gestiona tu lista de clientes y sus cuentas por cobrar</p>
        </div>
        <div class="flex items-center space-x-4">
          <!-- Status Filter Dropdown -->
          <div class="relative">
            <select 
              v-model="selectedStatus" 
              class="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">Clientes activos</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
              <option value="all">Todos</option>
            </select>
          </div>
          <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
            + Nuevo Cliente
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Clientes</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalClients }}</p>
            </div>
          </div>
        </div>

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
              <p class="text-sm font-medium text-gray-600">Total por Cobrar</p>
              <p class="text-2xl font-bold text-gray-900">USD{{ totalAmountFormatted }}</p>
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
              <p class="text-sm font-medium text-gray-600">Clientes Activos</p>
              <p class="text-2xl font-bold text-gray-900">{{ activeClients }}</p>
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
              <p class="text-sm font-medium text-gray-600">Promedio por Cliente</p>
              <p class="text-2xl font-bold text-gray-900">USD{{ averageAmountFormatted }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Clients Table -->
      <div class="bg-white rounded-xl shadow-lg border overflow-hidden">
        <!-- Table Header -->
        <div class="px-6 py-4 border-b bg-gradient-to-r from-gray-50 to-blue-50">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <h3 class="text-lg font-semibold text-gray-900">{{ selectedStatus === '' ? 'Clientes activos' : 'Lista de Clientes' }}</h3>
              <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {{ filteredClients.length }} clientes
              </span>
            </div>
            <div class="flex items-center space-x-2">
              <!-- Search -->
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input 
                  type="text" 
                  v-model="searchQuery" 
                  placeholder="Buscar cliente..." 
                  class="block w-64 pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
              </div>
              <!-- Table Controls -->
              <button class="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Table Content -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left">
                  <input type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div class="flex items-center space-x-1">
                    <span>Nombre</span>
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                    </svg>
                  </div>
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre de la empresa
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Correo electrónico
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono laboral
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cuentas por cobrar (BCY)
                </th>
                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="client in paginatedClients" :key="client.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-200 rounded-full flex items-center justify-center mr-3">
                      <span class="text-sm font-medium text-blue-800">{{ client.initials }}</span>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ client.name }}</div>
                      <div v-if="client.id" class="text-xs text-gray-500">ID: {{ client.id }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ client.companyName || '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ client.email || '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ client.phone || '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <span class="text-gray-900">USD{{ client.amountDue.toLocaleString('en-US') }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <div class="flex items-center justify-center space-x-2">
                    <button class="text-blue-600 hover:text-blue-800 p-1" title="Ver detalles">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </button>
                    <button class="text-green-600 hover:text-green-800 p-1" title="Editar">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button class="text-red-600 hover:text-red-800 p-1" title="Eliminar">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="bg-white px-6 py-4 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">
              Mostrando <span class="font-medium">{{ startIndex }}</span> a <span class="font-medium">{{ endIndex }}</span> de 
              <span class="font-medium">{{ filteredClients.length }}</span> clientes
            </div>
            <div class="flex items-center space-x-2">
              <button 
                @click="previousPage"
                :disabled="currentPage === 1"
                class="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              <span class="px-3 py-2 text-sm bg-blue-50 text-blue-600 border border-blue-200 rounded-lg">
                {{ currentPage }}
              </span>
              <button 
                @click="nextPage"
                :disabled="currentPage >= totalPages"
                class="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
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

// Reactive data
const selectedStatus = ref('')
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Sample clients data based on the image structure
const clients = ref([
  {
    id: null,
    name: 'Ramiro Ochoa',
    initials: 'RO',
    companyName: '',
    email: '',
    phone: '',
    amountDue: 50000,
    status: 'active'
  },
  {
    id: '22012025',
    name: 'Isaac Salas',
    initials: 'IS',
    companyName: '',
    email: 'ngonzalosuarez@gmail.com',
    phone: '',
    amountDue: 100000,
    status: 'active'
  },
  {
    id: '22012026',
    name: 'María González',
    initials: 'MG',
    companyName: 'Clínica San Juan',
    email: 'm.gonzalez@clinica.com',
    phone: '+54 11 4567-8901',
    amountDue: 75000,
    status: 'active'
  },
  {
    id: '22012027',
    name: 'Carlos Mendez',
    initials: 'CM',
    companyName: 'Hospital Central',
    email: 'c.mendez@hospital.com',
    phone: '+54 11 2345-6789',
    amountDue: 120000,
    status: 'active'
  },
  {
    id: '22012028',
    name: 'Ana Silva',
    initials: 'AS',
    companyName: '',
    email: 'a.silva@email.com',
    phone: '+54 11 9876-5432',
    amountDue: 45000,
    status: 'inactive'
  },
  {
    id: '22012029',
    name: 'Roberto Torres',
    initials: 'RT',
    companyName: 'Laboratorio MedTech',
    email: 'r.torres@medtech.com',
    phone: '+54 11 1111-2222',
    amountDue: 85000,
    status: 'active'
  }
])

// Computed properties
const filteredClients = computed(() => {
  let filtered = clients.value

  if (selectedStatus.value && selectedStatus.value !== 'all') {
    if (selectedStatus.value === 'active') {
      filtered = filtered.filter(client => client.status === 'active')
    } else if (selectedStatus.value === 'inactive') {
      filtered = filtered.filter(client => client.status === 'inactive')
    }
  } else if (selectedStatus.value === '') {
    // Default: show only active clients
    filtered = filtered.filter(client => client.status === 'active')
  }

  if (searchQuery.value) {
    filtered = filtered.filter(client => 
      client.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (client.companyName && client.companyName.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (client.email && client.email.toLowerCase().includes(searchQuery.value.toLowerCase()))
    )
  }

  return filtered
})

const paginatedClients = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredClients.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredClients.value.length / itemsPerPage.value)
})

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const endIndex = computed(() => {
  return Math.min(currentPage.value * itemsPerPage.value, filteredClients.value.length)
})

const totalClients = computed(() => clients.value.length)

const activeClients = computed(() => 
  clients.value.filter(client => client.status === 'active').length
)

const totalAmount = computed(() => 
  clients.value.reduce((sum, client) => sum + client.amountDue, 0)
)

const totalAmountFormatted = computed(() => 
  totalAmount.value.toLocaleString('es-AR')
)

const averageAmount = computed(() => 
  totalClients.value > 0 ? Math.round(totalAmount.value / totalClients.value) : 0
)

const averageAmountFormatted = computed(() => 
  averageAmount.value.toLocaleString('es-AR')
)

// Methods
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
button {
  cursor: pointer;
}

input[type="checkbox"] {
  cursor: pointer;
}
</style>