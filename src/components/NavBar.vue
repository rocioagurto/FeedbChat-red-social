<template>
  <div>
    <v-app-bar
      color="transparent black--text"
      light
      class="mb-sm-10 "
    >
      <router-link to="/" class="text-decoration-none grey--text text--darken-3"> <v-toolbar-title id="title">FeedbChat</v-toolbar-title></router-link>
      <v-spacer></v-spacer>
      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item link to="/acerca">
            <v-list-item-title>
              Sobre mí
            </v-list-item-title>
          </v-list-item>

          <v-list-item link to="/chat" v-if="userExits">
            <v-list-item-title>
              Chat
            </v-list-item-title>
          </v-list-item>
         
        
            <v-list-item  @click="signOut"  v-if="userExits" link>
              <v-list-item-title>
                Cerrar sesion
              </v-list-item-title>
            </v-list-item>
     
     
            <v-list-item v-if="!userExits" link to="/login">
              <v-list-item-title>
                Iniciar sesión
              </v-list-item-title>
            </v-list-item>

            <v-list-item link to="/register"  v-if="!userExits">
            <v-list-item-title>
              Regístrate
            </v-list-item-title>
          </v-list-item>
   
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>


<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  methods:{
    ...mapActions(['signOut'])
  },
  computed:{
    ...mapGetters(['userExits'])
  }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

#title{
  font-family: 'Lobster', cursive;
  font-size: 30px;
}
</style>