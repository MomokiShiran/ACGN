<template>
  <component
    :is="isLink ? LinkTag : 'button'"
    :to="to"
    :href="href"
    :target="target"
    :rel="rel"
    :type="isLink ? undefined : 'button'"
    class="btn"
    :class="[`btn-${shape}`, `btn-${size}`, `btn-${tone}`, { 'btn-bordered': bordered }]"
  >
    <img v-if="icon" class="btn-icon" :src="icon" alt="" />
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import LinkTag from './LinkTag.vue'

// 交互控件原语，取代原先重复的 Pill 与 PrimaryButton。
// 三个正交维度：shape 圆角形状、size 尺寸、tone 配色；
// bordered 仅对 surface 配色有意义。给了 to/href 就是链接，否则是原生 button。
const props = defineProps({
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  target: { type: String, default: undefined },
  rel: { type: String, default: undefined },
  shape: { type: String, default: 'pill' },
  size: { type: String, default: 'sm' },
  tone: { type: String, default: 'surface' },
  bordered: { type: Boolean, default: false },
  icon: { type: String, default: '' },
})

const isLink = computed(() => Boolean(props.to || props.href))
</script>

<style scoped>
.btn {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-align: center;
  white-space: normal;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  transition:
    color 0.2s ease-in-out,
    background-color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

/* 形状 */
.btn-pill {
  border-radius: 100px;
}
.btn-rounded {
  border-radius: 6px;
}

/* 尺寸 */
.btn-sm {
  padding: 6px 16px;
  font-size: 0.75rem;
  line-height: 1.5;
}
.btn-md {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
}
.btn-lg {
  padding: 8px 20px;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* 配色 */
.btn-surface {
  background: var(--bg-surface);
  color: var(--text-muted);
}
.btn-surface:hover {
  color: var(--primary);
  border-color: var(--primary);
}
.btn-primary,
.btn-primary:hover {
  color: #fff;
  background: var(--primary);
  border-color: var(--primary);
}
.btn-bordered {
  border-color: var(--border);
}

.btn-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
</style>
