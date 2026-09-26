<template>
  <PageContent>
    <BackBar to="/" label="返回首页" />
    <div v-if="!site" class="alert alert-danger">未找到该网站</div>
    <div v-else>
      <!-- 头部信息区：淡粉底大圆角 hero 块 -->
      <div class="site-detail-hero">
        <div class="site-detail-head">
          <div class="site-detail-avatar">
            <img
              class="site-detail-avatar-img"
              :src="faviconUrl"
              :alt="site.name"
              @error="onImgError"
            />
          </div>
          <div class="site-detail-info">
            <h1 class="site-detail-name">{{ site.name }}</h1>
            <p class="site-detail-meta">
              <Badge>{{ categoryName }}</Badge>
              <span v-if="site.createdAt">收录：{{ site.createdAt }}</span>
              <span v-if="siteUrl">{{ siteUrl }}</span>
            </p>
            <p class="site-detail-lead">{{ site.description }}</p>
            <div class="site-detail-actions">
              <Button
                shape="pill"
                size="lg"
                tone="primary"
                :icon="externalLinkIcon"
                :href="site.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                访问网站
              </Button>
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
        <SectionTitle tag="h2" bar :icon="tagIcon" rotate>相关站点</SectionTitle>
        <SiteRow>
          <SiteCard v-for="s in relatedSites" :key="s.id" :site="s" />
        </SiteRow>
      </div>
    </div>
  </PageContent>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSitesStore } from '@/stores/sites'
import { resolveIcon, handleIconError } from '@/composables/useSiteIcon'
import { usePageTitle } from '@/composables/usePageTitle'
import SiteCard from '@/components/SiteCard.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import SiteRow from '@/components/SiteRow.vue'
import BackBar from '@/components/BackBar.vue'
import PageContent from '@/components/PageContent.vue'
import Badge from '@/components/Badge.vue'
import Button from '@/components/Button.vue'
import externalLinkIcon from '@/assets/icons/external-link.svg'
import tagIcon from '@/assets/icons/tag.svg'

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
/* 头部 hero 块与简介卡片共用的圆角 */
.site-detail-hero {
  border-radius: 16px;
}
/* 头部信息区：淡粉底 */
.site-detail-hero {
  background: var(--primary-soft);
  padding: 20px;
}
/* 站点简介：白色卡片 */
.site-detail-body {
  padding: 16px 20px;
  margin-top: 16px;
  background: var(--card-bg);
  border-radius: 16px;
}
/* 标题共享样式 */
.site-detail-name,
.site-detail-body-title {
  font-weight: 600;
  color: var(--text-heading);
}
.site-detail-name {
  margin: 0 0 4px;
  font-size: 1.375rem;
  line-height: 1.2;
}
.site-detail-body-title {
  margin: 0 0 8px;
  font-size: 1rem;
}
.site-detail-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px 8px;
  margin: 0 0 8px;
  color: var(--text-muted);
}
.site-detail-lead {
  margin: 0 0 8px;
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
  margin-right: 12px;
  flex-shrink: 0;
  border-radius: 50%;
}
.site-detail-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.site-detail-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

/* 相关站点 */
.site-detail-related {
  margin-top: 20px;
}

/* 未找到提示（原 main.css primitives） */
.alert {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 6px;
}
.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
.dark .alert-danger {
  color: #f8d7da;
  background-color: #5a1a1f;
  border-color: #721c24;
}

/* 详情页移动端适配 */
@media (max-width: 767.98px) {
  .site-detail-avatar {
    width: 56px;
    height: 56px;
  }
  .site-detail-name {
    font-size: 1.125rem;
  }
  .site-detail-hero {
    padding: 16px;
  }
}
</style>
