<template>
  <Card class="empty-state"><slot /></Card>
</template>

<script setup>
import Card from './Card.vue'
</script>

<style scoped>
.empty-state {
  --card-padding: 60px 20px;
  text-align: center;
  color: var(--text-muted);
}
</style>
