#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sitesPath = path.join(__dirname, '../src/data/sites.json')
const sitetrashPath = path.join(__dirname, '../src/data/sitetrash.json')

const DATETIME_RE = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/
const ICON_RE = /^(?:https?:)?\/\/|\/|\.\/|assets\/images\/sites\//

function readAndParse(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')

    if (content.includes('\uFFFD')) {
      console.error(`✗ 文件包含乱码字符 (U+FFFD) [${path.basename(filePath)}]`)
      process.exit(1)
    }

    const data = JSON.parse(content)

    if (!data || typeof data !== 'object' || !Array.isArray(data.categories)) {
      console.error(`✗ JSON 结构错误: 缺少 categories 数组 [${path.basename(filePath)}]`)
      process.exit(1)
    }

    console.log(`✓ JSON 格式正确 [${path.basename(filePath)}]`)
    return data.categories
  } catch (error) {
    console.error(`✗ JSON 格式错误 [${path.basename(filePath)}]:`, error.message)
    process.exit(1)
  }
}

function validateRequiredFields(categories, fileName) {
  const requiredFields = ['id', 'name', 'icon']
  // sitetrash.json 中的站点URL是可选的（失效站点可能没有URL）
  const siteRequiredFields = fileName === 'sitetrash.json' ? ['id', 'name'] : ['id', 'name', 'url']
  let hasError = false

  const checkCategory = (category, label) => {
    for (const field of requiredFields) {
      if (!category[field]) {
        console.error(
          `✗ 分类缺少必填字段 '${field}' [${fileName}]:`,
          category.name || category.id || label
        )
        hasError = true
      }
    }
  }

  const checkSites = (sites, categoryName, categoryId) => {
    for (const site of sites) {
      for (const field of siteRequiredFields) {
        if (!site[field]) {
          console.error(
            `✗ 站点缺少必填字段 '${field}' [${fileName} -> ${categoryName}]:`,
            site.name || site.id || '未知'
          )
          hasError = true
        }
      }

      if (categoryId && site.category && site.category !== categoryId) {
        console.error(
          `✗ 站点 category 与所属分类不一致 [${fileName} -> ${categoryName}]:`,
          `${site.name || site.id} 的 category='${site.category}'，应为 '${categoryId}'`
        )
        hasError = true
      }

      if (site.disabledAt && !DATETIME_RE.test(site.disabledAt)) {
        console.error(
          `✗ 站点 disabledAt 格式错误 [${fileName} -> ${categoryName}]:`,
          `${site.name || site.id} 的值 '${site.disabledAt}'，应为空字符串或时间 (YYYY-MM-DD HH:mm:ss)`
        )
        hasError = true
      }

      if (site.icon && !ICON_RE.test(site.icon)) {
        console.error(
          `✗ 站点 icon 格式异常 [${fileName} -> ${categoryName}]:`,
          `${site.name || site.id} 的值 '${site.icon}'，应为 URL、/ 开头、./ 开头或 assets/images/sites/ 相对路径`
        )
        hasError = true
      }
    }
  }

  for (const category of categories) {
    checkCategory(category)

    if (category.children && Array.isArray(category.children)) {
      for (const subCategory of category.children) {
        checkCategory(subCategory)

        if (subCategory.sites && Array.isArray(subCategory.sites)) {
          checkSites(subCategory.sites, `${category.name} -> ${subCategory.name}`, subCategory.id)
        }
      }
    }

    if (category.sites && Array.isArray(category.sites) && !category.children) {
      checkSites(category.sites, category.name, category.id)
    }
  }

  if (!hasError) {
    console.log(`✓ 所有必填字段及格式完整 [${fileName}]`)
  }

  return hasError
}

function checkDuplicateUrls(categories, fileName) {
  const urlMap = new Map()
  let hasDuplicate = false

  function checkSites(sites, categoryName) {
    for (const site of sites) {
      if (site.url) {
        const normalizedUrl = site.url.toLowerCase().replace(/\/$/, '')
        if (urlMap.has(normalizedUrl)) {
          console.error(
            `✗ 重复链接: '${site.url}' [${fileName} -> ${categoryName}] 和 [${urlMap.get(normalizedUrl)}]`
          )
          hasDuplicate = true
        } else {
          urlMap.set(normalizedUrl, `${fileName} -> ${categoryName}`)
        }
      }
    }
  }

  for (const category of categories) {
    if (category.sites && Array.isArray(category.sites) && !category.children) {
      checkSites(category.sites, category.name)
    }

    if (category.children && Array.isArray(category.children)) {
      for (const subCategory of category.children) {
        if (subCategory.sites && Array.isArray(subCategory.sites)) {
          checkSites(subCategory.sites, `${category.name} -> ${subCategory.name}`)
        }
      }
    }
  }

  if (!hasDuplicate) {
    console.log(`✓ 无重复链接 [${fileName}]`)
  }

  return hasDuplicate
}

