import defaultIcon from '@/assets/images/favicon.png'
import linkIcon from '@/assets/icons/link.svg'

const iconModules = import.meta.glob('@/assets/images/sites/*.{png,ico,svg}', {
  eager: true,
  import: 'default',
})
const iconMap = Object.fromEntries(
  Object.entries(iconModules).map(([path, url]) => [path.split('/').pop(), url])
)

const navIconModules = import.meta.glob('@/assets/icons/*.svg', {
  eager: true,
  import: 'default',
})
const navIconMap = Object.fromEntries(
  Object.entries(navIconModules).map(([path, url]) => [path.split('/').pop(), url])
)

export function resolveIcon(icon) {
  if (!icon) return defaultIcon
  if (/^(?:https?:)?\/\//.test(icon) || icon.startsWith('/')) return icon
  return iconMap[icon.split('/').pop()] || defaultIcon
}

// 侧边栏分类图标：JSON 里保存形如 ./xxx.svg，映射到 src/assets/icons 内的资源
export function resolveNavIcon(icon) {
  if (!icon) return linkIcon
  return navIconMap[icon.split('/').pop()] || linkIcon
}

export function handleIconError(event) {
  if (event.target) {
    event.target.src = defaultIcon
  }
}
