#!/usr/bin/env sh
# 源码在本仓库的 source 分支；构建产物推到 master，GitHub Pages 从 master 读取。
#
# 千万不要在产物里写 CNAME：www.xianglong.vip 已经指向自己的服务器，
# 一旦 GitHub Pages 声明这个域名，github.io 主域会被 301 到它，站点反而打不开。

set -e

# VuePress 1.x 里的 md4 在 Node 17+ 会报 ERR_OSSL_EVP_UNSUPPORTED，需要 legacy provider
export NODE_OPTIONS=--openssl-legacy-provider

# 首次构建时安装依赖；已装可跳过
if [ ! -d node_modules ]; then
  npm ci
fi

npx vuepress build docs

cd docs/.vuepress/dist

git init -b master
git add -A
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M')"
git push -f git@github.com:xianglong123/xianglong123.github.io.git master

cd -
echo "已部署：https://xianglong123.github.io/"
