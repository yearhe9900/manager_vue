import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/api/Groups/GetGroup',
    method: 'post',
    data
  })
}

export function modifyStatus(data) {
  return request({
    url: '/api/Groups/ModifyGroupStatus',
    method: 'post',
    data
  })
}

export function createGroup(data) {
  return request({
    url: '/api/Groups/AddGroup',
    method: 'post',
    data
  })
}

export function updateGroup(data) {
  return request({
    url: '/api/Groups/UpdateGroup',
    method: 'post',
    data
  })
}
