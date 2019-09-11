<template>
  <v-container
    :fluid="true"
  >
    <v-layout row wrap class="fondo-seccion pacientes">
      <v-flex xs12>
                
        <h1>Pacientes</h1>
        <hr>
        <router-view/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
//Importa el store de vuex
import {mapActions, mapState, mapMutations} from 'vuex'
 export default {
    data () {
      return {
        headers: [
          {
            text: 'Código',
            align: 'left',
            sortable: true,
            value: 'name'
          },
          { text: 'Nombre', value: 'nombre' },
          { text: 'Apellido Paterno', value: 'apellido_paterno' },
          { text: 'Apellido Materno', value: 'apellido_materno' },
          { text: 'Celular', value: 'celular' },
          { text: 'Correo', value: 'correo' },
          { text: 'Opciones', value: 'opciones' , sortable: false}
        ],
        pacientes: [
          {
            codigo: 'H1AFSEF',
            nombre: 'Oscar',
            apellido_paterno: 'Rubio',
            apellido_materno: 'Sevilla',
            celular: 3315630105,
            correo: 'oscar@gmail.com',
            opciones: ''
          },
                    {
            codigo: '112A',
            nombre: 'Oscar',
            apellido_paterno: 159,
            apellido_materno: 6.0,
            celular: 24,
            correo: 4.0,
            opciones: ''
          },
                    {
            codigo: '112B',
            nombre: 'Oscar',
            apellido_paterno: 159,
            apellido_materno: 6.0,
            celular: 24,
            correo: 4.0,
            opciones: ''
          }

        ]
      }
    },
    computed:{
      ...mapState(['error',"abrirModalPaciente"])
    },
    methods:{
      ...mapActions(["agregarPaciente","obtenerPacientes"]),
      ...mapMutations(["modalAgregarPaciente"])
    }
  }
</script>

<style>

</style>
