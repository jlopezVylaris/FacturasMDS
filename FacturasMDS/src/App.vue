<script setup>
</script>

<template>
  <div id="app">
    <header>
      <h1>Gestión de Facturas MDS</h1>
      <nav>
        <router-link to="/home">Inicio</router-link> |
        <router-link to="/about">Acerca</router-link>
      </nav>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
header { padding: 1rem; background: #f6f8fa }
nav a { margin-right: .5rem }
</style>
