import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import sitesData from '@data/sites.json'
import sitetrashData from '@data/sitetrash.json'

export const useSitesStore = defineStore('sites', () => {
  const categories = ref(sitesData.categories)
  const trashCategories = ref(sitetrashData.categories)

  const allSites = computed(() => {
    const sites = []
    categories.value.forEach((cat) => {
      if (cat.sites) {
        cat.sites.forEach((site) => sites.push({ ...site, categoryName: cat.name }))
      }
      if (cat.children) {
        cat.children.forEach((sub) => {
          if (sub.sites) {
            sub.sites.forEach((site) => sites.push({ ...site, categoryName: sub.name }))
          }
        })
      }
    })
    return sites
  })

  const allTrashSites = computed(() => {
    const sites = []
    trashCategories.value.forEach((cat) => {
      if (cat.sites) {
        cat.sites.forEach((site) => sites.push({ ...site, categoryName: cat.name }))
      }
    })
    return sites
  })

  const flatCategories = computed(() => {
    const result = []
    categories.value.forEach((cat) => {
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
  })

  const findSiteById = (id) => {
    const numId = Number(id)
    for (const cat of categories.value) {
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
    for (const cat of trashCategories.value) {
      if (cat.sites) {
        const found = cat.sites.find((s) => s.id === numId)
        if (found) return { site: found, categoryName: cat.name }
      }
    }
    return null
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
