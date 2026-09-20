<template>
  <h4 class="page-title"><slot /></h4>
</template>

<style scoped>
.page-title {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-4);
  color: var(--text-muted);
  font-size: var(--font-size-lg);
}
</style>
