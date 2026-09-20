<template>
  <h4 class="cat-section-title"><slot /></h4>
</template>

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
</style>
