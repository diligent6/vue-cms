import type { RouteRecordRaw } from 'vue-router'
//加载本地路由对象
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

interface IBredCrums {
  name: string
  path: string
}

export function mapPathToBreadCrums(path: string, userMenus: any) {
  //定义面包屑数据
  const breadCrums: IBredCrums[] = []

  //遍历菜单 根据path选取对应的菜单信息
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        //首先存储顶层菜单信息
        breadCrums.push({
          name: menu.name,
          path: menu.url
        })
        //存储当前菜单信息
        breadCrums.push({
          name: submenu.name,
          path: submenu.url
        })
      }
    }
  }
  return breadCrums
}
