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
