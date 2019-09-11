import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

import db from './main'

// Firebase App is always required and must be first
var firebase = require("firebase/app");
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //Muestra u oculta la barra menú lateral
    drawer:false,
    usuario:'',
    error:'',
    abrirModalPaciente: false,
    pacientesLista: [],
    paciente:{
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      date: null
    },
  },
  mutations: {
    mostrarSidebar(state) {
      //Invierte el estado de 
      state.drawer = !state.drawer;
    },
    setUsuario(state,payload){
      state.usuario = payload
    },
    setError(state,payload){
      state.error = payload
    },
    modalAgregarPaciente(state){
      state.abrirModalPaciente = !state.abrirModalPaciente
    },
    setPacientes(state,payload){
      state.pacientesLista = payload;
    }
  },
  actions: {
    crearUsuario({commit},payload){
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.pass)
      .then(res =>{
        //Guarda un nuevo usuario en el state del store
        commit('setUsuario',{email:res.user.uid, uid: res.user.uid})
        //Redirecciona al panel del usuario
        router.push({name:'home'})
      })
      .catch(function(error) {
        // Handle Errors here.
        commit('setError',error.code);
      });
    },
    ingresoUsuario({commit},payload){
      firebase.auth().signInWithEmailAndPassword(payload.email,payload.pass)
        .then(res => {
          //Guarda un nuevo usuario en el state del store
          commit('setUsuario',{email:res.user.uid, uid: res.user.uid})
          //Redirecciona al panel del usuario
          router.push({name:'home'})
        })
        .catch(error =>{
          // Handle Errors here.
          commit('setError',error.code);
        });
    },
    detectarUsuario({commit},payload){
      if(payload != null)
        commit('setUsuario',{email:payload.email, uid: payload.uid})
      else
        commit('setUsuario', null)
    },
    cerrarSesion({commit}){
      //Cierra la sesión de firebase
      firebase.auth().signOut();
      //Agrega el usuario en nulo
      commit('setUsuario',null)
    },
    /*Agrega un paciente */ 
    agregarPaciente({commit},payload){
      //Obtiene el usuario actual
      const usuario = firebase.auth().currentUser;
      //Se agrega el paciente a la colección y se retorna la promesa
      return db.collection('pacientes').add({
        uid: usuario.uid,
        codigo: 'P',
        nombre:payload.nombre,
        apellido_paterno:payload.apellido_paterno,
        apellido_materno:payload.apellido_materno,
        fecha_nacimiento : payload.date
      }).catch(error =>{
        //Se guarda el error en el 'state' 'error'
        commit('setError',error)
      })
    },
    obtenerPacientes({commit}){
      //Se obtiene el usuario actual
      const usuario = firebase.auth().currentUser;
      //Se obtiene la colección de pacientes desde firestore
      var pacientesRef = db.collection("pacientes");
      //Se obtienen los pacientes que pertenezcan al usuario
      var query = pacientesRef.where("uid", "==", usuario.uid).get();
      //Se resuelve la promesa para recorrer todos los pacientes
      query.then(function(querySnapshot) {
        //Se inicializa un arreglo para guardar los pacientes
        let pacientes = []
        //Se recorren todos los pacientes para agregarlos a una variable
        querySnapshot.forEach(function(doc) {
          //Se agrega un paciente al arreglo
          pacientes.push(doc.data())
        });
        //Se inicializan los pacientes
        commit('setPacientes',pacientes)
    })
    .catch(function(error) {
      //Se guarda el error en el 'state' 'error'
      commit('setError',error)
    });
 
    }
  },
  getters:{
    usuarioActivo(state){
      if(state.usuario === null || state.usuario === '' || state.usuario === undefined)
        return false;
      else
      return true;
      
    }
  }
})
