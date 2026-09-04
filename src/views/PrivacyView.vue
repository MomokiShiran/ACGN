<template>
  <ContentPageLayout panel-class="card no-hover-card">
    <h1 class="h2 mb-4">隐私政策</h1>
        <div class="panel-body">
          <div class="mb-4">
            <h3 class="text-lg mb-2">1. 信息收集</h3>
            <p>
              MyACGN非常重视用户的隐私保护。本站是一个纯静态导航网站，大部分功能不需要用户注册或提供个人信息。
            </p>
            <p class="mt-2">
              <strong>投稿表单数据收集：</strong>当您通过<router-link to="/postsite"
                >投稿反馈</router-link
              >页面提交网站投稿、友链申请或问题反馈时，我们可能会收集您提供的以下信息：
            </p>
            <ul class="mt-2 mb-2">
              <li>网站名称、URL、简介等投稿相关信息</li>
              <li>您的联系方式（如邮箱、QQ等，仅用于沟通投稿相关事宜）</li>
              <li>您提交的其他补充说明内容</li>
            </ul>
            <p>这些信息仅用于处理您的投稿申请，不会用于其他商业用途。</p>
          </div>
          <div class="mb-4">
            <h3 class="text-lg mb-2">2. Cookie 与本地存储</h3>
            <p>
              本站使用浏览器本地存储（LocalStorage）技术来提升用户体验。我们仅存储必要的用户偏好设置，包括：
            </p>
            <ul class="mt-2 mb-2">
              <li>主题偏好（日间模式/夜间模式选择）</li>
            </ul>
            <p>这些数据仅存储在您的浏览器本地，不会发送到我们的服务器，也不会用于追踪用户行为。</p>
          </div>
          <div class="mb-4">
            <h3 class="text-lg mb-2">3. 数据用途</h3>
            <p>我们收集的信息仅用于以下用途：</p>
            <ul class="mt-2 mb-2">
              <li>处理和审核您的网站投稿申请</li>
              <li>与您沟通投稿相关事宜（如需要补充信息）</li>
              <li>处理您的反馈和建议</li>
              <li>提供个性化的浏览体验（如主题设置）</li>
            </ul>
            <p>我们不会将您的信息出售、出租或以其他方式披露给任何第三方，除非法律法规要求。</p>
          </div>
          <div class="mb-4">
            <h3 class="text-lg mb-2">4. 第三方服务</h3>
            <p>
              本站可能包含指向第三方网站的链接。这些第三方网站有各自的隐私政策，本站不对其隐私保护措施承担责任。建议您在访问这些网站时查看其隐私政策。
            </p>
          </div>
          <div class="mb-4">
            <h3 class="text-lg mb-2">5. 网站图标获取</h3>
            <p>
              为了更好的展示效果，本站可能通过第三方服务（如
              favicon.im）获取网站图标。此过程仅用于获取网站图标，不会收集用户信息。
            </p>
          </div>
          <div class="mb-4">
            <h3 class="text-lg mb-2">6. 数据安全</h3>
            <p>
              我们采取合理的技术措施来保护网站安全，防止未经授权的访问、使用或泄露。但请注意，互联网传输无法保证100%的安全性。
            </p>
          </div>
          <div class="mb-4">
            <h3 class="text-lg mb-2">7. 儿童隐私</h3>
            <p>
              本站不面向18岁以下的未成年人。如果您是未成年人，请在监护人指导下使用本站。我们不会故意收集未成年人的信息。
            </p>
          </div>
          <div class="mb-4">
            <h3 class="text-lg mb-2">8. 您的权利</h3>
            <p>如果您之前通过投稿表单提交过信息，您有权：</p>
            <ul class="mt-2 mb-2">
              <li>要求查看我们持有的关于您的信息</li>
              <li>要求更正不准确的信息</li>
              <li>要求删除您的信息</li>
            </ul>
            <p>
              如需行使上述权利，请通过<router-link to="/postsite">投稿反馈</router-link
              >页面与我们联系。
            </p>
          </div>
          <div class="mb-4">
            <h3 class="text-lg mb-2">9. 隐私政策变更</h3>
            <p>
              我们可能会不时更新本隐私政策。政策变更后，我们会在本页面发布更新后的版本。建议您定期查看本页面以了解最新内容。
            </p>
          </div>
          <div class="mb-4">
            <h3 class="text-lg mb-2">10. 联系我们</h3>
            <p>
              如果您对本隐私政策有任何疑问，或需要举报违规站点，请通过<router-link to="/postsite"
                >投稿反馈</router-link
              >页面与我们联系，或发送邮件至
              <a href="mailto:help@acgn-world.com">help@acgn-world.com</a>。
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
