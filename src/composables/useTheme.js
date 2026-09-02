import { computed } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { DARK, LIGHT, STORAGE_KEY, DARK_THEME_COLOR, LIGHT_THEME_COLOR } from './themeConstants'

// useDark 声明式管理暗色模式：localStorage 持久化、系统偏好跟随、body 类名切换全部内置
// selector 指向 body：主题变量需覆盖到 body 层级，
// 否则 body 的 color/background/scrollbar 解析到的仍是浅色值并被未显式设色的后代继承
const isDark = useDark({
  selector: 'body',
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
