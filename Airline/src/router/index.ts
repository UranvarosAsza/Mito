import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import SelectFlight from '@/views/SelectFlight.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/selectflight',
      name: 'SelectFlight',
      component: SelectFlight
    }
  ]
})

export default router
