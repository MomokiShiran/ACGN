import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFriendsStore = defineStore('friends', () => {
  const links = ref([])
  const loading = ref(false)

  const fetchLinks = async () => {
    if (links.value.length > 0) return
    loading.value = true
    try {
      const response = await fetch('/data/friends.json')
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = await response.json()
      links.value = data.links || []
    } catch (err) {
      console.error('Failed to load friends:', err)
    } finally {
      loading.value = false
    }
  }

  return { links, loading, fetchLinks }
})
