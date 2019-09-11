<template>

  <v-navigation-drawer
      :value="drawer"
      :mini-variant="mini"
      absolute
      class="indigo darken-4"
      v-click-outside="handleClickOutside"
      temporary
      :app="true"
      :disable-resize-watcher="true"
      :clipped="true"
      :fixed="true"
      hide-overlay
      :floating="true"
      width="200"
      :disable-route-watcher="false"
    >
      <v-list class="pt-0" dense>
        <v-divider light></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          :to="{ name: item.url}"
          @click="mostrarSidebar" exact 
        >
          <v-list-tile-action>
            <v-icon class="text--accent-4-blue">{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> 
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import ClickOutside from 'vue-click-outside';
export default {
  directives: {
    ClickOutside,
  },
  name: 'Sidebar',
  data () {
    return {
        items: [
          { title: 'Pacientes', icon: 'person' ,url:'inicio'},
          { title: 'Agenda', icon: 'question_answer' ,url:'agenda'},
          { title: 'Laboratorio', icon: 'question_answer',url:'laboratorios' },
          { title: 'Inventario', icon: 'question_answer',url:'inventario' },
           { title: 'Comunidad', icon: 'question_answer' ,url:'comunidad'}
        ],
        mini: false,
        right: null
    }
  },
  computed:{
    ...mapState(["drawer"])
  },
  methods:{
    ...mapMutations(["mostrarSidebar"]),
    handleClickOutside() {
      if (this.drawer) {
        this.mostrarSidebar();
      }
    },
  }
}
</script>