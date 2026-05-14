/**
 * 主题管理模块
 */

import { qs } from './utils.js';
import { initTooltips } from './ui.js';

class ThemeManagerClass {
  constructor() {
    this.dark = 'io-black-mode';
    this.light = 'io-grey-mode';
    this.key = 'io-theme-mode';
  }

  get() {
    return (
      localStorage.getItem(this.key) ||
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? this.dark
        : this.light)
    );
  }

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
  }

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
  }

  toggle() {
    const newTheme = document.body.classList.contains(this.dark) ? this.light : this.dark;
    localStorage.setItem(this.key, newTheme);
    const modeBtn = qs('.switch-dark-mode');
    if (modeBtn && typeof bootstrap !== 'undefined') {
      const tooltipInstance = bootstrap.Tooltip.getInstance(modeBtn);
      if (tooltipInstance) {
        tooltipInstance.hide();
        tooltipInstance.dispose();
      }
    }
    this.apply(newTheme);
    if (typeof bootstrap !== 'undefined') {
      initTooltips('.switch-dark-mode');
    }
  }

  init() {
    this.apply(this.get());
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem(this.key)) this.apply(e.matches ? this.dark : this.light);
      });
    }
  }
}

export const ThemeManager = new ThemeManagerClass();
