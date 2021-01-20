import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home'
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/gene',
    name: 'Gene',
    component: () => import('../views/Gene.vue')
  },
  {
    path: '/position',
    name: 'Position',
    component: () => import('../views/Position.vue')
  },
  {
    path: '/variant',
    name: 'Variant',
    component: () => import('../views/Variant.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
