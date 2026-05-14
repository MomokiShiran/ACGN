/**
 * 防止 iframe 嵌套模块
 */

export const initIframeProtect = () => {
  try {
    if (window.self !== window.top) {
      // 页面被嵌套在 iframe 中
      document.documentElement.style.display = 'none';
      // 显示警告信息
      const warningDiv = document.createElement('div');
      warningDiv.innerHTML = `
        <style>
          body { margin: 0; padding: 0; background: #1a1a2e; }
          .warning-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            color: #fff;
            text-align: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          .warning-icon {
            font-size: 64px;
            margin-bottom: 20px;
          }
          .warning-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .warning-desc {
            font-size: 14px;
            color: #aaa;
            margin-bottom: 20px;
          }
          .warning-link {
            display: inline-block;
            padding: 10px 20px;
            background: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 14px;
          }
          .warning-link:hover {
            background: #0056b3;
          }
        </style>
        <div class="warning-container">
          <div class="warning-icon">⚠️</div>
          <div class="warning-title">检测到非法嵌套</div>
          <div class="warning-desc">本站禁止被 iframe 嵌套</div>
          <a href="https://github.com/MomokiShiran/ACGN" target="_top" class="warning-link">访问官方网站</a>
        </div>
      `;
      document.body.innerHTML = warningDiv.innerHTML;
    }
  } catch (e) {
    // 忽略错误
  }
};
