<template>
  <v-container
    :fluid="true"
  >
    <v-layout row wrap class="fondo-seccion pacientes">
        <v-flex xs12>
            <v-data-table
            :rows-per-page-items="[10]"
            :headers="headers"
            :items="pacientesLista"
            class="elevation-1"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            sort-icon="arrow_drop_down"
            >
            <template v-slot:items="props">
                <td >{{ props.item.codigo }}</td>
                <td >{{ props.item.nombre }}</td>
                <td >{{ props.item.apellido_paterno }}</td>
                <td >{{ props.item.apellido_materno }}</td>
                <td >{{ props.item.celular }}</td>
                <td >{{ props.item.correo }}</td>
                <td ><v-toolbar-side-icon></v-toolbar-side-icon></td>
            </template>
            </v-data-table>
            <v-fab-transition>
                    <v-btn
                        dark
                        fab
                        fixed
                        bottom
                        right
                        @click.stop="modalAgregarPaciente"
                >
                    <v-icon>add</v-icon>
                </v-btn>
                </v-fab-transition>
                
        </v-flex>
        <modal></modal>

            
    </v-layout>
      
    <router-view/>
  </v-container>
</template>

<script>
import ModalAgregarPaciente from './modals/AgregarPaciente'
import {mapActions, mapState,mapMutations} from 'vuex'
 export default {
     components:{
         modal: ModalAgregarPaciente
     },
    data () {
      return {
        headers: [
          {text: 'Código',value: 'codigo' },
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
    mounted: function(){
        this.obtenerPacientes()
      
    },
    computed:{
      ...mapState(['error',"abrirModalPaciente","pacientesLista"])
    },
    methods:{
      ...mapActions(["agregarPaciente","obtenerPacientes"]),
      ...mapMutations(["modalAgregarPaciente"])
    }
  }
</script>

<style>

</style>
