import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/Auth/Login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'api/user/info',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function refreshToken(data) {
  return request({
    url: '/api/Auth/RefreshToken',
    method: 'post',
    data
  })
}
