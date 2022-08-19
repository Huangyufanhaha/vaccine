import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import firstTable from '../views/firstTable.vue'

const routes = [
  {
    path:'/',
    name:'firstTable',
    component:firstTable
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
   
})

export default router
