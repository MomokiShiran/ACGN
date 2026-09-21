<template>
  <router-link :to="{ name: 'AnnouncementDetail', params: { id: item.id } }" class="panel ann-item">
    <div class="ann-item-head">
      <h5 class="ann-item-title">{{ item.title }}</h5>
      <img class="ann-item-arrow" aria-hidden="true" :src="angleRightIcon" alt="" />
    </div>
    <p class="ann-item-meta">{{ item.date }} · {{ item.author }} · {{ item.views }} 浏览</p>
    <p class="ann-item-excerpt">{{ item.excerpt }}</p>
  </router-link>
</template>

<script setup>
import angleRightIcon from '@/assets/icons/angle-right.svg'

defineProps({
  item: { type: Object, required: true },
})
</script>

<style scoped>
.ann-item {
  display: block;
  padding: var(--space-4);
  text-decoration: none;
}
.ann-item:hover .ann-item-title {
  color: var(--primary);
}
.ann-item:hover .ann-item-arrow {
  color: var(--primary);
  transform: translateX(2px);
}

.ann-item-head {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.ann-item-title {
  margin: 0;
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: var(--font-weight-semibold);
  color: var(--text-dark);
  transition: color var(--transition-normal);
}

.ann-item-arrow {
  flex-shrink: 0;
  color: var(--text-muted);
  transition:
    color var(--transition-normal),
    transform var(--transition-normal);
}

.ann-item-meta {
  margin: var(--space-1) 0 0;
  color: var(--text-muted);
}

.ann-item-excerpt {
  margin: var(--space-2) 0 0;
  color: var(--text-muted);
  line-height: var(--line-height-relaxed);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
