<template>
  <div class="content">
    <h4 class="page-title"><i class="iconfont icon-tag icon-lg"></i>公告</h4>
    <div v-if="store.announcements.length === 0" class="ann-empty">暂无公告</div>
    <div v-else class="ann-list">
      <router-link
        v-for="item in store.announcements"
        :key="item.id"
        :to="{ name: 'AnnouncementDetail', params: { id: item.id } }"
        class="ann-item"
      >
        <div class="ann-item-head">
          <h5 class="ann-item-title">{{ item.title }}</h5>
          <i class="fas fa-angle-right ann-item-arrow"></i>
        </div>
        <p class="ann-item-meta">{{ item.date }} · {{ item.author }} · {{ item.views }} 浏览</p>
        <p class="ann-item-excerpt">{{ item.excerpt }}</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useAnnouncementsStore } from '@/stores/announcements'

const store = useAnnouncementsStore()
</script>

<style scoped>
.ann-empty {
  padding: 60px 20px;
  text-align: center;
  color: var(--text-muted);
  background: var(--card-bg);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-sm);
}

.ann-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.ann-item {
  display: block;
  padding: var(--space-4);
  background: var(--card-bg);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  transition: box-shadow var(--transition-normal);
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
  line-height: 1.8;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
