import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isNested = ref(false)

  const initIframeProtect = () => {
    try {
      if (window.self !== window.top) {
        isNested.value = true
      }
    } catch {
      // ignore
    }
    return isNested
  }

  return { isNested, initIframeProtect }
})
