# GitHub Pages 部署问题解决方案

## 问题诊断
- GitHub Pages 设置页面中没有显示 `gh-pages` 分支选项
- 这是因为 `gh-pages` 分支还不存在
- 需要先让 GitHub Actions 工作流成功运行来创建该分支

## 解决方案

### 方案一：检查并修复 GitHub Actions 工作流（推荐）
1. 登录 GitHub 账号
2. 访问仓库的 Actions 页面：`https://github.com/jeffdyuyi/mork-borg-app/actions`
3. 检查最新的工作流运行状态
4. 如果工作流失败，查看错误日志并修复问题
5. 等待工作流成功运行后，`gh-pages` 分支会被自动创建

### 方案二：手动创建 gh-pages 分支并部署
如果 GitHub Actions 工作流无法正常运行，可以手动部署：
1. 在本地运行 `npm run build` 构建项目
2. 使用 `git subtree push` 命令将 `dist` 目录推送到 `gh-pages` 分支
3. 在 GitHub Pages 设置页面选择 `gh-pages` 分支

### 方案三：使用 GitHub Actions 工作流重新触发
1. 检查工作流配置是否正确
2. 如果需要，更新工作流配置
3. 重新推送代码触发工作流
4. 监控工作流运行状态

## 预期结果
- GitHub Actions 工作流成功运行
- `gh-pages` 分支被自动创建
- GitHub Pages 设置页面中出现 `gh-pages` 分支选项
- 网站成功部署到 `https://jeffdyuyi.github.io/mork-borg-app`