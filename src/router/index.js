import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import PlaceDetail from '../pages/PlaceDetail.vue'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
{
  path: '/register',
  name: 'register',
  component: Register
},
{
  path: '/login',
  name: 'login',
  component: Login
},
  {
    path: '/place/:id',
    name: 'place-detail',
    component: PlaceDetail
  },
  {
  path: '/create',
  name: 'create-place',
  component: () => import('../pages/CreatePlace.vue')
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router