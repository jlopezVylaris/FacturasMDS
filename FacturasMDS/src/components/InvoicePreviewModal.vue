<template>
  <div v-if="isVisible" class="fixed inset-0 z-50 overflow-y-auto" @click="handleBackdropClick">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>

      <!-- Modal panel -->
      <div class="inline-block w-full max-w-5xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg" @click.stop>
        <!-- Modal header -->
        <div class="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
          <div>
            <h3 class="text-lg font-medium text-gray-900">Vista previa de factura</h3>
            <p class="text-sm text-gray-500">{{ invoice.number }} - {{ invoice.clientName }}</p>
          </div>
          <div class="flex items-center space-x-3">
            <button
              @click="downloadPDF"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Descargar PDF
            </button>
            <button
              @click="closeModal"
              class="inline-flex items-center p-2 border border-transparent rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors cursor-pointer"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Modal content -->
        <div class="px-6 py-6 max-h-[80vh] overflow-y-auto">
          <div class="flex justify-center">
            <div class="w-full max-w-4xl">
              <!-- Vista previa de la factura -->
              <div class="bg-white border border-gray-200 rounded-lg shadow-sm">
                <InvoicePDF 
                  ref="invoicePDFRef"
                  :invoice="invoice"
                  @pdf-generated="handlePDFGenerated"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Modal footer -->
        <div class="px-6 py-3 bg-gray-50 border-t sm:flex sm:flex-row-reverse">
          <button
            @click="downloadPDF"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors cursor-pointer"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Descargar PDF
          </button>
          <button
            @click="closeModal"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InvoicePDF from './InvoicePDF.vue'

// Props
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  invoice: {
    type: Object,
    default: null
  }
})

// Emits
const emit = defineEmits(['close', 'pdf-downloaded'])

// Refs
const invoicePDFRef = ref(null)

// Methods
const closeModal = () => {
  emit('close')
}

const handleBackdropClick = (event) => {
  if (event.target === event.currentTarget) {
    closeModal()
  }
}

const downloadPDF = async () => {
  if (invoicePDFRef.value && props.invoice) {
    await invoicePDFRef.value.generatePDF()
    emit('pdf-downloaded', props.invoice.number)
  }
}

const handlePDFGenerated = (invoiceNumber) => {
  console.log(`PDF generado para factura: ${invoiceNumber}`)
  // No cerrar el modal automáticamente para permitir múltiples descargas
}

// Handle ESC key
const handleKeyDown = (event) => {
  if (event.key === 'Escape') {
    closeModal()
  }
}

// Add/remove event listeners
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
/* Prevent body scroll when modal is open */
body.modal-open {
  overflow: hidden;
}

/* Custom scrollbar for modal content */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>