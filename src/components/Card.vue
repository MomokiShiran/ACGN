<template>
  <div class="card"><slot /></div>
</template>

<style scoped>
/* 内边距走 --card-padding，衍生容器（如 EmptyState）覆盖该变量即可，无需再写一遍表面样式 */
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: var(--card-padding, 16px);
  margin-bottom: 16px;
  word-wrap: break-word;
  background: var(--card-bg);
  border-radius: 16px;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
}
</style>
