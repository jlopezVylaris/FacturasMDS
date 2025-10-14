<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Left Column - Auth Forms -->
    <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
      <!-- Logo/Brand -->
      <div class="mx-auto">
        <h1 class="text-6xl font-bold text-blue-600">Facturas Tap</h1>
      </div>

      <!-- Card Container -->
      <div class="mt-8 bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 max-w-md w-full mx-auto">
        <div class="w-full">
          <!-- Login Form -->
          <Transition name="fade" mode="out-in">
            <div v-if="!showRegister" class="divide-y divide-gray-200">
              <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 class="text-2xl font-bold text-gray-900 mb-8">Sign in to your account</h2>
                <form @submit.prevent="handleLogin" class="space-y-4">
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input v-model="loginForm.email" type="email" id="email" 
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                           required>
                  </div>
                  <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input v-model="loginForm.password" type="password" id="password" 
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                           required>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <input type="checkbox" id="remember-me" 
                             class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                      <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
                    </div>
                    <a href="#" class="text-sm font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>
                  </div>
                  <div>
                    <button type="submit" 
                            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Sign in
                    </button>
                  </div>
                </form>
                <p class="mt-4 text-center text-sm text-gray-600">
                  Not registered? 
                  <a @click.prevent="showRegister = true" href="#" 
                     class="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                    Create an account
                  </a>
                </p>
              </div>
            </div>

            <!-- Register Form -->
            <div v-else class="divide-y divide-gray-200">
              <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 class="text-2xl font-bold text-gray-900 mb-8">Create an account</h2>
                <form @submit.prevent="handleRegister" class="space-y-4">
                  <div>
                    <label for="fullname" class="block text-sm font-medium text-gray-700">Full Name</label>
                    <input v-model="registerForm.fullName" type="text" id="fullname" 
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                           required>
                  </div>
                  <div>
                    <label for="register-email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input v-model="registerForm.email" type="email" id="register-email" 
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                           required>
                  </div>
                  <div>
                    <label for="register-password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input v-model="registerForm.password" type="password" id="register-password" 
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                           required>
                  </div>
                  <div>
                    <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input v-model="registerForm.confirmPassword" type="password" id="confirm-password" 
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                           required>
                  </div>
                  <div>
                    <button type="submit" 
                            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Create Account
                    </button>
                  </div>
                </form>
                <p class="mt-4 text-center text-sm text-gray-600">
                  Already have an account? 
                  <a @click.prevent="showRegister = false" href="#" 
                     class="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                    Sign in
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