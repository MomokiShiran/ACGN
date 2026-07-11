import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnnouncementsStore = defineStore('announcements', () => {
  const announcements = ref([])
  const loading = ref(false)

  const fetchAnnouncements = async () => {
    if (announcements.value.length > 0) return
    loading.value = true
    try {
      const response = await fetch('/data/announcements.json')
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = await response.json()
      announcements.value = (data.announcements || []).sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )
    } catch (err) {
      console.error('Failed to load announcements:', err)
    } finally {
      loading.value = false
    }
  }

  const findById = (id) => {
    return announcements.value.find((a) => a.id === Number(id))
  }

  return { announcements, loading, fetchAnnouncements, findById }
})
