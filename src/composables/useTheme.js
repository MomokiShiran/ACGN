import { computed } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { DARK, LIGHT, STORAGE_KEY, DARK_THEME_COLOR, LIGHT_THEME_COLOR } from './themeConstants'

// useDark 声明式管理暗色模式：localStorage 持久化、系统偏好跟随、类名切换全部内置
// 默认 selector 为 html：主题变量覆盖在 html 层级，body 的 color/background/scrollbar
// 通过变量继承解析，未显式设色的后代也随之正确；index.html 的内联脚本在绘制前
// 预置同类名防闪白，切换时 useDark 会在同一元素上替换，不会产生陈旧类
const isDark = useDark({
  storageKey: STORAGE_KEY,
  valueDark: DARK,
  valueLight: LIGHT,
})

const toggle = useToggle(isDark)
const themeClass = computed(() => (isDark.value ? DARK : LIGHT))
const themeColor = computed(() => (isDark.value ? DARK_THEME_COLOR : LIGHT_THEME_COLOR))

// 全局单例状态：整个应用只有一个主题，跨 App/TheFooter 等组件共享
export function useTheme() {
  return { isDark, themeClass, themeColor, toggle }
}
