import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  //0. 定义一个数组存储本地所有的route对象
  const localRoutes: RouteRecordRaw[] = []
  // 1.1.读取router/main所有的ts文件
  const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', {
    eager: true
  })
  //2. 遍历对象放入数组
  for (const key in files) {
    const module = files[key]

    localRoutes.push(module.default)
  }
  //返回
  return localRoutes
}

//记录第一个route对象
export let firstMenu: any
//将菜单信息转换为route对象数组
export function mapMenusToRoutes(menus: any[]) {
  //获取本地route对象
  const localRoutes: RouteRecordRaw[] = loadLocalRoutes()

  //初始化一个数组用户存储挑选出来的route对象
  const selectedRoutes: RouteRecordRaw[] = []
  //遍历menus 根据menus信息进行匹配route
  for (const menu of menus) {
    let parentRoute = null
    for (const subMenu of menu.children) {
      const route = localRoutes.find((item) => {
        return item.path === subMenu.url
      })
      if (route) {
        selectedRoutes.push(route)
        if (!firstMenu) firstMenu = subMenu
      }

      //给父级路径注册路由
      if (!parentRoute && route) {
        parentRoute = {
          path: menu.url,
          redirect: route.path
        }
        selectedRoutes.push(parentRoute)
      }
    }
  }

  return selectedRoutes
}
