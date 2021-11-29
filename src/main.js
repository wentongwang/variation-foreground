import Vue from 'vue'
import UmyUi from 'umy-ui'
import 'normalize.css/normalize.css'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import './plugins/element.js'
import '@/styles/index.scss'
import i18n from './lang'
import './icons'
import './permission'
Vue.config.productionTip = false

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(UmyUi);

window.vm = new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

