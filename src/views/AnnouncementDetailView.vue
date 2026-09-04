<template>
  <div class="content">
    <div v-if="!announcement" class="text-center text-muted py-4">公告未找到</div>
    <div v-else class="site-content no-hover-card card transparent">
      <div class="card-body">
        <h4 class="text-gray text-lg mb-2">{{ announcement.title }}</h4>
        <div class="text-muted mb-4">
          {{ announcement.date }} · {{ announcement.author }} · {{ announcement.views }} 浏览
        </div>
        <div class="announcement-content">
          {{ announcement.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAnnouncementsStore } from '@/stores/announcements'
import { usePageTitle } from '@/composables/usePageTitle'

const route = useRoute()
const store = useAnnouncementsStore()
const announcement = ref(null)

usePageTitle(computed(() => announcement.value?.title))

watch(
  () => route.params.id,
  (id) => {
    if (id) {
      announcement.value = store.findById(id)
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.announcement-content {
  white-space: pre-line;
}
</style>
