<template>
  <PageContent>
    <SectionTitle>投稿 & 反馈</SectionTitle>
    <Card>
      <p class="text-muted">感谢您的投稿！请通过邮件联系站长，或在 GitHub 上提交 Issue。</p>
      <p class="text-muted">
        <strong>联系方式：</strong>
        <AppLink href="mailto:help@acgn-world.com">help@acgn-world.com</AppLink>
      </p>
      <p class="text-muted">
        <strong>GitHub：</strong>
        <AppLink
          href="https://github.com/MomokiShiran/ACGN"
          target="_blank"
          rel="noopener noreferrer"
          >ACGN 项目</AppLink
        >
      </p>
    </Card>
  </PageContent>
</template>

<script setup>
import SectionTitle from '@/components/SectionTitle.vue'
import PageContent from '@/components/PageContent.vue'
import Card from '@/components/Card.vue'
import AppLink from '@/components/AppLink.vue'
</script>

<style scoped>
.text-muted {
  margin: 0;
  color: var(--text-muted);
}
</style>
