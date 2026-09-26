<template>
  <div class="url-card">
    <div class="url-body">
      <router-link
        :to="{ name: 'SiteDetail', query: { id: site.id } }"
        class="url-card-link"
        :title="site.description"
        rel="noopener noreferrer"
      >
        <div class="url-card-body">
          <div class="url-content">
            <div class="url-img">
              <img class="url-icon" loading="lazy" :src="iconUrl" @error="onImgError" />
            </div>
            <div class="url-info">
              <div class="url-name">
                <Badge class="url-new" title="新">New</Badge>
                <strong>{{ site.name }}</strong>
              </div>
              <p class="url-desc">{{ site.description }}</p>
            </div>
          </div>
        </div>
      </router-link>
      <a
        :href="site.url"
        class="togo"
        target="_blank"
        :title="'直达 ' + site.name"
        rel="nofollow noopener noreferrer"
      >
        <img class="togo-arrow" :src="arrowRightIcon" alt="" />
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { resolveIcon, handleIconError } from '@/composables/useSiteIcon'
import arrowRightIcon from '@/assets/icons/arrow-right.svg'
import Badge from './Badge.vue'

const props = defineProps({
  site: {
    type: Object,
    required: true,
  },
})

const iconUrl = computed(() => resolveIcon(props.site.icon))
const onImgError = handleIconError
</script>

<style scoped>
/* 栅格列宽（原 col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2）
   列宽百分比 + 横向 padding，必须 border-box 否则栅格溢出 */
.url-card {
  box-sizing: border-box;
  flex: 0 0 50%;
  min-width: 0;
  padding: 0 8px;
}
@media (min-width: 576px) {
  .url-card {
    flex: 0 0 33.333333%;
  }
}
@media (min-width: 768px) {
  .url-card {
    flex: 0 0 25%;
    padding: 0 16px;
  }
}
@media (min-width: 1200px) {
  .url-card {
    flex: 0 0 16.666667%;
  }
}

.url-body {
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100% - 16px);
  margin-bottom: 16px;
  transform: translateY(0);
  transition: transform 0.3s;
  border-radius: 16px;
}
.url-body:hover {
  transform: translateY(-3px);
}
.url-body:active {
  transform: translateY(-2px);
}

/* 卡片主体（原 card no-c mb-4） */
.url-card-link {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  background: var(--card-bg);
  border-radius: 16px;
  color: var(--text);
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.url-card-body {
  padding: 0.9375rem;
}
.url-content {
  display: flex;
  align-items: center;
}

.url-img {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 40px;
  height: 40px;
  margin-right: 8px;
  background: rgba(128, 128, 128, 0.1);
  border-radius: 50%;
  overflow: hidden;
}
.url-icon {
  max-height: 100%;
  vertical-align: unset;
}

.url-info {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  padding-right: 8px;
}
.url-name {
  display: block;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.url-new {
  margin-right: 4px;
}
.url-desc {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.togo {
  position: absolute;
  top: 20px;
  right: 0;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: var(--text-muted);
  opacity: 0.2;
  transition: opacity 0.3s;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.togo:hover {
  color: var(--primary);
}
.url-body:hover .togo {
  opacity: 1;
}
/* 触屏设备无 hover，直达按钮常显 */
@media (hover: none) {
  .togo {
    opacity: 1;
  }
}

/* 内容管理页（失效归档等）内的卡片不做悬浮抬升 */
.site-content .url-body:hover,
.site-content .url-body:active {
  transform: none !important;
}

.togo-arrow {
  width: 16px;
  height: 16px;
}

/* ---- 暗色主题微调（原 main.css Theme Overrides） ---- */
.dark .url-body {
  background-color: var(--card-bg);
}

/* 禁用卡片 hover 抬升 */
.dark .url-card:hover,
.dark .url-card:hover .url-card-link,
.dark .url-card:hover .togo {
  transform: none !important;
  color: var(--text) !important;
}

/* 链接 hover 保持主色 */
.dark .url-card-link:hover,
.dark .togo:hover {
  color: var(--primary) !important;
}

/* 直达箭头暗色下保持弱化 */
.dark .togo,
.dark .togo:hover {
  opacity: 0.3;
}
</style>
