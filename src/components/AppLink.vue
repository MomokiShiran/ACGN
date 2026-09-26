<template>
  <LinkTag
    :to="to"
    :href="href"
    :target="target"
    :rel="rel"
    class="link"
    :class="{ 'text-muted': muted }"
  >
    <slot />
  </LinkTag>
</template>

<script setup>
import LinkTag from './LinkTag.vue'

defineProps({
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  muted: { type: Boolean, default: false },
  target: { type: String, default: undefined },
  rel: { type: String, default: undefined },
})
</script>

<style scoped>
.link {
  color: var(--text);
  outline: none;
  text-decoration: none;
  line-height: 1.5;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.link:hover,
.link:active {
  color: var(--primary);
}
.link.text-muted {
  color: var(--text-muted);
}
</style>
