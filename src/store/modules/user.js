import { login, getInfo, adminLogin } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { Message } from 'element-ui'

const state = {
  token: getToken(),
  name: '',
  real_name: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_REALNAME: (state, real_name) => {
    state.real_name = real_name
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          if (response.code === 200 && response.status === 1) {
            commit('SET_TOKEN', { token: response.token })
            commit('SET_NAME', response.userName)
            setToken(response.token)
          }
          if (response.code === 200 && response.status === 3) {
            Message.error('您的账号已被封禁')
          }
          if (response.code === 500) {
            Message.error('账号或密码错误')
          }
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  adminLogin({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      adminLogin({ username: username.trim(), password: password })
        .then(response => {
          if (response.code === 200) {
            commit('SET_TOKEN', { token: response.token })
            commit('SET_NAME', response.userName)
            commit('SET_REALNAME', response.realName)
            setToken(response.token)
          }
          if (response.code === 500) {
            Message.error('账号或密码错误')
          }
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo({ username: state.name })
        .then(response => {
          const { data } = response
          if (!data) {
            reject('Verification failed, please Login again.')
          }

          const { roles, name } = data

          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }

          commit('SET_ROLES', roles)
          commit('SET_NAME', name)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       // const roles = response.roles
  //       // const name = response.name
  //       // const avatar = response.avatar
  //       // if (!response) {
  //       //   reject('Verification failed, please Login again.')
  //       // }
  //       // // const { roles, name, avatar } = data
  //       // if (!roles || roles.length <= 0) {
  //       //   reject('getInfo: roles must be a non-null array!')
  //       // }
  //       // commit('SET_ROLES', roles)
  //       // commit('SET_NAME', name)
  //       // commit('SET_AVATAR', avatar)
  //       // resolve(response)
  //       const data = response

  //       if (!data) {
  //         reject('Verification failed, please Login again.')
  //       }

  //       const roles = data.roles
  //       const name = data.name
  //       const avatar = data.avatar

  //       // roles must be a non-empty array
  //       if (!roles || roles.length <= 0) {
  //         reject('getInfo: roles must be a non-null array!')
  //       }

  //       commit('SET_ROLES', roles)
  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_REALNAME', '')
      removeToken()
      resetRouter()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
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
