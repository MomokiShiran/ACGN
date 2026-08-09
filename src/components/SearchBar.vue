<template>
  <div class="content-search-section">
    <div class="content-search-box" id="search-box">
      <i class="iconfont icon-tag content-search-icon"></i>
      <input
        ref="inputRef"
        type="text"
        class="content-search-input"
        id="search-input"
        :value="modelValue"
        placeholder="输入关键字搜索站点名称、描述..."
        aria-label="搜索站点"
        autocomplete="off"
        @input="$emit('update:modelValue', $event.target.value)"
        @keydown.enter="inputRef.blur()"
        @keydown.esc="clear"
      />
      <button
        v-show="modelValue.trim()"
        type="button"
        class="content-search-clear"
        id="search-clear"
        title="清除"
        @click="clear"
      >
        ×
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const inputRef = ref(null)
const emit = defineEmits(['update:modelValue'])

const clear = () => {
  emit('update:modelValue', '')
}
</script>
