<template>
  <div v-if="friendsStore.links.length > 0">
    <h4 class="friendlinks-title"><img class="title-icon" :src="bookmarkIcon" alt="" />友情链接</h4>
    <div class="friendlinks-card card no-hover-card">
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
import bookmarkIcon from '@/assets/icons/bookmark.svg'

const friendsStore = useFriendsStore()
</script>

<style scoped>
.friendlinks-title {
  margin-bottom: var(--space-4);
  color: var(--text-muted);
  font-size: var(--font-size-lg);
}
.friendlinks-title > img.title-icon {
  width: 18px;
  height: 18px;
  margin-right: var(--space-2);
  vertical-align: middle;
}
.friendlink-link {
  position: relative;
  display: inline-block;
  margin: 0.25rem 0.5rem 0.25rem 0.25rem;
}
.friendlink-link::before {
  content: '\2022';
  display: inline-block;
  position: relative;
  margin-right: 5px;
}
</style>
