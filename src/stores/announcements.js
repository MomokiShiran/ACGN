import { defineStore } from 'pinia'
import { ref } from 'vue'
import announcementsData from '@/data/announcements.json'

export const useAnnouncementsStore = defineStore('announcements', () => {
  const announcements = ref(
    (announcementsData.announcements || []).sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )
  )

  const findById = (id) => {
    return announcements.value.find((a) => a.id === Number(id))
  }

  return { announcements, findById }
})
