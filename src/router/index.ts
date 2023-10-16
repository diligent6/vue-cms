import { TOKEN } from '@/global/const'
import { localCache } from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系: path => component
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/main',
      component: () => import('@/views/main/Main.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/not-found/NotFound.vue')
    }
  ]
})

//导航守卫

router.beforeEach((to) => {
  //获取token
  const token = localCache.getCache(TOKEN)

  //只有token存在才进行跳转，否则就回到login页面
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
  //如果进入到main
})
export default router
