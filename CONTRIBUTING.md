# 贡献指南

欢迎参与 MyACGN 项目的贡献！我们欢迎各种形式的贡献，包括但不限于：提交问题、修复 Bug、新增功能、改进文档、添加新站点等。

## 如何贡献

### 1. 提交问题 (Issues)

如果您发现了 Bug 或有新功能建议，请：

1. 先搜索已有的 Issues，避免重复
2. 使用清晰的标题和描述
3. 提供复现步骤
4. 说明您的环境（浏览器、操作系统等）

### 2. 贡献代码 (Pull Requests)

1. **Fork 仓库**

2. **克隆仓库**

   ```bash
   git clone https://github.com/MomokiShiran/ACGN.git
   cd ACGN
   ```

3. **创建分支**

   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-fix-name
   ```

4. **进行修改**
   - 遵循项目的代码风格（ESLint + Prettier）
   - 确保 `npm run lint` 和 `npm run build` 通过
   - 添加必要的注释

5. **提交更改**

   ```bash
   git add .
   git commit -m "feat: 添加新功能"  # 遵循提交规范
   ```

6. **推送到 Fork**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **创建 Pull Request** — 目标分支选择 `develop`

### 3. 提交规范

提交格式为 `<类型>: <简洁中文描述>`，类型前缀使用英文小写：

| 类型       | 使用场景                      |
| ---------- | ----------------------------- |
| `feat`     | 新功能、新页面、新组件、站点数据更新 |
| `fix`      | Bug 修复、问题修正            |
| `style`    | UI/样式调整（不影响功能逻辑） |
| `refactor` | 代码重构（无功能变更）        |
| `perf`     | 性能优化、体验改进            |
| `docs`     | 文档更新、注释补充            |
| `chore`    | 脚本、构建配置、开发工具改动  |
| `test`     | 测试相关改动                  |

## 开发指南

### 项目结构

```
ACGN/
├── .github/               # GitHub Actions 工作流
├── public/                # 不经构建处理的静态资源
├── scripts/               # Node 脚本（站点数据校验等）
├── src/
│   ├── assets/           # 静态资源
│   │   ├── icons/        # 内联 SVG 图标
│   │   └── images/       # Logo、favicon、站点图标
│   ├── components/       # 可复用组件
│   │   ├── layout/       # 布局组件（TheNavbar / TheSidebar / TheFooter）
│   │   ├── LinkTag.vue         # 内/外链统一渲染
│   │   ├── AppLink.vue         # 外链按钮
│   │   ├── Button.vue          # 按钮
│   │   ├── Badge.vue           # 徽章
│   │   ├── Card.vue            # 卡片容器
│   │   ├── PillGroup.vue       # 标签组
│   │   ├── SectionTitle.vue    # 区块标题
│   │   ├── PageContent.vue     # 内容区内边距外壳
│   │   ├── ContentPage.vue     # 数据驱动的静态内容页
│   │   ├── ScrollTopButton.vue
│   │   ├── BackBar.vue
│   │   ├── EmptyState.vue
│   │   ├── InlineNodes.vue
│   │   ├── LegalNav.vue
│   │   ├── SearchBar.vue
│   │   ├── SiteCard.vue
│   │   ├── SiteRow.vue
│   │   ├── CategoryList.vue
│   │   ├── CategorySection.vue
│   │   ├── AnnouncementItem.vue
│   │   └── FriendLinks.vue
│   ├── composables/       # Vue 组合式函数
│   │   ├── legalLinks.js       # 法律页面链接（LegalNav 与页脚共用）
│   │   ├── themeConstants.js   # 主题令牌与 class 名
│   │   ├── usePageTitle.js
│   │   └── useSiteIcon.js
│   ├── constants/
│   │   └── app.js         # 页面标题常量
│   ├── data/              # JSON 数据
│   │   ├── announcements.json
│   │   ├── contentPages.json   # 关于/声明/隐私 页内容
│   │   ├── friends.json
│   │   ├── sites.json
│   │   └── sitetrash.json
│   ├── router/
│   │   └── index.js       # Vue Router 配置
│   ├── stores/            # Pinia 状态管理
│   │   ├── __tests__/     # store 单元测试
│   │   ├── announcements.js
│   │   ├── friends.js
│   │   ├── hitokoto.js
│   │   ├── sidebar.js
│   │   ├── sites.js
│   │   └── theme.js
│   ├── views/             # 页面组件
│   │   ├── HomeView.vue
│   │   ├── SiteDetailView.vue
│   │   ├── SiteTrashView.vue
│   │   ├── AnnouncementsListView.vue
│   │   ├── AnnouncementDetailView.vue
│   │   ├── ContentView.vue     # 关于/声明/隐私 共用
│   │   ├── PostSiteView.vue
│   │   └── NotFoundView.vue
│   ├── App.vue            # 根组件（主题变量 + 全局样式）
│   └── main.js            # 应用入口
├── .eslintrc.cjs
├── .prettierrc
├── index.html             # Vite HTML 入口
├── package.json
├── vite.config.js
├── README.md
├── CONTRIBUTING.md
└── CHANGELOG.md
```

### 技术栈

| 分类    | 技术               | 说明                             |
| ------- | ------------------ | -------------------------------- |
| 框架    | Vue 3              | 组合式 API                       |
| 构建    | Vite               | 开发服务器与生产构建             |
| 路由    | Vue Router 4       | Hash 模式                        |
| 状态    | Pinia              | 集中管理站点、公告、友链数据     |
| 组合式  | VueUse             | 主题色 / 滚动位置等              |
| 样式    | CSS3 + CSS 变量    | 主题令牌 + 组件 scoped 样式      |
| 数据    | JSON               | 轻量级数据存储                   |
| 规范    | ESLint + Prettier  | 代码质量与格式                   |
| 测试    | Vitest             | 单元测试                         |
| CI/CD   | GitHub Actions     | 数据校验 + 自动构建部署          |

### 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器（http://localhost:5173/ACGN/）
npm run dev

# 生产构建（产物输出到 dist/）
npm run build

# 本地预览构建产物
npm run preview

# 代码检查
npm run lint

# 自动修复代码问题
npm run lint:fix

# 站点数据校验（sites.json / sitetrash.json）
npm run validate

# 格式化 src/ 下的文件
npm run format

# 检查格式（CI 用）
npm run format:check

# 运行单元测试
npm run test
```

