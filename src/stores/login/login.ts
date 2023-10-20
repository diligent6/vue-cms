import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/services/login/login'
import type { IAccount } from '@/types/login'
import { localCache } from '@/utils/cache'
import { defineStore } from 'pinia'
import { TOKEN, USER_INFO, USER_MENUS } from '../../global/const'

import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router'
import type { ILoginState } from '../types/login'
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    //菜单信息
    userMenus: [],
    //用户信息
    userInfo: {},
    //用户权限按钮信息
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const res = await accountLoginRequest(account)

      //01-获取id 和 token
      const id = res.data?.id
      const token = res.data?.token
      this.token = token
      //本地化存储
      localCache.setCache(TOKEN, token)

      //02-根据id获取角色详情信息
      let roleId = null
      if (id) {
        const userInfo = await getUserInfoById(id)
        roleId = userInfo.data.role.id
        localCache.setCache(USER_INFO, userInfo)
      }

      //03-根据角色id查询菜单信息
      const menusInfo = await getUserMenusByRoleId(roleId)
      const menus = menusInfo.data
      this.userMenus = menus
      localCache.setCache(USER_MENUS, menus)

      //04-用户权限按钮信息的获取
      const permissions = mapMenusToPermissions(menus)
      this.permissions = permissions
      //重要！！！路由的动态注册
      const routes = mapMenusToRoutes(menus)
      routes.forEach((item) => router.addRoute('main', item))

      //进行页面跳转
      router.push('/main')
    },

    //加载本地初始化数据
    loadLocalCacheAction() {
      //加载包括 token、userMenus、routes[动态注册] 、userInofs
      const token = localCache.getCache(TOKEN)
      const userInfo = localCache.getCache(USER_INFO)
      const userMenus = localCache.getCache(USER_MENUS)

      if (token && userInfo && userMenus) {
        //初始化store数据
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        //04-用户权限按钮信息的获取
        const permissions = mapMenusToPermissions(userMenus)
        this.permissions = permissions

        //动态注册路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((item) => router.addRoute('main', item))
      }
    }
  }
})

export default useLoginStore
