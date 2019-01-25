import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    //首页
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    //
    {
      path: '/jvm',
      name: 'jvm',
      component: () => import('./views/baseinfo/Jvm.vue')
    }
  ]
})
