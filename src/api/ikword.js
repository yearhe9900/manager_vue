import request from '@/utils/request'

export function getGroups(data) {
  return request({
    url: '/api/Groups/GetGroup',
    method: 'post',
    data
  })
}

export function getEnableGroupByName(data) {
  return request({
    url: '/api/Groups/GetEnableGroupByName',
    method: 'post',
    data
  })
}

export function modifyGroupStatus(data) {
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

export function getWords(data) {
  return request({
    url: '/api/Words/GetWords',
    method: 'post',
    data
  })
}

export function modifyWordStatus(data) {
  return request({
    url: '/api/Words/ModifyWordStatus',
    method: 'post',
    data
  })
}

export function createWord(data) {
  return request({
    url: '/api/Words/AddOneWord',
    method: 'post',
    data
  })
}

export function updateWord(data) {
  return request({
    url: '/api/Words/UpdateWord',
    method: 'post',
    data
  })
}

export function publishWords() {
  return request({
    url: '/api/Words/Publish',
    method: 'post'
  })
}
