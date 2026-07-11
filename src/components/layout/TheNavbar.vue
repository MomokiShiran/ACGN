<template>
  <div class="navbar big sticky header">
    <div class="navbar-inner">
      <router-link to="/" class="navbar-logo mobile-only">
        <img
          loading="lazy"
          :src="logoUrl"
          height="40"
          alt="MyACGN"
        />
      </router-link>

      <div class="navbar-left">
        <div class="navbar-btn desktop-only">
          <label>
            <input class="mini-button" type="checkbox" checked />
            <svg viewbox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path class="line-1" d="M0 40h62c18 0 18-20-17 5L31 55"></path>
              <path class="line-2" d="M0 50h80"></path>
              <path class="line-3" d="M0 60h62c18 0 18 20-17-5L31 45"></path>
            </svg>
          </label>
        </div>

        <router-link to="/announcements" class="btn navbar-announcement" rel="announcement">
          公告
        </router-link>

        <div class="navbar-menu navbar-list"></div>
      </div>

      <div class="navbar-right">
        <div class="navbar-hitokoto desktop-only">
          <div class="navbar-hitokoto-text overflowClip_1">
            <span class="hitokoto" v-html="hitokotoText"></span>
          </div>
        </div>

        <div class="navbar-mobile mobile-only">
          <a
            href="javascript:;"
            class="navbar-toggle"
            id="sidebar-toggle"
            @click="sidebar.toggleMobile"
          >
            <i class="iconfont icon-classification icon-2x"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useSidebar } from '@/composables/useSidebar'
import { useHitokoto } from '@/composables/useHitokoto'
import logoUrl from '@/assets/images/20210727002253-59085.jpeg'

const sidebar = useSidebar()
const { text: hitokotoText, init: initHitokoto } = useHitokoto()

onMounted(() => {
  initHitokoto()
})
</script>
