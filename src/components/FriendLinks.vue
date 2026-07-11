<template>
  <div v-if="friendsStore.links.length > 0">
    <h4 class="text-gray text-lg mb-4">
      <i class="iconfont icon-book-mark-line icon-lg me-2" id="friendlink"></i>友情链接
    </h4>
    <div class="friendlink text-xs card no-hover-card">
      <div class="card-body">
        <a
          v-for="link in friendsStore.links"
          :key="link.id"
          :href="link.url"
          :title="link.description"
          target="_blank"
          rel="noopener noreferrer"
          class="friendlink-link"
        >
          {{ link.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFriendsStore } from '@/stores/friends'

const friendsStore = useFriendsStore()
</script>
