import Vue from 'vue'
import Vuetify from 'vuetify'
import './plugins/vuetify'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
// Translation provided by Vuetify (javascript)
import es from 'vuetify/es5/locale/es'
// Firebase App is always required and must be first
var firebase = require("firebase/app");

// Add additional services that you want to use
require("firebase/auth");
//require("firebase/database");
require("firebase/firestore");
//require("firebase/messaging");
//require("firebase/functions");

// Comment out (or don't require) services that you don't want to use
// require("firebase/storage");

var config = {
  apiKey: "AIzaSyBKv1ABbvl115taBdlsUex89gbhyjhWlds",
  authDomain: "agendamedica-61062.firebaseapp.com",
  databaseURL: "https://agendamedica-61062.firebaseio.com",
  projectId: "agendamedica-61062",
  storageBucket: "",
  messagingSenderId: "437381493913"
};

const firebaseApp = firebase.initializeApp(config);

firebaseApp.firestore().settings({})

export default firebase.firestore()

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;

    store.dispatch('detectarUsuario',{email: user.email,uid:user.uid})

    router.push({name:'home'})




    // ...
  } else {
    store.dispatch('detectarUsuario',null)
    // User is signed out.
    router.push({name:'ingreso'})
  }

  Vue.use(Vuetify, {
    lang: {
      locales: { es },
      current: 'es'
    }
  })
  
  Vue.config.productionTip = false
  
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
});



