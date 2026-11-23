import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const DOCS = path.resolve(HERE, '..')
const MD_ROOT = path.join(DOCS, 'md')

/** 分组的中文标题。没列的目录直接用文件夹名。 */
const LABELS: Record<string, string> = {
  'ai-agent': 'AI Agent 与集成',
  'ai-content': 'AI 内容生产',
  tools: '工具站开发',
  devops: '自动化与部署'
}

/** 组的显示顺序。 */
const ORDER = ['ai-agent', 'ai-content', 'tools', 'devops']

function readTitle(file: string): string {
  const txt = fs.readFileSync(file, 'utf-8').slice(0, 4000)
  const fm = txt.match(/^---\s*\n([\s\S]*?)\n---/)
  let title = ''
  if (fm) {
    const m = fm[1].match(/^title:\s*(.+)$/m)
    if (m) title = m[1].trim().replace(/^["']|["']$/g, '')
  }
  if (!title) {
    const h1 = txt.match(/^#\s+(.+)$/m)
    title = h1 ? h1[1].trim() : path.basename(file, '.md')
  }
  return title.trim()
}

/**
 * md 路径 → 站点 URL。
 * 每一段单独 encodeURIComponent，否则文件名里的 & # ? + 会被当成 URL 分隔符，
 * 生成链接后点击就 404（历史事故：java-map-HashMap&HashSet.html）。
 */
function toLink(rel: string): string {
  const clean = rel.replace(/\.md$/, '').replace(/(^|\/)(README|index)$/i, '$1')
  const encoded = clean.split('/').map((s) => encodeURIComponent(s)).join('/')
  if (encoded.endsWith('/')) return '/' + encoded
  return '/' + encoded + '.html'
}

function walk(dir: string, acc: string[] = []): string[] {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const st = fs.statSync(full)
    if (st.isDirectory()) {
      if (name === 'images' || name === 'node_modules') continue
      walk(full, acc)
    } else if (name.endsWith('.md')) {
      acc.push(path.relative(MD_ROOT, full))
    }
  }
  return acc
}

/** 按目录自动生成侧边栏，新增文章不用改配置。 */
function buildSidebar() {
  const groups: Record<string, { text: string; link: string; key: string }[]> = {}
  for (const rel of walk(MD_ROOT)) {
    const dirKey = path.dirname(rel).replace(/\\/g, '/')
    const name = path.basename(rel, '.md')
    const isIndex = /^(readme|index)$/i.test(name)
    ;(groups[dirKey] ||= []).push({
      key: name,
      text: isIndex ? '总览' : readTitle(path.join(MD_ROOT, rel)),
      link: toLink(rel)
    })
  }

  const rank = (k: string) => {
    const i = ORDER.indexOf(k)
    return i === -1 ? 999 : i
  }

  const sidebar: Record<string, any> = {}
  for (const dirKey of Object.keys(groups).sort((a, b) => rank(a) - rank(b))) {
    const section = dirKey.split('/')[0] || dirKey
    const items = groups[dirKey].sort((a, b) => {
      const pri = (n: string) => (/overview|readme|index|体系|all/i.test(n) ? 0 : 1)
      return pri(a.key) - pri(b.key) || a.key.localeCompare(b.key)
    })
    const label = LABELS[dirKey.split('/').pop() as string] || dirKey
    ;(sidebar[`/md/${section}/`] ||= []).push({
      text: label,
      collapsed: items.length > 12,
      items: items.map(({ text, link }) => ({ text, link }))
    })
  }
  return sidebar
}

export default defineConfig({
  lang: 'zh-CN',
  title: '向龙的笔记',
  description: 'AI Agent 集成、AI 内容生产、工具站开发与自动化的实践记录。',
  cleanUrls: false,
  srcExclude: ['**/README-DEPLOY.md'],

  head: [
    ['link', { rel: 'icon', href: '/images/photo.jpg' }],
    ['link', { rel: 'apple-touch-icon', href: '/images/photo.jpg' }],
    ['meta', { name: 'theme-color', content: '#1f6feb' }],
    ['meta', { property: 'og:type', content: 'website' }],
    [
      'meta',
      {
        name: 'description',
        content: 'AI Agent 集成、AI 内容生产、工具站开发与自动化的实践记录。'
      }
    ]
  ],

  markdown: {
    lineNumbers: false,
    theme: { light: 'github-light', dark: 'github-dark' }
  },

  sitemap: { hostname: 'https://xianglong123.github.io' },

  themeConfig: {
    logo: '/images/photo.jpg',
    siteTitle: '向龙的笔记',

    nav: [
      { text: '首页', link: '/' },
      { text: 'AI Agent', link: '/md/ai-agent/' },
      { text: '内容生产', link: '/md/ai-content/' },
      { text: '工具站', link: '/md/tools/' },
      { text: '自动化', link: '/md/devops/' }
    ],

    sidebar: buildSidebar(),

    outline: { level: [2, 3], label: '本页目录' },
    search: { provider: 'local' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '更新于', formatOptions: { dateStyle: 'short', timeStyle: 'short' } },
    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',

    socialLinks: [{ icon: 'github', link: 'https://github.com/xianglong123' }],

    footer: {
      message: '写下来的是判断，不是教程。',
      copyright: 'Copyright © 2018-2026 向龙'
    }
  }
})
