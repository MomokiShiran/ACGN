import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSitesStore } from '../sites'

describe('useSitesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('searchSites returns [] for empty keyword', () => {
    const store = useSitesStore()
    expect(store.searchSites('')).toEqual([])
    expect(store.searchSites('   ')).toEqual([])
  })

  it('searchSites matches name/description case-insensitively', () => {
    const store = useSitesStore()
    const kw = 'pixiv'
    const results = store.searchSites('PIXIV')
    expect(results.length).toBeGreaterThan(0)
    for (const site of results) {
      const haystack = `${site.name} ${site.description}`.toLowerCase()
      expect(haystack).toContain(kw)
    }
  })

  it('findSiteById returns site with categoryName', () => {
    const store = useSitesStore()
    const first = store.allSites[0]
    const found = store.findSiteById(first.id)
    expect(found).not.toBeNull()
    expect(found.site.id).toBe(first.id)
    expect(typeof found.categoryName).toBe('string')
  })

  it('findSiteById returns null for missing id', () => {
    const store = useSitesStore()
    expect(store.findSiteById(99999999)).toBeNull()
  })

  it('flatCategories returns non-empty categories (leaf sites or children sites)', () => {
    const store = useSitesStore()
    expect(store.flatCategories.length).toBeGreaterThan(0)
    for (const cat of store.flatCategories) {
      if (cat.children && cat.children.length > 0) {
        for (const sub of cat.children) {
          expect(sub.sites.length).toBeGreaterThan(0)
        }
      } else {
        expect(cat.sites.length).toBeGreaterThan(0)
      }
    }
  })
})
