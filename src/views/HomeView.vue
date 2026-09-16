<template>
  <div>
    <SearchBar v-model="keyword" />

    <div class="content">
      <CategoryList v-if="!keyword.trim()" :categories="store.flatCategories" />

      <template v-else>
        <div v-if="groupedResults.length === 0" class="search-empty">
          <img class="search-empty-icon" aria-hidden="true" :src="searchIcon" alt="" />
          <div>没找到匹配的站点，试试其他关键字吧</div>
        </div>
        <template v-else>
          <h4 class="search-results-title">
            <img class="results-title-icon" :src="tagIcon" alt="" />搜索结果（{{
              searchResults.length
            }}）
          </h4>
          <CategoryList :categories="groupedResults" />
        </template>
      </template>

      <FriendLinks v-if="!keyword.trim()" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSitesStore } from '@/stores/sites'
import SearchBar from '@/components/SearchBar.vue'
import CategoryList from '@/components/CategoryList.vue'
import FriendLinks from '@/components/FriendLinks.vue'
import tagIcon from '@/assets/icons/tag.svg'
import searchIcon from '@/assets/icons/search.svg'

const store = useSitesStore()
const keyword = ref('')

const searchResults = computed(() => (keyword.value.trim() ? store.searchSites(keyword.value) : []))

// 搜索结果按首页分类顺序分组展示（父分类含子分类名），输出为 CategoryList 可直接渲染的分类对象
const groupedResults = computed(() => {
  const results = searchResults.value
  return store.flatCategories
    .map((cat) => {
      const names = cat.children ? cat.children.map((sub) => sub.name) : [cat.name]
      return { ...cat, sites: results.filter((site) => names.includes(site.categoryName)) }
    })
    .filter((cat) => cat.sites.length > 0)
})
</script>

<style scoped>
.search-results-title {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-4);
  color: var(--text-muted);
  font-size: var(--font-size-lg);
}
.search-results-title img.results-title-icon {
  width: 16px;
  height: 16px;
  margin-right: var(--space-1);
  transform: rotate(135deg);
}
.search-empty {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted);
}
.search-empty-icon {
  display: block;
  font-size: 48px;
  line-height: 1;
  margin-bottom: 12px;
}
</style>
