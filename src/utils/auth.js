const TokenKey = 'Admin-Token'
const ExpiresinKey = 'Admin-Expiresin'
const RefreshTokenKey = 'Admin-RefreshToken'
const TokentypeKey = 'Admin-Tokentype'

export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
}

export function getExpiresin() {
  return sessionStorage.getItem(ExpiresinKey)
}

export function setExpiresin(token) {
  return sessionStorage.setItem(ExpiresinKey, token)
}

export function removeExpiresin() {
  return sessionStorage.removeItem(ExpiresinKey)
}

export function getRefreshToken() {
  return sessionStorage.getItem(RefreshTokenKey)
}

export function setRefreshToken(token) {
  return sessionStorage.setItem(RefreshTokenKey, token)
}

export function removeRefreshToken() {
  return sessionStorage.removeItem(RefreshTokenKey)
}

export function getTokentype() {
  return sessionStorage.getItem(TokentypeKey)
}

export function setTokentype(token) {
  return sessionStorage.setItem(TokentypeKey, token)
}

export function removeTokentype() {
  return sessionStorage.removeItem(TokentypeKey)
}
