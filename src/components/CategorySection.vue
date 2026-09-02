<template>
  <div>
    <h4 class="cat-section-title text-gray text-lg mb-4 d-flex flex-fill">
      <i :id="category.id" class="site-tag iconfont icon-tag icon-lg me-1"></i>{{ category.name }}
    </h4>
    <!-- 横向二级菜单：有子分类时显示在标题下方 -->
    <div v-if="subTabs.length" class="cat-subnav mb-4">
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
