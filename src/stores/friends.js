import { defineStore } from 'pinia'
import { ref } from 'vue'
import friendsData from '@/data/friends.json'

export const useFriendsStore = defineStore('friends', () => {
  const links = ref(friendsData.links || [])

  return { links }
})
