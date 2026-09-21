<template>
  <div class="content">
    <PageTitle>公告</PageTitle>
    <EmptyState v-if="store.announcements.length === 0">暂无公告</EmptyState>
    <div v-else class="ann-list">
      <AnnouncementItem v-for="item in store.announcements" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script setup>
import { useAnnouncementsStore } from '@/stores/announcements'
import PageTitle from '@/components/PageTitle.vue'
import EmptyState from '@/components/EmptyState.vue'
import AnnouncementItem from '@/components/AnnouncementItem.vue'

const store = useAnnouncementsStore()
</script>

<style scoped>
.ann-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
</style>
