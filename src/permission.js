import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken ,getRoles ,getName, getAvatar,getIntroduction } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
   
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.permission_routes && store.getters.permission_routes.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info vuex的getters是异步的所以在执行依赖逻辑时需要对相关的数据依赖强制同步
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const  roles  = await store.getters.roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          router.addRoutes(accessRoutes)
          // next()
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          Message.error(error || 'Has Error')
          next(`/`)
          NProgress.done()
        }
        //获取信息推进去
      }
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
