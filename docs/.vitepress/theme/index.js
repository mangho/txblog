import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import { useRouter } from "vitepress";
import CusomFooter from "./custom-footer.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    if (typeof window !== "undefined" && window.VercelAnalytics) {
      router.afterEach((to) => {
        window.VercelAnalytics.page(to.fullPath);
      });
    }
  },
  // 自定义footer
  // Layout() {
  //   return h(DefaultTheme.Layout, null, {
  //     'layout-bottom': () => h(CusomFooter)
  //   })
  // }
};
