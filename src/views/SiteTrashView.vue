<template>
  <PageContent class="site-content">
    <SectionTitle :icon="tagIcon" rotate>失效归档</SectionTitle>
    <CategoryList :categories="store.flatTrashCategories" />
  </PageContent>
</template>

<script setup>
import { useSitesStore } from '@/stores/sites'
import CategoryList from '@/components/CategoryList.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import PageContent from '@/components/PageContent.vue'
import tagIcon from '@/assets/icons/tag.svg'

const store = useSitesStore()
</script>
