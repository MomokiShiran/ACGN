<template>
  <div class="content-search-section">
    <div class="content-search-box" id="search-box">
      <i class="fas fa-tag content-search-icon"></i>
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

<style scoped>
.content-search-section {
  display: flex;
  justify-content: center;
  padding: 20px 16px 0;
  box-sizing: border-box;
}

.content-search-box {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  height: 44px;
  padding: 0 10px 0 44px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 999px;
  box-sizing: border-box;
}
.content-search-box:focus-within {
  border-color: var(--primary);
}
/* 夜间模式 --border 为 transparent，恢复可见边框（.io-black-mode 在 <html> 上，属祖先选择器） */
.io-black-mode .content-search-box {
  border-color: var(--bg-gray);
}

.content-search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%) rotate(135deg);
  color: var(--bg-surface);
  -webkit-text-stroke: 1.5px #000;
  font-size: 16px;
}
.io-black-mode .content-search-icon {
  color: var(--bg-surface);
  -webkit-text-stroke: 1.5px #fff;
}

.content-search-input {
  flex: 1;
  height: 100%;
  padding: 0 12px;
  border: none;
  outline: none;
  background: transparent;
  font-size: var(--font-size-md);
  color: var(--text);
  box-sizing: border-box;
}
.content-search-input::placeholder {
  color: var(--text-muted);
}

.content-search-clear {
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  border-radius: 50%;
}
.content-search-clear:hover {
  color: var(--text);
}

@media (max-width: 767.98px) {
  /* 移动端吸附在导航栏（56px）下方 */
  .content-search-section {
    position: sticky;
    top: 56px;
    z-index: 10;
    background: var(--bg);
    padding: 10px 12px 8px;
  }
  .content-search-box {
    height: 40px;
    padding: 0 8px 0 38px;
  }
  .content-search-icon {
    left: 14px;
    font-size: 14px;
  }
  .content-search-input {
    font-size: var(--font-size-sm);
    padding: 0 8px;
  }
  .content-search-clear {
    width: 26px;
    height: 26px;
    font-size: 20px;
  }
}
</style>
