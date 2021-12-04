import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Sort from '../views/Sort.vue'
import Delete from '../views/Delete.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sort',
    name: 'sort',
    component: Sort
  },
  {
    path:'/delete',
    name:'delete',
    component: Delete
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
