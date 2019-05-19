import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'ja',    // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'ja': require('./i18n/ja'),
    'zh': require('./i18n/zh'),
  }
})

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
Vue.use(VueMaterial)


import router from './router.js'
new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app')
