<template>
  <template v-for="(node, index) in nodes" :key="index">
    <router-link v-if="node.to" :to="node.to">{{ node.text }}</router-link>
    <a
      v-else-if="node.href"
      :href="node.href"
      :target="node.target"
      :rel="node.rel"
    >
      <img v-if="node.icon === 'github'" class="cp-icon" :src="githubIcon" alt="" />
      {{ node.text }}
    </a>
    <strong v-else-if="node.strong">{{ node.text }}</strong>
    <template v-else>{{ node.text }}</template>
  </template>
</template>

<script setup>
import githubIcon from '@/assets/icons/github.svg'

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
  margin-right: var(--space-2);
  vertical-align: middle;
}
</style>