function checkDuplicateIds(categories, fileName) {
  const idSet = new Set()
  let hasDuplicate = false

  const checkId = (id, label) => {
    const key = String(id)
    if (idSet.has(key)) {
      console.error(`✗ 重复ID: '${id}' [${fileName} -> ${label}]`)
      hasDuplicate = true
    }
    idSet.add(key)
  }

  for (const category of categories) {
    checkId(category.id, category.name || category.id)

    if (category.children && Array.isArray(category.children)) {
      for (const subCategory of category.children) {
        checkId(subCategory.id, `${category.name} -> ${subCategory.name}`)

        if (subCategory.sites && Array.isArray(subCategory.sites)) {
          for (const site of subCategory.sites) {
            checkId(site.id, `${category.name} -> ${subCategory.name} -> ${site.name}`)
          }
        }
      }
    }

    if (category.sites && Array.isArray(category.sites) && !category.children) {
      for (const site of category.sites) {
        checkId(site.id, `${category.name} -> ${site.name}`)
      }
    }
  }

  if (!hasDuplicate) {
    console.log(`✓ 无重复ID [${fileName}]`)
  }

  return hasDuplicate
}

function checkUrlFormat(categories, fileName) {
  const urlRegex = /^https?:\/\/[^\s]+$/
  let hasError = false

  function checkUrls(sites, categoryName) {
    for (const site of sites) {
      if (site.url && !urlRegex.test(site.url)) {
        console.error(
          `✗ URL格式错误 [${fileName} -> ${categoryName}]: '${site.url}' (站点: ${site.name || site.id})`
        )
        hasError = true
      }
    }
  }

  for (const category of categories) {
    if (category.sites && Array.isArray(category.sites) && !category.children) {
      checkUrls(category.sites, category.name)
    }

    if (category.children && Array.isArray(category.children)) {
      for (const subCategory of category.children) {
        if (subCategory.sites && Array.isArray(subCategory.sites)) {
          checkUrls(subCategory.sites, `${category.name} -> ${subCategory.name}`)
        }
      }
    }
  }

  if (!hasError) {
    console.log(`✓ URL格式正确 [${fileName}]`)
  }

  return hasError
}

function collectIconRefs(categories) {
  const refs = new Set()
  const walk = (list) => {
    for (const cat of list) {
      if (cat.icon) refs.add(cat.icon)
      if (cat.sites) for (const site of cat.sites) if (site.icon) refs.add(site.icon)
      if (cat.children && Array.isArray(cat.children)) walk(cat.children)
    }
  }
  walk(categories)
  return refs
}

function checkIconReferences(categoriesList, iconDir) {
  const allRefs = new Set()
  for (const categories of categoriesList) {
    for (const ref of collectIconRefs(categories)) allRefs.add(ref)
  }

  const localRefs = [...allRefs].filter((ref) => ref.startsWith('assets/images/sites/'))
  const missing = localRefs.filter((ref) => !fs.existsSync(path.join(iconDir, path.basename(ref))))
  if (missing.length > 0) {
    for (const ref of missing) {
      console.error(`✗ 数据引用的图标文件不存在: '${ref}'`)
    }
  }

  let hasError = missing.length > 0
  if (fs.existsSync(iconDir)) {
    const files = fs.readdirSync(iconDir).filter((f) => f.endsWith('.png'))
    const orphan = files.filter((f) => !allRefs.has(`assets/images/sites/${f}`))
    if (orphan.length > 0) {
      hasError = true
      console.error(`✗ 以下站点图标未被任何数据引用（疑似孤儿，请删除）:`)
      for (const f of orphan) console.error(`   assets/images/sites/${f}`)
    }
  }

  if (!hasError) {
    console.log(`✓ 图标引用完整，无缺失文件、无孤儿图标`)
  }
  return hasError
}

function validateFile(filePath) {
  const fileName = path.basename(filePath)
  console.log(`\n开始校验 ${fileName}...`)

  const categories = readAndParse(filePath)
  const fieldError = validateRequiredFields(categories, fileName)
  const urlDuplicate = checkDuplicateUrls(categories, fileName)
  const idDuplicate = checkDuplicateIds(categories, fileName)
  const urlFormatError = checkUrlFormat(categories, fileName)

  return { categories, hasError: fieldError || urlDuplicate || idDuplicate || urlFormatError }
}

function main() {
  let hasError = false

  console.log('开始校验...')

  const sitesResult = validateFile(sitesPath)
  const trashResult = validateFile(sitetrashPath)
  hasError = sitesResult.hasError || trashResult.hasError

  const iconDir = path.join(__dirname, '../src/assets/images/sites')
  hasError = checkIconReferences([sitesResult.categories, trashResult.categories], iconDir) || hasError

  console.log('\n校验完成！')

  if (hasError) {
    process.exit(1)
  } else {
    console.log('✓ 所有校验通过！')
  }
}

main()
