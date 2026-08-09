<template>
  <div id="sidebar" ref="sidebarElRef" class="sticky sidebar-nav sidebar">
    <div class="sidebar-nav-inner">
      <div class="sidebar-logo border-bottom border-color">
        <div class="logo overflow-hidden">
          <router-link to="/">
            <img :src="logoUrl" height="40" alt="MyACGN" loading="lazy" />
          </router-link>
        </div>
      </div>

      <div class="sidebar-menu flex-fill">
        <div class="sidebar-menu-inner">
          <ul class="sidebar-nav-list" id="sidebar-nav-list">
            <template v-for="cat in categories" :key="cat.id">
              <li
                v-if="cat.children && cat.children.length > 0"
                class="sidebar-item"
                :class="{ 'sidebar-show': sidebar.expandedSubs.has(cat.id) }"
              >
                <button type="button" class="sidebar-menu-link" @click="sidebar.toggleSub(cat.id)">
                  <i :class="cat.icon || 'fas fa-toolbox'" class="icon-fw icon-lg me-2"></i>
                  <span class="sidebar-menu-text">{{ cat.name }}</span>
                  <i class="iconfont icon-arrow-r-m sidebar-more sidebar-more-icon text-sm"></i>
                </button>
                <ul class="sidebar-submenu">
                  <li v-for="sub in cat.children" :key="sub.id" class="sidebar-item">
                    <router-link :to="{ path: '/', hash: '#' + sub.id }" class="sidebar-menu-link">
                      <span class="sidebar-menu-text">{{ sub.name }}</span>
                    </router-link>
                  </li>
                </ul>
              </li>
              <li v-else class="sidebar-item">
                <router-link :to="{ path: '/', hash: '#' + cat.id }" class="sidebar-menu-link">
                  <i :class="cat.icon || 'fas fa-link'" class="icon-fw icon-lg me-2"></i>
                  <span class="sidebar-menu-text">{{ cat.name }}</span>
                </router-link>
              </li>
            </template>
          </ul>
        </div>
      </div>

      <div class="border-top py-2 border-color">
        <div class="flex-bottom">
          <ul class="sidebar-nav-list">
            <li class="sidebar-item">
              <router-link to="/sitetrash" class="sidebar-menu-link">
                <i class="fas fa-trash icon-fw icon-lg me-2"></i>
                <span class="sidebar-menu-text">失效归档</span>
              </router-link>
            </li>
            <li class="sidebar-item">
              <router-link to="/postsite" class="sidebar-menu-link">
                <i class="fas fa-link icon-fw icon-lg me-2"></i>
                <span class="sidebar-menu-text">投稿&反馈</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSitesStore } from '@/stores/sites'
import { useSidebar } from '@/composables/useSidebar'
import logoUrl from '@/assets/images/20210727002253-59085.jpeg'

const store = useSitesStore()
const categories = store.categories

const sidebar = useSidebar()
const sidebarElRef = ref(null)

onMounted(() => {
  sidebar.registerSidebar(sidebarElRef.value)
})
</script>
