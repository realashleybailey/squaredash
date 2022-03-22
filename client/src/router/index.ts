import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Login from '@/views/LoginView.vue'
import Dashboard from '@/views/DashboardView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
