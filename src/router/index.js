import Vue from 'vue'
import VueRouter from 'vue-router'


import {auth} from '../firebase'

Vue.use(VueRouter)

  const routes = [
 
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/',
    name: 'Chat',
    component: () => import(/* webpackChunkName: "chat" */ '../views/Chat'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/nosotros',
    name: 'Nosotros',
    component: () => import(/* webpackChunkName: "register" */ '../views/Nosotros.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue')
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
// En cada una de las rutas va a preguntar si existe el famoso meta {requiresAuth:true}, si existe, se ejecutará lo que está dentro del if
  if(to.matched.some(record => record.meta.requiresAuth)){
    //  Aca vamos a preguntar si el usuario inicio sesion
    const user = auth.currentUser
    // si el usuario no existe, debe ser derivado al login para que inicie sesion
    if(!user){
      next({
        path: '/register'
      })
    }else {
      next()
    }

  }else{
    next()
  }
})

export default router
