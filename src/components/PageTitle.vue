<template>
  <h4 class="page-title">
    <img v-if="icon" class="page-title-icon" :src="icon" alt="" />
    <slot />
  </h4>
</template>

<script setup>
defineProps({
  icon: { type: String, default: '' },
})
</script>

<style scoped>
.page-title {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-4);
  color: var(--text-muted);
  font-size: var(--font-size-lg);
}
.page-title .page-title-icon {
  width: 16px;
  height: 16px;
  margin-right: var(--space-1);
  transform: rotate(135deg);
}
</style>
