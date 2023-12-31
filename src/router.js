import { createRouter, createWebHistory } from 'vue-router'

import BodyMain from './view/BodyMain.vue'
import LogIn from './view/LogIn.vue'
import SignUp from './view/SignUp.vue'
import CardDetail from './view/CardDetail'
import CardCategory from './view/CardCategory'
import AdministrarProducto from './view/AdministrarProducto'
import AgregarProducto from './view/AgregarProducto'
import AgregarCategoria from './view/AgregarCategoria'
import CardModify from './view/CardModify'
import UsersInfo from './view/UsersInfo'
import UserInfo from './view/UserInfo'
import FavoriteRoom from './view/FavoriteRoom'
import AdministrarCaracteristicas from './view/AdministrarCaracteristicas'
import AgregarCaracteristicas from './view/AgregarCaracteristicas'
import PoliticasyMedidasdeSeguridad from './view/PoliticasyMedidasdeSeguridad'
import AgregarReserva from './view/AgregarReserva'
import HistorialReserva from './view/HistorialReserva'

const routes = [
  { path: '/', component: BodyMain },
  { path: '/login', component: LogIn },
  { path: '/signup', component: SignUp },
  { path: '/admin', component: AdministrarProducto },
  { path: '/admin/product', component: AgregarProducto },
  { path: '/admin/category', component: AgregarCategoria },
  { path: '/admin/caracteristicas', component: AgregarCaracteristicas },
  { path: '/admin/reserva/:id', name: 'admin-reserva', component: AgregarReserva },
  { path: '/admin/users', component: UsersInfo },
  { path: '/admin/user', component: UserInfo },
  { path: '/admin/favorite', component: FavoriteRoom },
  { path: '/historial', component: HistorialReserva },
  { path: '/card-detail/:id', name: 'card-detail', component: CardDetail },
  { path: '/card-category/:id', name: 'card-category', component: CardCategory },
  { path: '/modify/:id', name: 'card-modify', component: CardModify },
  { path: '/modify/caracteristicas/:id', name: 'card-modify-caracteristicas', component: AdministrarCaracteristicas },
  { path: '/politicas-y-medidas-de-seguridad', component: PoliticasyMedidasdeSeguridad },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;