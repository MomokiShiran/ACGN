import { ref } from 'vue'

const DARK = 'io-black-mode'
const LIGHT = 'io-grey-mode'
const STORAGE_KEY = 'io-theme-mode'

const isDark = ref(false)

export function useTheme() {
  const getStored = () => {
    return (
      localStorage.getItem(STORAGE_KEY) ||
      (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? DARK : LIGHT)
    )
  }

  const apply = (theme) => {
    document.body.classList.remove(DARK, LIGHT)
    document.body.classList.add(theme)
    isDark.value = theme === DARK

    let meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'theme-color'
      document.head.appendChild(meta)
    }
    meta.content = getComputedStyle(document.body).getPropertyValue('--theme-color').trim()

    const icon = document.querySelector('.mode-ico')
    if (icon) {
      icon.classList.remove(isDark.value ? 'icon-night' : 'icon-light')
      icon.classList.add(isDark.value ? 'icon-light' : 'icon-night')
    }
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

  return { isDark, toggle, init }
}
