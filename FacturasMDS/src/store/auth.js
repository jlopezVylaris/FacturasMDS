import { ref } from 'vue'

// Función para cargar estado desde localStorage
const loadAuthState = () => {
  try {
    const savedAuth = localStorage.getItem('auth_state')
    const savedUser = localStorage.getItem('current_user')
    
    if (savedAuth && savedUser) {
      return {
        isAuthenticated: JSON.parse(savedAuth),
        currentUser: JSON.parse(savedUser)
      }
    }
  } catch (error) {
    console.error('Error loading auth state:', error)
  }
  
  return {
    isAuthenticated: false,
    currentUser: null
  }
}

// Cargar estado inicial desde localStorage
const initialState = loadAuthState()

// Estado simple de autenticación con usuario y rol
export const isAuthenticated = ref(initialState.isAuthenticated)
export const currentUser = ref(initialState.currentUser)

// setAuth puede recibir booleano o un objeto usuario { email, role }
export const setAuth = (value) => {
  if (typeof value === 'boolean') {
    isAuthenticated.value = value
    if (!value) {
      currentUser.value = null
      // Limpiar localStorage
      localStorage.removeItem('auth_state')
      localStorage.removeItem('current_user')
    }
  } else if (value && typeof value === 'object') {
    isAuthenticated.value = true
    currentUser.value = value
    // Guardar en localStorage
    localStorage.setItem('auth_state', JSON.stringify(true))
    localStorage.setItem('current_user', JSON.stringify(value))
  }
}

export const logout = () => {
  isAuthenticated.value = false
  currentUser.value = null
  // Limpiar localStorage
  localStorage.removeItem('auth_state')
  localStorage.removeItem('current_user')
}
