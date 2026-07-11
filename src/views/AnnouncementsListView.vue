<template>
  <div class="content page">
    <div class="panel site-content no-hover-card card transparent">
      <div class="card-body">
        <h4 class="text-gray text-lg mb-4">
          <i class="iconfont icon-tag icon-lg me-1"></i>公告
        </h4>
        <div v-if="store.loading" class="text-center text-muted py-4">加载中...</div>
        <div v-else-if="store.announcements.length === 0" class="text-center text-muted py-4">暂无公告</div>
        <div v-else>
          <div v-for="item in store.announcements" :key="item.id" class="card mb-3 no-hover-card">
            <div class="card-body">
              <router-link :to="'/announcements/' + item.id" class="text-decoration-none">
                <h5 class="card-title">{{ item.title }}</h5>
              </router-link>
              <div class="text-muted text-xs mb-2">
                {{ item.date }} · {{ item.author }} · {{ item.views }} 浏览
              </div>
              <p class="card-text text-muted text-sm">{{ item.excerpt }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAnnouncementsStore } from '@/stores/announcements'

const store = useAnnouncementsStore()

onMounted(() => {
  store.fetchAnnouncements()
})
</script>
