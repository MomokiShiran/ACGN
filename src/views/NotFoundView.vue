<template>
  <PageContent class="not-found-page">
    <div class="not-found-code">404</div>
    <h2 class="not-found-title">页面未找到</h2>
    <p class="text-muted">抱歉，您访问的页面不存在。</p>
    <Button shape="rounded" size="md" tone="primary" to="/">返回首页</Button>
  </PageContent>
</template>

<script setup>
import PageContent from '@/components/PageContent.vue'
import Button from '@/components/Button.vue'
</script>

<style scoped>
.content.not-found-page {
  text-align: center;
  padding: 60px 20px;
}
.not-found-code {
  font-size: 72px;
  margin-bottom: 20px;
}
.not-found-title {
  margin-bottom: 10px;
  font-size: 2rem;
}
.not-found-page .text-muted {
  margin-top: 0;
  margin-bottom: 16px;
}
.text-muted {
  color: var(--text-muted);
}
</style>
