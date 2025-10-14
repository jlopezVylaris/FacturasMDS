import { ref } from 'vue'

// Estado simple de autenticación
export const isAuthenticated = ref(false)

export const setAuth = (value) => {
  isAuthenticated.value = value
}

export const logout = () => {
  isAuthenticated.value = false
}
