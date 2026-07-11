import { ref } from 'vue'

const HITOKOTO_API = 'https://v1.hitokoto.cn/'
const text = ref('')

export function useHitokoto() {
  const fetchHitokoto = async () => {
    try {
      const response = await fetch(HITOKOTO_API)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = await response.json()
      return data
    } catch {
      return null
    }
  }

  const init = async () => {
    const hitokoto = await fetchHitokoto()
    if (hitokoto) {
      let displayText = hitokoto.hitokoto || ''
      if (hitokoto.from) {
        displayText += ` —— <span style="color: #666;">${hitokoto.from}</span>`
      }
      text.value = displayText
    }
  }

  return { text, init }
}
