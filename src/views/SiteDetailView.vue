<template>
  <div class="content customize-site">
    <div v-if="!site" class="alert alert-danger">未找到该网站</div>
    <div v-else class="panel site-content no-hover-card card transparent">
      <div class="card-body">
        <div class="url-body default" style="padding: 20px">
          <div class="url-content d-flex align-items-center">
            <div class="url-img rounded-circle me-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px; flex-shrink: 0">
              <img :src="faviconUrl" :alt="site.name" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%" @error="onImgError" />
            </div>
            <div class="url-info flex-fill">
              <div class="text-sm mb-1">
                <span class="badge badge-danger text-ss me-1">{{ categoryName }}</span>
                <strong>{{ site.name }}</strong>
              </div>
              <p class="m-0 text-muted text-xs mb-2">{{ site.description }}</p>
              <p class="m-0 text-muted text-xs mb-2">收录时间：{{ site.createdAt || '未知' }}</p>
              <div class="d-flex align-items-center mt-2">
                <a :href="site.url" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm me-2">
                  访问网站
                </a>
                <a href="javascript:;" class="btn btn-light btn-sm" data-bs-toggle="tooltip" data-bs-placement="right" :title="qrTooltip">
                  QR码
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4 text-muted text-sm" style="line-height: 1.8">
          {{ site.detail || site.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSitesStore } from '@/stores/sites'
import { resolveIcon, defaultIcon } from '@/composables/useSiteIcon'

const route = useRoute()
const store = useSitesStore()

const site = ref(null)
const categoryName = ref('')

const faviconUrl = computed(() => resolveIcon(site.value?.icon))
const onImgError = (e) => { e.target.src = defaultIcon }

const qrTooltip = computed(() => {
  if (!site.value?.url) return ''
  const url = encodeURIComponent(site.value.url)
  return `<img src='https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}' width='150'>`
})

onMounted(() => {
  const id = route.query.id
  if (id) {
    const result = store.findSiteById(id)
    if (result) {
      site.value = result.site
      categoryName.value = result.categoryName
      document.title = `${result.site.name} | MyACGN`
    }
  }
})
</script>
