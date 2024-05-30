import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "Mangho Blog",
  description: "mangho的后花园",
  cleanUrls: true,
  ignoreDeadLinks: [
    // 自定义函数，忽略所有包含 "ignore "的链接
    (url) => {
      return url.toLowerCase().includes("tx-showcase");
    },
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // search: {
    //   provider: 'local',
    // },
    nav: [{ text: "简介", link: "/home" }],

    sidebar: [
      {
        items: [{ text: "简介", link: "/home" }],
      },
      {
        text: "问题要解决",
        items: [
          { text: "docker开发环境下vite热重载无效", link: "/docker-vite" },
          { text: "磁盘结构损坏且无法读取", link: "/disk-damage" },
        ],
      },
      {
        text: "技术要掌握",
        items: [
          { text: "Volta对于Node.js的妙用", link: "/volta-node-switch" },
          { text: "用vue做一个DAPP", link: "/vue-dapp" },
        ],
      },
    ],
    footer: {
      message: '<a href="https://vitepress.dev" target="blank">vitepress</a>驱动',
      copyright: "Copyright © 2022-present Mangho",
    },
    socialLinks: [
      {
        icon: {
          svg: '<svg t="1717010986711" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1448" width="32" height="32"><path d="M512 960c-246.4 0-448-201.6-448-448s201.6-448 448-448 448 201.6 448 448-201.6 448-448 448z" fill="#D81E06" p-id="1449"></path><path d="M721.664 467.968h-235.52a22.272 22.272 0 0 0-20.736 20.736v51.776c0 10.368 10.368 20.736 20.736 20.736H628.48c10.368 0 20.736 10.304 20.736 20.672v10.368c0 33.664-28.48 62.08-62.144 62.08H392.896a22.272 22.272 0 0 1-20.672-20.672V436.928c0-33.664 28.48-62.08 62.08-62.08h287.36a22.272 22.272 0 0 0 20.736-20.736v-51.84a22.272 22.272 0 0 0-20.736-20.672h-287.36A152.96 152.96 0 0 0 281.6 434.368v287.36c0 10.304 10.368 20.672 20.736 20.672h302.848c75.072 0 137.216-62.08 137.216-137.216v-116.48a22.272 22.272 0 0 0-20.736-20.736z" fill="#FFFFFF" p-id="1450"></path></svg>',
        },
        link: "https://gitee.com/jaydon007",
      },
      { icon: "twitter", link: "..." },
    ],
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "辉日",
    darkModeSwitchTitle: "暗夜",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    notFound: {
      title: "Ops,你来到了知识的荒原！",
      quote: "页面找不到了，返回，或者看看其他的？",
      linkLabel: "返回首页",
      linkText: "首页",
    },
  },
});
