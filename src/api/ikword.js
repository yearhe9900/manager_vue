import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/api/Groups/GetGroup',
    method: 'post',
    data
  })
}
