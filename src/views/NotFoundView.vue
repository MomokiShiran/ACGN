<template>
  <div class="content page not-found-page">
    <div class="not-found-code">404</div>
    <h2 class="not-found-title">页面未找到</h2>
    <p class="text-muted mb-4">抱歉，您访问的页面不存在。</p>
    <router-link to="/" class="btn btn-primary">返回首页</router-link>
  </div>
</template>

<script setup></script>

<style scoped>
.not-found-page {
  text-align: center;
  padding: 60px 20px;
}
.not-found-code {
  font-size: 72px;
  margin-bottom: 20px;
}
.not-found-title {
  margin-bottom: 10px;
}
</style>
