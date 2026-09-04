<template>
  <div>
    <h4 class="cat-section-title">
      <i :id="category.id" class="iconfont icon-tag icon-lg"></i>{{ category.name }}
    </h4>
    <!-- 横向二级菜单：有子分类时显示在标题下方 -->
    <div v-if="subTabs.length" class="cat-subnav">
      <button
        v-for="tab in subTabs"
        :key="tab.id"
        type="button"
        class="cat-subnav-item"
        :class="{ active: activeSub === tab.id }"
        @click="activeSub = tab.id"
      >
        {{ tab.name }}
      </button>
    </div>
    <div class="row">
      <SiteCard v-for="site in visibleSites" :key="site.id" :site="site" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SiteCard from './SiteCard.vue'

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
/* 分类横向二级菜单 */
.cat-subnav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: var(--space-4);
}

.cat-subnav-item {
  border: 1px solid var(--border);
  background: var(--bg-surface);
  color: var(--text-muted);
  padding: 5px 14px;
  border-radius: 999px;
  font-size: var(--font-size-sm);
  line-height: 1.5;
  cursor: pointer;
  transition:
    color var(--transition-normal),
    background-color var(--transition-normal),
    border-color var(--transition-normal);
}

.cat-subnav-item:hover {
  color: var(--primary);
  border-color: var(--primary);
}

.cat-subnav-item.active {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
}
</style>
