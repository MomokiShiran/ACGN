<template>
  <component :is="tag" class="section-title" :class="{ 'section-title-bar': bar }">
    <img
      v-if="icon"
      class="section-title-icon"
      :class="{ 'section-title-icon-rotate': rotate }"
      :src="icon"
      alt=""
    />
    <slot />
  </component>
</template>

<script setup>
// 分区/页面标题原语，取代原先风格不一致的 PageTitle 与 CatSectionTitle：
// - bar：分类分区标题（左侧主色竖条 + 加粗深色）
// - 默认：页面级弱化标题（次级文字色）
// - rotate：单个图标的 135° 视觉校正，按图标逐个开启
defineProps({
  tag: { type: String, default: 'h4' },
  icon: { type: String, default: '' },
  bar: { type: Boolean, default: false },
  rotate: { type: Boolean, default: false },
})
</script>

<style scoped>
.section-title {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 1rem;
  color: var(--text-muted);
}
.section-title-icon {
  width: 18px;
  height: 18px;
  margin-right: 8px;
  flex-shrink: 0;
}
.section-title-icon-rotate {
  transform: rotate(135deg);
}
/* 分区标题：左侧主色圆角竖条 */
.section-title-bar {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-heading);
}
.section-title-bar::before {
  content: '';
  width: 4px;
  height: 1.1em;
  margin-right: 8px;
  flex-shrink: 0;
  border-radius: 999px;
  background: var(--primary);
}
</style>
