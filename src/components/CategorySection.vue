<template>
  <div :id="category.id">
    <SectionTitle bar>{{ category.name }}</SectionTitle>
    <!-- 横向二级菜单：有子分类时显示在标题下方 -->
    <PillGroup
      v-if="subTabs.length"
      :items="subTabs"
      :active="activeSub"
      bordered
      @select="activeSub = $event"
    />
    <SiteRow v-if="visibleSites.length">
      <SiteCard v-for="site in visibleSites" :key="site.id" :site="site" />
    </SiteRow>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SiteCard from './SiteCard.vue'
import PillGroup from './PillGroup.vue'
import SectionTitle from './SectionTitle.vue'
import SiteRow from './SiteRow.vue'

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
})

const activeSub = ref('')

// '' 表示"全部"；映射为 PillGroup 的 { value, label } 结构
const subTabs = computed(() =>
  props.category.children?.length
    ? [{ id: '', name: '全部' }, ...props.category.children].map((sub) => ({
        value: sub.id,
        label: sub.name,
      }))
    : []
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
