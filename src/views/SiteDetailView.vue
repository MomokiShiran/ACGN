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
        <div class="d-flex align-items-center">
          <div
            class="url-img rounded-circle me-3 d-flex align-items-center justify-content-center site-detail-avatar"
          >
            <img :src="faviconUrl" :alt="site.name" @error="onImgError" />
          </div>
          <div class="url-info flex-fill">
            <h1 class="site-detail-name">{{ site.name }}</h1>
            <p class="site-detail-meta m-0 mb-2 text-muted text-xs">
              <span class="badge badge-danger text-ss">{{ categoryName }}</span>
              <span v-if="site.createdAt">收录：{{ site.createdAt }}</span>
              <span v-if="siteUrl">{{ siteUrl }}</span>
            </p>
            <p class="m-0 text-muted text-xs mb-2">{{ site.description }}</p>
            <div class="site-detail-actions d-flex align-items-center">
              <a
                :href="site.url"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary btn-cta"
              >
                <i class="fas fa-external-link-alt me-1"></i>
                访问网站
              </a>
              <button
                v-if="qrImageUrl"
                type="button"
                class="btn btn-ghost btn-cta"
                @click="showQr = !showQr"
              >
                <i class="fas fa-qrcode me-1"></i>
                {{ showQr ? '收起二维码' : '二维码' }}
              </button>
            </div>
            <div v-if="showQr" class="site-detail-qr">
              <img :src="qrImageUrl" :alt="site.name + ' 的二维码'" />
            </div>
          </div>
        </div>
      </div>
      <!-- 站点简介 -->
      <div v-if="site.detail" class="site-detail-body">
        <h2 class="site-detail-body-title">站点简介</h2>
        <p class="m-0 text-muted text-sm site-detail-desc">{{ site.detail }}</p>
      </div>
      <!-- 相关站点 -->
      <div v-if="relatedSites.length" class="site-detail-related">
        <h2 class="cat-section-title d-flex mb-4">
          <i class="site-tag iconfont icon-tag icon-lg me-1"></i>相关站点
        </h2>
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
const showQr = ref(false)

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

const qrImageUrl = computed(() => {
  if (!site.value?.url) return ''
  const url = encodeURIComponent(site.value.url)
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}`
})

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
    showQr.value = false
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
