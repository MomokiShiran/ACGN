import contentPages from '@/data/contentPages.json'

// 法律信息入口，页脚与 LegalNav 共用，避免两处各写一份。
// 展示顺序在此声明；文案与正文以 contentPages.json 为准，路径与路由的 /:key 对应。
const LEGAL_KEYS = ['about', 'disclaimer', 'privacy']

export const legalLinks = LEGAL_KEYS.map((key) => {
  const page = contentPages.pages.find((p) => p.key === key)
  return { value: `/${key}`, to: `/${key}`, label: page?.title ?? key }
})
