<template>
  <PillGroup tag="nav" :items="items" :active="route.path" />
</template>

<script setup>
import { useRoute } from 'vue-router'
import PillGroup from './PillGroup.vue'

const route = useRoute()

const items = [
  { value: '/about', label: '关于本站', to: '/about' },
  { value: '/disclaimer', label: '免责声明', to: '/disclaimer' },
  { value: '/privacy', label: '隐私政策', to: '/privacy' },
]
</script>
