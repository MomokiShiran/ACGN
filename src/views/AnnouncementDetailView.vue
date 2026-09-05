<template>
  <div class="content">
    <div class="ann-back">
      <router-link to="/announcements" class="back-btn">
        <i class="fas fa-arrow-left"></i>
        返回公告列表
      </router-link>
    </div>
    <div v-if="!announcement" class="ann-empty">公告未找到</div>
    <article v-else class="ann-detail">
      <h1 class="ann-detail-title">{{ announcement.title }}</h1>
      <p class="ann-detail-meta">
        {{ announcement.date }} · {{ announcement.author }} · {{ announcement.views }} 浏览
      </p>
      <div class="ann-detail-content">
        {{ announcement.content }}
      </div>
    </article>
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
.ann-back {
  display: flex;
  margin-bottom: var(--space-3);
}

.ann-empty {
  padding: 60px 20px;
  text-align: center;
  color: var(--text-muted);
  background: var(--card-bg);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-sm);
}

.ann-detail {
  padding: var(--space-5);
  background: var(--card-bg);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-sm);
}

.ann-detail-title {
  margin: 0 0 var(--space-2);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-dark);
  line-height: var(--line-height-tight);
}

.ann-detail-meta {
  margin: 0 0 var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--bg-gray);
  color: var(--text-muted);
}

.ann-detail-content {
  color: var(--text-dark);
  line-height: 1.8;
  white-space: pre-line;
}

@media (max-width: 767.98px) {
  .ann-detail {
    padding: var(--space-4);
  }
  .ann-detail-title {
    font-size: var(--font-size-xl);
  }
}
</style>
