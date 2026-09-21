<template>
  <div class="content site-content">
    <PageTitle :icon="tagIcon">失效归档</PageTitle>
    <CategoryList :categories="store.flatTrashCategories" />
  </div>
</template>

<script setup>
import { useSitesStore } from '@/stores/sites'
import CategoryList from '@/components/CategoryList.vue'
import PageTitle from '@/components/PageTitle.vue'
import tagIcon from '@/assets/icons/tag.svg'

const store = useSitesStore()
</script>
