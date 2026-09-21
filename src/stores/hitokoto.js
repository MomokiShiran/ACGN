import { defineStore } from 'pinia'
import { ref } from 'vue'

const HITOKOTO_API = 'https://v1.hitokoto.cn/'

export const useHitokotoStore = defineStore('hitokoto', () => {
  const text = ref('')
  const from = ref('')

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
      text.value = hitokoto.hitokoto || ''
      from.value = hitokoto.from || ''
    }
  }

  return { text, from, init }
})
