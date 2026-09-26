<template>
  <template v-for="(node, index) in nodes" :key="index">
    <AppLink v-if="node.to" :to="node.to">{{ node.text }}</AppLink>
    <AppLink v-else-if="node.href" :href="node.href" :target="node.target" :rel="node.rel">
      <img v-if="node.icon === 'github'" class="cp-icon" :src="githubIcon" alt="" />
      {{ node.text }}
    </AppLink>
    <strong v-else-if="node.strong">{{ node.text }}</strong>
    <template v-else>{{ typeof node === 'string' ? node : node.text }}</template>
  </template>
</template>

<script setup>
import githubIcon from '@/assets/icons/github.svg'
import AppLink from './AppLink.vue'

defineProps({
  nodes: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.cp-icon {
  width: 18px;
  height: 18px;
  margin-right: 8px;
  vertical-align: middle;
}
</style>
