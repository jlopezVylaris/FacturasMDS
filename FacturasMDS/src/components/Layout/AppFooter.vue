<template>
  <footer class="border-t mt-auto" style="background-color: #022031; border-top-color: #003049;">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background-color: #00A64C;">
              <svg class="w-5 h-5" style="color: #FFFFFF;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <span class="text-xl font-bold" style="color: #FFFFFF;">FacturasTap</span>
          </div>
          <p class="text-sm leading-relaxed" style="color: #B0B9C7;">
            Sistema profesional de facturación médica. Simplificamos la gestión financiera de tu práctica médica.
          </p>
          <div class="flex space-x-3">
            <a href="#" class="transition-colors duration-200" style="color: #B0B9C7;" onmouseover="this.style.color='#00A64C'" onmouseout="this.style.color='#B0B9C7'">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="#" class="transition-colors duration-200" style="color: #B0B9C7;" onmouseover="this.style.color='#00A64C'" onmouseout="this.style.color='#B0B9C7'">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" class="transition-colors duration-200" style="color: #B0B9C7;" onmouseover="this.style.color='#00A64C'" onmouseout="this.style.color='#B0B9C7'">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider mb-4" style="color: #FFFFFF;">
            Enlaces Rápidos
          </h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/home" class="text-sm transition-colors duration-200" style="color: #B0B9C7;" onmouseover="this.style.color='#00A64C'" onmouseout="this.style.color='#B0B9C7'">
                Dashboard
              </router-link>
            </li>
            <li>
              <a href="#" class="text-sm transition-colors duration-200" style="color: #B0B9C7;" onmouseover="this.style.color='#00A64C'" onmouseout="this.style.color='#B0B9C7'">
                Nueva Factura
              </a>
            </li>
            <li>
              <router-link to="/payment-history" class="text-sm transition-colors duration-200" style="color: #B0B9C7;" onmouseover="this.style.color='#00A64C'" onmouseout="this.style.color='#B0B9C7'">
                Historial de Pagos
              </router-link>
            </li>
            <li>
              <a href="#" class="text-sm transition-colors duration-200" style="color: #B0B9C7;" onmouseover="this.style.color='#00A64C'" onmouseout="this.style.color='#B0B9C7'">
                Clientes
              </a>
            </li>
            <li>
              <a href="#" class="text-sm transition-colors duration-200" style="color: #B0B9C7;" onmouseover="this.style.color='#00A64C'" onmouseout="this.style.color='#B0B9C7'">
                Reportes
              </a>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider mb-4" style="color: #FFFFFF;">
            Soporte
          </h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/about" class="text-sm transition-colors duration-200" style="color: #B0B9C7;" onmouseover="this.style.color='#00A64C'" onmouseout="this.style.color='#B0B9C7'">
                Centro de Ayuda
              </router-link>
            </li>
            <li>
              <a href="#" class="text-sm transition-colors duration-200" style="color: #B0B9C7;" onmouseover="this.style.color='#00A64C'" onmouseout="this.style.color='#B0B9C7'">
                Documentación
              </a>
            </li>
            <li>
              <a href="#" class="text-sm transition-colors duration-200" style="color: #B0B9C7;" onmouseover="this.style.color='#00A64C'" onmouseout="this.style.color='#B0B9C7'">
                Contacto
              </a>
            </li>
            <li>
              <a href="#" class="text-sm transition-colors duration-200" style="color: #B0B9C7;" onmouseover="this.style.color='#00A64C'" onmouseout="this.style.color='#B0B9C7'">
                Estado del Sistema
              </a>
            </li>
            <li>
              <a href="#" class="text-sm transition-colors duration-200" style="color: #B0B9C7;" onmouseover="this.style.color='#00A64C'" onmouseout="this.style.color='#B0B9C7'">
                API
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider mb-4" style="color: #FFFFFF;">
            Contacto
          </h3>
          <div class="space-y-3">
            <div class="flex items-center space-x-3">
              <div class="w-5 h-5" style="color: #00A64C;">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <span class="text-sm" style="color: #B0B9C7;">soporte@facturastap.com</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-5 h-5" style="color: #00A64C;">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <span class="text-sm" style="color: #B0B9C7;">+54 11 3631-9158</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-5 h-5" style="color: #00A64C;">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <span class="text-sm" style="color: #B0B9C7;">Buenos Aires, Argentina</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="mt-8 pt-8 border-t" style="border-top-color: #003049;">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p class="text-sm" style="color: #B0B9C7;">
              © {{ currentYear }} FacturasTap. Todos los derechos reservados.
            </p>
            <div class="flex space-x-6">
              <a href="#" class="text-sm transition-colors duration-200" style="color: #B0B9C7;" onmouseover="this.style.color='#00A64C'" onmouseout="this.style.color='#B0B9C7'">
                Política de Privacidad
              </a>
              <a href="#" class="text-sm transition-colors duration-200" style="color: #B0B9C7;" onmouseover="this.style.color='#00A64C'" onmouseout="this.style.color='#B0B9C7'">
                Términos de Servicio
              </a>
              <a href="#" class="text-sm transition-colors duration-200" style="color: #B0B9C7;" onmouseover="this.style.color='#00A64C'" onmouseout="this.style.color='#B0B9C7'">
                Cookies
              </a>
            </div>
          </div>
          
          <!-- Version Info -->
          <div class="flex items-center space-x-4">
            <span class="text-xs" style="color: #7A7A7A;">
              Versión {{ appVersion }}
            </span>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 rounded-full" style="background-color: #00A64C;"></div>
              <span class="text-xs" style="color: #B0B9C7;">Sistema Operativo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

// Computed properties
const currentYear = computed(() => new Date().getFullYear())
const appVersion = computed(() => '2.1.0')
</script>

<style scoped>
/* Estilos específicos del footer si son necesarios */
</style>
