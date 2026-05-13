/**
 * 核心模块入口
 */

import { qs, qsa, isPC, resolvePath, debounce } from './utils.js';
import { initIframeProtect } from './iframe-protect.js';
import { ThemeManager } from './theme.js';
import { initTooltips, showAlert, initUI } from './ui.js';
import { triggerLsmMini, triggerResizable, initSidebarInteraction } from './sidebar-interaction.js';
import { onDataLoaded, loadData, getData } from './data-loader.js';

// 初始化
initIframeProtect();
ThemeManager.init();
initUI(ThemeManager);
initSidebarInteraction();

// 暴露到全局（兼容旧代码）
window.utils = { qs, qsa, isPC, resolvePath, debounce };
window.ThemeManager = ThemeManager;
window.initTooltips = initTooltips;
window.showAlert = showAlert;
window.isPC = isPC;
window.triggerLsmMini = triggerLsmMini;
window.triggerResizable = triggerResizable;
window.DataLoader = {
  load: loadData,
  onLoaded: onDataLoaded,
  get: getData,
};
