export const DARK = 'dark'
export const LIGHT = 'light'
export const AUTO = 'auto'
export const STORAGE_KEY = 'theme-mode'
export const DARK_THEME_COLOR = '#1b1d1f'
export const LIGHT_THEME_COLOR = '#f9f9f9'

// 主题切换按钮的数据源：value 与 useColorMode 的 store 值一致，label 用于 aria-label/title
export const THEME_MODES = [
  { value: LIGHT, label: '浅色' },
  { value: DARK, label: '深色' },
  { value: AUTO, label: '跟随系统' },
]
