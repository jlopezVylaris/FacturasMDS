<template>
  <div class="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-white flex">
    <!-- Sidebar -->
    <AppSidebar 
      :is-open="isSidebarOpen" 
      @toggle="toggleSidebar"
      @close="closeSidebar"
    />

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex flex-col min-h-screen overflow-hidden">
      <!-- Header -->
      <AppHeader 
        :is-sidebar-open="isSidebarOpen"
        @toggle-sidebar="toggleSidebar"
      />

      <!-- Main Content -->
      <main class="flex-1 bg-gradient-to-br from-teal-50 via-blue-50 to-white">
        <slot />
      </main>

      <!-- Footer -->
      <AppFooter />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'
import AppFooter from './AppFooter.vue'

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}
</script>

<style scoped>
/* Estilos específicos del layout si son necesarios */
</style>
