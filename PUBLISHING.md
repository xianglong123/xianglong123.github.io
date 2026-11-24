# 新增文章发布规则

这个站点是 VitePress 构建后的**静态产物**直接托管在 GitHub Pages 上，没有源 Markdown 可重跑。
所以每新增一篇文章，按下面五步做，缺一步就会「文章存在但没人能找到」。

## 五步清单

### 1. 写文章页

位置：`md/<板块>/<slug>.html`，自包含 HTML（内联 CSS，不依赖 VitePress 主题）。
头部必须包含：

- `<title>标题 | 123的个人主页`
- `<meta name="description">` 一句话摘要
- 一个返回首页的链接：`<a class="back" href="/">← 返回首页</a>`
- `<p class="meta">日期 · 分类 · 规格</p>`

命名用中文语义的 slug（`hyperframes-video.html`），不要用日期或任务编号。

### 2. 放素材

视频、图片同目录放，用相对路径引用（`<source src="xxx.mp4">`、`<img src="xxx.png">`）。
视频用 `<video controls playsinline preload="metadata">` 包 `<source>`，别用外链。

### 3. 板块总览页加一条

在 `md/<板块>/index.html` 的正文列表里追加 `<li>`：

```html
<li><a href="./<slug>.html" target="_blank" rel="noopener">文章标题</a> —— 一句话说明</li>
```

### 4. 侧边栏加一条（两处都要改，缺一处就从导航里消失）

静态 HTML 侧边栏：在每个页面里复制一个 `VPSidebarItem` 块（锚点是同板块上一条）。
客户端路由用的 JSON 配置：在 `VP_SITE_DATA__` 里追加
`{"text":"...","link":"/md/<板块>/<slug>.html"}`。

```bash
# 两处可以一次性批量改：所有含该板块侧边栏的 html
grep -rl 'md/ai-content/remotion-video.html' --include='*.html' .
```

链接一定要带 `target="_blank" rel="noopener"`：文章页不在 VitePress 的
`__VP_HASH_MAP__` 里，站内 SPA 跳转会失败；新窗口打开走普通 HTTP GET，一定成功。

### 5. 主页「最近更新」插到最前

`index.html` 的 `<h2>最近更新</h2>` 下的 `<ul>`，新条目放**第一条**，
只保留最近 3–5 条，旧的不用删（板块页里都在）。

## 如果这次是新增板块（不只是新增文章）

页面、素材、侧边栏、主页之外，还要多做三件事，否则新板块内容是「孤儿页」：

1. 建板块总览页 `md/<板块>/index.html`（自包含 HTML，风格抄 `md/ai-content/remotion-video.html` 的 head/style）
2. **所有带侧边栏的页面**（`grep -rl VPSidebarItem --include='*.html' .`，当前 15 个）都要加分组，两处同时改：
   - 静态 HTML：在最后一个 `</section></div>` 后、`<!--]--><!--[--><!--]--></nav>` 前插入一个 `no-transition group` 块
   - 客户端 JSON：在 `VP_SITE_DATA__` 里最后一个分组对象后追加 `{"text":"...","collapsed":false,"items":[...]}`
3. 主页 `index.html` 三处都要动：`.VPFeatures` 里加一张 `grid-4 item` 卡、正文「内容集中在 N 类」改数字并加 `<li>`、最近更新加第一条

改完务必用 `python3 -m json.tool` 思路校验 `VP_SITE_DATA__` 能解析（解码方式：`json.loads(json.loads('"'+raw+'"'))`），
JSON 坏掉会让全站客户端路由失效，比侧边栏多一条严重得多。

## 硬约束

- **不要重跑 `vitepress build`**。以上全是改构建产物，重新构建会把手改全部覆盖，
  而且会把自写文章页（不走 md 源）整页丢掉。要么固定走改静态产物这条线，
  要么哪天把文章迁成 md 源 + 前端配置一起维护，二选一，不要混。
- 中文长句在竖屏页面里要手动断行；`max-width:780px` 是正文宽度上限。
- 表格、`.tip`、`.warn`、`pre` 这些样式在已有文章页里可直接抄，保证风格一致。
- 推送到 GitHub 用 SSH：`git push git@github.com:xianglong123/xianglong123.github.io.git HEAD`。
  HTTPS 在这台机器上不可用（凭据缺失 + 超时）。
- 推送后等 60–100 秒 Pages 构建，再验证：文章页 200、素材 200、侧边栏条目出现在线上 HTML。

## 验证命令

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://www.xianglong.vip/md/<板块>/<slug>.html
curl -s -o /dev/null -w '%{http_code} %{size_download}\n' https://www.xianglong.vip/md/<板块>/<素材>
curl -s https://www.xianglong.vip/md/<板块>/index.html | grep -c '<slug>'
```

## 已发布清单

| 日期 | 板块 | 页面 | 素材 |
|---|---|---|---|
| 2026-11-24 | ai-content | `remotion-video.html` | `remotion-topic.mp4` |
| 2026-11-24 | ai-content | `hyperframes-video.html` | `hyperframes-topic.mp4`、`hyperframes-compare.png` |
| 2026-11-24 | games | `index.html`（新板块）+ `lianbao.html` | `lianbao-chain.png`、`lianbao-settle.png` |
| 2026-11-24 | games | `tunshi.html` | `tunshi-city.png`、`tunshi-chain.png`、`tunshi-park.png` |
