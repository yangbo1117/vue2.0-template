import request from '@/utils/request'

export function reqList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function reqMockdata() {
  return request({
    url: "/vue-admin-template/table/mocktest",
    method: "get",
  })
}

