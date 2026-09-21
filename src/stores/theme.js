import { defineStore } from 'pinia'
import { computed, watchEffect } from 'vue'
import { useColorMode } from '@vueuse/core'
import { DARK, LIGHT, STORAGE_KEY, DARK_THEME_COLOR, LIGHT_THEME_COLOR } from '@/composables/themeConstants'

export const useThemeStore = defineStore('theme', () => {
  // useColorMode 声明式管理主题：localStorage 持久化（'dark' | 'light' | 'auto'）、
  // 系统偏好跟随、html 类名切换全部内置。store 为持久化的源模式，state 为解析后的
  // 实际模式（'auto' 时跟随 usePreferredDark）；index.html 内联脚本与之一致地预置类名
  // 防首帧闪色，切换/系统变化时状态改变会同步替换 html 上的类。
  const colorMode = useColorMode({
    selector: 'html',
    attribute: 'class',
    modes: { [DARK]: DARK, [LIGHT]: LIGHT },
    storageKey: STORAGE_KEY,
  })

  // 实际生效模式（'auto' 已解析为 dark/light），供按钮图标/高亮判断
  const isDark = computed(() => colorMode.value === DARK)
  // 实际模式名
  const mode = computed(() => colorMode.value)
  // 持久化源模式，可区分用户是否显式选了 auto
  const sourceMode = computed(() => colorMode.store.value)
  const themeClass = computed(() => (isDark.value ? DARK : LIGHT))

  // 首帧底色由 index.html 内联脚本设置；此处随主题切换持续同步 html 内联背景，
  // 避免内联样式的残值让 html 背景停在后于主题色
  watchEffect(() => {
    document.documentElement.style.backgroundColor = isDark.value
      ? DARK_THEME_COLOR
      : LIGHT_THEME_COLOR
  })

  // 显式三态：'dark' | 'light' | 'auto'（auto 跟随系统偏好）
  const setMode = (next) => {
    colorMode.value = next
  }

  // 保持原有按钮行为：dark/light 互切，不写入 auto
  const toggle = () => {
    colorMode.value = isDark.value ? LIGHT : DARK
  }

  return { isDark, mode, sourceMode, themeClass, toggle, setMode }
})
