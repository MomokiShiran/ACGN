import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { initIframeProtect } from './composables/useIframeProtect'
import './styles/main.css'

initIframeProtect()

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')
