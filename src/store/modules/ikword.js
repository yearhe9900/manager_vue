import {
  fetchList
} from '@/api/ikword'

const state = {
  list: null
}

const mutations = {
  ADD_ERROR_LOG: (state, log) => {
    state.logs.push(log)
  }
}

const actions = {
  // get user info
  getList({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      fetchList({
        pageno: 1,
        pagesize: 10
      }).then(response => {
        const {
          content
        } = response

        if (!content) {
          reject('Verification failed, please Login again.')
        }

        console.log(content)

        resolve(content)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
