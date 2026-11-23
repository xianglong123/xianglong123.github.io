import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const DOCS = path.resolve(HERE, '..')
const MD_ROOT = path.join(DOCS, 'md')

/** 分组的中文标题。unspecified 的目录直接用文件夹名。 */
const LABELS: Record<string, string> = {
  basic: 'Java 基础',
  collection: '集合框架',
  io: 'IO / NIO',
  java8: 'Java 8',
  java8up: 'Java 8 以后',
  jvm: 'JVM',
  thread: '并发与 JUC',
  advanced: '其他机制',
  info: '数据库基础',
  db: 'SQL 体系',
  mybatis: 'MyBatis',
  mp: 'MyBatis-Plus',
  jpa: 'JPA',
  elk: 'ELK 日志',
  owner: '踩坑笔记',
  reward: '关于'
}

/** 组的显示顺序，没列出的排在最后。 */
const ORDER = [
  'java/basic', 'java/collection', 'java/io', 'java/java8', 'java/java8up',
  'java/jvm', 'java/thread', 'java/advanced',
  'db', 'db/info', 'db/frame/mybatis', 'db/frame/mp', 'db/frame/jpa',
  'elk', 'owner', 'reward'
]

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
  // 原标题首尾爱用 ♥ 装饰，去掉
  return title.replace(/^♥+/, '').replace(/♥+$/, '').trim()
}

function toLink(rel: string): string {
  const clean = rel.replace(/\.md$/, '').replace(/(^|\/)(README|index)$/i, '$1')
  if (clean.endsWith('/')) return '/' + clean
  return '/' + clean + '.html'
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
      collapsed: items.length > 12 ? true : false,
      items: items.map(({ text, link }) => ({ text, link }))
    })
  }
  return sidebar
}

export default defineConfig({
  lang: 'zh-CN',
  title: '向龙的笔记',
  description: 'Java 后端与架构笔记：基础、集合、并发、JVM、IO、数据库，以及踩过的坑。',
  cleanUrls: false,
  srcExclude: ['**/README-DEPLOY.md'],

  head: [
    ['link', { rel: 'icon', href: '/images/photo.jpg' }],
    ['link', { rel: 'apple-touch-icon', href: '/images/photo.jpg' }],
    ['meta', { name: 'theme-color', content: '#1f6feb' }],
    ['meta', { property: 'og:type', content: 'website' }]
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
      {
        text: 'Java',
        items: [
          { text: '基础', link: '/md/java/basic/' },
          { text: '集合框架', link: '/md/java/collection/java-collection-all.html' },
          { text: '并发与 JUC', link: '/md/java/thread/java-thread-x-overview.html' },
          { text: 'JVM', link: '/md/java/jvm/java-jvm-x-overview.html' },
          { text: 'IO / NIO', link: '/md/java/io/java-io-overview.html' },
          { text: 'Java 8', link: '/md/java/java8/java8.html' }
        ]
      },
      {
        text: '数据库',
        items: [
          { text: 'SQL 体系', link: '/md/db/alg-basic-overview.html' },
          { text: 'MySQL', link: '/md/db/info/mysql.html' },
          { text: 'MyBatis', link: '/md/db/frame/mybatis/mybatis-base-overview.html' },
          { text: 'MyBatis-Plus', link: '/md/db/frame/mp/mp-base-overview.html' },
          { text: 'JPA', link: '/md/db/frame/jpa/jpa-base-overview.html' }
        ]
      },
      { text: '踩坑笔记', link: '/md/owner/owner-base-overview.html' },
      { text: '关于', link: '/md/reward/reward-me.html' }
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
      message: '以笔记为索引，不追求面面俱到。',
      copyright: 'Copyright © 2018-2026 向龙'
    }
  }
})
