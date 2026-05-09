/**
 * App.js - 优化精简版
 */

(function () {
  let isMin = false,
    isMobileMin = false,
    sidebarPopupTimeout = null,
    scrollTimeout = null,
    resizeTimeout = null;

  // 工具函数
  const isPC = () =>
    ![
      'Android',
      'iPhone',
      'webOS',
      'BlackBerry',
      'SymbianOS',
      'Windows Phone',
      'iPad',
      'iPod',
    ].some(agent => navigator.userAgent.includes(agent));
  const qs = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // 主题管理
  const ThemeManager = {
    dark: 'io-black-mode',
    light: 'io-grey-mode',
    key: 'io-theme-mode',

    get() {
      return (
        localStorage.getItem(this.key) ||
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          ? this.dark
          : this.light)
      );
    },

    apply(theme) {
      document.body.classList.remove(this.dark, this.light);
      document.body.classList.add(theme);
      const meta = qs('meta[name="theme-color"]') || document.createElement('meta');
      if (!meta.name) {
        meta.name = 'theme-color';
        document.head.appendChild(meta);
      }
      meta.content = theme === this.dark ? '#1a1a2e' : '#f9f9f9';
      this.updateBtn(theme);
    },

    updateBtn(theme) {
      const isDark = theme === this.dark;
      const btn = qs('.switch-dark-mode');
      const icon = qs('.mode-ico');
      if (btn)
        btn.setAttribute(
          btn.hasAttribute('data-bs-original-title') ? 'data-bs-original-title' : 'title',
          isDark ? '日间模式' : '夜间模式'
        );
      if (icon) {
        icon.classList.remove(isDark ? 'icon-night' : 'icon-light');
        icon.classList.add(isDark ? 'icon-light' : 'icon-night');
      }
    },

    toggle() {
      const newTheme = document.body.classList.contains(this.dark) ? this.light : this.dark;
      localStorage.setItem(this.key, newTheme);
      this.apply(newTheme);
      const tooltip = qs(qs('.switch-dark-mode')?.getAttribute('aria-describedby') || '');
      tooltip?.remove();
      if (typeof bootstrap !== 'undefined') initTooltips('.switch-dark-mode');
    },

    init() {
      this.apply(this.get());
      if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
          if (!localStorage.getItem(this.key)) this.apply(e.matches ? this.dark : this.light);
        });
      }
    },
  };

  // 侧边栏最小化
  const triggerLsmMini = (noAnim = false) => {
    const checkbox = qs('.header-mini-btn input[type="checkbox"]');
    const sidebar = qs('.sidebar-nav');
    if (!sidebar) return;

    const isChecked = checkbox?.checked ?? true;
    const width = isChecked ? 220 : 60;

    if (isChecked) {
      sidebar.classList.remove('mini-sidebar');
      qsa('.sidebar-menu ul ul').forEach(el => (el.style.display = 'none'));
    } else {
      qsa('.sidebar-item.sidebar-show').forEach(el => el.classList.remove('sidebar-show'));
      qsa('.sidebar-menu ul').forEach(el => el.removeAttribute('style'));
      sidebar.classList.add('mini-sidebar');
    }

    if (noAnim) {
      sidebar.style.width = width + 'px';
    } else {
      const startWidth = parseInt(window.getComputedStyle(sidebar).width || '220', 10);
      const startTime = performance.now();
      const animate = time => {
        const progress = Math.min((time - startTime) / 200, 1);
        sidebar.style.width = startWidth + (width - startWidth) * progress + 'px';
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  };

  const triggerResizable = (noAnim = false) => {
    const winWidth = window.innerWidth;
    if (!isMin && winWidth > 767.98 && winWidth < 1024) {
      const checkbox = qs('.header-mini-btn input[type="checkbox"]');
      if (checkbox) checkbox.checked = false;
      triggerLsmMini(noAnim);
      isMin = true;
      if (isMobileMin) {
        qs('.sidebar')?.classList.add('mini-sidebar');
        isMobileMin = false;
      }
    } else if ((isMin && winWidth >= 1024) || (isMobileMin && !isMin && winWidth >= 1024)) {
      const checkbox = qs('.header-mini-btn input[type="checkbox"]');
      if (checkbox) checkbox.checked = true;
      triggerLsmMini(noAnim);
      isMin = false;
      isMobileMin = false;
    } else if (winWidth < 767.98) {
      const sidebar = qs('.sidebar');
      if (sidebar && sidebar.classList.contains('mini-sidebar')) {
        sidebar.classList.remove('mini-sidebar');
        isMobileMin = true;
        isMin = false;
      }
    }
  };

  // 工具提示
  const initTooltips = selector => {
    if (typeof bootstrap !== 'undefined') {
      qsa(selector || '[data-bs-toggle="tooltip"]').forEach(
        el => new bootstrap.Tooltip(el, { trigger: 'hover' })
      );
    }
  };

  // 消息提示
  const showAlert = data => {
    const types = {
      1: ['成功', 'success', 'icon-adopt'],
      2: ['信息', 'info', 'icon-tishi'],
      3: ['警告', 'warning', 'icon-warning'],
      4: ['错误', 'danger', 'icon-close-circle'],
    };
    const config = types[data.status];
    if (!config) return;
    let placeholder = qs('.alert-placeholder.text-sm');
    if (!placeholder) {
      placeholder = document.createElement('div');
      placeholder.className = 'alert-placeholder.text-sm';
      placeholder.style.cssText =
        'position:fixed;bottom:10px;right:10px;z-index:1000;text-align:right';
      document.body.appendChild(placeholder);
    }
    const alertBody = document.createElement('div');
    alertBody.className = 'alert-body';
    alertBody.innerHTML =
      '<div class="alert alert-' +
      config[1] +
      ' text-lg pr-4 pr-md-5" style="text-align:initial">' +
      '<i class="iconfont ' +
      config[2] +
      ' icon-lg" style="vertical-align:middle;margin-right:10px"></i>' +
      '<span style="vertical-align:middle">' +
      config[0] +
      '</span><br>' +
      '<span class="text-md" style="margin-left:30px;vertical-align:middle">' +
      (data.msg || '') +
      '</span></div>';
    alertBody.style.display = 'none';
    placeholder.appendChild(alertBody);

    alertBody.style.opacity = '0';
    alertBody.style.display = 'block';
    let fadeInOpacity = 0;
    const fadeIn = setInterval(() => {
      if (fadeInOpacity >= 1) {
        clearInterval(fadeIn);
        setTimeout(() => {
          let fadeOutOpacity = 1;
          const fadeOut = setInterval(() => {
            if (fadeOutOpacity <= 0) {
              clearInterval(fadeOut);
              alertBody.remove();
            } else {
              fadeOutOpacity -= 0.1;
              alertBody.style.opacity = fadeOutOpacity.toString();
            }
          }, 30);
        }, 3500);
      } else {
        fadeInOpacity += 0.1;
        alertBody.style.opacity = fadeInOpacity.toString();
      }
    }, 20);
  };

  // 事件监听
  document.addEventListener('click', e => {
    // 主题切换
    if (e.target.closest('.switch-dark-mode, .switch-mode')) {
      e.preventDefault();
      ThemeManager.toggle();
    }
    // 返回顶部
    if (e.target.closest('.go-up, .go-to-up')) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // 侧边栏菜单
    const menuLink = e.target.closest('.sidebar-menu-inner a');
    if (menuLink && !qs('.sidebar-nav')?.classList.contains('mini-sidebar')) {
      const li = menuLink.closest('.sidebar-item');
      if (li) {
        qsa('.sidebar-item', li).forEach(item => item.classList.remove('sidebar-show'));
        const nextUl = menuLink.nextElementSibling;
        if (nextUl && nextUl.tagName === 'UL') {
          const hidden = nextUl.style.display === 'none' || !nextUl.style.display;
          nextUl.style.display = hidden ? 'block' : 'none';
          li.classList.toggle('sidebar-show', hidden);
        }
      }
    }
    // 侧边栏关闭
    const link = e.target.closest('a');
    if (link && link.getAttribute('target') !== '_blank') {
      const sidebar = qs('.sidebar');
      if (sidebar?.classList.contains('show') && typeof bootstrap !== 'undefined') {
        bootstrap.Modal.getInstance(sidebar)?.hide();
      }
    }
    // 迷你按钮
    if (e.target.closest('.mini-button')) {
      triggerLsmMini();
    }
  });

  window.addEventListener('scroll', () => {
    if (scrollTimeout) return;
    scrollTimeout = setTimeout(() => {
      const goUp = qs('.go-up');
      if (goUp) goUp.style.display = window.scrollY >= 50 ? 'block' : 'none';
      scrollTimeout = null;
    }, 50);
  });

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(triggerResizable, 200);
  });

  // 迷你侧边栏hover
  document.addEventListener('mouseover', e => {
    const sidebarNav = qs('.sidebar-nav.mini-sidebar');
    if (!sidebarNav) return;

    const items = qsa(
      '.sidebar-menu ul:first-of-type > li, .flex-bottom ul:first-of-type > li',
      sidebarNav
    );
    let target = null;
    for (let i = 0; i < items.length; i++) {
      if (items[i].contains(e.target)) {
        target = items[i];
        break;
      }
    }

    if (target) {
      const offset = target.closest('.flex-bottom') ? -3 : 2;
      let popup = qs('.second.sidebar-popup');
      if (!popup) {
        popup = document.createElement('div');
        popup.className = 'second sidebar-popup sidebar-menu-inner text-sm';
        popup.innerHTML = '<div></div>';
        document.body.appendChild(popup);
      }
      const inner = popup.querySelector('div');
      if (inner) inner.innerHTML = target.innerHTML;
      popup.style.display = 'block';
      const top = target.getBoundingClientRect().top + offset;
      const popupHeight = popup.offsetHeight;
      popup.style.top =
        (window.innerHeight - top <= 0 ? window.innerHeight - popupHeight - 8 : top) + 'px';
    }
  });

  document.addEventListener('mouseout', e => {
    const sidebarNav = qs('.sidebar-nav.mini-sidebar');
    const firstMenu = sidebarNav ? qs('.sidebar-menu ul:first-of-type', sidebarNav) : null;
    const popup = qs('.second.sidebar-popup');

    const overMenu = firstMenu && firstMenu.contains(e.relatedTarget);
    const overPopup = popup && popup.contains(e.relatedTarget);

    if (!overMenu && !overPopup) {
      clearTimeout(sidebarPopupTimeout);
      sidebarPopupTimeout = setTimeout(() => {
        const popupEl = qs('.second.sidebar-popup');
        if (popupEl) popupEl.style.display = 'none';
      }, 100);
    }
  });

  // 初始化
  document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    triggerResizable(true);
    initTooltips(isPC() ? undefined : '.qr-img[data-bs-toggle="tooltip"]');
  });

  // 暴露全局函数
  window.isPC = isPC;
  window.initTooltips = initTooltips;
  window.showAlert = showAlert;
  window.ThemeManager = ThemeManager;
})();
