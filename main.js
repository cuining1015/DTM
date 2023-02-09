
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import VueI18n from "vue-i18n"
import i18n from './lang/index.js'
import initWeb3 from "@/plugins/initWeb3.js"
import apiFun from "@/plugins/api.js";

Vue.config.productionTip = false
Vue.prototype.$apiFun = apiFun;
Vue.use(initWeb3);

App.mpType = 'app'

const app = new Vue({
    ...App,
	i18n
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif