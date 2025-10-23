<template>
  <MainLayout>
    <!-- Page Content -->

    <!-- Stats Cards -->
    <div class="px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg border border-teal-100 p-6 hover:shadow-xl transition-all duration-300">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-teal-600">Pagadas</p>
              <p class="text-2xl font-bold text-teal-800">$76,940</p>
              <p class="text-sm text-teal-500">350 facturas</p>
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
              <p class="text-sm font-medium text-teal-600">Pendientes</p>
              <p class="text-2xl font-bold text-teal-800">$23,145</p>
              <p class="text-sm text-teal-500">64 facturas</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg border border-teal-100 p-6 hover:shadow-xl transition-all duration-300">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-rose-100 to-rose-200 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-teal-600">Vencidas</p>
              <p class="text-2xl font-bold text-teal-800">$7,431</p>
              <p class="text-sm text-teal-500">14 facturas</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg border border-teal-100 p-6 hover:shadow-xl transition-all duration-300">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-teal-600">Total</p>
              <p class="text-2xl font-bold text-teal-800">$107,516</p>
              <p class="text-sm text-teal-500">428 facturas</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="bg-white rounded-xl shadow-lg border border-teal-100 mb-6">
        <div class="p-6 border-b border-teal-100">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div class="flex-1 max-w-lg">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input type="text" v-model="searchQuery" placeholder="Buscar facturas..." class="block w-full pl-10 pr-3 py-3 border border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200">
              </div>
            </div>
            <div class="flex items-center gap-3">
              <select v-model="statusFilter" class="block w-full px-4 py-3 border border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-teal-700">
                <option value="">Todos los estados</option>
                <option value="paid">Pagadas</option>
                <option value="pending">Pendientes</option>
                <option value="overdue">Vencidas</option>
              </select>
              <button class="px-4 py-3 text-teal-600 bg-teal-50 border border-teal-200 rounded-xl hover:bg-teal-100 transition-all duration-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Invoice Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-teal-100">
            <thead class="bg-gradient-to-r from-teal-50 to-cyan-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
                  <input type="checkbox" class="h-4 w-4 text-teal-600 focus:ring-teal-500 border-teal-300 rounded">
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">Cliente</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">Email</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">Fecha Emisión</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">Fecha Vencimiento</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">Monto</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">Estado</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-teal-50">
              <tr v-for="invoice in filteredInvoices" :key="invoice.id" class="hover:bg-teal-25 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" class="h-4 w-4 text-teal-600 focus:ring-teal-500 border-teal-300 rounded">
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-12 w-12 flex-shrink-0">
                      <div class="h-12 w-12 rounded-full bg-gradient-to-br from-teal-100 to-cyan-200 flex items-center justify-center border-2 border-teal-200">
                        <span class="text-sm font-semibold text-teal-700">{{ getInitials(invoice.client) }}</span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-semibold text-teal-800">{{ invoice.client }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-teal-600">{{ invoice.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-teal-600">{{ formatDate(invoice.issueDate) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-teal-600">{{ formatDate(invoice.dueDate) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-teal-800">${{ invoice.amount.toLocaleString() }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusBadgeClass(invoice.status)" class="inline-flex px-3 py-1 text-xs font-semibold rounded-full">
                    {{ getStatusText(invoice.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center space-x-3">
                    <button @click="viewInvoice(invoice)" class="text-teal-600 hover:text-teal-800 font-medium transition-colors duration-200 cursor-pointer">Ver</button>
                    <button class="text-cyan-600 hover:text-cyan-800 font-medium transition-colors duration-200 cursor-pointer">Editar</button>
                    <button class="text-rose-600 hover:text-rose-800 font-medium transition-colors duration-200 cursor-pointer">Eliminar</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="bg-gradient-to-r from-teal-50 to-cyan-50 px-6 py-4 border-t border-teal-100">
          <div class="flex items-center justify-between">
            <div class="text-sm text-teal-700 font-medium">
              Mostrando <span class="font-semibold text-teal-800">1</span> a <span class="font-semibold text-teal-800">10</span> de <span class="font-semibold text-teal-800">{{ invoices.length }}</span> resultados
            </div>
            <div class="flex items-center space-x-2">
              <button class="px-4 py-2 text-sm text-teal-600 bg-white border border-teal-200 rounded-lg hover:bg-teal-50 transition-all duration-200">Anterior</button>
              <button class="px-4 py-2 text-sm bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg shadow-sm">1</button>
              <button class="px-4 py-2 text-sm text-teal-600 bg-white border border-teal-200 rounded-lg hover:bg-teal-50 transition-all duration-200">2</button>
              <button class="px-4 py-2 text-sm text-teal-600 bg-white border border-teal-200 rounded-lg hover:bg-teal-50 transition-all duration-200">3</button>
              <button class="px-4 py-2 text-sm text-teal-600 bg-white border border-teal-200 rounded-lg hover:bg-teal-50 transition-all duration-200">Siguiente</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Invoice Preview Modal -->
    <InvoicePreviewModal
      :isVisible="isModalVisible"
      :invoice="selectedInvoice"
      @close="closeModal"
      @pdf-downloaded="handlePDFDownloaded"
    />
  </MainLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import MainLayout from '../components/Layout/MainLayout.vue'
import InvoicePreviewModal from '../components/InvoicePreviewModal.vue'

const searchQuery = ref('')
const statusFilter = ref('')
const selectedInvoice = ref(null)
const isModalVisible = ref(false)

// Sample invoice data
const invoices = ref([
  {
    id: 1,
    number: 'TAP-2025-001',
    client: 'Dr. María González',
    clientName: 'Dr. María González Fernández',
    clientAddress: 'Consultorios Médicos San Juan, Av. San Martín 456',
    email: 'maria.gonzalez@consultoriosanjuan.com',
    issueDate: new Date('2025-09-03'),
    date: new Date('2025-09-03'),
    dueDate: new Date('2025-09-03'),
    amount: 72000,
    totalAmount: 72000,
    subtotal: 72000,
    paidAmount: 72000,
    status: 'paid',
    terms: 'Pagadero a la recepción',
    items: [
      {
        description: 'Consulta médica especializada - Cardiología',
        quantity: 1.00,
        rate: 72000.00,
        amount: 72000.00
      }
    ]
  },
  {
    id: 2,
    number: 'TAP-2025-002',
    client: 'Clínica San Juan',
    clientName: 'Clínica San Juan S.A.',
    clientAddress: 'Av. Colón 1250, Córdoba Capital',
    email: 'facturacion@clinicasanjuan.com',
    issueDate: new Date('2025-10-15'),
    date: new Date('2025-10-15'),
    dueDate: new Date('2025-10-22'),
    amount: 145000,
    totalAmount: 145000,
    subtotal: 145000,
    paidAmount: 0,
    status: 'pending',
    terms: 'Pagadero a 7 días',
    items: [
      {
        description: 'Procedimiento quirúrgico menor - Cirugía ambulatoria',
        quantity: 1.00,
        rate: 145000.00,
        amount: 145000.00
      }
    ]
  },
  {
    id: 3,
    number: 'TAP-2025-003',
    client: 'Hospital Central',
    clientName: 'Hospital Central de Córdoba',
    clientAddress: 'Av. Patria 750, Nueva Córdoba',
    email: 'administracion@hospitalcentral.gov.ar',
    issueDate: new Date('2025-10-20'),
    date: new Date('2025-10-20'),
    dueDate: new Date('2025-10-20'),
    amount: 89500,
    totalAmount: 89500,
    subtotal: 89500,
    paidAmount: 89500,
    status: 'paid',
    terms: 'Pagadero a la recepción',
    items: [
      {
        description: 'Estudios de diagnóstico por imágenes - Resonancia Magnética',
        quantity: 1.00,
        rate: 89500.00,
        amount: 89500.00
      }
    ]
  },
  {
    id: 4,
    number: 'TAP-2025-004',
    client: 'TAP Medicina S.A.',
    clientName: 'TAP Medicina S.A. - Servicios Médicos',
    clientAddress: 'Av. Córdoba 1234, Piso 5, Córdoba',
    email: 'contabilidad@tapmedicina.com',
    issueDate: new Date('2025-08-15'),
    date: new Date('2025-08-15'),
    dueDate: new Date('2025-08-22'),
    amount: 167200,
    totalAmount: 167200,
    subtotal: 167200,
    paidAmount: 0,
    status: 'overdue',
    terms: 'Pagadero a 7 días',
    items: [
      {
        description: 'Análisis clínicos completos - Laboratorio',
        quantity: 1.00,
        rate: 120000.00,
        amount: 120000.00
      },
      {
        description: 'Estudios bioquímicos especializados',
        quantity: 1.00,
        rate: 47200.00,
        amount: 47200.00
      }
    ]
  },
  {
    id: 5,
    number: 'TAP-2025-005',
    client: 'Dr. Carlos Ruiz',
    clientName: 'Dr. Carlos Ruiz Méndez - Medicina Interna',
    clientAddress: 'Centro Médico Privado, Av. Vélez Sarsfield 234',
    email: 'carlos.ruiz@centromedicoprivado.com',
    issueDate: new Date('2025-10-18'),
    date: new Date('2025-10-18'),
    dueDate: new Date('2025-10-25'),
    amount: 198000,
    totalAmount: 198000,
    subtotal: 198000,
    paidAmount: 0,
    status: 'pending',
    terms: 'Pagadero a 7 días',
    items: [
      {
        description: 'Cirugía ambulatoria - Procedimiento especializado',
        quantity: 1.00,
        rate: 150000.00,
        amount: 150000.00
      },
      {
        description: 'Consulta post-operatoria',
        quantity: 1.00,
        rate: 48000.00,
        amount: 48000.00
      }
    ]
  },
  {
    id: 6,
    number: 'TAP-2025-006',
    client: 'Laboratorio Médico ABC',
    clientName: 'Laboratorio ABC Diagnósticos S.R.L.',
    clientAddress: 'Av. Rafael Núñez 3456, Cerro de las Rosas',
    email: 'facturacion@labABCdiagnosticos.com',
    issueDate: new Date('2025-10-21'),
    date: new Date('2025-10-21'),
    dueDate: new Date('2025-10-21'),
    amount: 134500,
    totalAmount: 134500,
    subtotal: 134500,
    paidAmount: 134500,
    status: 'paid',
    terms: 'Pagadero a la recepción',
    items: [
      {
        description: 'Estudios de laboratorio - Perfil bioquímico completo',
        quantity: 1.00,
        rate: 89000.00,
        amount: 89000.00
      },
      {
        description: 'Análisis microbiológicos',
        quantity: 1.00,
        rate: 45500.00,
        amount: 45500.00
      }
    ]
  },
  {
    id: 7,
    number: 'TAP-2025-007',
    client: 'Farmacia Cruz Verde',
    clientName: 'Farmacia Cruz Verde S.A.',
    clientAddress: 'Av. General Paz 1890, Barrio Güemes',
    email: 'administracion@farmaciaCruzVerde.com.ar',
    issueDate: new Date('2025-10-05'),
    date: new Date('2025-10-05'),
    dueDate: new Date('2025-10-05'),
    amount: 156700,
    totalAmount: 156700,
    subtotal: 156700,
    paidAmount: 156700,
    status: 'paid',
    terms: 'Pagadero a la recepción',
    items: [
      {
        description: 'Medicamentos especializados - Tratamiento oncológico',
        quantity: 1.00,
        rate: 105000.00,
        amount: 105000.00
      },
      {
        description: 'Suplementos nutricionales terapéuticos',
        quantity: 1.00,
        rate: 51700.00,
        amount: 51700.00
      }
    ]
  },
  {
    id: 8,
    number: 'TAP-2025-008',
    client: 'Dr. Ana Martínez',
    clientName: 'Dra. Ana Martínez López - Ginecología y Obstetricia',
    clientAddress: 'Instituto Médico de la Mujer, Av. Hipólito Yrigoyen 567',
    email: 'ana.martinez@institutomedico.com.ar',
    issueDate: new Date('2025-07-15'),
    date: new Date('2025-07-15'),
    dueDate: new Date('2025-07-22'),
    amount: 223000,
    totalAmount: 223000,
    subtotal: 223000,
    paidAmount: 0,
    status: 'overdue',
    terms: 'Pagadero a 7 días',
    items: [
      {
        description: 'Tratamiento especializado - Fertilidad asistida',
        quantity: 1.00,
        rate: 180000.00,
        amount: 180000.00
      },
      {
        description: 'Consultas de seguimiento (3 sesiones)',
        quantity: 3.00,
        rate: 14333.33,
        amount: 43000.00
      }
    ]
  }
])

const filteredInvoices = computed(() => {
  let filtered = invoices.value

  if (searchQuery.value) {
    filtered = filtered.filter(invoice => 
      invoice.client.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      invoice.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(invoice => invoice.status === statusFilter.value)
  }

  return filtered
})

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'paid':
      return 'bg-emerald-100 text-emerald-800 border border-emerald-200'
    case 'pending':
      return 'bg-amber-100 text-amber-800 border border-amber-200'
    case 'overdue':
      return 'bg-rose-100 text-rose-800 border border-rose-200'
    default:
      return 'bg-teal-100 text-teal-800 border border-teal-200'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'paid':
      return 'Pagada'
    case 'pending':
      return 'Pendiente'
    case 'overdue':
      return 'Vencida'
    default:
      return 'Desconocido'
  }
}

// PDF Functions
const viewInvoice = (invoice) => {
  selectedInvoice.value = invoice
  isModalVisible.value = true
  // Prevenir scroll del body cuando el modal esté abierto
  document.body.classList.add('modal-open')
}

const closeModal = () => {
  isModalVisible.value = false
  selectedInvoice.value = null
  // Restaurar scroll del body
  document.body.classList.remove('modal-open')
}

const handlePDFDownloaded = (invoiceNumber) => {
  console.log(`PDF descargado para factura: ${invoiceNumber}`)
  // Opcional: mostrar notificación de éxito
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>

<style>
/* Global styles for modal */
body.modal-open {
  overflow: hidden;
}
</style>
