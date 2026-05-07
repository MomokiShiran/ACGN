# 贡献指南

欢迎参与 MyACG 项目的贡献！我们欢迎各种形式的贡献，包括但不限于：提交问题、修复bug、新增功能、改进文档等。

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
   git clone https://github.com/your-username/acg_nav.git
   cd acg_nav
   ```

3. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-fix-name
   ```

4. **进行修改**
   - 遵循项目的代码风格
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

| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复bug |
| `docs` | 文档更新 |
| `style` | 代码格式调整（不影响功能） |
| `refactor` | 重构 |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `chore` | 构建/工具相关 |


## 开发指南

### 项目结构

```
acg_nav/
├── assets/             # 静态资源
│   ├── css/            # 样式文件
│   ├── js/             # JavaScript 文件
│   ├── fonts/          # 字体文件
│   └── images/         # 图片资源
├── data/               # 数据文件
│   ├── sites.json      # 网站数据
│   ├── sitetrash.json  # 失效网站数据
│   └── announcements.json # 公告数据
├── sites/              # 网站详情页
├── announcements/      # 公告页面
│   ├── index.html      # 公告列表
│   └── detail.html     # 公告详情
├── sitetrash/          # 失效归档
├── postsite/           # 投稿反馈
├── scripts/            # 构建脚本
├── index.html          # 主页
├── README.md           # 项目说明
└── CONTRIBUTING.md     # 贡献指南
```

### 技术栈

- **HTML5** - 页面结构
- **CSS3** + **Bootstrap 4** - 样式框架
- **JavaScript** + **jQuery** - 交互逻辑
- **JSON** - 数据存储


## 数据管理

### 网站数据

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
          "description": "网站描述",
          "category": "term-3",
          "isNew": false,
          "detail": "详细信息（可选）"
        }
      ]
    }
  ]
}
```

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

访问 [投稿页面](/postsite/) 提交网站信息。

### 方式二：直接贡献代码

1. 在 `data/sites.json` 中添加网站信息
2. 在 `sites/` 目录下创建对应的 HTML 文件
3. 确保网站符合收录标准
4. 提交 Pull Request

### 网站收录标准

- ✅ 网站运行稳定
- ✅ 与 ACG 主题相关
- ✅ 不收录需要付费购买邀请码的网站
- ✅ 不收录长久未更新的网站

## 移动网站到失效归档

当网站失效时，需要将其移到失效归档：

1. 从 `data/sites.json` 中删除网站信息
2. 将网站信息添加到 `data/sitetrash.json` 对应分类中
3. 保留所有字段信息

---

感谢您对 MyACG 项目的支持！
