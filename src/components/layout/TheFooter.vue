<template>
  <footer class="main-footer footer-type-1 text-xs">
    <div class="footer-tools d-flex flex-column">
      <button
        v-show="showGoUp"
        type="button"
        class="btn rounded-circle go-up m-1"
        rel="go-top"
        aria-label="返回顶部"
        @click="scrollToTop"
      >
        <i class="iconfont icon-to-up"></i>
      </button>
      <button
        type="button"
        class="btn rounded-circle switch-dark-mode m-1"
        :aria-label="isDark ? '切换到日间模式' : '切换到夜间模式'"
        @click="toggle"
      >
        <i class="mode-ico iconfont" :class="isDark ? 'icon-light' : 'icon-night'"></i>
      </button>
    </div>

    <div class="footer-inner text-center">
      <div class="footer-text">
        © 2026 MyACGN &nbsp;&nbsp;Powered by
        <a href="https://github.com/MomokiShiran/ACGN" target="_blank" rel="noopener noreferrer">
          <strong>ACGN</strong>
        </a>
        <span class="mx-2">|</span>
        <router-link to="/about" class="text-muted">关于本站</router-link>
        <span class="mx-1">|</span>
        <router-link to="/disclaimer" class="text-muted">免责声明</router-link>
        <span class="mx-1">|</span>
        <router-link to="/privacy" class="text-muted">隐私政策</router-link>
      </div>
      <div class="footer-text mt-2 text-muted footer-note">
        <strong>联系方式：</strong>若有任何问题或合作，请发送邮件至
        <a href="mailto:help@acgn-world.com" class="text-muted">help@acgn-world.com</a>
        <br />
        <strong>免责声明：</strong>本站仅提供网站链接导航服务，不存储、不制作、不传播任何内容。
        所有链接均指向第三方网站，本站对第三方网站内容不承担任何责任。如有侵权内容，请联系我们删除。
        本站仅供学习交流使用，请勿用于非法用途。
      </div>
    </div>
  </footer>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { isDark, toggle } = useTheme()

const showGoUp = ref(false)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

let scrollTimer = null
const handleScroll = () => {
  if (scrollTimer) return
  scrollTimer = setTimeout(() => {
    showGoUp.value = window.scrollY >= 50
    scrollTimer = null
  }, 50)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (scrollTimer) {
    clearTimeout(scrollTimer)
    scrollTimer = null
  }
})
</script>
