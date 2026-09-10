<template>
  <div class="content">
    <div :class="panelClass">
      <div class="card-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  panelClass: {
    type: String,
    default: 'card no-hover-card',
  },
})
</script>
