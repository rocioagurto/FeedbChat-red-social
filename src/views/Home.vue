<template>
  <div class="home">
    <v-container class="text-center">
     <h1>Lista de tareas</h1>
     <router-link to='/agregar'>
            <v-btn>Agregar</v-btn>
        </router-link>
     </v-container>
  <v-container>
  <ul>
    <li v-for ="(tarea, index) in tareas" :key="index">
      {{tarea.id}} - {{tarea.nombre}}
       <router-link :to="{name:'Editar', params: {id: tarea.id}}">
         <v-btn> Editar</v-btn>
       </router-link>
       <v-btn @click="setDeleteTarea(tarea.id)">Eliminar</v-btn>
    </li>
    
  </ul>
 
  </v-container>



  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  computed: {
    ...mapState(['tareas'])
  },
  methods: {
    ...mapActions(['setTareas', 'setDeleteTarea'])
  },
  created(){
    this.setTareas()
  }
}
</script>

