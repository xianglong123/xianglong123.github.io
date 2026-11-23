# 这个仓库怎么用

技术栈：**VitePress 1.x**（Vue 3 + Vite）。旧版本是 VuePress 1.x + vuepress-theme-reco，已整体迁移。

## 两个分支，各管一件事

| 分支 | 内容 | 谁写入 |
| --- | --- | --- |
| `source` | 源码：Markdown、配置、主题 | 手动提交 |
| `master` | 构建产物（GitHub Pages 从这里发布） | `deploy.sh` 强制覆盖 |

**改内容永远改 `source`，不要碰 `master`。** master 每次都是整棵树被覆盖，手改会丢。

## 本地开发

```sh
npm ci          # 首次
npm run dev     # 本地起服务，改 md 热更新
npm run build   # 只构建，产物在 docs/.vitepress/dist
```

不需要 `--openssl-legacy-provider` 了（那是 VuePress 1.x 在 Node 17+ 上的坑）。

## 发布

```sh
./deploy.sh
```

构建 + 把 `docs/.vitepress/dist` 推到 `master`。之后 GitHub Pages 会自动更新，等 1-2 分钟。

## 加一篇文章

直接在 `docs/md/<板块>/` 下新建 `.md`，**侧边栏会自动出现**，不用改配置。

标题取 `frontmatter` 里的 `title`，没有就取正文第一个 `# 标题`。

侧边栏分组和排序在 `docs/.vitepress/config.mts` 里：`LABELS` 管中文名，`ORDER` 管组的顺序。

## 三个容易踩的坑

1. **别往 `docs/public/` 写 CNAME。** `www.xianglong.vip` 指向的是自己的服务器（47.94.159.91），一旦 GitHub Pages 声明这个域名，`xianglong123.github.io` 主域会被 301 过去反而打不开。原来 `deploy.sh` 里就有这行，已删。

2. **`cleanUrls` 保持 `false`。** 旧链接都是 `/md/java/basic/xxx.html` 这种带后缀的，关掉才能让已收录的链接继续可用。

3. **正文里别直接写 `<Something>`。** Markdown 会被当成 Vue 模板编译，裸尖括号会导致构建失败。写成反引号包住的代码形式，或者用 `&lt;` 转义。
