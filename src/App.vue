<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-side-icon
       v-if="usuarioActivo"
        @click.stop="mostrarSidebar">
      </v-toolbar-side-icon>
       <v-toolbar-title class="">Agenda Médica </v-toolbar-title>
       <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat :to="{name:'registro'}"  v-if="!usuarioActivo">Registro</v-btn>
          <v-btn flat :to="{name:'ingreso'}"  v-if="!usuarioActivo">Ingreso</v-btn>
          <v-btn flat @click="cerrarSesion()" v-if="usuarioActivo">Cerrar sesión</v-btn>
        </v-toolbar-items>
    </v-toolbar>
    
    <v-content class="fondo-general">
      <sidebar v-if="usuarioActivo"></sidebar>

         <router-view/>

     
    </v-content>


  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import Sidebar from "./components/partials/Sidebar";
export default {
  components: {
    Sidebar
  },
  name: 'App',
  data () {
    return {
    }
  },
  computed:{
    ...mapState(["drawer"]),
    ...mapGetters(["usuarioActivo"])
  },
  methods:{
    ...mapMutations(["mostrarSidebar"]),
    ...mapActions(["cerrarSesion"])
  }
}
</script>
<style lang="scss" src="./scss/main.scss">
  
</style>
