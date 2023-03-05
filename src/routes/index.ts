import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const history = createWebHistory()

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../pages/Home.vue'),
  },
]

const router = createRouter({
  history,
  routes
})

export default router;