<template>
  <div>
    <SearchBar v-model="keyword" />

    <div v-if="!keyword.trim()" class="content customize-site">
      <template v-for="cat in store.flatCategories" :key="cat.id">
        <CategorySection :category="cat" />
      </template>
      <FriendLinks />
    </div>

    <div v-else class="content customize-site">
      <div v-if="searchResults.length === 0" class="search-empty">
        <i class="search-empty-icon iconfont icon-search"></i>
        <div>没找到匹配的站点，试试其他关键字吧</div>
      </div>
      <div v-else>
        <h4 class="text-gray text-lg mb-4 d-flex flex-fill">
          <i class="site-tag iconfont icon-tag icon-lg me-1"></i>搜索结果（{{
            searchResults.length
          }}）
        </h4>
        <div class="row">
          <SiteCard v-for="site in searchResults" :key="site.id" :site="site" />
        </div>
        <FriendLinks />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSitesStore } from '@/stores/sites'
import SearchBar from '@/components/SearchBar.vue'
import CategorySection from '@/components/CategorySection.vue'
import FriendLinks from '@/components/FriendLinks.vue'
import SiteCard from '@/components/SiteCard.vue'

const store = useSitesStore()
const keyword = ref('')

const searchResults = computed(() => {
  if (!keyword.value.trim()) return []
  return store.searchSites(keyword.value)
})
</script>
