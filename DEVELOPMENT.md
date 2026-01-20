# MÖRK BORG 建卡器 - 开发指南

## 📋 目录

- [项目结构](#项目结构)
- [开发环境设置](#开发环境设置)
- [代码规范](#代码规范)
- [功能开发](#功能开发)
- [测试](#测试)
- [贡献指南](#贡献指南)

## 📁 项目结构

```
mork-borg-app/
├── public/              # 静态资源
├── src/
│   ├── components/      # 组件（可选，未来扩展）
│   ├── styles/         # 样式文件
│   │   └── main.css
│   ├── data/           # 数据文件
│   │   └── gameData.js
│   ├── utils/          # 工具函数
│   │   ├── dice.js
│   │   ├── storage.js
│   │   ├── character.js
│   │   └── export.js
│   ├── index.html      # 入口 HTML
│   └── main.js        # 主逻辑
├── dist/              # 构建输出（自动生成）
├── package.json
├── vite.config.js
├── .gitignore
├── vercel.json
├── netlify.toml
├── README.md
├── DEPLOYMENT.md
└── DEVELOPMENT.md
```

## 🛠️ 开发环境设置

### 1. 克隆仓库

```bash
git clone https://github.com/your-username/mork-borg-app.git
cd mork-borg-app
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

应用将在 http://localhost:3000 启动，并支持热重载。

### 4. 推荐的开发工具

- **浏览器**: Chrome DevTools / Firefox Developer Tools
- **编辑器**: VS Code
  - 推荐扩展:
    - ESLint
    - Prettier
    - Live Server
    - Auto Rename Tag

## 📝 代码规范

### JavaScript

- 使用 ES6+ 语法
- 使用模块化导入/导出
- 函数命名使用 camelCase
- 常量命名使用 UPPER_SNAKE_CASE
- 添加适当的注释

```javascript
// ✅ 好的例子
import { generateCharacter } from './utils/character.js';

function handleGenerateCharacter() {
  const character = generateCharacter();
  displayCharacter(character);
}

// ❌ 不好的例子
function handleGenerateCharacter(){
  var character=generateCharacter()
  displayCharacter(character)
}
```

### CSS

- 使用 BEM 命名约定（可选）
- 避免内联样式
- 使用 CSS 变量（可选，未来扩展）
- 保持响应式设计

```css
/* ✅ 好的例子 */
.character-card {
  background: #1a1a1a;
  border: 3px solid #662222;
}

/* ❌ 不好的例子 */
.card {background:#1a1a1a;border:3px solid #662222}
```

### HTML

- 使用语义化标签
- 添加适当的 aria 标签
- 保持可访问性

```html
<!-- ✅ 好的例子 -->
<div class="character-card" id="charCard">
  <h2>角色信息</h2>
</div>

<!-- ❌ 不好的例子 -->
<div id="card">
  <h2>角色信息</h2>
</div>
```

## 🚀 功能开发

### 添加新功能

#### 1. 创建工具函数

在 `src/utils/` 中创建新文件：

```javascript
// src/utils/newFeature.js
export function newFeature() {
  // 实现功能
  return result;
}
```

#### 2. 在 main.js 中导入和使用

```javascript
import { newFeature } from './utils/newFeature.js';

function setupEventListeners() {
  document.getElementById('newButton').addEventListener('click', newFeature);
}
```

#### 3. 更新 HTML（如需要）

在 `src/index.html` 中添加相应的 UI 元素。

### 修改现有功能

1. 找到相关的函数/文件
2. 理解现有逻辑
3. 进行修改
4. 测试更改

### 数据更新

要更新游戏数据（职业、武器等）：

1. 编辑 `src/data/gameData.js`
2. 更新相应的数组
3. 保存文件
4. 重新加载应用

## 🧪 测试

### 手动测试

1. **功能测试**
   - 生成角色
   - 编辑角色
   - 保存/加载角色
   - 掷骰子
   - 导出功能

2. **响应式测试**
   - 桌面 (1920x1080)
   - 平板 (768x1024)
   - 手机 (375x667)

3. **浏览器测试**
   - Chrome
   - Firefox
   - Safari
   - Edge

### 自动化测试（可选）

未来可以添加自动化测试：

```bash
npm install --save-dev vitest
```

## 🤝 贡献指南

### 报告 Bug

1. 在 GitHub Issues 中创建新问题
2. 描述问题
3. 提供重现步骤
4. 添加环境信息（浏览器、操作系统）

### 提交功能请求

1. 在 GitHub Issues 中创建新问题
2. 清晰描述功能请求
3. 解释用例
4. 提供示例（如适用）

### 提交代码

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### Pull Request 指南

- 保持 PR 小而专注
- 提供清晰的描述
- 引用相关问题
- 确保代码通过所有检查
- 更新相关文档

## 🔧 调试

### 浏览器 DevTools

```javascript
// 在控制台中访问应用状态
console.log(currentCharacter);
console.log(isEditMode);

// 查看存储数据
console.log(localStorage.getItem('morkBorgCharacters'));
```

### VS Code 调试

1. 在代码中设置断点
2. 按 F5 启动调试
3. 使用调试控制台

## 📚 学习资源

- [Vite 文档](https://vitejs.dev/)
- [MDN Web 文档](https://developer.mozilla.org/)
- [JavaScript 最佳实践](https://github.com/ryanmcdermott/clean-code-javascript)
- [CSS 技巧](https://css-tricks.com/)

## 🎯 开发路线图

### 短期目标
- [ ] 添加单元测试
- [ ] 改进错误处理
- [ ] 添加更多导出格式
- [ ] 优化性能

### 中期目标
- [ ] 添加 PWA 支持
- [ ] 实现主题切换
- [ ] 添加多语言支持
- [ ] 添加云同步功能

### 长期目标
- [ ] 创建移动应用
- [ ] 添加在线多人协作
- [ ] 创建 API 服务
- [ ] 添加 AI 辅助功能

## 📞 获取帮助

如果你需要帮助：

1. 查看 [README.md](README.md)
2. 查看 [DEPLOYMENT.md](DEPLOYMENT.md)
3. 在 GitHub 上创建 Issue
4. 联系维护者

## 📄 许可证

MIT License - 详见 LICENSE 文件
