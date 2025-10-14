<template>
  <MainLayout>
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Portal Cliente</h1>
        <p class="mt-1 text-sm text-gray-600">Ingrese su código de referencia para ver el estado de su deuda y opciones de pago.</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow border mb-6">
        <label class="block text-sm font-medium text-gray-700">Código de consulta / referencia</label>
        <div class="mt-2 flex space-x-2">
          <input v-model="code" type="text" placeholder="Ej: 000014674" class="flex-1 rounded-md border-gray-300 p-2" />
          <button @click="lookup" class="px-4 py-2 rounded bg-teal-600 text-white">Buscar</button>
        </div>
        <p v-if="error" class="text-sm text-red-600 mt-2">{{ error }}</p>
      </div>

      <div v-if="result" class="bg-white rounded-xl shadow-lg border border-teal-100 overflow-hidden mb-8">
        <div class="px-6 py-4 border-b bg-gradient-to-r from-teal-50 to-cyan-50">
          <h2 class="text-lg font-semibold text-teal-800">Resultado</h2>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Concepto</p>
              <p class="text-base font-medium text-gray-900">{{ result.concept }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Referencia</p>
              <p class="text-base font-medium text-gray-900">{{ result.reference }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Código</p>
              <p class="text-base font-medium text-gray-900">{{ result.code }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Estado</p>
              <p :class="result.status === 'paid' ? 'text-green-600 font-semibold' : 'text-yellow-600 font-semibold'">{{ result.status === 'paid' ? 'Pagada' : 'Pendiente' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Monto</p>
              <p class="text-xl font-bold text-teal-600">${{ result.amount.toLocaleString() }}</p>
            </div>

            <div>
              <p class="text-sm text-gray-500">Fecha de Emisión</p>
              <p class="text-base font-medium text-gray-900">{{ formatDate(result.issuedAt) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Fecha de Vencimiento</p>
              <p class="text-base font-medium text-gray-900">{{ formatDate(result.dueDate) }}</p>
            </div>

            <div>
              <p class="text-sm text-gray-500">Titular</p>
              <p class="text-base font-medium text-gray-900">{{ result.payerName || '—' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Tipo de deuda</p>
              <p class="text-base font-medium text-gray-900">{{ result.type || 'Factura' }}</p>
            </div>
          </div>

          <div class="mt-6">
            <!-- Payment Method Selection (copied from ProcessPaymentView) -->
            <div class="bg-white rounded-xl shadow-lg border border-teal-100 overflow-hidden mb-6">
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

            <!-- Payment Instructions (copied from ProcessPaymentView) -->
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

            <!-- Action Buttons (Cancel + Confirm) -->
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
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MainLayout from '../components/Layout/MainLayout.vue'

const code = ref('')
const result = ref(null)
const error = ref('')
const paymentMessage = ref('')
const selectedMethod = ref('')

const router = useRouter()

// Simulación enriquecida: buscar por código en un array estático.
const sampleData = [
  {
    id: 1,
    concept: 'Consulta Cardiología',
    reference: 'PAY-2024-001',
    code: '000014674',
    amount: 180.0,
    status: 'pending',
    issuedAt: '2024-01-10',
    dueDate: '2024-01-20',
    payerName: 'Juan Pérez',
    type: 'Consulta'
  },
  {
    id: 2,
    concept: 'Ecografía Abdominal',
    reference: 'PAY-2024-002',
    code: '000014675',
    amount: 120.0,
    status: 'paid',
    issuedAt: '2024-02-01',
    dueDate: '2024-02-15',
    payerName: 'María López',
    type: 'Estudio',
    payment: {
      method: 'credit_card',
      paidAt: '2024-02-03',
      transactionId: 'TXN-482902'
    }
  },
  {
    id: 3,
    concept: 'Análisis de Laboratorio',
    reference: 'LAB-2025-100',
    code: '000014676',
    amount: 60.0,
    status: 'pending',
    issuedAt: '2025-06-10',
    dueDate: '2025-06-20',
    payerName: 'Pedro García',
    type: 'Análisis'
  },
  {
    id: 4,
    concept: 'Consulta Pediatría',
    reference: 'PAY-2024-010',
    code: '000014677',
    amount: 200.0,
    status: 'paid',
    issuedAt: '2024-03-05',
    dueDate: '2024-03-20',
    payerName: 'Laura Martínez',
    type: 'Consulta',
    payment: {
      method: 'bank_transfer',
      paidAt: '2024-03-10',
      transactionId: 'TRF-99201'
    }
  },
  {
    id: 5,
    concept: 'Terapia Física - Sesión',
    reference: 'THER-2025-55',
    code: '000014678',
    amount: 90.0,
    status: 'pending',
    issuedAt: '2025-08-01',
    dueDate: '2025-08-10',
    payerName: 'Ana Ruiz',
    type: 'Terapia'
  }
]

const lookup = () => {
  error.value = ''
  paymentMessage.value = ''
  if (!code.value) {
    error.value = 'Por favor ingrese un código.'
    return
  }
  const q = code.value.trim().toLowerCase()
  // Buscar primero por código numérico exacto (sin ceros) o por referencia
  let found = sampleData.find(d => (d.code && d.code.toLowerCase() === q) || (d.reference && d.reference.toLowerCase() === q))
  // Si el usuario ingresó solo números sin ceros a la izquierda, comparar también después de normalizar
  if (!found && /^[0-9]+$/.test(q)) {
    const normalized = q.padStart(9, '0')
    found = sampleData.find(d => d.code && d.code === normalized)
  }
  if (!found) {
    error.value = 'Código no encontrado. Verifique e intente nuevamente.'
    result.value = null
    return
  }
  result.value = found
}


const processPayment = () => {
  if (!selectedMethod.value || !result.value) return
  // Aquí iría la lógica de procesamiento real. Simulamos el pago.
  const now = new Date().toISOString()
  const txn = generateTxnId()
  result.value.status = 'paid'
  result.value.payment = {
    method: selectedMethod.value,
    paidAt: now,
    transactionId: txn
  }
  alert('Pago procesado correctamente')
  router.push({ name: 'PaymentHistory' })
}

const generateTxnId = () => {
  return 'SIM-' + Math.random().toString(36).substring(2, 10).toUpperCase()
}

const formatDate = (date) => {
  if (!date) return ''
  try {
    return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date))
  } catch (e) {
    return date
  }
}
</script>

<style scoped>
/* Estilos mínimos para el portal */
</style>
