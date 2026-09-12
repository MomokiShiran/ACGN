<template>
  <div class="url-card">
    <div class="url-body">
      <router-link
        :to="{ name: 'SiteDetail', query: { id: site.id } }"
        target="_blank"
        class="url-card-link"
        :title="site.description"
        rel="noopener noreferrer"
      >
        <div class="url-card-body">
          <div class="url-content">
            <div class="url-img">
              <img loading="lazy" :src="iconUrl" @error="onImgError" />
            </div>
            <div class="url-info">
              <div class="url-name">
                <span v-if="site.isNew" class="badge badge-danger url-new" title="新">New</span>
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
        <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { resolveIcon, handleIconError } from '@/composables/useSiteIcon'

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
/* 栅格列宽（原 col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2） */
.url-card {
  flex: 0 0 50%;
  max-width: 50%;
  padding: 0 var(--space-2);
}
@media (min-width: 576px) {
  .url-card {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
}
@media (min-width: 768px) {
  .url-card {
    flex: 0 0 25%;
    max-width: 25%;
    padding: 0 var(--space-4);
  }
}
@media (min-width: 1200px) {
  .url-card {
    flex: 0 0 16.666667%;
    max-width: 16.666667%;
  }
}

.url-body {
  position: relative;
  transform: translateY(0);
  transition: all var(--transition-normal);
  border-radius: var(--radius-2xl);
}
.url-body:hover {
  transform: translateY(var(--card-hover-y));
}
.url-body:active {
  transform: translateY(var(--card-hover-y-minor));
}

/* 卡片主体（原 card no-c mb-4） */
.url-card-link {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-4);
  background: var(--card-bg);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
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
  margin-right: var(--space-2);
  background: rgba(128, 128, 128, 0.1);
  border-radius: 50%;
  overflow: hidden;
}
.url-img > img {
  max-height: 100%;
  vertical-align: unset;
}

.url-info {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  padding-right: var(--space-2);
}
.url-name {
  display: block;
  line-height: var(--line-height-normal);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.url-new {
  margin-right: var(--space-1);
}
.url-desc {
  margin: 0;
  color: var(--text-muted);
  line-height: var(--line-height-normal);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

a.togo {
  position: absolute;
  top: 20px;
  right: 0;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: var(--text-muted);
  opacity: 0.2;
  transition: opacity var(--transition-normal);
}
.url-body:hover a.togo {
  opacity: 1;
}
/* 触屏设备无 hover，直达按钮常显 */
@media (hover: none) {
  a.togo {
    opacity: 1;
  }
}

/* 内容管理页（失效归档等）内的卡片不做悬浮抬升 */
.site-content .url-body:hover,
.site-content .url-body:active {
  transform: none !important;
  box-shadow: none !important;
}
</style>
