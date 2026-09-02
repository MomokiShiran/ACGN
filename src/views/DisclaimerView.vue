<template>
  <ContentPageLayout panel-class="card no-hover-card">
    <h1 class="h2 mb-4">免责声明</h1>
        <div class="panel-body">
          <div class="mb-4">
            <h3 class="text-lg mb-2">1. 网站性质</h3>
            <p>
              MyACGN（以下简称"本站"）是一个ACG二次元导航网站，仅提供网站链接索引服务。本站不存储、不制作、不传播任何第三方网站的内容。
            </p>
          </div>
          <div class="mb-4">
            <h3 class="text-lg mb-2">2. 链接说明</h3>
            <p>
              本站收录的所有链接均指向第三方网站。本站对第三方网站的内容、准确性、安全性、合法性不承担任何责任。访问者点击链接后，应自行承担相应风险。
            </p>
          </div>
          <div class="mb-4">
            <h3 class="text-lg mb-2">3. 第三方站点风险提示</h3>
            <p><strong>用户访问第三方站点的风险提示：</strong></p>
            <ul class="mt-2 mb-2">
              <li>第三方网站的内容、服务、安全性均由该网站自行负责</li>
              <li>请您在访问第三方网站时，务必保持警惕，注意保护个人信息和财产安全</li>
              <li>如在第三方网站进行的任何交易、注册、下载等行为，风险由您自行承担</li>
              <li>建议您在访问前仔细阅读第三方网站的用户协议和隐私政策</li>
            </ul>
          </div>
          <div class="mb-4">
            <h3 class="text-lg mb-2">4. 违规站点举报</h3>
            <p>
              如果您发现本站收录的网站存在违规内容（如违法违规、侵犯版权、色情暴力等），请通过以下方式举报：
            </p>
            <ul class="mt-2 mb-2">
              <li>访问<router-link to="/postsite">投稿反馈</router-link>页面提交举报信息</li>
              <li>请提供具体的违规网站链接和违规内容说明</li>
              <li>我们会在收到举报后尽快核实并处理</li>
            </ul>
          </div>
          <div class="mb-4">
            <h3 class="text-lg mb-2">5. 内容审核</h3>
            <p>
              本站尽力确保收录的网站链接符合法律法规，但无法保证所有链接的内容始终合法、健康、有效。如发现任何链接存在问题，请通过投稿反馈页面告知我们。
            </p>
          </div>
          <div class="mb-4">
            <h3 class="text-lg mb-2">6. 版权保护</h3>
            <p>
              本站尊重知识产权。如果您认为本站收录的任何链接侵犯了您的合法权益，请及时联系我们，我们将在核实后第一时间删除相关链接。
            </p>
          </div>
          <div class="mb-4">
            <h3 class="text-lg mb-2">7. 使用规范</h3>
            <p>
              本站仅供学习交流使用，请勿用于任何非法用途。用户在使用本站过程中，应遵守相关法律法规，尊重他人合法权益。
            </p>
          </div>
          <div class="mb-4">
            <h3 class="text-lg mb-2">8. 免责范围</h3>
            <p>
              因使用本站而产生的任何直接或间接损失，本站不承担赔偿责任。本站不对因链接失效、内容变更、网站关闭等情况承担责任。
            </p>
          </div>
          <div class="mb-4">
            <h3 class="text-lg mb-2">9. 声明修改</h3>
            <p>
              本站有权随时修改本免责声明。修改后的声明一经发布，即代替原声明。请定期查看本页面以了解最新内容。
            </p>
          </div>
          <div class="mb-4">
            <h3 class="text-lg mb-2">10. 联系方式</h3>
            <p>
              如有任何问题、建议或举报，请通过<router-link to="/postsite">投稿反馈</router-link
              >页面与我们联系，或发送邮件至
              <a href="mailto:help@acgn-world.com">help@acgn-world.com</a>。
            </p>
          </div>
          <div class="text-sm text-muted">
            <p>最后更新时间：2026年7月11日</p>
          </div>
        </div>
  </ContentPageLayout>
</template>

<script setup>
import ContentPageLayout from '@/components/ContentPageLayout.vue'
</script>
