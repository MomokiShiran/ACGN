import { ref } from 'vue'

const isMobileOpen = ref(false)
const isMinimized = ref(false)
const isMobileMin = ref(false)

export function useSidebar() {
  const show = () => {
    const sidebar = document.querySelector('.sidebar')
    if (sidebar) {
      sidebar.classList.add('show')
      document.body.style.overflow = 'hidden'
      isMobileOpen.value = true
    }
  }

  const hide = () => {
    const sidebar = document.querySelector('.sidebar')
    if (sidebar) {
      sidebar.classList.remove('show')
      document.body.style.overflow = ''
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
    const checkbox = document.querySelector('.navbar-btn input[type="checkbox"]')
    const sidebar = document.querySelector('.sidebar-nav')
    if (!sidebar) return

    const isChecked = checkbox?.checked ?? true
    const width = isChecked ? 150 : 60

    if (isChecked) {
      sidebar.classList.remove('mini-sidebar')
      document.querySelectorAll('.sidebar-menu ul ul').forEach((el) => {
        el.style.display = 'none'
      })
    } else {
      document.querySelectorAll('.sidebar-item.sidebar-show').forEach((el) => {
        el.classList.remove('sidebar-show')
      })
      document.querySelectorAll('.sidebar-menu ul').forEach((el) => {
        el.removeAttribute('style')
      })
      sidebar.classList.add('mini-sidebar')
    }

    if (noAnim) {
      sidebar.style.width = `${width}px`
    } else {
      const startWidth = parseInt(window.getComputedStyle(sidebar).width || '220', 10)
      const startTime = performance.now()
      const animate = (time) => {
        const progress = Math.min((time - startTime) / 200, 1)
        sidebar.style.width = `${startWidth + (width - startWidth) * progress}px`
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }

    isMinimized.value = !isChecked
  }

  const handleResize = () => {
    const winWidth = window.innerWidth
    if (!isMinimized.value && winWidth > 767.98 && winWidth < 1024) {
      const checkbox = document.querySelector('.navbar-btn input[type="checkbox"]')
      if (checkbox) checkbox.checked = false
      triggerMini(true)
      isMinimized.value = true
      if (isMobileMin.value) {
        document.querySelector('.sidebar')?.classList.add('mini-sidebar')
        isMobileMin.value = false
      }
    } else if (
      (isMinimized.value && winWidth >= 1024) ||
      (isMobileMin.value && !isMinimized.value && winWidth >= 1024)
    ) {
      const checkbox = document.querySelector('.navbar-btn input[type="checkbox"]')
      if (checkbox) checkbox.checked = true
      triggerMini(true)
      isMinimized.value = false
      isMobileMin.value = false
    } else if (winWidth < 767.98) {
      const sidebar = document.querySelector('.sidebar')
      if (sidebar?.classList.contains('mini-sidebar')) {
        sidebar.classList.remove('mini-sidebar')
        isMobileMin.value = true
        isMinimized.value = false
      }
      hide()
    }
  }

  const initInteraction = () => {
    document.addEventListener('click', (e) => {
      const menuLink = e.target.closest('.sidebar-menu-inner a')
      if (menuLink && !document.querySelector('.sidebar-nav')?.classList.contains('mini-sidebar')) {
        const li = menuLink.closest('.sidebar-item')
        if (li) {
          document.querySelectorAll('.sidebar-item', li).forEach((item) => {
            item.classList.remove('sidebar-show')
          })
          const nextUl = menuLink.nextElementSibling
          if (nextUl?.tagName === 'UL') {
            const hidden = nextUl.style.display === 'none' || !nextUl.style.display
            nextUl.style.display = hidden ? 'block' : 'none'
            li.classList.toggle('sidebar-show', hidden)
          }
        }
      }

      const sidebar = document.querySelector('.sidebar')
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

      if (e.target.closest('.mini-button')) {
        triggerMini()
      }
    })

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const sidebar = document.querySelector('.sidebar')
        if (sidebar?.classList.contains('show')) {
          hide()
        }
      }
    })

    let resizeTimer = null
    window.addEventListener('resize', () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(handleResize, 200)
    })
  }

  return {
    isMobileOpen,
    isMinimized,
    show,
    hide,
    toggleMobile,
    triggerMini,
    handleResize,
    initInteraction,
  }
}
