<template>
  <v-container>
    <v-layout row wrap class="pacientes" justify-center >
      <v-flex xs5 fondo-seccion >
        <h1>Registro de usuarios</h1>
        {{error}}
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            
            @submit.prevent="crearUsuario({email,pass:contrasena})"
          >
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="contrasena"
              type="password"
              label="Contraseña"
              :rules="passRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="contrasena2"
              type="password"
              label="Confirme su contraseña"
              required
              :rules="passRules"
              
            ></v-text-field>
            <v-btn
              type="submit"
              color="default"
              :disabled="!desactivar()"
            >
              Registrar
            </v-btn>

          </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
//Importa el store de vuex
import {mapActions, mapState} from 'vuex'


export default {
    data: () => ({
      email:'',
      contrasena:'',
      contrasena2:'',
      valid: true,
      name: '',
      passRules: [
        v => !!v || 'La contraseña es requerido'
      ],
      emailRules: [
        v => !!v || 'El correcto es requerido',
        v => /.+@.+/.test(v) || 'El correo es invalido'
      ],
    }),
    computed:{
      ...mapState(['error'])
    },
    methods:{
      ...mapActions(["crearUsuario"]),
      desactivar(){
        return this.contrasena === this.contrasena2 && this.contrasena != ''
      }
    }
  }
</script>

<style>

</style>
