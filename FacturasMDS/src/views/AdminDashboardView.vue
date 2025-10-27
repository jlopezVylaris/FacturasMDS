<template>
  <MainLayout>
    <AdminDashboard />
  </MainLayout>
</template>

<script setup>
import { defineComponent } from 'vue'
import MainLayout from '../components/Layout/MainLayout.vue'
import AdminDashboard from '../components/AdminDashboard.vue'

defineComponent({
  name: 'AdminDashboardView'
})
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
