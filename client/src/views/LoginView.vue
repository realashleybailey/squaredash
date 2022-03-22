<template>
  <div>
    <b-navbar :mobile-burger="false" style="padding: 25px 25px 0">
      <template #brand>
        <Logo />
        <div class="navbar-end"><a href="" class="bold">Learn More</a></div>
      </template>
    </b-navbar>
    <div
      class="container"
      style="
        padding-bottom: 30vh;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        bottom: 0px;
        left: 0px;
        top: 0px;
        right: 0px;
        flex-direction: column;
      "
    >
      <div class="logo-modal">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" role="img">
          <path
            role="presentation"
            d="M36.65 0h-29.296c-4.061 0-7.354 3.292-7.354 7.354v29.296c0 4.062 3.293 7.354 7.354 7.354h29.296c4.062 0 7.354-3.292 7.354-7.354v-29.296c.001-4.062-3.291-7.354-7.354-7.354zm-.646 33.685c0 1.282-1.039 2.32-2.32 2.32h-23.359c-1.282 0-2.321-1.038-2.321-2.32v-23.36c0-1.282 1.039-2.321 2.321-2.321h23.359c1.281 0 2.32 1.039 2.32 2.321v23.36z"
          />
          <path
            role="presentation"
            d="M17.333 28.003c-.736 0-1.332-.6-1.332-1.339v-9.324c0-.739.596-1.339 1.332-1.339h9.338c.738 0 1.332.6 1.332 1.339v9.324c0 .739-.594 1.339-1.332 1.339h-9.338z"
          />
        </svg>
      </div>
      <b-button @click="loginWithSquare()">Login with Square</b-button>
    </div>
  </div>
</template>

<style lang="scss">
.logo-modal {
  fill: #c2c7cc;
  margin: 0 auto 26px;
  width: 44px;
  height: 44px;

  -webkit-text-size-adjust: 100%;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: 'SqMarket', Helvetica, Arial, sans-serif;
  line-height: 1.5;
  color: #3d454d;
  fill: #c2c7cc;
  box-sizing: border-box;
  overflow: hidden;
}

.navbar-brand {
  flex-direction: row;
  justify-content: space-between;
}
</style>

<script lang="ts">
import Vue from 'vue'
import store from '../store'
import Logo from '../assets/logo.svg'

export default Vue.extend({
  name: 'LoginView',
  components: {
    Logo
  },
  methods: {
    loginWithSquare() {
      store.dispatch('loginWithSquare', [])
    }
  }
})
</script>
