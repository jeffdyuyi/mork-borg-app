#!/bin/bash

# MÖRK BORG 建卡器 - 部署脚本
# 用途：� Git 仓库并推送到 GitHub

set -e

echo "🚀 MÖRK BORG 建卡器 - 部署脚本"
echo "=========================================="

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在 mork-borg-app 目录中运行此脚本"
    exit 1
fi

# 步骤1: 初始化 Git 仓库（如果尚未初始化）
if [ ! -d ".git" ]; then
    echo "📦 步骤 1/5: 初始化 Git 仓库..."
    git init
    echo "✅ Git 仓库已初始化"
else
    echo "✅ Git 仓库已存在，跳过初始化"
fi

# 步骤2: 添加所有文件
echo "📝 步骤 2/5: 添加文件到 Git..."
git add .
echo "✅ 文件已添加"

# 步骤3: 创建初始提交
echo "💾 步骤 3/5: 创建初始提交..."
git commit -m "Initial commit: MÖRK BORG 建卡器

- 完整的角色生成功能
- 骰子模拟器
- 角色保存/加载
- 导出功能（JSON/PDF/图片）
- 响应式设计
- 暗黑哥特风格 UI

部署方式：GitHub Actions 自动部署"
echo "✅ 提交已创建"

# 步骤4: 添加远程仓库
echo "🔗 步骤 4/5: 连接到 GitHub 远程仓库..."

# 检查远程仓库是否已存在
if git remote get-url origin > /dev/null 2>&1; then
    echo "✅ 远程仓库已存在"
    # 询问是否更新远程仓库 URL
    read -p "是否要更新远程仓库 URL？(y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote set-url origin https://github.com/jeffdyuyi/mork-borg-app.git
        echo "✅ 远程仓库 URL 已更新"
    fi
else
    git remote add origin https://github.com/jeffdyuyi/mork-borg-app.git
    echo "✅ 远程仓库已添加"
fi

# 步骤5: 推送到 GitHub
echo "📤 步骤 5/5: 推送到 GitHub..."

# 检查 main 分支是否存在
if git show-ref --verify --quiet refs/heads/main; then
    echo "推送到 main 分支..."
    git push -u origin main
else
    echo "创建并推送到 main 分支..."
    git checkout -b main
    git push -u origin main
fi

echo ""
echo "=========================================="
echo "✅ 部署完成！"
echo ""
echo "📦 下一步操作："
echo "1. 访问你的 GitHub 仓库："
echo "   https://github.com/jeffdyuyi/mork-borg-app"
echo ""
echo "2. 在 GitHub 仓库设置中启用 GitHub Pages："
echo "   - 进入 Settings > Pages"
echo "   - 在 Source 下选择 'gh-pages' 分支"
echo "   - 等待几分钟，你的应用将在线"
echo ""
echo "3. 查看部署状态："
echo "   https://github.com/jeffdyuyi/mork-borg-app/actions"
echo ""
echo "🎉 恭喜！你的 MÖRK BORG 建卡器已部署到 GitHub！"
echo "=========================================="
