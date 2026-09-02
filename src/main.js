import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'
import { initIframeProtect } from './composables/useIframeProtect'
import './styles/main.css'

initIframeProtect()

const app = createApp(App)
app.use(createPinia())
app.use(createHead())
app.use(router)

app.mount('#app')
