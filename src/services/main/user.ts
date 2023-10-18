import hyRequest from '..'

export function getUsersList(offset: number = 0, size: number = 10) {
  return hyRequest.post({
    url: '/users/list',
    data: {
      offset,
      size
    }
  })
}
