# ACGN

> ACGN 二次元导航盒子，收录 ACGN 二次元相关的优质网站

欢迎来到 ACGN ～

**投稿和申请友链请通过[投稿页面](#/postsite) 提交，提交前请仔细阅读收录条件。**(未实现)

**也可以直接在 GitHub 上编辑（PR 目标分支：`develop`）：**
- [编辑 sites.json](https://github.com/MomokiShiran/ACGN/edit/develop/src/data/sites.json) — 添加/修改网站条目
- [上传站点图标](https://github.com/MomokiShiran/ACGN/tree/develop/src/assets/images/sites) — 添加图标文件

**如涉及网站隐私、防护安全等问题，请贵站站长或个人及时联系邮箱 help@acgn-world.com 我们将在第一时间紧急处理！**

感谢大家一路的支持！

## 快速开始

### 本地运行

```bash
# 克隆
git clone https://github.com/MomokiShiran/ACGN.git
cd ACGN

# 安装依赖
npm install

# 启动开发服务器
npm run dev
# 访问 http://localhost:5173/ACGN/
```

### 生产构建

```bash
npm run build      # 构建产物输出到 dist/
npm run preview    # 本地预览构建产物
```

### 常用命令

```bash
npm run dev          # 启动开发服务器
npm run build        # 生产构建
npm run preview      # 预览构建产物
npm run test         # 运行单元测试 (Vitest)
npm run lint         # JS 代码检查
npm run lint:fix     # 自动修复 JS 代码问题
npm run validate     # 校验站点数据 (sites.json / sitetrash.json)
npm run format       # 格式化 src/ 下的 Vue/JS/JSON/CSS 文件
npm run format:check # 检查上述文件格式
```

## 技术栈

- **Vue 3** — 前端框架（组合式 API + SFC）
- **Vite** — 构建工具与开发服务器
- **Vue Router 4** — Hash 模式路由
- **Pinia** — 状态管理
- **CSS3 + CSS 变量** — 全局样式表 + 组件 scoped 样式
- **JSON** — 数据存储
- **Vitest** — 单元测试
- **ESLint + Prettier** — 代码规范工具

## 版本

当前版本 **2.0.0**

查看完整更新历史请访问 [CHANGELOG.md](CHANGELOG.md)

## 贡献

欢迎参与项目贡献！请查看 [贡献指南](CONTRIBUTING.md)

## 致谢

- [acg](https://github.com/zjgsuzjx/acg) — 原项目
- [WebStack](https://github.com/owen0o0/WebStack)

---

## 开源协议

本项目基于 **GNU Affero General Public License v3.0 (AGPL-3.0)** 开源。

## 图标版权说明

- 网站图标版权归各网站所有者所有
- 如涉及图标版权问题，请联系站长处理

**免责声明**：本站仅提供网站链接导航服务，不存储、不制作、不传播任何内容。所有链接均指向第三方网站，对第三方网站内容不承担任何责任。如有侵权内容，请联系站长删除。
