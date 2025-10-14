<template>
  <MainLayout>
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Procesar Pago</h1>
        <p class="mt-2 text-sm text-gray-600">Complete los detalles para realizar el pago</p>
      </div>

      <!-- Payment Details Card -->
      <div class="bg-white rounded-xl shadow-lg border border-teal-100 overflow-hidden mb-8">
        <div class="px-6 py-4 border-b border-teal-100 bg-gradient-to-r from-teal-50 to-cyan-50">
          <h2 class="text-lg font-semibold text-teal-800">Detalles del Pago</h2>
        </div>
        
        <div class="p-6">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <p class="text-sm text-gray-500">Concepto</p>
              <p class="text-base font-medium text-gray-900">{{ payment?.concept }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Referencia</p>
              <p class="text-base font-medium text-gray-900">{{ payment?.reference }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Fecha de Vencimiento</p>
              <p class="text-base font-medium text-gray-900">{{ formatDate(payment?.dueDate) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Monto a Pagar</p>
              <p class="text-xl font-bold text-teal-600">${{ payment?.amount.toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Method Selection -->
      <div class="bg-white rounded-xl shadow-lg border border-teal-100 overflow-hidden mb-8">
        <div class="px-6 py-4 border-b border-teal-100 bg-gradient-to-r from-teal-50 to-cyan-50">
          <h2 class="text-lg font-semibold text-teal-800">Método de Pago</h2>
        </div>
        
        <div class="p-6">
          <div class="grid grid-cols-1 gap-4">
            <label class="relative flex items-center p-4 border rounded-lg cursor-pointer hover:bg-teal-50 transition-colors duration-200"
                   :class="selectedMethod === 'credit_card' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'">
              <input type="radio" v-model="selectedMethod" value="credit_card" class="sr-only">
              <span class="flex items-center">
                <svg class="w-6 h-6 text-teal-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
                <span class="font-medium text-gray-900">Tarjeta de Crédito</span>
              </span>
            </label>

            <label class="relative flex items-center p-4 border rounded-lg cursor-pointer hover:bg-teal-50 transition-colors duration-200"
                   :class="selectedMethod === 'bank_transfer' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'">
              <input type="radio" v-model="selectedMethod" value="bank_transfer" class="sr-only">
              <span class="flex items-center">
                <svg class="w-6 h-6 text-teal-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
                </svg>
                <span class="font-medium text-gray-900">Transferencia Bancaria</span>
              </span>
            </label>

            <label class="relative flex items-center p-4 border rounded-lg cursor-pointer hover:bg-teal-50 transition-colors duration-200"
                   :class="selectedMethod === 'qr' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'">
              <input type="radio" v-model="selectedMethod" value="qr" class="sr-only">
              <span class="flex items-center">
                <svg class="w-6 h-6 text-teal-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
                </svg>
                <span class="font-medium text-gray-900">Pago con QR</span>
              </span>
            </label>
          </div>
        </div>
      </div>

      <!-- Payment Instructions -->
      <div v-if="selectedMethod" class="bg-white rounded-xl shadow-lg border border-teal-100 overflow-hidden mb-8">
        <div class="px-6 py-4 border-b border-teal-100 bg-gradient-to-r from-teal-50 to-cyan-50">
          <h2 class="text-lg font-semibold text-teal-800">Instrucciones de Pago</h2>
        </div>
        
        <div class="p-6">
          <div v-if="selectedMethod === 'bank_transfer'" class="space-y-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h3 class="font-medium text-blue-800 mb-2">Datos para la transferencia</h3>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p class="text-blue-600">Banco:</p>
                  <p class="font-medium text-blue-900">Banco de la Nación Argentina</p>
                </div>
                <div>
                  <p class="text-blue-600">Tipo de Cuenta:</p>
                  <p class="font-medium text-blue-900">Cuenta Corriente</p>
                </div>
                <div>
                  <p class="text-blue-600">CBU:</p>
                  <p class="font-medium text-blue-900">0110599520000001234567</p>
                </div>
                <div>
                  <p class="text-blue-600">Alias:</p>
                  <p class="font-medium text-blue-900">TAP.MEDICINA.PAGOS</p>
                </div>
              </div>
            </div>
            <div class="text-sm text-gray-600">
              <p>Una vez realizada la transferencia, envíe el comprobante a:</p>
              <p class="font-medium text-teal-600 mt-1">pagos@tapmedicina.com</p>
            </div>
          </div>

          <div v-else-if="selectedMethod === 'qr'" class="text-center">
            <div class="mx-auto w-48 h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <svg class="w-32 h-32 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                <rect x="4" y="4" width="6" height="6" rx="1"/>
                <rect x="14" y="4" width="6" height="6" rx="1"/>
                <rect x="4" y="14" width="6" height="6" rx="1"/>
                <path d="M14 14h2m4 0h-2m-2 2h2m-2 4h6"/>
              </svg>
            </div>
            <p class="text-sm text-gray-600">Escanee el código QR con su aplicación de pagos</p>
            <p class="mt-2 text-xs text-teal-600">El código QR se generará al momento de procesar el pago</p>
          </div>

          <div v-else-if="selectedMethod === 'credit_card'" class="space-y-4">
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Número de Tarjeta</label>
                <input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500">
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Fecha de Vencimiento</label>
                  <input type="text" placeholder="MM/YY" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Código de Seguridad</label>
                  <input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500">
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Nombre en la Tarjeta</label>
                <input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end space-x-4">
        <router-link 
          :to="{ name: 'PendingPayments' }" 
          class="px-6 py-3 border border-teal-200 text-teal-700 rounded-lg hover:bg-teal-50 transition-colors duration-200"
        >
          Cancelar
        </router-link>
        <button 
          @click="processPayment"
          class="px-6 py-3 text-white rounded-lg transition-colors duration-200"
          :class="{ 'opacity-50 cursor-not-allowed': !selectedMethod }"
          :disabled="!selectedMethod"
          style="background-color: #00A64C;"
        >
          Confirmar Pago
        </button>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MainLayout from '../components/Layout/MainLayout.vue'

const route = useRoute()
const router = useRouter()
const selectedMethod = ref('')
const payment = ref(null)

// Simulando obtención de datos del pago
onMounted(() => {
  // En un caso real, estos datos vendrían de una API
  payment.value = {
    id: parseInt(route.params.id),
    concept: 'Consulta Cardiología',
    reference: 'PAY-2024-001',
    dueDate: new Date('2024-01-20'),
    amount: 180.00,
    status: 'pending'
  }
})

const formatDate = (date) => {
  if (!date) return ''
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(date))
}

const processPayment = () => {
  // Aquí iría la lógica de procesamiento del pago
  alert('Pago procesado correctamente')
  router.push({ name: 'PaymentHistory' })
}
</script>