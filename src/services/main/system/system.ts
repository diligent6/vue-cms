import hyRequest from '../..'

//获取用户列表
export function getUsersList(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}
//根据用户id删除当前用户
export function deleteUserById(id: string) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}
//新建用户
export function createNewUser(userData: any) {
  return hyRequest.post({
    url: '/users',
    data: userData
  })
}

//修改用户
export function updateUser(userId: string, userData: any) {
  return hyRequest.patch({
    url: '/users/' + userId,
    data: userData
  })
}

//获取列表
export function postSystemList(queryInfo: any, pageName: string) {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}
//根据id删除当前
export function deleteSystemById(id: string, pageName: string) {
  return hyRequest.delete({
    url: `/${pageName}/${id}`
  })
}
//新建
export function createNewSystem(SystemData: any, pageName: string) {
  return hyRequest.post({
    url: `/${pageName}`,
    data: SystemData
  })
}

//修改
export function updateSystem(SystemId: string, SystemData: any, pageName: string) {
  return hyRequest.patch({
    url: `/${pageName}/${SystemId}`,
    data: SystemData
  })
}
