import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import CusomFooter from './custom-footer.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout:CusomFooter,
  // Layout() {
  //   return h(DefaultTheme.Layout, null, {
  //     'layout-bottom': () => h(CusomFooter)
  //   })
  // }
}
