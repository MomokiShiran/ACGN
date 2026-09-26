<template>
  <footer class="main-footer">
    <ScrollTopButton />

    <p class="footer-copyright">
      © {{ year }} ACGN
      <span class="footer-sep" aria-hidden="true">·</span>
      Powered by
      <AppLink
        href="https://github.com/MomokiShiran/ACGN"
        target="_blank"
        rel="noopener noreferrer"
      >
        <strong>ACGN</strong>
      </AppLink>
    </p>

    <nav class="footer-nav" aria-label="法律信息">
      <ul class="footer-links">
        <li v-for="link in legalLinks" :key="link.value">
          <AppLink :to="link.to" muted>{{ link.label }}</AppLink>
        </li>
      </ul>
    </nav>

    <p class="footer-note">
      <strong>联系方式：</strong>若有任何问题或合作，请发送邮件至
      <AppLink href="mailto:help@acgn-world.com" muted>help@acgn-world.com</AppLink>
    </p>
    <p class="footer-note">
      <strong>免责声明：</strong>本站仅提供网站链接导航服务，不存储、不制作、不传播任何内容。
      所有链接均指向第三方网站，本站对第三方网站内容不承担任何责任。如有侵权内容，请联系我们删除。
      本站仅供学习交流使用，请勿用于非法用途。
    </p>
  </footer>
</template>

<script setup>
import AppLink from '../AppLink.vue'
import ScrollTopButton from '../ScrollTopButton.vue'
import { legalLinks } from '@/composables/legalLinks'

const year = new Date().getFullYear()
</script>

<style scoped>
.main-footer {
  /* 水平边距对齐 PageContent 的 padding，左右才不会和上方内容错开 */
  margin: 0.5rem 2rem 1rem;
  padding: 1.25rem 1rem;
  background: var(--bg-surface);
  border-radius: 16px;
  text-align: center;
}
.footer-copyright {
  margin: 0 0 8px;
  line-height: 1.5;
}
.footer-sep {
  margin: 0 0.35em;
  color: var(--text-muted);
}
.footer-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  row-gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}
/* 分隔线用边框做，省掉额外的 <span>|</span> 与 mx-* 工具类 */
.footer-links li + li {
  padding-left: 14px;
  border-left: 1px solid var(--border);
}
.footer-note {
  max-width: 800px;
  margin: 0 auto;
  font-size: 11px;
  line-height: 1.8;
  color: var(--text-muted);
}
.footer-note + .footer-note {
  margin-top: 4px;
}
</style>