## 数据管理

### 网站数据结构

网站与分类数据存储在 `src/data/sites.json`，结构如下：

```json
{
  "categories": [
    {
      "id": "term-x",
      "name": "分类名称",
      "icon": "✨",
      "sites": [
        {
          "id": 1,
          "name": "网站名称",
          "url": "https://example.com",
          "description": "网站描述（简洁明了）",
          "category": "term-x",
          "detail": "站点详细介绍（可选）",
          "isNew": false,
          "icon": "./example.com.png",
          "disabledAt": "",
          "createdAt": "2026-01-01 00:00:00"
        }
      ]
    }
  ]
}
```

#### 站点字段说明

| 字段          | 类型    | 必填 | 说明                             |
| ------------- | ------- | ---- | -------------------------------- |
| `id`          | number  | 是   | 唯一标识，自增                   |
| `name`        | string  | 是   | 网站名称                         |
| `url`         | string  | 是   | 完整 URL（含 http/https）        |
| `description` | string  | 是   | 网站描述（50 字以内）            |
| `category`    | string  | 是   | 分类 ID（如 `term-2`）           |
| `detail`      | string  | 否   | 站点详细介绍（详情页展示）       |
| `isNew`       | boolean | 是   | 是否新站点                       |
| `icon`        | string  | 否   | 图标文件名                       |
| `disabledAt`  | string  | 是   | 失效日期（空字符串表示正常运行） |
| `createdAt`   | string  | 是   | 收录日期                         |

### 公告数据

公告数据存储在 `src/data/announcements.json`，结构如下：

```json
{
  "announcements": [
    {
      "id": 1,
      "title": "公告标题",
      "date": "2026-01-01",
      "author": "站长",
      "views": 0,
      "excerpt": "公告摘要",
      "content": "<p>HTML 正文内容</p>"
    }
  ]
}
```

### 失效归档

失效网站移至 `src/data/sitetrash.json`，保留原有信息以便后续恢复。

## 添加新网站

### 方式一：通过投稿页面

访问 [投稿页面](#/postsite) 获取投稿邮箱与 GitHub Issue 联系方式。该页面只是联系方式说明，不是在线表单，不会直接提交数据。

### 方式二：直接贡献代码

1. 在 `src/data/sites.json` 对应分类的 `sites` 数组末尾添加新条目
2. 如有需要，将图标放入 `src/assets/images/sites/`
3. 运行 `npm run validate` 确保数据合规
4. 提交 Pull Request 到 `develop` 分支

### 方式三：GitHub 网页编辑（无需克隆）

1. 打开 [sites.json 编辑页](https://github.com/MomokiShiran/ACGN/edit/develop/src/data/sites.json)，直接在 GitHub 上修改并提交
2. 打开 [站点图标目录](https://github.com/MomokiShiran/ACGN/tree/develop/src/assets/images/sites)，上传新图标文件
3. GitHub 会自动创建 Fork 和分支，提交后发起 Pull Request

### 网站收录标准

- 网站运行稳定
- 与 ACG 主题相关
- 不收录需要付费购买邀请码的网站
- 不收录长久未更新的网站

## 移动网站到失效归档

当网站失效时：

1. 从 `src/data/sites.json` 中删除该站点
2. 将完整条目添加到 `src/data/sitetrash.json` 对应分类
3. 设置 `disabledAt` 字段为失效日期
4. 运行 `npm run validate`

---

感谢您对 MyACGN 项目的支持！
