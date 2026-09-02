import { ref } from 'vue'

// 全局单例状态：整个应用只有一个侧边栏，需要跨 App/TheNavbar/TheSidebar 共享
const isMobileOpen = ref(false)
const isMinimized = ref(false)

export function useSidebar() {
  const hide = () => {
    isMobileOpen.value = false
  }

  const toggleMobile = () => {
    isMobileOpen.value = !isMobileOpen.value
  }

  // isChecked=true 展开，false 折叠为 mini
  const triggerMini = (isChecked) => {
    isMinimized.value = !isChecked
  }

  const handleResize = () => {
    const winWidth = window.innerWidth
    if (winWidth < 767.98) {
      isMinimized.value = false
      hide()
    } else if (winWidth < 1024) {
      if (!isMinimized.value) isMinimized.value = true
    } else if (isMinimized.value) {
      isMinimized.value = false
    }
  }

  const initInteraction = () => {
    // 移动端抽屉打开时：点击遮罩/外部区域或内部普通链接均关闭
    const onClick = (e) => {
      if (!isMobileOpen.value || e.target.closest('#sidebar-toggle')) return
      const inSidebar = e.target.closest('.sidebar-nav-inner')
      const link = e.target.closest('a')
      if (!inSidebar || (link && link.getAttribute('target') !== '_blank')) {
        hide()
      }
    }

    const onKeydown = (e) => {
      if (e.key === 'Escape' && isMobileOpen.value) {
        hide()
      }
    }

    let resizeTimer = null
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(handleResize, 200)
    }

    window.addEventListener('click', onClick)
    window.addEventListener('keydown', onKeydown)
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('click', onClick)
      window.removeEventListener('keydown', onKeydown)
      window.removeEventListener('resize', onResize)
      if (resizeTimer) clearTimeout(resizeTimer)
    }
  }

  return {
    isMobileOpen,
    isMinimized,
    toggleMobile,
    triggerMini,
    initInteraction,
  }
}
