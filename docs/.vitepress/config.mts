import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "Mangho Blog",
  description: "mangho的后花园",
  cleanUrls: true,
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/vite.svg" }],
    //vercel analysis
    [
      "script",
      {
        // src: "https://cdn.vercel-insights.com/v1/analytics.js",
        src: "https://cdn.vercel-insights.com/_vercel/insights/script.js",
        // src: "/_vercel/insights/script.js",
      },
    ],
    //Google analysis
    [
      "script",
      { async: "", src: "https://www.googletagmanager.com/gtag/js?id=G-0W16SW7JTM" },
    ],
    [
      "script",
      {},
      `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0W16SW7JTM');`,
    ],
    // ['link', { rel: 'icon', href: '/favion.ico' }]
  ],
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
      message:
        '<a href="https://vitepress.dev" target="blank">vitepress</a> 驱动 | <a href="https://vercel.com" target="blank">vercel</a> 部署',
      copyright: "Copyright © 2022-present Mangho",
    },
    socialLinks: [
    //   {
    //     icon: {
    //       svg: '<svg t="1717010986711" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1448" width="32" height="32"><path d="M512 960c-246.4 0-448-201.6-448-448s201.6-448 448-448 448 201.6 448 448-201.6 448-448 448z" fill="#D81E06" p-id="1449"></path><path d="M721.664 467.968h-235.52a22.272 22.272 0 0 0-20.736 20.736v51.776c0 10.368 10.368 20.736 20.736 20.736H628.48c10.368 0 20.736 10.304 20.736 20.672v10.368c0 33.664-28.48 62.08-62.144 62.08H392.896a22.272 22.272 0 0 1-20.672-20.672V436.928c0-33.664 28.48-62.08 62.08-62.08h287.36a22.272 22.272 0 0 0 20.736-20.736v-51.84a22.272 22.272 0 0 0-20.736-20.672h-287.36A152.96 152.96 0 0 0 281.6 434.368v287.36c0 10.304 10.368 20.672 20.736 20.672h302.848c75.072 0 137.216-62.08 137.216-137.216v-116.48a22.272 22.272 0 0 0-20.736-20.736z" fill="#FFFFFF" p-id="1450"></path></svg>',
    //     },
    //     link: "https://gitee.com/jaydon007",
    //   },
    //   {
    //     icon: {
    //       svg: '<svg t="1717141214927" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4409" width="200" height="200"><path d="M932.317184 567.76704L885.10464 422.46144l-93.57312-287.997952c-4.8128-14.81728-25.776128-14.81728-30.590976 0L667.36128 422.459392H356.62848L263.051264 134.46144c-4.8128-14.81728-25.776128-14.81728-30.593024 0l-93.57312 287.997952-47.210496 145.309696a32.165888 32.165888 0 0 0 11.68384 35.96288l408.6272 296.890368L920.61696 603.734016c11.272192-8.192 15.990784-22.71232 11.68384-35.964928" fill="#FC6D26" p-id="4410"></path><path d="M512.002048 900.62848l155.365376-478.171136H356.634624z" fill="#E24329" p-id="4411"></path><path d="M512.004096 900.62848L356.63872 422.47168H138.901504z" fill="#FC6D26" p-id="4412"></path><path d="M138.891264 422.465536l-47.214592 145.309696a32.16384 32.16384 0 0 0 11.685888 35.96288L511.991808 900.62848z" fill="#FCA326" p-id="4413"></path><path d="M138.893312 422.459392h217.737216L263.053312 134.46144c-4.8128-14.819328-25.778176-14.819328-30.590976 0z" fill="#E24329" p-id="4414"></path><path d="M512.002048 900.62848l155.365376-478.154752H885.10464z" fill="#FC6D26" p-id="4415"></path><path d="M885.11488 422.465536l47.214592 145.309696a32.16384 32.16384 0 0 1-11.685888 35.96288L512.014336 900.62848z" fill="#FCA326" p-id="4416"></path><path d="M885.096448 422.459392H667.36128l93.577216-287.997952c4.814848-14.819328 25.778176-14.819328 30.590976 0z" fill="#E24329" p-id="4417"></path></svg>',
    //     },
    //     link: "https://gitlab.com/mangho",
    //   },
    //   {
    //     icon: {
    //       svg: '<svg t="1717141296755" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5383" width="48" height="48"><path d="M512 0C229.283787 0 0.142041 234.942803 0.142041 524.867683c0 231.829001 146.647305 428.553077 350.068189 497.952484 25.592898 4.819996 34.976961-11.38884 34.976961-25.294314 0-12.45521-0.469203-45.470049-0.725133-89.276559-142.381822 31.735193-172.453477-70.380469-172.453477-70.380469-23.246882-60.569859-56.816233-76.693384-56.816234-76.693385-46.493765-32.58829 3.540351-31.948468 3.540351-31.948467 51.356415 3.71097 78.356923 54.086324 78.356923 54.086324 45.683323 80.19108 119.817417 57.072162 148.993321 43.593236 4.649376-33.91059 17.915029-57.029508 32.50298-70.167195-113.675122-13.222997-233.151301-58.223843-233.1513-259.341366 0-57.285437 19.919806-104.163095 52.678715-140.846248-5.246544-13.265652-22.820334-66.626844 4.990615-138.884127 0 0 42.996069-14.076094 140.760939 53.787741 40.863327-11.644769 84.627183-17.445825 128.177764-17.6591 43.465272 0.213274 87.271782 6.014331 128.135109 17.6591 97.679561-67.906489 140.59032-53.787741 140.59032-53.787741 27.938914 72.257282 10.407779 125.618474 5.118579 138.884127 32.844219 36.683154 52.593405 83.560812 52.593405 140.846248 0 201.586726-119.646798 245.990404-233.663158 258.957473 18.341577 16.208835 34.721032 48.199958 34.721032 97.210357 0 70.167195-0.639822 126.7275-0.639823 143.960051 0 14.033439 9.213443 30.370239 35.190235 25.209005 203.250265-69.527373 349.769606-266.123484 349.769605-497.867175C1023.857959 234.942803 794.673558 0 512 0" fill="#3E75C3" p-id="5384"></path></svg>',
    //     },
    //     link: "https://github.com/mangho",
    //   },
    //   {
    //     icon: {
    //       svg: '<svg t="1717141364590" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6411" width="48" height="48"><path d="M241.29537297 142.80465793C204.50619412 147.5843544 170.32412243 172.20703316 154.24696159 205.66490841 140.92174722 233.32921219 141.93562222 206.96846199 141.93562222 513.44839287c0 259.11748409 0.14483929 270.55978775 2.75194645 280.26401997C153.66760444 827.74964523 175.97285461 855.41394901 205.66490841 869.75303841c27.66430378 13.32521438 1.30355359 12.31133938 307.78348446 12.31133937 259.11748409 0 270.55978775-0.14483929 280.26401997-2.75194645 34.0372324-8.98003579 61.70153618-31.28528595 76.04062557-60.97733974 13.32521438-27.66430378 12.31133938-1.30355359 12.31133937-307.78348446 0-259.11748409-0.14483929-270.55978775-2.75194644-280.26401997C870.33239556 196.25035477 848.02714539 168.4412117 818.33509159 154.24696159c-27.66430378-13.32521438 0.43451786-12.16650009-301.26571655-12.45617866C370.4920168 141.64594364 246.364748 142.0804615 241.29537297 142.80465793z m158.59901905 177.28328706c36.06498242 6.37292861 62.42573261 19.40846443 87.48292923 43.59662532 25.63655377 24.76751804 42.29307175 56.19764328 50.83858967 96.46296502 3.76582146 17.5255537 5.35905361 60.25314331 2.89678573 80.24096489-11.29746438 92.40746498-66.62607193 152.22609043-152.08125115 164.39259052-19.11878586 2.60710716-54.02505397 1.013875-71.4057684-3.47614289-66.48123264-17.38071443-111.52625084-69.0883398-125.28598308-144.40476894-3.47614289-18.97394658-3.47614289-66.33639336-0.14483928-84.73098278 4.20033931-22.30525017 9.55939293-38.38241101 19.26362514-57.93571472 16.51167869-33.31303597 36.64433956-55.47344685 66.62607193-73.5783577 15.64264297-9.26971435 41.42403603-18.24975014 60.97733975-21.14653587 14.48392868-2.1725893 46.92792893-1.73807144 60.83250046 0.57935715z m360.21530628 104.28428649c29.11269665 6.08325005 53.73537541 27.66430378 65.03283977 56.77700043 8.98003579 23.0294466 8.83519649 21.43621445 9.41455365 124.56178665l0.57935714 94.58005429H765.46875191v-83.71710778c0-91.82810783-0.28967857-95.73876858-8.69035721-112.82980442-7.53164291-15.20812511-19.26362514-22.73976803-38.52725029-24.62267876-21.14653587-2.02775002-43.30694676 11.29746438-53.88021469 32.15432167-5.64873218 11.15262508-6.08325005 19.84298229-6.08325005 106.02235795V700.29107285h-69.23317909l-0.72419643-132.23826885c-0.43451786-72.56448269-1.30355359-133.831501-1.73807144-136.1489296l-1.01387502-3.91066075h30.41625024c27.80914307 0 30.56108952 0.28967857 31.28528595 2.46226787 0.43451786 1.44839287 1.1587143 10.13875008 1.73807143 19.26362515 0.43451786 9.12487507 1.1587143 17.09103584 1.59323216 17.81523227 0.28967857 0.57935715 3.47614289-2.75194645 6.80744648-7.38680361 13.32521438-17.96007157 35.77530383-31.57496453 60.39798259-36.354661 10.13875008-2.02775002 31.57496453-1.73807144 42.29307176 0.57935715z" fill="#067bef" p-id="6412"></path><path d="M342.82771302 376.43042755c-15.49780369 3.76582146-29.11269665 11.87682152-42.29307176 25.34687519-17.5255537 17.67039299-26.79526807 36.49950027-33.60271453 67.49510765-4.05550003 18.68426799-5.06937504 57.64603615-2.02775002 76.33030414 10.71810723 65.46735764 48.08664322 104.2842865 100.80814362 104.57396508 16.80135728 0 26.21591092-2.02775002 41.27919674-9.26971435 39.39628601-18.82910728 61.84637546-66.19155407 61.70153617-130.35535813-0.14483929-49.24535752-14.3390894-87.62776852-42.00339317-113.26432229-11.29746438-10.42842865-23.89848232-17.38071443-37.94789314-20.712018-11.15262508-2.60710716-35.19594669-2.60710716-45.91405391-0.14483929z" fill="#067bef" p-id="6413"></path></svg>',
    //     },
    //     link: "https://www.processon.com/view/5c70b538e4b0feef9f34fc8a",
    //   },
    //   { icon: "linkedin", link: "" },
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
