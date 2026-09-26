<template>
  <div v-if="friendsStore.links.length > 0">
    <SectionTitle :icon="bookmarkIcon">友情链接</SectionTitle>
    <Card>
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
    </Card>
  </div>
</template>

<script setup>
import { useFriendsStore } from '@/stores/friends'
import bookmarkIcon from '@/assets/icons/bookmark.svg'
import SectionTitle from './SectionTitle.vue'
import Card from './Card.vue'

const friendsStore = useFriendsStore()
</script>

<style scoped>
.friendlink-link {
  position: relative;
  display: inline-block;
  margin: 0.25rem 0.5rem 0.25rem 0.25rem;
  color: var(--text);
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.friendlink-link:hover {
  color: var(--primary);
}
.friendlink-link::before {
  content: '\2022';
  display: inline-block;
  position: relative;
  margin-right: 5px;
}
</style>
