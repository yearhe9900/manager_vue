import {
  login,
  logout,
  getInfo
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken,
  // getExpiresin,
  setExpiresin,
  removeExpiresin,
  // getRefreshToken,
  setRefreshToken,
  removeRefreshToken,
  // getTokentype,
  setTokentype,
  removeTokentype
} from '@/utils/auth'
import router, {
  resetRouter
} from '@/router'

const state = {
  token: getToken(),
  expiresin: 0,
  refreshtoken: '',
  tokentype: 'Bearer',
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_EXPIRES_IN: (state, expiresin) => {
    state.expiresin = expiresin
  },
  SET_REFRESH_TOKEN: (state, refreshtoken) => {
    state.refreshtoken = refreshtoken
  },
  SET_TOKEN_TYPE: (state, tokentype) => {
    state.tokentype = tokentype
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password
      }).then(response => {
        commit('SET_TOKEN', response.content.auth_token)
        commit('SET_EXPIRES_IN', response.content.expires_in)
        commit('SET_REFRESH_TOKEN', response.content.refresh_token)
        commit('SET_TOKEN_TYPE', response.content.token_type)
        setToken(response.content.auth_token)
        setExpiresin(response.content.expires_in)
        setRefreshToken(response.content.refresh_token)
        setTokentype(response.content.token_type)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const {
          content
        } = response

        if (!content) {
          reject('Verification failed, please Login again.')
        }

        const {
          roles,
          name,
          avatar,
          introduction
        } = content

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(content)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_EXPIRES_IN', '')
        commit('SET_REFRESH_TOKEN', '')
        commit('SET_TOKEN_TYPE', '')
        removeToken()
        removeExpiresin()
        removeRefreshToken()
        removeTokentype()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_EXPIRES_IN', '')
      commit('SET_REFRESH_TOKEN', '')
      commit('SET_TOKEN_TYPE', '')
      removeToken()
      removeExpiresin()
      removeRefreshToken()
      removeTokentype()
      resolve()
    })
  },

  refreshToken() {},

  // Dynamically modify permissions
  changeRoles({
    commit,
    dispatch
  }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const {
        roles
      } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, {
        root: true
      })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
