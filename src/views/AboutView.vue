<template>
  <ContentPageLayout panel-class="card no-hover-card">
    <h1 class="h2 mb-4">关于本站</h1>
        <div class="panel-body">
          <div class="mb-4">
            <h3 class="text-lg mb-2">1. 网站简介</h3>
            <p>
              MyACGN是一个专注于ACG二次元的导航网站，致力于为ACG爱好者提供一个集中、便捷的网站导航服务。我们收录各类ACG相关网站，帮助用户快速找到所需资源。
            </p>
          </div>
          <div class="mb-4">
            <h3 class="text-lg mb-2">2. 我们的理念</h3>
            <p>
              我们希望通过收集和整理优质的ACG网站，为二次元爱好者创造一个友好的交流平台。我们相信分享的力量，也欢迎每一位用户为网站的成长贡献力量。
            </p>
          </div>
          <div class="mb-4">
            <h3 class="text-lg mb-2">3. 收录内容</h3>
            <p>本站收录的内容包括但不限于：</p>
            <ul class="ms-4 mt-2">
              <li>图片、壁纸类网站</li>
              <li>在线漫画、动画网站</li>
              <li>游戏、资源分享社区</li>
              <li>轻小说、文学相关网站</li>
              <li>工具、搜索类网站</li>
              <li>其他ACG相关网站</li>
            </ul>
          </div>
          <div class="mb-4">
            <h3 class="text-lg mb-2">4. 如何投稿</h3>
            <p>
              如果您知道优质的ACG网站，欢迎通过<router-link to="/postsite">投稿反馈</router-link
              >页面提交给我们。我们会在审核后尽快添加到网站导航中。
            </p>
          </div>
          <div class="mb-4">
            <h3 class="text-lg mb-2">5. 开源项目</h3>
            <p>
              本项目基于开源项目开发，源代码已发布在 GitHub
              上。如果您对技术细节感兴趣，或者想参与贡献代码，欢迎访问我们的仓库。
            </p>
            <p class="mt-2">
              <a
                href="https://github.com/MomokiShiran/ACGN"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fab fa-github me-2"></i>GitHub 仓库
              </a>
            </p>
          </div>
          <div class="mb-4">
            <h3 class="text-lg mb-2">6. 友情链接</h3>
            <p>我们欢迎其他ACG相关网站与我们交换友情链接。友链申请示例：</p>
            <div class="mt-3">
              <h6>友链申请示例</h6>
              <p>
                本站名称：MyACGN<br />
                本站链接：<br />
                本站描述：专攻ACGの导航盒子
              </p>
            </div>
            <p class="mt-3">友情链接展示在首页底部，欢迎交换友链！</p>
          </div>
          <div class="mb-4">
            <h3 class="text-lg mb-2">7. 联系我们</h3>
            <p>
              如果您有任何问题、建议或合作意向，请通过<router-link to="/postsite"
                >投稿反馈</router-link
              >页面与我们联系，或发送邮件至
              <a href="mailto:help@acgn-world.com">help@acgn-world.com</a>。我们会尽快回复您的消息。
            </p>
          </div>
          <div class="text-muted">
            <p>最后更新时间：2026年7月11日</p>
          </div>
        </div>
  </ContentPageLayout>
</template>

<script setup>
import ContentPageLayout from '@/components/ContentPageLayout.vue'
</script>
