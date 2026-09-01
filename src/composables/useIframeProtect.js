import { ref } from 'vue'

export const isNested = ref(false)

export function initIframeProtect() {
  try {
    if (window.self !== window.top) {
      isNested.value = true
    }
  } catch {
    // ignore
  }
  return isNested
}
