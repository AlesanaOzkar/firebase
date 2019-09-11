import Vue from 'vue'
import Router from 'vue-router'
import Panel from './components/panel/Panel.vue'
import Inicio from './components/pacientes/Inicio.vue'
var firebase = require("firebase/app");
Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Panel,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/pacientes',
      component: () => import(/* webpackChunkName: "about" */ './components/pacientes/Pacientes.vue'),
      children: [
        {
          path: '',
          name:'inicio',
          component: Inicio
        }
      ],
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/agenda',
      name: 'agenda',
      meta:{
        requiresAuth:true
      },
      component: () => import(/* webpackChunkName: "about" */ './components/agenda/Agenda.vue')
    },
    {
      path: '/laboratorios',
      name: 'laboratorios',
      meta:{
        requiresAuth:true
      },
      component: () => import(/* webpackChunkName: "about" */ './components/laboratorios/Laboratorios.vue')
    },
    {
      path: '/inventario',
      name: 'inventario',
      meta:{
        requiresAuth:true
      },
      component: () => import(/* webpackChunkName: "about" */ './components/inventario/Inventario.vue')
    },
    {
      path: '/comunidad',
      name: 'comunidad',
      meta:{
        requiresAuth:true
      },
      component: () => import(/* webpackChunkName: "about" */ './components/comunidad/Comunidad.vue')
    }
    ,
    {
      path: '/registro',
      name: 'registro',
      component: () => import(/* webpackChunkName: "about" */ './components/login/Registro.vue')
    }
    ,
    {
      path: '/ingreso',
      name: 'ingreso',
      component: () => import(/* webpackChunkName: "about" */ './components/login/Ingreso.vue')
    }
    ,
    
  ]
})


router.beforeEach((to, from, next) => {

  const rutaProtegida = to.matched.some(record => record.meta.requiresAuth);

  const user = firebase.auth().currentUser;

  if (rutaProtegida === true && user === null) {
    next({
      path: '/ingreso'
    })
  } else {
   next()
  }
})

/*
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }

*/

export default router
