import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAppStore } from './stores/app'
import './styles/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

// Pinia 注册后立即初始化 iframe 嵌套检测，确保 App.vue 首帧就能拿到正确值
useAppStore().initIframeProtect()

app.use(router)

app.mount('#app')
