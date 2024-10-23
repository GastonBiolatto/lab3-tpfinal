import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistroView from '../views/RegistroView.vue'
import LoginView from '../views/LoginView.vue'
import InicioView from '@/views/InicioView.vue'
import CompraView from '@/views/CompraView.vue'
import TransaccionView from '@/views/TransaccionView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/registro',
    name: 'Registro',
    component: RegistroView 
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/inicio',
    name: 'Inicio',
    component: InicioView
  },
  {
    path: '/compra',
    name: 'Compra',
    component: CompraView
  },
  {
    path: '/transaccion',
    name: 'Transaccion',
    component: TransaccionView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
