/**
 * 核心模块入口
 */

import { initIframeProtect } from './iframe-protect.js';
import { ThemeManager } from './theme.js';
import { initUI } from './ui.js';
import { initSidebarInteraction } from './sidebar-interaction.js';
import { initHitokoto } from './hitokoto.js';

// 初始化
initIframeProtect();
ThemeManager.init();
initUI(ThemeManager);
initSidebarInteraction();
initHitokoto();
