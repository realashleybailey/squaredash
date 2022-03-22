import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'
import loginWithSquare from '@/assets/ts/loginWithSquare'
import { LoadingProgrammatic, ToastProgrammatic } from 'buefy'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null
  },
  getters: {},
  mutations: {
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken
    }
  },
  actions: {
    loginWithSquare: async ({ commit }, payload) => {
      // Display loading
      const loading = LoadingProgrammatic.open({
        container: null
      })

      await loginWithSquare(payload, (snapshot, unsubscribe) => {
        // Get data from snapshot
        const data = snapshot.data()

        // If data and accessToken is not null then set accessToken and unsubscribe
        if (data && data.result && data.result.accessToken) {
          ToastProgrammatic.open({
            message: 'Login successful',
            type: 'is-success',
            position: 'is-bottom',
            duration: 3000,
            queue: true
          })
          commit('setAccessToken', data.result.accessToken)
          unsubscribe()
          loading.close()
        }

        // If data and errors is not null then log the error
        if (data && data.errors) {
          // Create toast for error
          data.errors.forEach((error: { detail: string }) => {
            ToastProgrammatic.open({
              message: error.detail,
              type: 'is-danger',
              position: 'is-bottom',
              duration: 10000,
              queue: true
            })
          })
          unsubscribe()
          loading.close()
        }
      })
    }
  },
  modules: {},
  plugins: [createPersistedState()]
})
