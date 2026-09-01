<template>
  <div class="content customize-site">
    <div v-if="!site" class="alert alert-danger">未找到该网站</div>
    <div v-else class="panel site-content no-hover-card card transparent site-detail">
      <div class="card-body">
        <div class="url-body">
          <div class="url-content d-flex align-items-center">
            <div
              class="url-img rounded-circle me-3 d-flex align-items-center justify-content-center site-detail-avatar"
            >
              <img :src="faviconUrl" :alt="site.name" @error="onImgError" />
            </div>
            <div class="url-info flex-fill">
              <div class="text-sm mb-1">
                <span class="badge badge-danger text-ss me-1">{{ categoryName }}</span>
                <strong>{{ site.name }}</strong>
              </div>
              <p class="m-0 text-muted text-xs mb-2">{{ site.description }}</p>
              <p class="m-0 text-muted text-xs mb-2">收录时间：{{ site.createdAt || '未知' }}</p>
              <div class="d-flex align-items-center mt-2">
                <a
                  :href="site.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-primary btn-sm me-2"
                >
                  访问网站
                </a>
                <a
                  :href="qrImageUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-light btn-sm"
                >
                  QR码
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4 text-muted text-sm site-detail-desc">
          {{ site.detail || site.description }}
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

const route = useRoute()
const store = useSitesStore()

const site = ref(null)
const categoryName = ref('')

const faviconUrl = computed(() => resolveIcon(site.value?.icon))
const onImgError = handleIconError

usePageTitle(computed(() => site.value?.name))

const qrImageUrl = computed(() => {
  if (!site.value?.url) return ''
  const url = encodeURIComponent(site.value.url)
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}`
})

watch(
  () => route.query.id,
  (id) => {
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
