<template>
  <div class="empty-state"><slot /></div>
</template>

<style scoped>
.empty-state {
  padding: 60px 20px;
  text-align: center;
  color: var(--text-muted);
  background: var(--card-bg);
  border-radius: var(--radius-2xl);
}
</style>
