<template>
  <div>
    <h4 class="text-gray text-lg mb-4 d-flex flex-fill">
      <i class="site-tag iconfont icon-tag icon-lg me-1" :id="category.id"></i>{{ category.name }}
    </h4>
    <div class="row">
      <SiteCard v-for="site in category.sites" :key="site.id" :site="site" />
    </div>
  </div>
</template>

<script setup>
import SiteCard from './SiteCard.vue'

defineProps({
  category: {
    type: Object,
    required: true,
  },
})
</script>
