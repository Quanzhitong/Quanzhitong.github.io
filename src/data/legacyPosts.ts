export type LegacyPost = {
  title: string;
  description: string;
  href: string;
  date: string;
  categories: string[];
  tags: string[];
  section: 'tech' | 'life' | 'reading' | 'toolbox';
  featured?: boolean;
};

export const legacyPosts: LegacyPost[] = [
  {
    title: 'nodejieba引发的血案',
    description: '一次依赖、构建与运行环境交叉问题的排查记录。',
    href: '/2023/09/27/nodejieba/',
    date: '2023-09-27',
    categories: ['踩坑'],
    tags: ['node'],
    section: 'tech',
    featured: true,
  },
  {
    title: 'webpack 4 和 webpack5 Tree Shaking的区别',
    description: '对比 webpack 版本差异，梳理 Tree Shaking 的生效条件。',
    href: '/2022/06/01/treeShaking/',
    date: '2022-06-01',
    categories: ['前端基础', '工具', 'webpack'],
    tags: ['webpack'],
    section: 'tech',
    featured: true,
  },
  {
    title: 'React Router V5.1 升级',
    description: 'React Router 升级过程中的 API 变化和迁移注意点。',
    href: '/2022/04/04/hook5.1/',
    date: '2022-04-04',
    categories: ['前端基础', '框架', 'react'],
    tags: ['react', 'hooks'],
    section: 'tech',
    featured: true,
  },
  {
    title: 'React18, 终于来了',
    description: 'React 18 的关键变化、并发特性和升级观察。',
    href: '/2022/04/04/react18/',
    date: '2022-04-04',
    categories: ['前端基础', '框架', 'react'],
    tags: ['react'],
    section: 'tech',
    featured: true,
  },
  {
    title: 'jest基本使用',
    description: 'Jest 单元测试的基本写法、mock 和常见断言方式。',
    href: '/2022/03/20/jest/',
    date: '2022-03-20',
    categories: ['前端工程化', '自动化测试', 'jest'],
    tags: ['jest'],
    section: 'tech',
  },
  {
    title: 'node基础回顾',
    description: '回顾 Node.js 基础能力和常见模块使用方式。',
    href: '/2022/01/10/node/',
    date: '2022-01-10',
    categories: ['前端基础', '语言', 'nodejs'],
    tags: ['node'],
    section: 'tech',
  },
  {
    title: '对Effect的理解',
    description: '围绕 React Effect 的执行时机、依赖和心智模型做一次整理。',
    href: '/2021/12/21/effect/',
    date: '2021-12-21',
    categories: ['前端基础', '框架', 'react'],
    tags: ['react', 'hooks'],
    section: 'tech',
  },
  {
    title: 'swig速查',
    description: 'Swig 模板语法和常用写法的快速索引。',
    href: '/2021/11/19/index/',
    date: '2021-11-19',
    categories: ['前端基础', '语言', 'swig'],
    tags: [],
    section: 'tech',
  },
  {
    title: '概念名词',
    description: '前端学习过程中容易混淆的概念名词整理。',
    href: '/2021/11/15/conceptAnalysis/',
    date: '2021-11-15',
    categories: ['前端基础', '概念名词'],
    tags: [],
    section: 'tech',
  },
  {
    title: 'reduce 实现',
    description: '从实现角度理解 Array.prototype.reduce 的行为。',
    href: '/2021/11/01/reduce/',
    date: '2021-11-01',
    categories: ['前端基础', '语言', 'javascript'],
    tags: ['javascript'],
    section: 'tech',
  },
  {
    title: 'interface 和 type的区别',
    description: 'TypeScript 中 interface 与 type 的使用差异和选择依据。',
    href: '/2021/10/31/interface/',
    date: '2021-10-31',
    categories: ['前端基础', '语言', 'typeScript'],
    tags: ['typeScript'],
    section: 'tech',
  },
  {
    title: '科学健身',
    description: '关于训练、恢复和健身习惯的一次系统整理。',
    href: '/2021/10/31/heath/',
    date: '2021-10-31',
    categories: ['健康'],
    tags: ['健身'],
    section: 'life',
  },
  {
    title: 'Markdown 语法',
    description: 'Markdown 常用语法、排版和写作格式速查。',
    href: '/2021/10/21/markdown/',
    date: '2021-10-21',
    categories: ['前端基础', '语言', 'MarkDown'],
    tags: ['Markdown'],
    section: 'tech',
  },
  {
    title: 'sentry接入react项目',
    description: 'Sentry 接入 React 项目的配置过程和监控要点。',
    href: '/2021/10/21/sentry/',
    date: '2021-10-21',
    categories: ['前端工程化', 'sentry监控'],
    tags: [],
    section: 'tech',
  },
  {
    title: 'typeScript 巩固',
    description: 'TypeScript 函数、类型和基础语法的复习笔记。',
    href: '/2021/10/12/tsFunc/',
    date: '2021-10-12',
    categories: ['前端基础', '语言', 'typeScript'],
    tags: ['typeScript'],
    section: 'tech',
  },
  {
    title: '《毛泽东传》',
    description: '阅读人物传记时整理的片段、线索和思考。',
    href: '/readBook/biography/',
    date: '2021-10-01',
    categories: ['读书', '传记'],
    tags: ['读书'],
    section: 'reading',
  },
];

export const postsByDate = [...legacyPosts].sort((a, b) => b.date.localeCompare(a.date));

export const featuredPosts = postsByDate.filter((post) => post.featured).slice(0, 4);

export const allCategories = Array.from(
  new Set(legacyPosts.flatMap((post) => post.categories)),
).sort((a, b) => a.localeCompare(b, 'zh-CN'));

export function getPostsByCategory(category: string) {
  return postsByDate.filter((post) => post.categories.includes(category));
}

export function getPostsBySection(section: LegacyPost['section']) {
  return postsByDate.filter((post) => post.section === section);
}

export function groupPostsByYear(posts: LegacyPost[] = postsByDate) {
  return posts.reduce<Record<string, LegacyPost[]>>((groups, post) => {
    const year = post.date.slice(0, 4);
    groups[year] = groups[year] ?? [];
    groups[year].push(post);
    return groups;
  }, {});
}
