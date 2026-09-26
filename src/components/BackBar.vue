<template>
  <div class="back-bar">
    <Button :to="to" :icon="arrowLeftIcon">{{ label }}</Button>
  </div>
</template>

<script setup>
import arrowLeftIcon from '@/assets/icons/arrow-left.svg'
import Button from './Button.vue'

defineProps({
  to: { type: [String, Object], required: true },
  label: { type: String, required: true },
})
</script>

<style scoped>
.back-bar {
  display: flex;
  margin-bottom: 12px;
}
</style>
