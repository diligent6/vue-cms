import type { IAccount } from '@/types/login'
import hyRequest from '..'

//01-获取token等信息
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

//02-根据登录时返回的id查询当前用户的角色详情信息
export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
  })
}

//03-根据角色信息的id查询该角色对应的菜单信息
export function getUserMenusByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
