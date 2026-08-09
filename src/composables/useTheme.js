import { ref, computed } from 'vue'
import { DARK, LIGHT, STORAGE_KEY, DARK_THEME_COLOR, LIGHT_THEME_COLOR } from './themeConstants'

const isDark = ref(false)

const themeClass = computed(() => (isDark.value ? DARK : LIGHT))
const themeColor = computed(() => (isDark.value ? DARK_THEME_COLOR : LIGHT_THEME_COLOR))

export function useTheme() {
  const getStored = () => {
    return (
      localStorage.getItem(STORAGE_KEY) ||
      (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? DARK : LIGHT)
    )
  }

  const apply = (theme) => {
    isDark.value = theme === DARK
  }

  const toggle = () => {
    const newTheme = isDark.value ? LIGHT : DARK
    localStorage.setItem(STORAGE_KEY, newTheme)
    apply(newTheme)
  }

  const init = () => {
    apply(getStored())
    window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        apply(e.matches ? DARK : LIGHT)
      }
    })
  }

  return { isDark, themeClass, themeColor, toggle, init }
}
