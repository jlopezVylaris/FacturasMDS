import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// Temporal: usar CDN para que las clases Tailwind se apliquen inmediatamente
import './assets/tailwind-cdn.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
