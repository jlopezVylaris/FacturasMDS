import { ref } from 'vue'

// Estado simple de autenticación con usuario y rol
export const isAuthenticated = ref(false)
export const currentUser = ref(null)

// setAuth puede recibir booleano o un objeto usuario { email, role }
export const setAuth = (value) => {
  if (typeof value === 'boolean') {
    isAuthenticated.value = value
    if (!value) currentUser.value = null
  } else if (value && typeof value === 'object') {
    isAuthenticated.value = true
    currentUser.value = value
  }
}

export const logout = () => {
  isAuthenticated.value = false
  currentUser.value = null
}
