<template>
  <MainLayout>
    <div class="p-6">
      <div class="bg-white rounded-xl shadow-sm border border-teal-100 p-8">
        <h1 class="text-3xl font-bold text-teal-800 mb-6">Acerca de FacturasTap</h1>
        
        <div class="space-y-6 text-gray-700">
          <p class="text-lg">
            Sistema de facturación médica diseñado para optimizar la gestión administrativa de consultorios y clínicas.
          </p>
          
          <div class="grid md:grid-cols-2 gap-6 mt-8">
            <div class="bg-teal-50 p-6 rounded-lg">
              <h3 class="text-xl font-semibold text-teal-800 mb-3">Características</h3>
              <ul class="space-y-2 text-sm">
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-teal-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Gestión completa de facturas
                </li>
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-teal-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Historial de pagos detallado
                </li>
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-teal-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Reportes y analíticas
                </li>
              </ul>
            </div>
            
            <div class="bg-cyan-50 p-6 rounded-lg">
              <h3 class="text-xl font-semibold text-cyan-800 mb-3">Tecnología</h3>
              <ul class="space-y-2 text-sm">
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-cyan-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Vue 3 + Composition API
                </li>
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-cyan-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Tailwind CSS
                </li>
                <li class="flex items-center">
                  <svg class="w-4 h-4 text-cyan-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Diseño responsivo
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '../components/Layout/MainLayout.vue'
</script>
