<template>
  <div class="content page">
    <div class="panel site-content no-hover-card card transparent">
      <div class="card-body">
        <h4 class="text-gray text-lg mb-4">
          <i class="iconfont icon-tag icon-lg me-1"></i>失效归档
        </h4>
        <div class="row">
          <SiteCard v-for="site in store.allTrashSites" :key="site.id" :site="site" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSitesStore } from '@/stores/sites'
import SiteCard from '@/components/SiteCard.vue'

const store = useSitesStore()
</script>
