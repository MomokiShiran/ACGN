<template>
  <div class="content">
    <h4 class="page-title"><i class="iconfont icon-tag icon-lg"></i>投稿 & 反馈</h4>
    <div class="postsite-card">
      <p class="text-muted">感谢您的投稿！请通过邮件联系站长，或在 GitHub 上提交 Issue。</p>
      <p class="text-muted">
        <strong>联系方式：</strong>
        <a href="mailto:help@acgn-world.com">help@acgn-world.com</a>
      </p>
      <p class="text-muted">
        <strong>GitHub：</strong>
        <a href="https://github.com/MomokiShiran/ACGN" target="_blank" rel="noopener noreferrer"
          >ACGN 项目</a
        >
      </p>
    </div>
  </div>
</template>

<style scoped>
.postsite-card {
  padding: var(--space-5);
  background: var(--card-bg);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-sm);
}
.postsite-card p:last-child {
  margin-bottom: 0;
}

@media (max-width: 767.98px) {
  .postsite-card {
    padding: var(--space-4);
  }
}
</style>
