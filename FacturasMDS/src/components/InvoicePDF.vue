<template>
  <div class="invoice-container" ref="invoiceRef" style="background: white; padding: 40px; font-family: Arial, sans-serif; width: 210mm; margin: 0 auto;">
    <!-- Header -->
    <div class="invoice-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px;">
      <!-- Left side - Company info -->
      <div class="company-info" style="position: relative;">
        <!-- Dynamic Status ribbon -->
        <div v-if="showStatusRibbon" :style="ribbonStyle" style="position: absolute; top: -10px; left: -10px; color: white; padding: 8px 20px; font-size: 12px; font-weight: bold; transform: rotate(-15deg); z-index: 10;">
          {{ statusText }}
        </div>
        <div style="border: 2px solid #ddd; padding: 20px; background: #f9f9f9; margin-top: 10px;">
          <h2 style="margin: 0; font-size: 18px; font-weight: bold; color: #333;">{{ companyName }}</h2>
          <p style="margin: 5px 0; color: #666; font-size: 14px;">{{ companyAddress }}</p>
          <p style="margin: 5px 0; color: #666; font-size: 14px;">{{ companyLocation }}</p>
          <p style="margin: 5px 0; color: #666; font-size: 14px;">{{ companyCountry }}</p>
          <p v-if="companyPhone" style="margin: 5px 0; color: #666; font-size: 14px;">Tel: {{ companyPhone }}</p>
          <p v-if="companyEmail" style="margin: 5px 0; color: #666; font-size: 14px;">{{ companyEmail }}</p>
          <p v-if="companyWebsite" style="margin: 5px 0; color: #666; font-size: 14px;">{{ companyWebsite }}</p>
        </div>
      </div>

      <!-- Right side - Invoice info -->
      <div class="invoice-info" style="text-align: right;">
        <h1 style="margin: 0; font-size: 36px; font-weight: normal; color: #022031; margin-bottom: 20px;">Factura</h1>
        <div style="margin-bottom: 10px;">
          <span style="font-size: 14px; color: #666;"># {{ invoice.number }}</span>
        </div>
        <div style="margin-top: 20px; text-align: right;">
          <div style="margin-bottom: 15px;">
            <span style="font-size: 14px; color: #666; margin-right: 10px;">{{ balanceLabel }}</span>
            <div style="font-size: 24px; font-weight: bold; color: #333;">{{ formatCurrency(balanceAmount) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Invoice details -->
    <div class="invoice-details" style="margin-bottom: 30px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #666; width: 200px;">Fecha de la factura :</td>
          <td style="padding: 8px 0; text-align: right;">{{ formatDate(invoice.date) }}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">Términos :</td>
          <td style="padding: 8px 0; text-align: right;">{{ invoice.terms || 'Pagadero a la recepción' }}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">Fecha de vencimiento :</td>
          <td style="padding: 8px 0; text-align: right;">{{ formatDate(invoice.dueDate) }}</td>
        </tr>
      </table>
    </div>

    <!-- Client info -->
    <div class="client-info" style="margin-bottom: 30px;">
      <div style="margin-bottom: 10px;">
        <span style="font-size: 14px; color: #666;">Facturar a</span>
      </div>
      <div style="color: #00A64C; font-size: 14px; font-weight: 500;">
        {{ invoice.clientName }}
      </div>
      <div v-if="invoice.clientAddress" style="color: #666; font-size: 12px; margin-top: 5px;">
        {{ invoice.clientAddress }}
      </div>
      <div v-if="invoice.email" style="color: #666; font-size: 12px; margin-top: 3px;">
        {{ invoice.email }}
      </div>
    </div>

    <!-- Items table -->
    <div class="items-table" style="margin-bottom: 30px;">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #022031; color: white;">
            <th style="padding: 12px; text-align: center; font-size: 14px; font-weight: 600;">#</th>
            <th style="padding: 12px; text-align: left; font-size: 14px; font-weight: 600;">Artículo & Descripción</th>
            <th style="padding: 12px; text-align: center; font-size: 14px; font-weight: 600;">Cant.</th>
            <th style="padding: 12px; text-align: center; font-size: 14px; font-weight: 600;">Tarifa</th>
            <th style="padding: 12px; text-align: center; font-size: 14px; font-weight: 600;">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in invoice.items" :key="index" style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px; text-align: center; font-size: 14px;">{{ index + 1 }}</td>
            <td style="padding: 12px; font-size: 14px;">{{ item.description }}</td>
            <td style="padding: 12px; text-align: center; font-size: 14px;">{{ formatQuantity(item.quantity) }}</td>
            <td style="padding: 12px; text-align: center; font-size: 14px;">{{ formatCurrency(item.rate) }}</td>
            <td style="padding: 12px; text-align: center; font-size: 14px;">{{ formatCurrency(item.amount) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Totals -->
    <div class="totals" style="margin-left: auto; width: 300px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 8px 12px; text-align: right; color: #666; background: #f9f9f9;">Subtotal</td>
          <td style="padding: 8px 12px; text-align: right; background: #f9f9f9;">{{ formatCurrency(invoice.subtotal) }}</td>
        </tr>
        <tr v-if="invoice.tax && invoice.tax > 0">
          <td style="padding: 8px 12px; text-align: right; color: #666; background: #f9f9f9;">Impuestos</td>
          <td style="padding: 8px 12px; text-align: right; background: #f9f9f9;">{{ formatCurrency(invoice.tax) }}</td>
        </tr>
        <tr v-if="invoice.discount && invoice.discount > 0">
          <td style="padding: 8px 12px; text-align: right; color: #666; background: #f9f9f9;">Descuento</td>
          <td style="padding: 8px 12px; text-align: right; background: #f9f9f9;">-{{ formatCurrency(invoice.discount) }}</td>
        </tr>
        <tr style="border-top: 2px solid #022031;">
          <td style="padding: 12px; text-align: right; font-weight: bold; font-size: 16px;">Total</td>
          <td style="padding: 12px; text-align: right; font-weight: bold; font-size: 16px;">{{ formatCurrency(invoice.totalAmount) }}</td>
        </tr>
        <tr v-if="invoice.status === 'paid'" style="background: #e8f5e8;">
          <td style="padding: 12px; text-align: right; font-weight: bold; color: #10B981;">Total pagado</td>
          <td style="padding: 12px; text-align: right; font-weight: bold; color: #10B981;">{{ formatCurrency(invoice.totalAmount) }}</td>
        </tr>
        <tr v-else style="background: #f0f0f0;">
          <td style="padding: 12px; text-align: right; font-weight: bold; color: #666;">{{ balanceLabel }}</td>
          <td style="padding: 12px; text-align: right; font-weight: bold; color: #333;">{{ formatCurrency(balanceAmount) }}</td>
        </tr>
      </table>
    </div>

    <!-- Footer with additional info -->
    <div class="invoice-footer" style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
      <div style="display: flex; justify-content: space-between; font-size: 12px; color: #666;">
        <div>
          <p style="margin: 0; font-weight: bold; color: #022031;">TAP MEDICINA</p>
          <p style="margin: 5px 0;">Sistema de Facturación Médica</p>
          <p style="margin: 5px 0;">Generado el {{ formatDateTime(new Date()) }}</p>
        </div>
        <div style="text-align: right;">
          <p style="margin: 0;">Para consultas:</p>
          <p style="margin: 5px 0;">{{ companyEmail }}</p>
          <p style="margin: 5px 0;">{{ companyPhone }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

// Props
const props = defineProps({
  invoice: {
    type: Object,
    required: true
  },
  companyName: {
    type: String,
    default: 'TAP MEDICINA S.A.'
  },
  companyAddress: {
    type: String,
    default: 'Av. Córdoba 1234, Piso 5'
  },
  companyLocation: {
    type: String,
    default: 'Córdoba Capital'
  },
  companyCountry: {
    type: String,
    default: 'Argentina'
  },
  companyPhone: {
    type: String,
    default: '+54 351 123-4567'
  },
  companyEmail: {
    type: String,
    default: 'facturacion@tapmedicina.com'
  },
  companyWebsite: {
    type: String,
    default: 'www.tapmedicina.com'
  }
})

// Emits
const emit = defineEmits(['pdf-generated'])

// Refs
const invoiceRef = ref(null)

// Computed properties for dynamic content
const showStatusRibbon = computed(() => {
  return props.invoice.status === 'overdue' || props.invoice.status === 'pending'
})

const statusText = computed(() => {
  switch (props.invoice.status) {
    case 'overdue':
      return 'VENCIDO'
    case 'pending':
      return 'PENDIENTE'
    case 'paid':
      return 'PAGADO'
    default:
      return ''
  }
})

const ribbonStyle = computed(() => {
  switch (props.invoice.status) {
    case 'overdue':
      return 'background: #DC2626;' // Red
    case 'pending':
      return 'background: #F59E0B;' // Orange/Yellow
    case 'paid':
      return 'background: #10B981;' // Green
    default:
      return 'background: #6B7280;' // Gray
  }
})

const balanceLabel = computed(() => {
  switch (props.invoice.status) {
    case 'paid':
      return 'Total pagado'
    case 'pending':
      return 'Saldo pendiente'
    case 'overdue':
      return 'Saldo adeudado'
    default:
      return 'Saldo total'
  }
})

const balanceAmount = computed(() => {
  if (props.invoice.status === 'paid') {
    return props.invoice.totalAmount // Mostrar el monto total que se pagó
  }
  return props.invoice.totalAmount - (props.invoice.paidAmount || 0)
})

// Methods
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

const formatDateTime = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatCurrency = (amount) => {
  return `ARS${amount.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const formatQuantity = (quantity) => {
  return quantity.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const generatePDF = async () => {
  try {
    // Crear el canvas del elemento
    const canvas = await html2canvas(invoiceRef.value, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      width: 794, // A4 width in pixels at 96 DPI
      height: 1123 // A4 height in pixels at 96 DPI
    })

    // Crear el PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    // Calcular dimensiones
    const imgWidth = 210 // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    // Agregar la imagen al PDF
    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      0,
      0,
      imgWidth,
      imgHeight
    )

    // Descargar el PDF
    pdf.save(`Factura-${props.invoice.number}.pdf`)
    
    emit('pdf-generated', props.invoice.number)
  } catch (error) {
    console.error('Error generando PDF:', error)
  }
}

// Expose generatePDF method
defineExpose({
  generatePDF
})
</script>

<style scoped>
.invoice-container {
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
}

@media print {
  .invoice-container {
    box-shadow: none;
    margin: 0;
    padding: 20px;
  }
}
</style>