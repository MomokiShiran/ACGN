import defaultIcon from '@/assets/images/favicon.png'

const iconModules = import.meta.glob('@/assets/images/sites/*.png', { eager: true, import: 'default' })
const iconMap = Object.fromEntries(
  Object.entries(iconModules).map(([path, url]) => [path.split('/').pop(), url])
)

export function resolveIcon(icon) {
  if (!icon) return defaultIcon
  if (/^(?:https?:)?\/\//.test(icon)) return icon
  return iconMap[icon.split('/').pop()] || defaultIcon
}

export { defaultIcon }
