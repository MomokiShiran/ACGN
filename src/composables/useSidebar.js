import { ref, reactive } from 'vue'

const isMobileOpen = ref(false)
const isMinimized = ref(false)
const expandedSubs = reactive(new Set())

export function useSidebar() {
  const toggleSub = (id) => {
    if (expandedSubs.has(id)) {
      expandedSubs.delete(id)
    } else {
      expandedSubs.add(id)
    }
  }

  const show = () => {
    isMobileOpen.value = true
  }

  const hide = () => {
    isMobileOpen.value = false
  }

  const toggleMobile = () => {
    if (isMobileOpen.value) {
      hide()
    } else {
      show()
    }
  }

  // isChecked=true 展开，false 折叠为 mini
  const triggerMini = (isChecked) => {
    if (isChecked === undefined) isChecked = isMinimized.value
    isMinimized.value = !isChecked
    if (!isChecked) {
      expandedSubs.clear()
    }
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
    const onClick = (e) => {
      const isSidebarToggle = e.target.closest('#sidebar-toggle')
      const isSidebarInner = e.target.closest('.sidebar-nav-inner') !== null

      if (isMobileOpen.value && !isSidebarToggle && !isSidebarInner) {
        hide()
      }

      const link = e.target.closest('a')
      if (link && link.getAttribute('target') !== '_blank' && !isSidebarToggle) {
        if (isMobileOpen.value) {
          hide()
        }
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
    expandedSubs,
    show,
    hide,
    toggleMobile,
    toggleSub,
    triggerMini,
    handleResize,
    initInteraction,
  }
}
