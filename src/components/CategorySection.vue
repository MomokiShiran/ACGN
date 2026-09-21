<template>
  <div :id="category.id">
    <CatSectionTitle>{{ category.name }}</CatSectionTitle>
    <!-- 横向二级菜单：有子分类时显示在标题下方 -->
    <div v-if="subTabs.length" class="cat-subnav">
      <button
        v-for="tab in subTabs"
        :key="tab.id"
        type="button"
        class="pill pill-bordered cat-subnav-item"
        :class="{ 'pill-primary': activeSub === tab.id }"
        @click="activeSub = tab.id"
      >
        {{ tab.name }}
      </button>
    </div>
    <SiteRow v-if="visibleSites.length">
      <SiteCard v-for="site in visibleSites" :key="site.id" :site="site" />
    </SiteRow>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SiteCard from './SiteCard.vue'
import CatSectionTitle from './CatSectionTitle.vue'
import SiteRow from './SiteRow.vue'

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
})

const activeSub = ref('')

// '' 表示"全部"
const subTabs = computed(() =>
  props.category.children?.length ? [{ id: '', name: '全部' }, ...props.category.children] : []
)

const visibleSites = computed(() => {
  if (!props.category.children || props.category.children.length === 0) {
    return props.category.sites || []
  }
  // 有子分类：默认展示全部，选中后按子分类 id 过滤
  const pool = props.category.sites
    ? props.category.sites
    : props.category.children.flatMap((sub) => sub.sites || [])
  if (!activeSub.value) return pool
  return pool.filter((site) => site.category === activeSub.value)
})
</script>

<style scoped>
.cat-subnav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}
</style>
