#!/usr/bin/env bash
# 构建并把产物推到 master（GitHub Pages 从 master 发布）
set -euo pipefail
cd "$(dirname "$0")"

[ -d node_modules ] || npm ci
npm run build

cd docs/.vitepress/dist
touch .nojekyll            # 别让 GitHub 的 Jekyll 处理静态资源
rm -rf .git
git init -q -b master
git add -A
git -c user.name="deploy" -c user.email="deploy@local" \
    commit -q -m "site: $(date '+%Y-%m-%d %H:%M')"
git push -f git@github.com:xianglong123/xianglong123.github.io.git master
echo "已发布 -> https://xianglong123.github.io/"
