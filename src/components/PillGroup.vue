<template>
  <component :is="tag" class="pill-group">
    <Button
      v-for="item in items"
      :key="item.value"
      :to="item.to"
      :bordered="bordered"
      :tone="item.value === active ? 'primary' : 'surface'"
      @click="emit('select', item.value)"
    >
      {{ item.label }}
    </Button>
  </component>
</template>

<script setup>
import Button from './Button.vue'

// 一行胶囊导航，当前项高亮。原先 LegalNav（路由驱动）与
// CategorySection 的子分类切换（本地状态驱动）各自实现了一份，现共用。
// items: [{ value, label, to? }]，无 to 时退化为普通按钮
defineProps({
  items: { type: Array, required: true },
  active: { type: String, default: '' },
  tag: { type: String, default: 'div' },
  bordered: { type: Boolean, default: false },
})

const emit = defineEmits(['select'])
</script>

<style scoped>
.pill-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}
</style>
