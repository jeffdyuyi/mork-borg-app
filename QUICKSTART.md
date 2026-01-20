# MÖRK BORG 建卡器 - 快速启动指南

## 🚀 5分钟快速启动

### 1. 安装依赖

```bash
cd mork-borg-app
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

应用将在 http://localhost:3000 启动

### 3. 构建生产版本

```bash
npm run build
```

构建产物将在 `dist` 目录中

### 4. 部署到 Vercel（最快）

```bash
npm install -g vercel
vercel
```

按照提示完成部署，几分钟后你的应用将在线！

## 📦 项目结构

```
mork-borg-app/
├── src/
│   ├── data/gameData.js      # 游戏数据
│   ├── styles/main.css        # 样式
│   ├── utils/                # 工具函数
│   │   ├── dice.js
│   │   ├── storage.js
│   │   ├── character.js
│   │   └── export.js
│   ├── index.html            # 入口
│   └── main.js              # 主逻辑
├── package.json
├── vite.config.js
└── README.md
```

## ✨ 主要功能

- ✅ 随机角色生成
- ✅ 手动编辑角色
- ✅ 骰子模拟器
- ✅ 角色保存/加载
- ✅ 导出为 JSON/PDF/图片
- ✅ 响应式设计
- ✅ 暗黑哥特风格 UI

## 🎯 下一步

1. **本地测试**: 运行 `npm run dev` 测试所有功能
2. **构建**: 运行 `npm run build` 生成生产版本
3. **部署**: 选择 Vercel/Netlify/GitHub Pages 部署
4. **自定义**: 根据需要修改样式和功能

## 📚 更多文档

- [README.md](README.md) - 项目概述
- [DEPLOYMENT.md](DEPLOYMENT.md) - 详细部署指南
- [DEVELOPMENT.md](DEVELOPMENT.md) - 开发指南

## 🐛 遇到问题？

1. 检查 Node.js 版本: `node --version` (需要 18+)
2. 清除缓存: `rm -rf node_modules && npm install`
3. 查看浏览器控制台错误
4. 在 GitHub 上提交 Issue

## 🎉 开始使用

现在你可以开始使用 MÖRK BORG 建卡器了！

祝你游戏愉快！⚫
