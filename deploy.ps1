#!/usr/bin/env pwsh

# MÖRK BORG 建卡器 - 部署脚本 (PowerShell 版本)
# 用途：初始化 Git 仓库并推送到 GitHub

Write-Host "🚀 MÖRK BORG 建卡器 - 部署脚本 (PowerShell 版本)" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

# 检查是否在正确的目录
if (-not (Test-Path "package.json")) {
    Write-Host "❌ 错误：请在 mork-borg-app 目录中运行此脚本" -ForegroundColor Red
    exit 1
}

# 步骤1: 初始化 Git 仓库（如果尚未初始化）
if (-not (Test-Path ".git")) {
    Write-Host "📦 步骤 1/5: 初始化 Git 仓库..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git 仓库已初始化" -ForegroundColor Green
} else {
    Write-Host "✅ Git 仓库已存在，跳过初始化" -ForegroundColor Green
}

# 步骤2: 添加所有文件
Write-Host "📝 步骤 2/5: 添加文件到 Git..." -ForegroundColor Yellow
git add .
Write-Host "✅ 文件已添加" -ForegroundColor Green

# 步骤3: 创建初始提交
Write-Host "💾 步骤 3/5: 创建初始提交..." -ForegroundColor Yellow
git commit -m "Initial commit: MÖRK BORG 建卡器

- 完整的角色生成功能
- 骰子模拟器
- 角色保存/加载
- 导出功能（JSON/PDF/图片）
- 响应式设计
- 暗黑哥特风格 UI

部署方式：GitHub Actions 自动部署"
Write-Host "✅ 提交已创建" -ForegroundColor Green

# 步骤4: 添加远程仓库
Write-Host "🔗 步骤 4/5: 连接到 GitHub 远程仓库..." -ForegroundColor Yellow

# 检查远程仓库是否已存在
try {
    $remoteUrl = git remote get-url origin
    Write-Host "✅ 远程仓库已存在" -ForegroundColor Green
    # 询问是否更新远程仓库 URL
    $reply = Read-Host "是否要更新远程仓库 URL？(y/n)"
    if ($reply -match '^[Yy]$') {
        git remote set-url origin https://github.com/jeffdyuyi/mork-borg-app.git
        Write-Host "✅ 远程仓库 URL 已更新" -ForegroundColor Green
    }
} catch {
    git remote add origin https://github.com/jeffdyuyi/mork-borg-app.git
    Write-Host "✅ 远程仓库已添加" -ForegroundColor Green
}

# 步骤5: 推送到 GitHub
Write-Host "📤 步骤 5/5: 推送到 GitHub..." -ForegroundColor Yellow

# 检查 main 分支是否存在
try {
    git show-ref --verify --quiet refs/heads/main
    Write-Host "推送到 main 分支..." -ForegroundColor Yellow
    git push -u origin main
} catch {
    Write-Host "创建并推送到 main 分支..." -ForegroundColor Yellow
    git checkout -b main
    git push -u origin main
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "✅ 部署完成！" -ForegroundColor Green
Write-Host ""
Write-Host "📦 下一步操作：" -ForegroundColor Cyan
Write-Host "1. 访问你的 GitHub 仓库：" -ForegroundColor Cyan
Write-Host "   https://github.com/jeffdyuyi/mork-borg-app" -ForegroundColor White
Write-Host ""
Write-Host "2. 在 GitHub 仓库设置中启用 GitHub Pages：" -ForegroundColor Cyan
Write-Host "   - 进入 Settings > Pages" -ForegroundColor White
Write-Host "   - 在 Source 下选择 'gh-pages' 分支" -ForegroundColor White
Write-Host "   - 等待几分钟，你的应用将在线" -ForegroundColor White
Write-Host ""
Write-Host "3. 查看部署状态：" -ForegroundColor Cyan
Write-Host "   https://github.com/jeffdyuyi/mork-borg-app/actions" -ForegroundColor White
Write-Host ""
Write-Host "🎉 恭喜！你的 MÖRK BORG 建卡器已部署到 GitHub！" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
