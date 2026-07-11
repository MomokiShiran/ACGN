<template>
  <div class="content-search-section">
    <div class="content-search-box" id="search-box">
      <i class="iconfont icon-tag content-search-icon"></i>
      <input
        type="text"
        class="content-search-input"
        id="search-input"
        :value="modelValue"
        placeholder="输入关键字搜索站点名称、描述..."
        autocomplete="off"
        @input="$emit('update:modelValue', $event.target.value)"
        @keydown.enter="$event.target.blur()"
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
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'clear'])

const clear = () => {
  emit('update:modelValue', '')
  emit('clear')
}
</script>
