<template>
  <div class="url-card col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2">
    <div class="url-body default">
      <router-link
        :to="'/sites/detail?id=' + site.id"
        target="_blank"
        class="card no-c mb-4"
        :class="'site-' + site.id"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        :title="site.description"
        rel="noopener noreferrer"
      >
        <div class="card-body">
          <div class="url-content d-flex align-items-center">
            <div class="url-img rounded-circle me-2 d-flex align-items-center justify-content-center">
              <img loading="lazy" :src="iconUrl" @error="onImgError" />
            </div>
            <div class="url-info flex-fill">
              <div class="text-sm overflowClip_1">
                <span v-if="site.isNew" class="badge badge-danger text-ss me-1" title="新">New</span>
                <strong>{{ site.name }}</strong>
              </div>
              <p class="overflowClip_1 m-0 text-muted text-xs">{{ site.description }}</p>
            </div>
          </div>
        </div>
      </router-link>
      <a
        :href="site.url"
        class="togo text-center text-muted"
        target="_blank"
        data-bs-toggle="tooltip"
        data-bs-placement="right"
        title="直达"
        rel="nofollow noopener noreferrer"
      >
        <i class="iconfont icon-goto"></i>
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  site: {
    type: Object,
    required: true,
  },
})

import defaultIcon from '@/assets/images/favicon.png'

const DEFAULT_ICON = defaultIcon

const iconUrl = computed(() => {
  if (!props.site.icon) return DEFAULT_ICON
  if (/^(?:https?:)?\/\//.test(props.site.icon) || props.site.icon.startsWith('/')) {
    return props.site.icon
  }
  return '/' + props.site.icon.replace(/^\.\/?/, '')
})

const onImgError = (e) => {
  e.target.src = DEFAULT_ICON
}
</script>
