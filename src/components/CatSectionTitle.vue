<template>
  <component :is="tag" class="cat-section-title">
    <img v-if="icon" class="title-tag-icon" :src="icon" alt="" />
    <slot />
  </component>
</template>

<script setup>
defineProps({
  tag: { type: String, default: 'h4' },
  icon: { type: String, default: '' },
})
</script>

<style scoped>
/* 分区标题：左侧主色圆角竖条 */
.cat-section-title {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-4);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-dark);
}
.cat-section-title::before {
  content: '';
  width: 4px;
  height: 1.1em;
  border-radius: 999px;
  background: var(--primary);
  margin-right: var(--space-2);
}
.cat-section-title > img.title-tag-icon {
  width: 16px;
  height: 16px;
  margin-right: var(--space-1);
  transform: rotate(135deg);
}
</style>
