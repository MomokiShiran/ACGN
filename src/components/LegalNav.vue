<template>
  <PillGroup tag="nav" :items="legalLinks" :active="route.path" />
</template>

<script setup>
import { useRoute } from 'vue-router'
import PillGroup from './PillGroup.vue'
import { legalLinks } from '@/composables/legalLinks'

const route = useRoute()
</script>
