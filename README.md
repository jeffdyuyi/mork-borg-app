# MÖRK BORG 黑暗堡垒 - 角色创建工具

![GitHub Actions](https://github.com/jeffdyuyi/mork-borg-app/workflows/deploy.yml/badge.svg)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-online-success?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

一个专业、美观的 MÖRK BORG 角色创建工具，支持随机生成、手动编辑、骰子模拟、角色保存和导出功能。

## ✨ 特性

- 🎲 随机角色生成（完整规则）
- ✏️ 手动编辑角色
- 💾 本地存储角色
- 🎯 骰子模拟器
- 📄 导出为 PDF/JSON/图片
- 🌙 暗黑哥特风格 UI
- 📱 响应式设计
- ⚡ 快速加载
- 🚀 自动化部署（GitHub Actions）

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 http://localhost:3000 启动

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录

### 预览生产构建

```bash
npm run preview
```

### 一键部署到 GitHub（推荐）

#### Windows 用户（PowerShell）

```powershell
# 在 PowerShell 中运行
cd "d:\DND\规则\MÖRK BORG\mork-borg-app"
npm run deploy:init
```

#### Linux/Mac 用户（Bash）

```bash
# 在终端中运行
cd "d:\DND\规则\MÖRK BORG\mork-borg-app"
bash deploy.sh
```

这将自动：
1. 初始化 Git 仓库
2. 连接到 GitHub 远程仓库
3. 创建初始提交
4. 推送到 GitHub
5. 触发 GitHub Actions 自动部署

### 日常更新

```bash
# 提交更改
git add .
git commit -m "Update feature"
git push

# 自动触发部署
```

## 📁 项目结构

```
mork-borg-app/
├── public/              # 静态资源
├── src/
│   ├── components/      # 组件
│   ├── styles/         # 样式文件
│   ├── data/           # 数据文件
│   ├── utils/          # 工具函数
│   └── index.html      # 入口 HTML
├── dist/              # 构建输出
└── package.json
```

## 🎨 技术栈

- **构建工具**: Vite
- **语言**: 原生 JavaScript (ES6+)
- **样式**: CSS3
- **部署**: Vercel/Netlify

## 📦 部署

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages

1. 推送到 GitHub
2. 在仓库设置中启用 GitHub Pages
3. 选择 `gh-pages` 分支或 `dist` 目录

## 📄 许可证

MIT

## 🙏 致谢

- MÖRK BORG by Pelle Nilsson
- 原始规则和翻译
