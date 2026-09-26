<template>
  <SearchBar v-model="keyword" />

  <PageContent>
    <CategoryList v-if="!keyword.trim()" :categories="store.flatCategories" />

    <template v-else>
      <EmptyState v-if="groupedResults.length === 0">没找到匹配的站点，试试其他关键字吧</EmptyState>
      <template v-else>
        <SectionTitle :icon="tagIcon" rotate>搜索结果（{{ searchResults.length }}）</SectionTitle>
        <CategoryList :categories="groupedResults" />
      </template>
    </template>

    <FriendLinks v-if="!keyword.trim()" />
  </PageContent>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSitesStore } from '@/stores/sites'
import SearchBar from '@/components/SearchBar.vue'
import CategoryList from '@/components/CategoryList.vue'
import FriendLinks from '@/components/FriendLinks.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import EmptyState from '@/components/EmptyState.vue'
import PageContent from '@/components/PageContent.vue'
import tagIcon from '@/assets/icons/tag.svg'

const store = useSitesStore()
const keyword = ref('')

const searchResults = computed(() => {
  const kw = keyword.value.trim()
  if (!kw) return []
  return store.searchSites(kw)
})

// 搜索结果按首页分类顺序分组展示（父分类含子分类名），输出为 CategoryList 可直接渲染的分类对象
const groupedResults = computed(() => {
  const results = searchResults.value
  if (results.length === 0) return []
  return store.flatCategories
    .map((cat) => {
      const names = cat.children ? cat.children.map((sub) => sub.name) : [cat.name]
      return { ...cat, sites: results.filter((site) => names.includes(site.categoryName)) }
    })
    .filter((cat) => cat.sites.length > 0)
})
</script>
