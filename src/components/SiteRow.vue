<template>
  <div class="site-row"><slot /></div>
</template>

<style scoped>
/* 弹性栅格容器 */
.site-row {
  display: flex;
  flex-wrap: wrap;
  margin-right: calc(-1 * var(--space-4));
  margin-left: calc(-1 * var(--space-4));
}
@media (min-width: 768px) {
  .site-row {
    margin-right: -0.75rem;
    margin-left: -0.75rem;
  }
}
@media (max-width: 767.98px) {
  .site-row {
    margin-right: 0;
    margin-left: 0;
  }
}
</style>
