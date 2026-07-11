<template>
  <div class="content page">
    <div v-if="!announcement" class="text-center text-muted py-4">公告未找到</div>
    <div v-else class="panel site-content no-hover-card card transparent">
      <div class="card-body">
        <h4 class="text-gray text-lg mb-2">{{ announcement.title }}</h4>
        <div class="text-muted text-xs mb-4">
          {{ announcement.date }} · {{ announcement.author }} · {{ announcement.views }} 浏览
        </div>
        <div class="announcement-content" v-html="announcement.content"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAnnouncementsStore } from '@/stores/announcements'

const route = useRoute()
const store = useAnnouncementsStore()
const announcement = ref(null)

onMounted(async () => {
  await store.fetchAnnouncements()
  announcement.value = store.findById(route.params.id)
  if (announcement.value) {
    document.title = `${announcement.value.title} | MyACGN`
  }
})
</script>
