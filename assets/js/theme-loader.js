/**
 * 主题管理模块
 */

import { qs } from './utils.js';

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
    // Get theme color from CSS variable
    const computedStyle = getComputedStyle(document.body);
    meta.content = computedStyle.getPropertyValue('--theme-color').trim();
    this.updateBtn(theme);
  }

  updateBtn(theme) {
    const isDark = theme === this.dark;
    const icon = qs('.mode-ico');

    if (icon) {
      icon.classList.remove(isDark ? 'icon-night' : 'icon-light');
      icon.classList.add(isDark ? 'icon-light' : 'icon-night');
    }
  }

  toggle() {
    const newTheme = document.body.classList.contains(this.dark) ? this.light : this.dark;
    localStorage.setItem(this.key, newTheme);
    this.apply(newTheme);
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

// 主题管理器单例
export const ThemeManager = new ThemeManagerClass();
