/**
 * 核心模块入口
 */

import { initIframeProtect } from './iframe-protect.js';
import { ThemeManager } from './theme-loader.js';
import { initUI } from './ui-loader.js';
import { initSidebarInteraction } from './sidebar-interaction-loader.js';
import { initHitokoto } from './hitokoto-loader.js';

// 初始化
initIframeProtect();
ThemeManager.init();
initUI(ThemeManager);
initSidebarInteraction();
initHitokoto();
