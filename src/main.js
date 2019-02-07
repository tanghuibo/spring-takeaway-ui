import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VCharts from 'v-charts'
import ElementUI from 'element-ui'
import '@/styles.scss'
import '@/assets/iconfont/iconfont.js'
import VueCodemirror from 'vue-codemirror'

// require styles
import 'codemirror/lib/codemirror.css'

// require more codemirror resource...

// you can set default global options and events when use
Vue.use(VueCodemirror /* { 
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */)

Vue.use(ElementUI)

Vue.use(VCharts)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
