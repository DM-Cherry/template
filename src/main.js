// 引入一堆兼容
import 'url-search-params-polyfill';
import 'babel-polyfill';

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from '@/App';
import router from '@/router';
// import axios from '@/core/auth'
// import iviewFixer from '@/core/mixins/iview'
import store from '@/store';
import VeeValidate, { Validator } from 'vee-validate';
import zh from 'vee-validate/dist/locale/zh_CN';
/* eslint-disable */
import localForage from 'localforage';
import 'localforage-getitems';
import VueSweetalert2 from 'vue-sweetalert2';
import ViewUI from 'view-design';
// import * as directives from "./directives";
import VueSilentbox from 'vue-silentbox';

import echarts from 'echarts';
import 'echarts-liquidfill';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

// iView 4.x
Vue.use(ViewUI);
Vue.use(VueSilentbox);

Vue.use(VeeValidate, {
  events: 'input|change',
  fieldsBagName: 'formFields',
});
Validator.localize('zh', zh);

Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);
// Vue.mixin(iviewFixer)

Vue.prototype.$storage = {};
// for (let name in store.state.default.storage.localforage) {
//   Vue.prototype.$storage[name] = localForage.createInstance(
//     store.state.default.storage.localforage[name]
//   )
// }

// Vue.prototype.$axios = axios
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$echarts = echarts;

// 若是没有开启Devtools工具，在开发环境中开启，在生产环境中关闭
if (process.env.NODE_ENV !== 'production') {
  Vue.config.devtools = true;
  Vue.config.productionTip = false;
} else {
  Vue.config.devtools = false;
  Vue.config.productionTip = true;
}

// Object.keys(directives).forEach((k) => Vue.directive(k, directives[k]));

window.vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
