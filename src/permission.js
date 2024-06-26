import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login','/register','/adminLogin','/forgotPassword','/downloadReport'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
          // next({ path: '/home' })
          // store.dispatch('user/getInfo').then(res => { // 拉取info
          //   console.log(res)
          //   const roles = res.roles
          //   store.dispatch('permission/generateRoutes', { roles }).then((accessRoutes) => { // 生成可访问的路由表
          //     router.addRoutes(accessRoutes) // 动态添加可访问路由表
          //     next({ path: '/' }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          //   })
          // })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})
// router.beforeEach((to, from, next) => {
//   NProgress.start()
//   if (store.getters.token) { // 判断是否有token
//     if (to.path === '/login') {
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
//         store.dispatch('user/getInfo').then(res => { // 拉取info
//           console.log(res)
//           const roles = res.roles
//           store.dispatch('permission/generateRoutes', { roles }).then((accessRoutes) => { // 生成可访问的路由表
//             router.addRoutes(accessRoutes) // 动态添加可访问路由表
//             next({ path: '/home' }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
//           })
//         }).catch(err => {
//           store.dispatch('user/resetToken')
//           await Message.error(err || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         })
//       } else {
//         next() // 当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
//       next()
//     } else {
//       next(`/login?redirect=${to.path}`)// 否则全部重定向到登录页
//     }
//   }
// })

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
