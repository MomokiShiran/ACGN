#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const sitesPath = path.join(__dirname, '../data/sites.json');

function validateJSON() {
  let data;
  try {
    const content = fs.readFileSync(sitesPath, 'utf8');
    data = JSON.parse(content);
    
    if (!data || typeof data !== 'object' || !Array.isArray(data.categories)) {
      console.error('✗ JSON 结构错误: 缺少 categories 数组');
      process.exit(1);
    }
    
    console.log('✓ JSON 格式正确');
    return data.categories;
  } catch (error) {
    console.error('✗ JSON 格式错误:', error.message);
    process.exit(1);
  }
}

function validateRequiredFields(categories) {
  const requiredFields = ['id', 'name', 'icon'];
  let hasError = false;

  for (const category of categories) {
    // 检查分类必填字段
    for (const field of requiredFields) {
      if (!category[field]) {
        console.error(`✗ 分类缺少必填字段 '${field}':`, category.name || category.id || '未知');
        hasError = true;
      }
    }

    // 检查子分类（如果有）
    if (category.children && Array.isArray(category.children)) {
      for (const subCategory of category.children) {
        for (const field of requiredFields) {
          if (!subCategory[field]) {
            console.error(`✗ 子分类缺少必填字段 '${field}':`, subCategory.name || subCategory.id || '未知');
            hasError = true;
          }
        }

        // 检查子分类的站点
        if (subCategory.sites && Array.isArray(subCategory.sites)) {
          validateSiteFields(subCategory.sites, `${category.name} -> ${subCategory.name}`);
        }
      }
    }

    // 检查站点必填字段（非嵌套分类）
    if (category.sites && Array.isArray(category.sites) && !category.children) {
      validateSiteFields(category.sites, category.name);
    }
  }

  function validateSiteFields(sites, categoryName) {
    const siteRequiredFields = ['id', 'name', 'url'];
    for (const site of sites) {
      for (const field of siteRequiredFields) {
        if (!site[field]) {
          console.error(`✗ 站点缺少必填字段 '${field}' [分类: ${categoryName}]:`, site.name || site.id || '未知');
          hasError = true;
        }
      }
    }
  }

  if (!hasError) {
    console.log('✓ 所有必填字段完整');
  }

  return hasError;
}

function checkDuplicateUrls(categories) {
  const urlMap = new Map();
  let hasDuplicate = false;

  function checkSites(sites, categoryName) {
    for (const site of sites) {
      if (site.url) {
        const normalizedUrl = site.url.toLowerCase().replace(/\/$/, '');
        if (urlMap.has(normalizedUrl)) {
          console.error(`✗ 重复链接: '${site.url}' 在 [${categoryName}] 和 [${urlMap.get(normalizedUrl)}] 中重复`);
          hasDuplicate = true;
        } else {
          urlMap.set(normalizedUrl, categoryName);
        }
      }
    }
  }

  for (const category of categories) {
    // 非嵌套分类的站点
    if (category.sites && Array.isArray(category.sites) && !category.children) {
      checkSites(category.sites, category.name);
    }
    
    // 嵌套子分类的站点
    if (category.children && Array.isArray(category.children)) {
      for (const subCategory of category.children) {
        if (subCategory.sites && Array.isArray(subCategory.sites)) {
          checkSites(subCategory.sites, `${category.name} -> ${subCategory.name}`);
        }
      }
    }
  }

  if (!hasDuplicate) {
    console.log('✓ 无重复链接');
  }

  return hasDuplicate;
}

function checkDuplicateIds(categories) {
  const idSet = new Set();
  let hasDuplicate = false;

  for (const category of categories) {
    if (idSet.has(category.id)) {
      console.error(`✗ 重复分类ID: '${category.id}'`);
      hasDuplicate = true;
    }
    idSet.add(category.id);

    // 嵌套子分类
    if (category.children && Array.isArray(category.children)) {
      for (const subCategory of category.children) {
        if (idSet.has(subCategory.id)) {
          console.error(`✗ 重复分类ID: '${subCategory.id}'`);
          hasDuplicate = true;
        }
        idSet.add(subCategory.id);

        if (subCategory.sites && Array.isArray(subCategory.sites)) {
          for (const site of subCategory.sites) {
            const siteId = String(site.id);
            if (idSet.has(siteId)) {
              console.error(`✗ 重复站点ID: '${site.id}'`);
              hasDuplicate = true;
            }
            idSet.add(siteId);
          }
        }
      }
    }

    // 非嵌套分类的站点
    if (category.sites && Array.isArray(category.sites) && !category.children) {
      for (const site of category.sites) {
        const siteId = String(site.id);
        if (idSet.has(siteId)) {
          console.error(`✗ 重复站点ID: '${site.id}'`);
          hasDuplicate = true;
        }
        idSet.add(siteId);
      }
    }
  }

  if (!hasDuplicate) {
    console.log('✓ 无重复ID');
  }

  return hasDuplicate;
}

function checkUrlFormat(categories) {
  const urlRegex = /^https?:\/\/[^\s]+$/;
  let hasError = false;

  function checkUrls(sites, categoryName) {
    for (const site of sites) {
      if (site.url && !urlRegex.test(site.url)) {
        console.error(`✗ URL格式错误 [${categoryName}]: '${site.url}' (站点: ${site.name || site.id})`);
        hasError = true;
      }
    }
  }

  for (const category of categories) {
    // 非嵌套分类的站点
    if (category.sites && Array.isArray(category.sites) && !category.children) {
      checkUrls(category.sites, category.name);
    }
    
    // 嵌套子分类的站点
    if (category.children && Array.isArray(category.children)) {
      for (const subCategory of category.children) {
        if (subCategory.sites && Array.isArray(subCategory.sites)) {
          checkUrls(subCategory.sites, `${category.name} -> ${subCategory.name}`);
        }
      }
    }
  }

  if (!hasError) {
    console.log('✓ URL格式正确');
  }

  return hasError;
}

function main() {
  console.log('开始校验 sites.json...\n');

  const categories = validateJSON();
  const fieldError = validateRequiredFields(categories);
  const urlDuplicate = checkDuplicateUrls(categories);
  const idDuplicate = checkDuplicateIds(categories);
  const urlFormatError = checkUrlFormat(categories);

  console.log('\n校验完成！');

  if (fieldError || urlDuplicate || idDuplicate || urlFormatError) {
    process.exit(1);
  } else {
    console.log('✅ 所有校验通过！');
  }
}

main();