import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import sitesData from '@/data/sites.json'
import sitetrashData from '@/data/sitetrash.json'

// 展平分类树，返回带 categoryName 的站点数组
const flattenSites = (cats) => {
  const result = []
  cats.forEach((cat) => {
    if (cat.sites) {
      cat.sites.forEach((site) => result.push({ ...site, categoryName: cat.name }))
    }
    if (cat.children) {
      cat.children.forEach((sub) => {
        if (sub.sites) {
          sub.sites.forEach((site) => result.push({ ...site, categoryName: sub.name }))
        }
      })
    }
  })
  return result
}

// 提取叶子分类用于首页展示：有 children 时取有站点的子分类，否则取自身（需有站点）
const flattenCategories = (cats) => {
  const result = []
  cats.forEach((cat) => {
    if (cat.children && cat.children.length > 0) {
      cat.children.forEach((sub) => {
        if (sub.sites && sub.sites.length > 0) {
          result.push(sub)
        }
      })
    } else if (cat.sites && cat.sites.length > 0) {
      result.push(cat)
    }
  })
  return result
}

// 在分类树中查找站点，返回 { site, categoryName } 或 null
const findSiteIn = (cats, numId) => {
  for (const cat of cats) {
    if (cat.sites) {
      const found = cat.sites.find((s) => s.id === numId)
      if (found) return { site: found, categoryName: cat.name }
    }
    if (cat.children) {
      for (const sub of cat.children) {
        if (sub.sites) {
          const found = sub.sites.find((s) => s.id === numId)
          if (found) return { site: found, categoryName: sub.name }
        }
      }
    }
  }
  return null
}

export const useSitesStore = defineStore('sites', () => {
  const categories = ref(sitesData.categories)
  const trashCategories = ref(sitetrashData.categories)

  const allSites = computed(() => flattenSites(categories.value))
  const allTrashSites = computed(() => flattenSites(trashCategories.value))
  const flatCategories = computed(() => flattenCategories(categories.value))

  const findSiteById = (id) => {
    const numId = Number(id)
    return findSiteIn(categories.value, numId) || findSiteIn(trashCategories.value, numId)
  }

  const searchSites = (keyword) => {
    const kw = keyword.trim().toLowerCase()
    if (!kw) return []
    const seen = new Set()
    const matches = []
    allSites.value.forEach((site) => {
      const haystack = `${site.name} ${site.description}`.toLowerCase()
      if (haystack.includes(kw) && !seen.has(site.id)) {
        seen.add(site.id)
        matches.push(site)
      }
    })
    return matches
  }

  return {
    categories,
    trashCategories,
    allSites,
    allTrashSites,
    flatCategories,
    findSiteById,
    searchSites,
  }
})
