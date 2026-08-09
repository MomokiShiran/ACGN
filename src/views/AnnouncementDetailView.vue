<template>
  <div class="content page">
    <div v-if="!announcement" class="text-center text-muted py-4">公告未找到</div>
    <div v-else class="panel site-content no-hover-card card transparent">
      <div class="card-body">
        <h4 class="text-gray text-lg mb-2">{{ announcement.title }}</h4>
        <div class="text-muted text-xs mb-4">
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { useAnnouncementsStore } from '@/stores/announcements'
import { DEFAULT_TITLE, PAGE_TITLE_SUFFIX } from '@/constants/app'

const route = useRoute()
const store = useAnnouncementsStore()
const announcement = ref(null)

const pageTitle = computed(() =>
  announcement.value ? `${announcement.value.title}${PAGE_TITLE_SUFFIX}` : DEFAULT_TITLE
)
useHead({ title: pageTitle })

onMounted(() => {
  announcement.value = store.findById(route.params.id)
})
</script>

<style scoped>
.announcement-content {
  white-space: pre-line;
}
</style>
