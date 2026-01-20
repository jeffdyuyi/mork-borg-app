# MÖRK BORG 建卡器 - 部署指南

## 📦 前置要求

- Node.js 18+ 
- npm 或 yarn
- Git（可选，用于版本控制）

## 🚀 部署方式

### 方式1: Vercel（推荐）

#### 步骤1：安装 Vercel CLI

```bash
npm install -g vercel
```

#### 步骤2：登录 Vercel

```bash
vercel login
```

#### 步骤3：部署项目

```bash
cd mork-borg-app
npm run build
vercel
```

按照提示完成部署，Vercel 会自动：
- 检测项目类型
- 配置构建设置
- 分配 HTTPS 域名
- 设置自动部署

#### 自动部署

将代码推送到 GitHub 后，Vercel 会自动部署：

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/mork-borg-app.git
git push -u origin main
```

### 方式2: Netlify

#### 步骤1：安装 Netlify CLI

```bash
npm install -g netlify-cli
```

#### 步骤2：登录 Netlify

```bash
netlify login
```

#### 步骤3：部署项目

```bash
cd mork-borg-app
npm run build
netlify deploy --prod --dir=dist
```

### 方式3: GitHub Pages

#### 步骤1：构建项目

```bash
cd mork-borg-app
npm run build
```

#### 步骤2：推送到 GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/mork-borg-app.git
git push -u origin main
```

#### 步骤3：启用 GitHub Pages

1. 进入 GitHub 仓库设置
2. 滚动到 "GitHub Pages" 部分
3. 在 "Source" 下选择 `main` 分支
4. 点击 "Save"
5. 等待几分钟，你的网站将在 `https://your-username.github.io/mork-borg-app/` 可访问

### 方式4：静态服务器

如果你想使用自己的服务器：

```bash
# 使用 http-server
npm install -g http-server
cd dist
http-server -p 8080

# 或使用 Python
cd dist
python -m http.server 8080

# 或使用 Node.js
cd dist
npx serve
```

## 🔧 环境变量（可选）

如果需要配置环境变量：

### Vercel

```bash
vercel env add VARIABLE_NAME
```

### Netlify

在 Netlify Dashboard 中添加环境变量

### GitHub Actions

创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🌐 自定义域名

### Vercel

1. 进入项目设置
2. 点击 "Domains"
3. 添加你的域名
4. 按照提示配置 DNS

### Netlify

1. 进入 "Domain settings"
2. 点击 "Add custom domain"
3. 按照提示配置 DNS

### GitHub Pages

1. 进入仓库设置
2. 在 "GitHub Pages" 部分
3. 在 "Custom domain" 中输入你的域名
4. 配置 DNS

## 📊 监控和分析

### Vercel Analytics

Vercel 提供内置的分析功能，在 Dashboard 中查看。

### Netlify Analytics

Netlify 提供内置的分析功能，在 Dashboard 中查看。

### Google Analytics

在 `index.html` 中添加 Google Analytics 跟踪代码：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔒 安全配置

项目已包含基本的安全头配置（在 `netlify.toml` 中）：

- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Content-Security-Policy: 适当的 CSP 策略

## 📱 PWA 支持（可选）

要添加 PWA 支持，需要：

1. 创建 `public/manifest.json`:

```json
{
  "name": "MÖRK BORG 建卡器",
  "short_name": "MÖRK BORG",
  "description": "专业的 MÖRK BORG 角色创建工具",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0a",
  "theme_color": "#d4af37",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

2. 创建 `public/sw.js` (Service Worker)

3. 在 `index.html` 中注册 Service Worker

## 🐛 故障排除

### 构建失败

```bash
# 清除缓存并重新安装
rm -rf node_modules package-lock.json
npm install

# 清除构建缓存
rm -rf dist
npm run build
```

### 部署失败

- 检查网络连接
- 确认有足够的权限
- 查看部署日志

### 本地运行问题

```bash
# 检查 Node.js 版本
node --version  # 应该是 18+

# 清除浏览器缓存
# 在开发者工具中禁用缓存
```

## 📞 支持

如果遇到问题：

1. 查看 [Vercel 文档](https://vercel.com/docs)
2. 查看 [Netlify 文档](https://docs.netlify.com/)
3. 查看 [GitHub Pages 文档](https://docs.github.com/en/pages)

## ✅ 部署检查清单

- [ ] 项目可以本地运行 (`npm run dev`)
- [ ] 项目可以成功构建 (`npm run build`)
- [ ] 所有功能在构建版本中正常工作
- [ ] 响应式设计在不同设备上正常
- [ ] 性能优化已应用
- [ ] 安全头已配置
- [ ] 域名已配置（如需要）
- [ ] 监控已设置（如需要）
- [ ] 备份策略已制定
