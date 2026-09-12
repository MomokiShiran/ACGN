<template>
  <div class="content customize-site">
    <div class="site-detail-back">
      <router-link to="/" class="back-btn">
        <i class="fas fa-arrow-left"></i>
        返回首页
      </router-link>
    </div>
    <div v-if="!site" class="alert alert-danger">未找到该网站</div>
    <div v-else>
      <!-- 头部信息区：淡粉底大圆角 hero 块 -->
      <div class="site-detail-hero">
        <div class="site-detail-head">
          <div class="site-detail-avatar">
            <img :src="faviconUrl" :alt="site.name" @error="onImgError" />
          </div>
          <div class="site-detail-info">
            <h1 class="site-detail-name">{{ site.name }}</h1>
            <p class="site-detail-meta">
              <span class="badge badge-danger">{{ categoryName }}</span>
              <span v-if="site.createdAt">收录：{{ site.createdAt }}</span>
              <span v-if="siteUrl">{{ siteUrl }}</span>
            </p>
            <p class="site-detail-lead">{{ site.description }}</p>
            <div class="site-detail-actions">
              <a
                :href="site.url"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary btn-cta"
              >
                <i class="fas fa-external-link-alt"></i>
                访问网站
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- 站点简介 -->
      <div v-if="site.detail" class="site-detail-body">
        <h2 class="site-detail-body-title">站点简介</h2>
        <p class="site-detail-desc">{{ site.detail }}</p>
      </div>
      <!-- 相关站点 -->
      <div v-if="relatedSites.length" class="site-detail-related">
        <h2 class="cat-section-title"><i class="fas fa-tag fa-lg"></i>相关站点</h2>
        <div class="row">
          <SiteCard v-for="s in relatedSites" :key="s.id" :site="s" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSitesStore } from '@/stores/sites'
import { resolveIcon, handleIconError } from '@/composables/useSiteIcon'
import { usePageTitle } from '@/composables/usePageTitle'
import SiteCard from '@/components/SiteCard.vue'

const route = useRoute()
const store = useSitesStore()

const site = ref(null)
const categoryName = ref('')

const faviconUrl = computed(() => resolveIcon(site.value?.icon))
const onImgError = handleIconError

// 去协议的域名，仅用于展示
const siteUrl = computed(() => {
  if (!site.value?.url) return ''
  try {
    return new URL(site.value.url).hostname
  } catch {
    return ''
  }
})

usePageTitle(computed(() => site.value?.name))

// 同分类相关站点：随机抽取最多 6 个（不固定），数量固定
const relatedSites = computed(() => {
  if (!site.value || !categoryName.value) return []
  const seen = new Set([site.value.id])
  const pool = []
  for (const s of store.allSites) {
    if (s.categoryName === categoryName.value && !seen.has(s.id)) {
      seen.add(s.id)
      pool.push(s)
    }
  }
  // Fisher–Yates 洗牌后取前 6 个
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, 6)
})

watch(
  () => route.query.id,
  (id) => {
    // 重置为空，无效 id 时显示"未找到该网站"而非残留上一个站点的数据
    site.value = null
    categoryName.value = ''
    if (id) {
      const result = store.findSiteById(id)
      if (result) {
        site.value = result.site
        categoryName.value = result.categoryName
      }
    }
  },
  { immediate: true }
)
</script>

<style scoped>
/* 返回按钮 */
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  border-radius: 999px;
  background: var(--bg-surface);
  color: var(--text-muted);
  box-shadow: var(--shadow-sm);
  font-size: var(--font-size-sm);
  text-decoration: none;
  transition: var(--transition-normal);
}
.back-btn:hover {
  color: var(--primary);
}
.site-detail-back {
  display: flex;
  margin-bottom: var(--space-3);
}

/* 弹性栅格容器（相关站点） */
.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: calc(-1 * var(--space-4));
  margin-left: calc(-1 * var(--space-4));
}
@media (min-width: 768px) {
  .row {
    margin-right: -0.75rem;
    margin-left: -0.75rem;
  }
}
@media (max-width: 767.98px) {
  .row {
    margin-right: 0;
    margin-left: 0;
  }
}

/* 分区标题：左侧主色圆角竖条 */
.cat-section-title {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-4);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-dark);
}
.cat-section-title::before {
  content: '';
  width: 4px;
  height: 1.1em;
  border-radius: 999px;
  background: var(--primary);
  margin-right: var(--space-2);
}
.cat-section-title i[class*='fa-'] {
  margin-right: var(--space-1);
}

/* 头部 hero 块与简介卡片共用的圆角 */
.site-detail-hero,
.site-detail-body {
  border-radius: var(--radius-2xl);
}
/* 头部信息区：淡粉底 */
.site-detail-hero {
  background: var(--primary-soft);
  padding: var(--space-5);
}
/* 站点简介：白色卡片 */
.site-detail-body {
  background: var(--card-bg);
  padding: var(--space-4) var(--space-5);
  margin-top: var(--space-4);
  box-shadow: var(--shadow-sm);
}
/* 标题共享样式 */
.site-detail-name,
.site-detail-body-title {
  font-weight: var(--font-weight-semibold);
  color: var(--text-dark);
}
.site-detail-name {
  margin: 0 0 var(--space-1);
  font-size: var(--font-size-2xl);
  line-height: var(--line-height-tight);
}
.site-detail-body-title {
  margin: 0 0 var(--space-2);
  font-size: var(--font-size-lg);
}
.site-detail-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px 8px;
  margin: 0 0 var(--space-2);
  color: var(--text-muted);
}
.site-detail-lead {
  margin: 0 0 var(--space-2);
  color: var(--text-muted);
}
.site-detail-head {
  display: flex;
  align-items: center;
}
.site-detail-info {
  flex: 1 1 auto;
  min-width: 0;
}
.site-detail-desc {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.8;
}
.site-detail-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  margin-right: var(--space-3);
  flex-shrink: 0;
  border-radius: 50%;
}
.site-detail-avatar > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

/* 操作按钮：pill 主按钮 + 灰底次级按钮 */
.site-detail-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.btn-cta {
  border-radius: 999px;
  padding: 8px 20px;
}
.btn-cta i[class*='fa-'] {
  margin-right: var(--space-1);
}

/* 相关站点 */
.site-detail-related {
  margin-top: var(--space-5);
}

/* 详情页移动端适配 */
@media (max-width: 767.98px) {
  .site-detail-avatar {
    width: 56px;
    height: 56px;
  }
  .site-detail-name {
    font-size: var(--font-size-xl);
  }
  .site-detail-hero {
    padding: var(--space-4);
  }
}
</style>
