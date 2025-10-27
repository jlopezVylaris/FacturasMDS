import { ref } from 'vue'

// Sample invoice data - shared across the application
export const invoices = ref([
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

// Computed functions to get invoice stats
export function getInvoiceStats() {
  const paid = invoices.value.filter(inv => inv.status === 'paid')
  const pending = invoices.value.filter(inv => inv.status === 'pending')
  const overdue = invoices.value.filter(inv => inv.status === 'overdue')

  return {
    paid: {
      total: paid.reduce((sum, inv) => sum + inv.amount, 0),
      count: paid.length
    },
    pending: {
      total: pending.reduce((sum, inv) => sum + inv.amount, 0),
      count: pending.length
    },
    overdue: {
      total: overdue.reduce((sum, inv) => sum + inv.amount, 0),
      count: overdue.length
    },
    total: {
      total: invoices.value.reduce((sum, inv) => sum + inv.amount, 0),
      count: invoices.value.length
    }
  }
}

// Get monthly cash flow data
export function getMonthlyCashFlow() {
  const monthlyData = {}
  const currentYear = new Date().getFullYear()

  // Initialize months
  for (let i = 0; i < 12; i++) {
    const monthKey = `${currentYear}-${String(i + 1).padStart(2, '0')}`
    monthlyData[monthKey] = { incoming: 0, outgoing: 0 }
  }

  // Calculate incoming (paid invoices)
  invoices.value
    .filter(inv => inv.status === 'paid')
    .forEach(inv => {
      const date = new Date(inv.date)
      if (date.getFullYear() === currentYear) {
        const monthKey = `${currentYear}-${String(date.getMonth() + 1).padStart(2, '0')}`
        if (monthlyData[monthKey]) {
          monthlyData[monthKey].incoming += inv.amount
        }
      }
    })

  return monthlyData
}
