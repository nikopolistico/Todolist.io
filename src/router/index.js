import Vue from 'vue'
import VueRouter from 'vue-router'
import Todolist from '../views/Todolist.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Todolist',
    component: Todolist
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
      path: '/portfolio',
      name: 'portfolio',

      component: () => import('../views/Portfolio.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
