# 贡献指南

欢迎参与 MyACG 项目的贡献！我们欢迎各种形式的贡献，包括但不限于：提交问题、修复bug、新增功能、改进文档、添加新站点等。

## 如何贡献

### 1. 提交问题 (Issues)

如果您发现了bug或有新功能建议，请：

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
   - 确保代码可以正常运行
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

7. **创建 Pull Request**
   - 提供清晰的标题和描述
   - 说明解决了什么问题
   - 关联相关的 Issue（如果有）

### 3. 提交规范

#### 提交格式

示例：

```bash
feat: xxxxxxx
```

#### Type 类型

| 类型       | 说明                       |
| ---------- | -------------------------- |
| `feat`     | 新功能                     |
| `fix`      | 修复bug                    |
| `docs`     | 文档更新                   |
| `style`    | 代码格式调整（不影响功能） |
| `refactor` | 重构                       |
| `perf`     | 性能优化                   |
| `test`     | 测试相关                   |
| `chore`    | 构建/工具相关              |

## 开发指南

### 项目结构

```
ACGN/
├── .github/              # GitHub 配置
│   └── workflows/        # Actions 工作流
├── about/                # 关于页面
├── announcements/        # 公告页面
│   ├── index.html        # 公告列表
│   └── detail.html       # 公告详情
├── assets/               # 静态资源
│   ├── css/              # 样式文件
│   │   ├── grid.css      # 自定义网格系统
│   │   ├── header.css    # 自定义顶部导航栏
│   │   ├── components.css # 自定义组件（Tooltip等）
│   │   ├── common.css    # 通用工具类
│   │   ├── themes.css    # 主题变量
│   │   └── ...           # 其他样式
│   ├── fonts/            # 字体文件（Font Awesome）
│   ├── images/           # 图片资源
│   │   └── sites/        # 网站图标
│   └── js/               # JavaScript 文件
│       ├── tooltips-loader.js  # 自定义Tooltip模块
│       ├── sidebar-interaction-loader.js # 侧边栏交互
│       ├── ui-loader.js  # UI加载器
│       └── ...           # 其他模块
├── data/                 # 数据文件
│   ├── sites.json        # 网站数据（主文件）
│   ├── sitetrash.json    # 失效网站归档
│   └── announcements.json # 公告数据
├── disclaimer/           # 免责声明页面
├── docs/                 # 文档
├── friends/              # 友情链接页面
├── postsite/             # 投稿反馈页面
├── privacy/              # 隐私政策页面
├── scripts/              # 脚本工具
│   └── update-isnew.js   # 更新 isNew 状态脚本
├── sites/                # 网站详情页（动态模板）
│   └── detail.html       # 网站详情模板
├── sitetrash/            # 失效归档页面
├── src/                  # 源代码
├── tests/                # 测试文件
├── __tests__/            # 测试用例
├── 404.html              # 404 页面
├── index.html            # 主页
├── .eslintrc.js          # ESLint 配置
├── .prettierrc           # Prettier 配置
├── package.json          # 项目配置
├── README.md             # 项目说明
└── CONTRIBUTING.md       # 贡献指南
```

### 技术栈

| 分类 | 技术 | 说明 |
|------|------|------|
| 页面结构 | HTML5 | 语义化标记 |
| 样式 | CSS3 | 响应式设计 |
| 交互 | JavaScript (ES Module) | 原生 JS，无 jQuery |
| 数据 | JSON | 轻量级数据存储 |
| 代码规范 | ESLint + Prettier | 代码质量保证 |
| CI/CD | GitHub Actions | 自动验证与部署 |

### 开发命令

```bash
# 安装依赖
npm install

# 代码检查
npm run lint

# 代码格式化
npm run format

# 运行本地服务器
python -m http.server 8000
```

## 数据管理

### 网站数据结构

网站数据存储在 `data/sites.json`，结构如下：

```json
{
  "categories": [
    {
      "id": "term-3",
      "name": "在线动漫",
      "icon": "fas fa-play-circle",
      "sites": [
        {
          "id": 101,
          "name": "网站名称",
          "url": "https://example.com",
          "description": "网站描述（简洁明了）",
          "category": "term-3",
          "isNew": false,
          "detail": "详细信息（可选）",
          "icon": "assets/images/sites/example.com.png",
          "disabledAt": "",
          "createdAt": "2024-01-01 00:00:00"
        }
      ]
    }
  ]
}
```

#### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | number | 是 | 唯一标识，自增 |
| `name` | string | 是 | 网站名称 |
| `url` | string | 是 | 完整 URL（含 http/https） |
| `description` | string | 是 | 网站描述（50字以内） |
| `category` | string | 是 | 分类 ID（如 term-3） |
| `detail` | string | 否 | 详细信息（可选，如联系邮箱、网站描述等） |
| `isNew` | boolean | 是 | 是否新站点（30天内为 true） |
| `icon` | string | 否 | 图标路径 |
| `disabledAt` | string | 是 | 失效日期（空表示正常） |
| `createdAt` | string | 是 | 创建时间 |

### 公告数据

公告数据存储在 `data/announcements.json`，结构如下：

```json
{
  "announcements": [
    {
      "id": 64,
      "title": "公告标题",
      "date": "2021-05-31",
      "author": "作者",
      "views": 1257,
      "comments": 6,
      "likes": 8,
      "excerpt": "摘要",
      "content": "<p>HTML内容</p>"
    }
  ]
}
```

### 失效归档

失效网站移至 `data/sitetrash.json`，保留原有信息以便后续恢复。

## 添加新网站

### 方式一：通过投稿页面

访问 [投稿页面](/postsite/) 提交网站信息，我们会审核后添加。

### 方式二：直接贡献代码

1. 在 `data/sites.json` 中添加网站信息
2. 如有需要，添加网站图标到 `assets/images/sites/`
3. 确保网站符合收录标准
4. 提交 Pull Request

### 网站收录标准

- 网站运行稳定
- 与 ACG 主题相关
- 不收录需要付费购买邀请码的网站
- 不收录长久未更新的网站

## 移动网站到失效归档

当网站失效时，需要将其移到失效归档：

1. 从 `data/sites.json` 中删除网站信息
2. 将网站信息添加到 `data/sitetrash.json` 对应分类中
3. 设置 `disabledAt` 字段为失效日期

---

感谢您对 MyACG 项目的支持！