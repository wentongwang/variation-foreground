import Vue from 'vue'
import VueRouter from 'vue-router'
import Nav from '@/components/Nav'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/redirect',
    component: Nav,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    hidden: true
  },
  {
    path: '/adminLogin',
    component: () => import('@/views/AdminLogin.vue'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/Register.vue'),
    hidden: true
  },
  {
    path: '/forgotPassword',
    component: () => import('@/views/ForgotPassword.vue'),
    hidden: true
  },
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    name: 'Home',
    meta: {
      roles: ['admin']
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: {
      roles: ['admin']
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('@/views/Help.vue'),
    meta: {
      roles: ['admin']
    }
  },
  {
    path: '/gene',
    name: 'Gene',
    component: () => import('@/views/Gene.vue'),
    meta: {
      roles: ['admin']
    }
  },
  {
    path: '/position',
    name: 'Position',
    component: () => import('@/views/Position.vue'),
    meta: {
      roles: ['admin']
    }
  },
  {
    path: '/variant',
    name: 'Variant',
    component: () => import('@/views/Variant.vue'),
    meta: {
      roles: ['admin']
    }
  },
  {
    path: '/svVariant',
    name: 'svVariant',
    component: () => import('@/views/svVariant.vue'),
    meta: {
      roles: ['admin']
    }
  },
  {
    path: '/accountReview',
    name: 'accountReview',
    component: () => import('@/views/AccountReview.vue'),
    meta: {
      roles: ['admin']
    }
  },
  {
    path: '/downloadReport',
    component: () => import('@/views/DownloadReport.vue'),
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true }
]

// export const asyncRoutes = [
//   {
//     path: '/home',
//     component: Nav,
//     alwaysShow: true,
//     children: [
//       {
//         path: '/index',
//         component: Home,
//         name: 'Home',
//         meta: {
//           title: '报告追踪'
//         }
//       }
//     ],
//     meta: {
//       roles: ['admin']
//     }
//   },
//   {
//     path: '/',
//     component: Nav,
//     redirect: '/home/index',
//     hidden: true
//   }
// ]
export const asyncRoutes = [
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('@/views/About.vue'),
  //   meta: {
  //     roles: ['admin']
  //   }
  // },
  // {
  //   path: '/gene',
  //   name: 'Gene',
  //   component: () => import('@/views/Gene.vue'),
  //   meta: {
  //     roles: ['admin']
  //   }
  // },
  // {
  //   path: '/position',
  //   name: 'Position',
  //   component: () => import('@/views/Position.vue'),
  //   meta: {
  //     roles: ['admin']
  //   }
  // },
  // {
  //   path: '/variant',
  //   name: 'Variant',
  //   component: () => import('@/views/Variant.vue'),
  //   meta: {
  //     roles: ['admin']
  //   }
  // },
  // { path: '*', redirect: '/404', hidden: true }
]
// const router = new VueRouter({
//   routes
// })

// export function resetRouter() {
//   const newRouter = new VueRouter({
//     routes
//   })
//   router.matcher = newRouter.matcher // reset router
// }

// export default router

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  base:'/variation/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
