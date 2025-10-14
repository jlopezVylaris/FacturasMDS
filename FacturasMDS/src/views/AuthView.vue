<template>
  <div class="min-h-screen flex" style="background-color: #022031;">
    <!-- Left Column - Auth Forms -->
    <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
      <!-- Logo/Brand -->
      <div class="mx-auto flex flex-col items-center space-y-4">
        <div class="w-20 h-20 rounded-xl flex items-center justify-center" style="background-color: #00A64C;">
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <div class="text-center">
          <h2 class="text-xl font-medium text-white/80 mb-2">Bienvenido al</h2>
          <h1 class="text-4xl font-bold text-white mb-1">Portal Cliente</h1>
          <h1 class="text-5xl font-bold text-white" style="color: #00A64C;">TAP MEDICINA</h1>
        </div>
      </div>

      <!-- Card Container -->
      <div class="mt-8 backdrop-blur-sm bg-white/10 py-8 px-4 shadow-lg sm:rounded-xl sm:px-10 max-w-md w-full mx-auto border border-white/20">
        <div class="w-full">
          <!-- Login Form -->
          <Transition name="fade" mode="out-in">
            <div v-if="!showRegister" class="divide-y divide-white/10">
              <div class="py-8 text-base leading-6 space-y-4 text-white/80 sm:text-lg sm:leading-7">
                <h2 class="text-2xl font-bold text-white mb-8">Iniciar Sesión</h2>
                <form @submit.prevent="handleLogin" class="space-y-4">
                  <div>
                    <label for="email" class="block text-sm font-medium text-white/80">Email</label>
                    <input v-model="loginForm.email" type="email" id="email" 
                           class="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 text-white shadow-sm focus:border-teal-500 focus:ring-teal-500"
                           required>
                  </div>
                  <div>
                    <label for="password" class="block text-sm font-medium text-white/80">Contraseña</label>
                    <input v-model="loginForm.password" type="password" id="password" 
                           class="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 text-white shadow-sm focus:border-teal-500 focus:ring-teal-500"
                           required>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <input type="checkbox" id="remember-me" 
                             class="h-4 w-4 rounded border-white/10 bg-white/5 text-teal-600 focus:ring-teal-500">
                      <label for="remember-me" class="ml-2 block text-sm text-white/80">Recordarme</label>
                    </div>
                    <a href="#" class="text-sm font-medium text-teal-400 hover:text-teal-300">¿Olvidaste tu contraseña?</a>
                  </div>
                  <div>
                    <button type="submit" 
                            style="background-color: #00A64C;"
                            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200">
                      Ingresar
                    </button>
                  </div>
                </form>
                <p class="mt-4 text-center text-sm text-white/60">
                  ¿No tienes una cuenta? 
                  <a @click.prevent="showRegister = true" href="#" 
                     class="font-medium text-teal-400 hover:text-teal-300 cursor-pointer">
                    Crear cuenta
                  </a>
                </p>
              </div>
            </div>

            <!-- Register Form -->
            <div v-else class="divide-y divide-white/10">
              <div class="py-8 text-base leading-6 space-y-4 text-white/80 sm:text-lg sm:leading-7">
                <h2 class="text-2xl font-bold text-white mb-8">Crear cuenta</h2>
                <form @submit.prevent="handleRegister" class="space-y-4">
                  <div>
                    <label for="fullname" class="block text-sm font-medium text-white/80">Nombre Completo</label>
                    <input v-model="registerForm.fullName" type="text" id="fullname" 
                           class="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 text-white shadow-sm focus:border-teal-500 focus:ring-teal-500"
                           required>
                  </div>
                  <div>
                    <label for="register-email" class="block text-sm font-medium text-white/80">Email</label>
                    <input v-model="registerForm.email" type="email" id="register-email" 
                           class="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 text-white shadow-sm focus:border-teal-500 focus:ring-teal-500"
                           required>
                  </div>
                  <div>
                    <label for="register-password" class="block text-sm font-medium text-white/80">Contraseña</label>
                    <input v-model="registerForm.password" type="password" id="register-password" 
                           class="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 text-white shadow-sm focus:border-teal-500 focus:ring-teal-500"
                           required>
                  </div>
                  <div>
                    <label for="confirm-password" class="block text-sm font-medium text-white/80">Confirmar Contraseña</label>
                    <input v-model="registerForm.confirmPassword" type="password" id="confirm-password" 
                           class="mt-1 block w-full rounded-lg bg-white/5 border border-white/10 text-white shadow-sm focus:border-teal-500 focus:ring-teal-500"
                           required>
                  </div>
                  <div>
                    <button type="submit" 
                            style="background-color: #00A64C;"
                            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200">
                      Crear Cuenta
                    </button>
                  </div>
                </form>
                <p class="mt-4 text-center text-sm text-white/60">
                  ¿Ya tienes una cuenta? 
                  <a @click.prevent="showRegister = false" href="#" 
                     class="font-medium text-teal-400 hover:text-teal-300 cursor-pointer">
                    Iniciar Sesión
                  </a>
                </p>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
    
    <!-- Right Column - Image Space -->
    <div class="hidden lg:block relative flex-1 flex items-center justify-center">
      <div class="w-[50rem] px-8 flex items-center min-h-screen">
        <img src="../assets/sign-in.svg" 
             alt="Sign in illustration" 
             class="w-full h-auto object-contain">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { setAuth } from '../store/auth'

const router = useRouter()
const showRegister = ref(false)

// Usuario hardcodeado para pruebas
const validUser = {
  email: "admin@admin",
  password: "Test123."
}

// Estado de los formularios
const loginForm = reactive({
  email: '',
  password: ''
})

const registerForm = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Manejadores de formularios
const handleLogin = () => {
  if (loginForm.email === validUser.email && loginForm.password === validUser.password) {
    // Login exitoso
  setAuth(true)
  router.push({ name: 'Home' })
  } else {
    alert('Invalid credentials')
  }
}

const handleRegister = () => {
  if (registerForm.password !== registerForm.confirmPassword) {
    alert('Passwords do not match')
    return
  }
  // Simular registro exitoso
  console.log('Register success:', registerForm)
  showRegister.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>