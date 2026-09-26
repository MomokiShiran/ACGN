<template>
  <PageContent>
    <SectionTitle>公告</SectionTitle>
    <EmptyState v-if="store.announcements.length === 0">暂无公告</EmptyState>
    <div v-else class="ann-list">
      <AnnouncementItem v-for="item in store.announcements" :key="item.id" :item="item" />
    </div>
  </PageContent>
</template>

<script setup>
import { useAnnouncementsStore } from '@/stores/announcements'
import SectionTitle from '@/components/SectionTitle.vue'
import EmptyState from '@/components/EmptyState.vue'
import AnnouncementItem from '@/components/AnnouncementItem.vue'
import PageContent from '@/components/PageContent.vue'

const store = useAnnouncementsStore()
</script>

<style scoped>
.ann-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
