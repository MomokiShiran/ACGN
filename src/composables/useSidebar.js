import { ref, reactive } from 'vue'

const isMobileOpen = ref(false)
const isMinimized = ref(false)
const expandedSubs = reactive(new Set())

let sidebarEl = null
let checkboxEl = null

export function useSidebar() {
  const registerSidebar = (el) => {
    sidebarEl = el
  }

  const registerCheckbox = (el) => {
    checkboxEl = el
  }

  const toggleSub = (id) => {
    if (expandedSubs.has(id)) {
      expandedSubs.delete(id)
    } else {
      expandedSubs.add(id)
    }
  }

  const show = () => {
    if (sidebarEl) {
      sidebarEl.classList.add('show')
      isMobileOpen.value = true
    }
  }

  const hide = () => {
    if (sidebarEl) {
      sidebarEl.classList.remove('show')
      isMobileOpen.value = false
    }
  }

  const toggleMobile = () => {
    if (isMobileOpen.value) {
      hide()
    } else {
      show()
    }
  }

  const triggerMini = (noAnim = false) => {
    if (!sidebarEl) return

    const isChecked = checkboxEl ? checkboxEl.checked : true
    const width = isChecked ? 150 : 60

    if (isChecked) {
      sidebarEl.classList.remove('mini-sidebar')
    } else {
      expandedSubs.clear()
      sidebarEl.classList.add('mini-sidebar')
    }

    if (noAnim) {
      sidebarEl.style.width = `${width}px`
    } else {
      const startWidth = parseInt(sidebarEl.style.width || '150', 10)
      const startTime = performance.now()
      const animate = (time) => {
        const progress = Math.min((time - startTime) / 200, 1)
        sidebarEl.style.width = `${startWidth + (width - startWidth) * progress}px`
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }

    isMinimized.value = !isChecked
  }

  const handleResize = () => {
    const winWidth = window.innerWidth
    if (!isMinimized.value && winWidth > 767.98 && winWidth < 1024) {
      if (checkboxEl) checkboxEl.checked = false
      triggerMini(true)
      isMinimized.value = true
    } else if (isMinimized.value && winWidth >= 1024) {
      if (checkboxEl) checkboxEl.checked = true
      triggerMini(true)
      isMinimized.value = false
    } else if (winWidth < 767.98) {
      if (sidebarEl?.classList.contains('mini-sidebar')) {
        sidebarEl.classList.remove('mini-sidebar')
        sidebarEl.style.width = ''
        isMinimized.value = false
      }
      hide()
    }
  }

  const initInteraction = () => {
    const onClick = (e) => {
      const sidebar = sidebarEl
      const isSidebarToggle = e.target.closest('#sidebar-toggle')
      const isSidebarInner = sidebar?.querySelector('.sidebar-nav-inner')?.contains(e.target)

      if (sidebar?.classList.contains('show') && !isSidebarToggle && !isSidebarInner) {
        hide()
      }

      const link = e.target.closest('a')
      if (link && link.getAttribute('target') !== '_blank' && !isSidebarToggle) {
        if (sidebar?.classList.contains('show')) {
          hide()
        }
      }
    }

    const onKeydown = (e) => {
      if (e.key === 'Escape') {
        if (sidebarEl?.classList.contains('show')) {
          hide()
        }
      }
    }

    window.addEventListener('click', onClick)
    window.addEventListener('keydown', onKeydown)

    let resizeTimer = null
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(handleResize, 200)
    }
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
    registerSidebar,
    registerCheckbox,
    show,
    hide,
    toggleMobile,
    toggleSub,
    triggerMini,
    handleResize,
    initInteraction,
  }
}
