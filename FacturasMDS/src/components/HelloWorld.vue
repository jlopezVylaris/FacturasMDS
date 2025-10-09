<template>
  <section class="hello">
    <h2>{{ title }}</h2>
    <slot />
  </section>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({ title: { type: String, default: 'Hola' } })
</script>

<style scoped>
.hello { padding: 1rem }
</style>
