<template>
  <router-link :to="{ name: 'AnnouncementDetail', params: { id: item.id } }" class="ann-item">
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
  padding: 16px;
  background: var(--card-bg);
  border-radius: 16px;
  color: var(--text);
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
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
  gap: 8px;
}

.ann-item-title {
  margin: 0;
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  color: var(--text-heading);
  transition: color 0.3s;
}

.ann-item-arrow {
  flex-shrink: 0;
  color: var(--text-muted);
  transition:
    color 0.3s,
    transform 0.3s;
}

.ann-item-meta {
  margin: 4px 0 0;
  color: var(--text-muted);
}

.ann-item-excerpt {
  margin: 8px 0 0;
  color: var(--text-muted);
  line-height: 1.8;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
