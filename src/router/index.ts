//通过vue-router插件实现模板路由配置
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'
import { userStore } from '@/store/user'
//创建路由器
let router = createRouter({
  //路由模式hash
  history: createWebHashHistory(),
  routes: constantRoute,
  //滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

// 路由守卫
router.beforeEach((to, from, next) => {


  const store = userStore()
    if(store.token){
      next()
  }else{
      if(to.path === '/login' || to.path==='/login/serviceAgree' || to.path==='/login/privacyPolicy'){
          next()
      }else{
          next('/login')
      }
  }

  // 判断该路由是否需要登录权限
  if(to.meta.requireAuth) {
    // 判断当前用户是否有访问该路由的权限
    if (to.meta.roles.includes(store.role)) {
      next() // 用户有访问权限，直接进入页面
    }else{
      next('/login')
    }
  }



  // let role = userStore().role
  // TODO: 验证Token是否存在，存在则进入页面
  // if(role === 1) {
  //   next('/task')
  // } else if (role === 2) {
  //   next('/talent')
  // } else {
  //   if(to.path === '/login' || to.path === '/login/serviceAgree' || to.path === '/login/privacyPolicy') {
  //     next()
  //   }else {
  //     next('/login')
  //   }
  // }
})

export default router
