import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import { initializeApp } from 'firebase/app'

import '@/assets/scss/main.scss'

Vue.use(Buefy)
Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'AIzaSyC6ri5vd2p-G3oR6kARve9_vN-pEJ-2M1k',
  authDomain: 'square-dashboard-01.firebaseapp.com',
  projectId: 'square-dashboard-01',
  storageBucket: 'square-dashboard-01.appspot.com',
  messagingSenderId: '1019915160452',
  appId: '1:1019915160452:web:fea8c29ec4b5f35e386bd1'
}

initializeApp(firebaseConfig)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
