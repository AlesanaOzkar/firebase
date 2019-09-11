<template>
  <v-layout row justify-center>
    <v-dialog :value="abrirModalPaciente" persistent max-width="600px" @keydown.esc="modalAgregarPaciente">
      <form @submit.prevent="guadarPaciente">
        <v-card>
          <v-card-title>
            <span class="headline">Nuevo paciente</span>
          </v-card-title>
          <hr>
          <v-card-text>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="paciente.nombre" prepend-icon="text_fields" label="Nombre" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="paciente.apellido_paterno" prepend-icon="text_fields" label="Apellido Paterno" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="paciente.apellido_materno" prepend-icon="text_fields" label="Apellido Materno" required></v-text-field>
                </v-flex>
                  <v-menu
                      ref="fecha_nacimiento"
                      v-model="fecha_nacimiento"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                  >
                      <template v-slot:activator="{ on }">
                      <v-text-field
                          v-model="paciente.date"
                          label="Fecha de nacimiento"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                      ></v-text-field>
                      </template>
                      <v-date-picker
                      ref="picker"
                      v-model="paciente.date"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                      @change="save"
                      ></v-date-picker>
                  </v-menu>
              </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="cerrarModal">Cerrar</v-btn>
            <v-btn color="blue darken-1" type="submit" flat>Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </v-layout>
</template>

<script>
//Importa el store de vuex
import {mapActions, mapState,mapMutations} from 'vuex'


export default {
    data: () => ({
        valid: true,
        paciente:{
          nombre: '',
          apellido_paterno: '',
          apellido_materno: '',
          date: null
        },
        dialog: false,
        fecha_nacimiento: false
    }),
    computed:{
      ...mapState(['error',"abrirModalPaciente"])
    },
    watch: {
      fecha_nacimiento (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    },
    methods: {
      guadarPaciente(){
        //Guarda el paciente 
        this.agregarPaciente(this.paciente).then(res =>{
          //Elimina los datos de la modal antes de cerrarla
          this.paciente = {}
          //Cierra la modal
          this.modalAgregarPaciente()
          //Obtiene nuevamente los pacientes de la base de datos
          this.obtenerPacientes()
        })
      },
      cerrarModal(){
       
        this.modalAgregarPaciente()
      },
      save (date) {
        this.$refs.fecha_nacimiento.save(date)
      },
      ...mapActions(["agregarPaciente","obtenerPacientes"]),
      ...mapMutations(["modalAgregarPaciente"]),
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
    }
  }
</script>

<style>

</style>
