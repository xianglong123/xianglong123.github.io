# 这个仓库的分支怎么用

站点：<https://xianglong123.github.io/>

| 分支 | 内容 |
| --- | --- |
| `master` | **构建产物**（VuePress 编译出来的静态文件）。GitHub Pages 从这里取内容，不要直接手改。 |
| `source` | **源码**（`docs/`、`.vuepress/` 配置、`package.json`）。所有修改都在这里做。 |

## 为什么之前是 404

`master` 里一直是源码，根目录没有 `index.html`，GitHub Pages 找不到首页就返回 404。
`deploy.sh` 虽然写了推送逻辑，但里面的 `#pnpm run build` 是注释掉的，等于从来没产出过 `dist/`，所以从建站起就一直 404。

## 改文章的标准流程

```sh
git clone -b source git@github.com:xianglong123/xianglong123.github.io.git blog
cd blog
sh deploy.sh          # 构建 + 推 master，几十秒后线上生效
```

只在 `source` 分支提交源码，`deploy.sh` 会把产物强推到 `master`。

## 两个坑，别踩

1. **不要在产物里放 `CNAME`**。原脚本会写 `www.xianglong.vip`，而那个域名现在已经指向自己的服务器；GitHub Pages 声明之后，`github.io` 主域会被 301 过去，站点会打不开。新脚本已删掉这一行。
2. **VuePress 1.x 在 Node 17+ 会报 `ERR_OSSL_EVP_UNSUPPORTED`**（md4 被 OpenSSL 3 禁用）。脚本里已经导出 `NODE_OPTIONS=--openssl-legacy-provider`，手动构建时也要带上，否则构建会在编译阶段挂掉。
