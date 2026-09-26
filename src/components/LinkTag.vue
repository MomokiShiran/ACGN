<template>
  <router-link v-if="isInternal" :to="to" :target="target" :rel="rel">
    <slot />
  </router-link>
  <a v-else :href="href" :target="target" :rel="rel">
    <slot />
  </a>
</template>

<script setup>
import { computed } from 'vue'

// 两支不合并不用 <component :is>：router-link 会自算 href，
// 透传进去的 href 会被 fallthrough 覆盖，导致内部链接渲染出没有 href 的 <a>。
const props = defineProps({
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  target: { type: String, default: undefined },
  rel: { type: String, default: undefined },
})

const isInternal = computed(() => Boolean(props.to))
</script>
